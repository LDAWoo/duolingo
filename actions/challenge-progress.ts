"use server";

import db from "@/db/drizzle";
import { getUserProgress } from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";
import { currentUser } from "@/lib/current-user";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const upsertChallengeProgress = async (challengeId: number) => {
    const user = await currentUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    const currentUserProgress = await getUserProgress();

    if (!currentUserProgress) {
        throw new Error("User progress not found");
    }

    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId),
    });

    if (!challenge) {
        throw new Error("Challenge not found");
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

        revalidatePath("/en/learn");
        revalidatePath("/en/quests");
        revalidatePath("/en/leaderboard");
        revalidatePath(`/en/lesson`);
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

    revalidatePath("/en/learn");
    revalidatePath("/en/quests");
    revalidatePath("/en/leaderboard");
    revalidatePath(`/en/lesson`);
};
