import db from "@/db/drizzle";
import { challengeProgress, challenges, userProgress } from "@/db/schema";
import { currentUserPages } from "@/lib/current-user-pages";
import { and, eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed",
        });
    }
    try {
        const user = await currentUserPages(req, res);
        const { lessonId, challengeId } = req.body;

        if (!user) {
            return res.status(401).json({
                error: "Unauthorized",
            });
        }

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

            await db
                .update(userProgress)
                .set({
                    hearts: Math.min(currentUserProgress.hearts + 1, 5),
                    points: currentUserProgress.points + 10,
                })
                .where(eq(userProgress.userId, user.id));

            return;
        }

        await db.insert(challengeProgress).values({
            challengeId,
            userId: user.id,
            completed: true,
        });

        await db
            .update(userProgress)
            .set({
                points: currentUserProgress.points + 10,
            })
            .where(eq(userProgress.userId, user.id));

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
