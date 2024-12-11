import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";
import { getUserByUserId } from "@/db/queries";

export type User = {
    id: string;
    email: string;
    name: string;
    image: string;
};

export const currentUser = async () => {
    const data = await getServerSession(authOptions);

    const { id } = data?.user as User;

    if (!id) return null;

    const user = await getUserByUserId(id);

    return user;
};
