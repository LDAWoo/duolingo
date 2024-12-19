import db from "@/db/drizzle";
import { challengeProgress, challenges, experiences, steaks, userProgress } from "@/db/schema";
import { currentUserPages } from "@/lib/current-user-pages";
import { and, eq, gte, lte } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed",
        });
    }
    try {
        const user = await currentUserPages(req, res);
        const { challengeId } = req.body;

        if (!user) {
            return res.status(401).json({
                error: "Unauthorized",
            });
        }

        const userId = user.id;

        const currentUserProgress = await db.query.userProgress.findFirst({
            where: eq(userProgress.userId, user.id),
            with: {
                activeCourse: true,
            },
        });

        if (!currentUserProgress) {
            return res.status(404).json({ error: "User Progress Not Found" });
        }

        const challenge = await db.query.challenges.findFirst({
            where: eq(challenges.id, challengeId),
        });

        if (!challenge) {
            return res.status(404).json({ error: "Challenge Not Found" });
        }

        const existingChallengeProgress = await db.query.challengeProgress.findFirst({
            where: and(eq(challengeProgress.userId, user.id), eq(challengeProgress.challengeId, challengeId)),
        });

        const isPractice = !!existingChallengeProgress;

        if (currentUserProgress.hearts === 0 && !isPractice) {
            return {
                message: "hearts",
            };
        }

        if (isPractice) {
            await db
                .update(challengeProgress)
                .set({
                    completed: true,
                })
                .where(eq(challengeProgress.id, existingChallengeProgress.id));

            const completedChallengeProgress = await db.query.challengeProgress.findFirst({
                where: and(eq(challengeProgress.userId, user.id), eq(challengeProgress.completed, false)),
            });

            if (!completedChallengeProgress) {
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

                            return res.status(200).json({
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
            }

            await updateExperienceForDay(userId);

            return res.status(200).json({
                message: "Successfully",
            });
        }

        await db.insert(challengeProgress).values({
            challengeId,
            userId: user.id,
            completed: true,
        });

        return res.status(200).json({
            message: "Successfully",
        });
    } catch (error) {
        console.log("[CHALLENGE_PROGRESS_POST]", error);
        return res.status(500).json({
            message: "Internal Error",
        });
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
                updatedAt: now,
            })
            .where(and(eq(experiences.userId, userId), gte(experiences.createdAt, startOfDay), lte(experiences.createdAt, endOfDay)));
    } catch (err) {
        console.error("Error updating user experience:", err);
    }
}
