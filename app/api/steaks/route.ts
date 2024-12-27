import db from "@/db/drizzle";
import { experiences, leaderboards, steaks } from "@/db/schema";
import { currentUser } from "@/lib/current-user";
import { endOfWeek, startOfWeek } from "date-fns";
import { and, eq, gte, lte, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const user = await currentUser();

        if (!user) {
            return new NextResponse("Unauthorized", {
                status: 401,
            });
        }

        const userId = user.id;

        const userSteaks = await db.query.steaks.findMany({
            where: eq(steaks.userId, userId),
        });

        if (userSteaks.length === 0) {
            await db.insert(steaks).values([
                {
                    userId: user.id,
                    type: "longest",
                },
                {
                    userId: user.id,
                    type: "previous",
                },
                {
                    userId: user.id,
                    type: "current",
                },
            ]);
        } else {
            const streakMap = userSteaks.reduce(
                (acc, steak) => {
                    acc[steak.type] = steak;
                    return acc;
                },
                {
                    current: null,
                    previous: null,
                    longest: null,
                } as Record<"current" | "previous" | "longest", (typeof userSteaks)[number] | null>
            );

            const currentSteak = streakMap["current"];
            const previousSteak = streakMap["previous"];
            const longestSteak = streakMap["longest"];

            if (currentSteak && longestSteak) {
                const now = new Date();
                const todayStartOfDay = new Date(now.setHours(0, 0, 0, 0));
                const todayEndOfDay = new Date(now.setHours(23, 59, 59, 999));

                const currentSteakLastExtendedDate = new Date(currentSteak.lastExtendedDate);

                const isUpdatedToday = currentSteakLastExtendedDate >= todayStartOfDay && currentSteakLastExtendedDate <= todayEndOfDay;

                if (isUpdatedToday) {
                    await updateExperienceForDay(userId);
                    await updateLeaderboardForWeek(userId);

                    return NextResponse.json({
                        message: "Successfully",
                    });
                }

                const ALLOWED_MISS_DAYS = 1;

                const daysDifference = (now.getTime() - new Date(currentSteak.lastExtendedDate).getTime()) / (1000 * 60 * 60 * 24);

                if (daysDifference > ALLOWED_MISS_DAYS) {
                    // Update previous streak
                    if (previousSteak) {
                        await db
                            .update(steaks)
                            .set({
                                startDate: currentSteak.startDate,
                                endDate: currentSteak.endDate,
                            })
                            .where(and(eq(steaks.userId, userId), eq(steaks.type, "previous")));
                    }

                    // Reset current streak
                    await db
                        .update(steaks)
                        .set({
                            startDate: now,
                            endDate: now,
                            lastExtendedDate: now,
                        })
                        .where(and(eq(steaks.userId, userId), eq(steaks.type, "current")));
                } else {
                    // Extend current streak
                    await db
                        .update(steaks)
                        .set({
                            startDate: currentSteak.startDate,
                            endDate: now,
                            lastExtendedDate: now,
                        })
                        .where(and(eq(steaks.userId, userId), eq(steaks.type, "current")));

                    const afterCurrentSteak = await db.query.steaks.findFirst({
                        where: and(eq(steaks.userId, userId), eq(steaks.type, "current")),
                    });

                    if (afterCurrentSteak && longestSteak) {
                        const currentLength = Math.ceil((new Date(afterCurrentSteak.endDate).getTime() - new Date(afterCurrentSteak.startDate).getTime()) / (1000 * 60 * 60 * 24));
                        const longestLength = Math.ceil((new Date(longestSteak.endDate).getTime() - new Date(longestSteak.startDate).getTime()) / (1000 * 60 * 60 * 24));

                        if (currentLength > longestLength) {
                            await db
                                .update(steaks)
                                .set({
                                    startDate: afterCurrentSteak.startDate,
                                    endDate: afterCurrentSteak.endDate,
                                })
                                .where(and(eq(steaks.userId, userId), eq(steaks.type, "longest")));
                        }
                    }
                }
            }
        }

        await updateExperienceForDay(userId);
        await updateLeaderboardForWeek(userId);

        return NextResponse.json({
            message: "Successfully",
        });
    } catch (error) {
        console.error("[STEAKS_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

async function updateExperienceForDay(userId: number) {
    try {
        const now = new Date();
        const startOfDay = new Date(now.setHours(0, 0, 0, 0));
        const endOfDay = new Date(now.setHours(23, 59, 59, 999));

        const usersWithExperienceToday = await db
            .select({
                userId: experiences.userId,
                score: experiences.score,
            })
            .from(experiences)
            .where(and(eq(experiences.userId, userId), gte(experiences.createdAt, startOfDay), lte(experiences.createdAt, endOfDay)));

        if (usersWithExperienceToday.length === 0) {
            await db.insert(experiences).values({
                score: 10,
                userId,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            return;
        }

        const totalScoreToday = usersWithExperienceToday.reduce((acc, experience) => {
            if (experience.score) {
                return acc + experience.score;
            }
            return acc;
        }, 0);

        await db
            .update(experiences)
            .set({
                score: totalScoreToday + 10,
                updatedAt: new Date(),
            })
            .where(and(eq(experiences.userId, userId), gte(experiences.createdAt, startOfDay), lte(experiences.createdAt, endOfDay)));
    } catch (err) {
        console.error("Error updating user experience:", err);
    }
}

async function updateLeaderboardForWeek(userId: number) {
    try {
        const currentDate = new Date();
        const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
        const endOfCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 1 });

        const totalScoreForWeek = await db
            .select({
                score: sql<number>`SUM(${experiences.score})`.as("score"),
            })
            .from(experiences)
            .where(and(eq(experiences.userId, userId), gte(experiences.createdAt, startOfCurrentWeek), lte(experiences.createdAt, endOfCurrentWeek)))
            .then((result) => result[0]?.score ?? 0);

        const existingLeaderboardEntry = await db
            .select({
                userId: leaderboards.userId,
            })
            .from(leaderboards)
            .where(and(eq(leaderboards.userId, userId), gte(leaderboards.createdAt, startOfCurrentWeek), lte(leaderboards.createdAt, endOfCurrentWeek)));

        if (existingLeaderboardEntry.length === 0) {
            await db.insert(leaderboards).values({
                userId,
                score: totalScoreForWeek,
                createdAt: new Date(),
                updatedAt: new Date(),
                leagueId: 1,
            });

            return;
        }

        await db
            .update(leaderboards)
            .set({
                score: totalScoreForWeek,
                updatedAt: new Date(),
            })
            .where(and(eq(leaderboards.userId, userId), gte(leaderboards.createdAt, startOfCurrentWeek), lte(leaderboards.createdAt, endOfCurrentWeek)));
    } catch (err) {
        console.error("Error updating leaderboard for week:", err);
    }
}
