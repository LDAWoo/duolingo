import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { getUserByUserId } from "@/db/queries";
import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";

type User = {
    id: string;
    email: string;
    name: string;
    image: string;
};

export const currentUserPages = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await getServerSession(req, res, authOptions);

    const { id } = data?.user as User;

    if (!id) return null;

    const user = await db.query.users.findFirst({
        where: eq(users.userId, id),
    });

    return user;
};
