"use server";

import db from "@/db/drizzle";
import { leagues } from "@/db/schema";

export const getLeagues = async () => {
    try {
        const leagueData = await db
            .select({
                id: leagues.id,
                name: leagues.name,
                imageSrc: leagues.imageSrc,
            })
            .from(leagues)
            .orderBy(leagues.order);

        return leagueData;
    } catch (error) {
        console.error("Error fetching leagues:", error);
    }
};
