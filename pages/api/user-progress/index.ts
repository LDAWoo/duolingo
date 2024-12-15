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
        const { challengeId } = req.body;

        if (!user) {
            return res.status(401).json({
                error: "Unauthorized",
            });
        }

        const userId = user.id;

        const currentUserProgress = await db.query.userProgress.findFirst({
            where: eq(userProgress.userId, userId),
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
            where: and(eq(challengeProgress.userId, userId), eq(challengeProgress.challengeId, challengeId)),
        });

        const isPractice = !!existingChallengeProgress;

        if (isPractice) {
            return res.status(200).json({
                message: "practice",
            });
        }

        if (currentUserProgress.hearts === 0) {
            res.status(200).json({
                message: "hearts",
            });
        }
        await db
            .update(userProgress)
            .set({
                hearts: Math.max(currentUserProgress.hearts - 1, 0),
            })
            .where(eq(userProgress.userId, userId));

        return res.status(200).json({
            message: "Successfully",
        });
    } catch (error) {
        console.log("[USER_PROGRESS_POST]", error);
        return res.status(500).json({
            message: "Internal Error",
        });
    }
}
