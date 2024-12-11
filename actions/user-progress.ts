"use server";

import { currentUser } from "@/lib/current-user";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import db from "@/db/drizzle";
import { getCourseById, getUserProgress } from "@/db/queries";
import { userProgress } from "@/db/schema";
import { eq } from "drizzle-orm";

export const upsertUserProgress = async (locale: string, courseId: number) => {
    const user = await currentUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    const course = await getCourseById(courseId);

    if (!course) {
        throw new Error("Course not found");
    }

    const exitingUserProgress = await getUserProgress();

    console.log(user);

    if (exitingUserProgress) {
        await db
            .update(userProgress)
            .set({
                activeCourseId: courseId,
            })
            .where(eq(userProgress.userId, user.id));
    } else {
        await db.insert(userProgress).values({
            userId: user.id,
            activeCourseId: courseId,
        });
    }

    revalidatePath(`/${locale}/courses`);
    revalidatePath(`/${locale}/learn`);
    redirect(`/${locale}/learn`);
};
