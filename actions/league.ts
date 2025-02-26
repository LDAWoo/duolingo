"use server";

import db from "@/db/drizzle";
import { leagues } from "@/db/schema";

export const getLeagues = async () => {
    const leagueData = await db
        .select({
            id: leagues.id,
            name: leagues.name,
            imageSrc: leagues.imageSrc,
        })
        .from(leagues)
        .orderBy(leagues.order);

    return leagueData;
};
