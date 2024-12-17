import db from "@/db/drizzle";
import { followers, users } from "@/db/schema";
import { currentUser } from "@/lib/current-user";
import { EVENT_TYPE } from "@/lib/types";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const user = await currentUser();
        const { searchParams } = new URL(req.url);

        const userIdRaw = searchParams.get("userId");
        const userId = userIdRaw ? Number.parseInt(userIdRaw, 10) : null;
        const eventTypeRaw = searchParams.get("eventType") as EVENT_TYPE;

        if (!userId || isNaN(userId)) {
            return new NextResponse("Invalid user ID", {
                status: 400,
            });
        }

        if (!user) {
            return new NextResponse("Unauthorized", {
                status: 401,
            });
        }

        if (!userId) {
            return new NextResponse("User ID is required", {
                status: 400,
            });
        }

        if (!eventTypeRaw || !(eventTypeRaw in EVENT_TYPE)) {
            return new NextResponse("Invalid event type", { status: 400 });
        }

        if (eventTypeRaw === EVENT_TYPE.FOLLOW) {
            const userFollow = await db.query.users.findFirst({
                where: eq(users.id, userId),
            });

            if (!userFollow) {
                return new NextResponse("User not found", {
                    status: 401,
                });
            }

            const existingFollower = await db.query.followers.findFirst({
                where: and(eq(followers.followerId, user.id), eq(followers.followingId, userId)),
            });

            if (existingFollower) {
                return new NextResponse("You are already following this user", {
                    status: 400,
                });
            }

            const existingFollowBack = await db.query.followers.findFirst({
                where: and(eq(followers.followerId, userId), eq(followers.followingId, user.id)),
            });

            if (existingFollowBack) {
                return new NextResponse("The user is already following you, no back-follow allowed", {
                    status: 400,
                });
            }

            await db.insert(followers).values({
                followerId: user.id,
                followingId: userId,
            });

            return NextResponse.json({ message: "User followed successfully" });
        }

        if (eventTypeRaw === EVENT_TYPE.UN_FOLLOW) {
            const existingFollower = await db.query.followers.findFirst({
                where: and(eq(followers.followerId, user.id), eq(followers.followingId, userId)),
            });

            if (!existingFollower) {
                return new NextResponse("You are not following this user", { status: 400 });
            }

            await db.delete(followers).where(and(eq(followers.followerId, user.id), eq(followers.followingId, userId)));

            return NextResponse.json({ message: "User unfollowed successfully" });
        }

        return new NextResponse("Invalid event type", { status: 400 });
    } catch (error) {
        console.error("[FOLLOW_UNFOLLOW_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
