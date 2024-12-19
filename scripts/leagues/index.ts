import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL ?? "");

const db = drizzle(sql, { schema });

export const leagues = async () => {
    try {
        await db.insert(schema.leagues).values([
            {
                id: 1,
                name: "Bronze",
                order: 1,
                imageSrc: "https://d35aaqx5ub95lt.cloudfront.net/images/leagues/838ba65643baef4c8442317df514cab5.svg",
            },
            {
                id: 2,
                name: "Silver",
                order: 2,
                imageSrc: "https://d35aaqx5ub95lt.cloudfront.net/images/leagues/968f56b566887d7718898cf8b5e74f40.svg",
            },
            {
                id: 3,
                name: "Gold",
                order: 3,
                imageSrc: "https://d35aaqx5ub95lt.cloudfront.net/images/leagues/80fecb328c5aefd400db229794fd7a08.svg",
            },
            {
                id: 4,
                name: "Sapphire",
                order: 4,
                imageSrc: "https://d35aaqx5ub95lt.cloudfront.net/images/leagues/3ced84eb1f0274ec0f02b24ae6e3d29b.svg",
            },
        ]);
    } catch (error) {
        console.error(error);
    }
};
