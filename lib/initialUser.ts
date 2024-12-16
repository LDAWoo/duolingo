import { getUserByEmail, getUserByUserId } from "@/db/queries";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { users } from "../db/schema";
import { authOptions } from "./auth";

import db from "@/db/drizzle";

export const initialUser = async () => {
    const userSession = await getServerSession(authOptions);

    if (!userSession) {
        return null;
    }

    let user = await getUserByUserId(userSession.user.id);

    const existedUser = await getUserByEmail(userSession.user.email as string);

    if (!user) {
        try {
            if (!existedUser) {
                const currentUser = await db
                    .insert(users)
                    .values({
                        userId: userSession.user.id,
                        email: userSession.user.email as string,
                        displayName: userSession.user.name,
                        username: userSession.user.name as string,
                        imageSrc: userSession.user.image,
                    })
                    .returning();

                user = currentUser[0];
            } else {
                await db
                    .update(users)
                    .set({
                        userId: userSession.user.id,
                        username: userSession.user.name as string,
                        imageSrc: userSession.user.image,
                    })
                    .where(eq(users.id, existedUser.id));
                user = await getUserByUserId(userSession.user.id);
            }
        } catch {
            user = await getUserByUserId(userSession.user.id);
        }
    }
    return user;
};
