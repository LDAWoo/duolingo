import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL ?? "");

const db = drizzle(sql, { schema });

const challenge = async () => {
    // level 4
    await db.insert(schema.challenges).values([
        {
            id: 46,
            leverId: 4,
            type: "ASSIST",
            question: "sữa",
            order: 1,
        },
        {
            id: 47,
            leverId: 4,
            type: "MATCH",
            question: "water and tea",
            order: 2,
        },
        {
            id: 48,
            leverId: 4,
            type: "FILL",
            question: "{{blank}} with sugar or milk?",
            order: 3,
            imageSrc: "https://d2pur3iezf4d1j.cloudfront.net/images/90a5d27bbc7151d4f74396eb979fdfba",
        },
    ]);
};

const challengeOptions = async () => {
    // challenge 46
    await db.insert(schema.challengeOptions).values([
        {
            challengeId: 46,
            text: "water",
            correct: false,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/eddyen/677d36ebdf487c0a934ce8adb6ea7c4f",
        },
        {
            challengeId: 46,
            text: "milk",
            correct: true,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/eddyen/acc8109446679686e7b78dfc9a21d14b",
        },
        {
            challengeId: 46,
            text: "tea",
            correct: false,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/eddyen/583f299988a289dc687a96665bfeecdb",
        },
    ]);
};

const challengeParts = async () => {
    // challenge 47
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 47,
            text: "nước",
            correct: true,
            order: 1,
        },
        {
            challengeId: 47,
            text: "và",
            correct: true,
            order: 2,
        },
        {
            challengeId: 47,
            text: "trà",
            correct: true,
            order: 3,
        },
        {
            challengeId: 47,
            text: "cà phê",
            correct: false,
            order: 4,
        },
        {
            challengeId: 47,
            text: "phê",
            correct: false,
            order: 5,
        },
        {
            challengeId: 47,
            text: "cà",
            correct: false,
            order: 6,
        },
        {
            challengeId: 47,
            text: "Xin",
            correct: false,
            order: 7,
        },
    ]);

    // challenge 48
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 48,
            text: "Coffee",
            correct: true,
            order: 1,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/5b6b4358bca99b207013a012c3a54a46",
        },
        {
            challengeId: 48,
            text: "Yes",
            correct: false,
            order: 2,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/2a0367a15143e688dacbba69d648a4dc",
        },
        {
            challengeId: 48,
            text: "Hello",
            correct: false,
            order: 3,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/58f7a6a4a8fb8f9639bcaf963e6b8cd4",
        },
        {
            challengeId: 48,
            text: "And",
            correct: false,
            order: 4,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/833336c6af25130676e64fcdb6a31624",
        },
    ]);
};

export const level4 = async () => {
    try {
        await challenge();
        await challengeOptions();
        await challengeParts();
    } catch (error) {
        console.log(error);
    }
};
