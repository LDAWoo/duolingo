"use server";

import db from "@/db/drizzle";
import { getCourseById, getUserProgress } from "@/db/queries";
import { userProgress } from "@/db/schema";
import { currentUser } from "@/lib/current-user";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const upsertUserProgress = async (courseId: number) => {
    const user = await currentUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    const userId = user.id;

    const course = await getCourseById(courseId);

    if (!course) {
        return new Error("Course not found");
    }

    const exitedUserProgress = await getUserProgress();

    if (exitedUserProgress) {
        await db
            .update(userProgress)
            .set({
                activeCourseId: courseId,
            })
            .where(eq(userProgress.userId, userId));
    } else {
        await db.insert(userProgress).values({
            userId,
            activeCourseId: courseId,
        });
    }

    revalidatePath(`/courses`);
    revalidatePath(`/learn`);
    redirect("/learn");
};

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

        revalidatePath(`/learn`);
    }
};
