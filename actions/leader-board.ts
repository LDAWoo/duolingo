"use sever";

import db from "@/db/drizzle";
import { leaderboards } from "@/db/schema";
import { currentUser } from "@/lib/current-user";
import { Leaderboard } from "@/lib/types";
import { eq, sql } from "drizzle-orm";

export const getLeaderboard = async () => {
    try {
        const user = await currentUser();

        if (!user) {
            return null;
        }

        const userId = user.id;

        const [currentUserLeaderboard] = await db
            .select({
                leagueId: leaderboards.leagueId,
            })
            .from(leaderboards)
            .where(eq(leaderboards.userId, userId))
            .limit(1);

        if (!currentUserLeaderboard) {
            return null;
        }

        const { leagueId } = currentUserLeaderboard;

        if (!leagueId) return null;

        const leagueWithUsers = await db.execute(
            sql`
                WITH ranked_users AS (
                    SELECT 
                        users.username,
                        users.display_name AS "displayName",
                        leaderboards.score,
                        users.id AS "userId",
                        users.image_src AS "avatarUrl"
                    FROM leaderboards
                    INNER JOIN users ON leaderboards.user_id = users.id
                    WHERE leaderboards.league_id = ${leagueId}
                    ORDER BY leaderboards.score DESC 
                    LIMIT 30 
                )
                SELECT 
                    leagues.id AS "leagueId",
                    leagues.name AS "leagueName",
                    leagues.image_src AS "leagueSrc",
                    json_agg(
                        json_build_object(
                            'username', ranked_users.username,
                            'displayName', ranked_users."displayName",
                            'score', ranked_users.score,
                            'userId', ranked_users."userId",
                            'avatarUrl', ranked_users."avatarUrl"
                        )
                    ) AS ranks
                FROM leagues
                LEFT JOIN ranked_users ON true 
                WHERE leagues.id = ${leagueId}
                GROUP BY leagues.id
                LIMIT 1;
            `
        );

        if (!leagueWithUsers.rows || leagueWithUsers.rows.length === 0) {
            return null;
        }

        return leagueWithUsers.rows[0] as Leaderboard;
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        throw new Error("Failed to fetch leaderboard");
    }
};
