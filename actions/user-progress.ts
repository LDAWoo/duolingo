"use server";

import db from "@/db/drizzle";
import { userProgress } from "@/db/schema";
import { currentUser } from "@/lib/current-user";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const recoveryHearts = async () => {
    const user = await currentUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    const userId = user.id;

    const currentUserProgress = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true,
        },
    });

    if (!currentUserProgress) {
        return new Error("User Progress Not Found");
    }

    if (currentUserProgress.hearts === 0) {
        await db
            .update(userProgress)
            .set({
                hearts: Math.max(currentUserProgress.hearts + 5, 5),
            })
            .where(eq(userProgress.userId, userId));

        revalidatePath(`/en/learn`);
    }
};
