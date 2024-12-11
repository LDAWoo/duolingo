import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL ?? "");

const db = drizzle(sql, { schema });

const challenge = async () => {
    // level 3
    await db.insert(schema.challenges).values([
        {
            id: 31,
            leverId: 3,
            type: "SELECT",
            question: "Đâu là 'đường'?",
            order: 1,
        },
        {
            id: 32,
            leverId: 3,
            type: "MATCH",
            question: "With sugar?",
            order: 2,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/lilyen/661c913117401248c215766479431803",
        },
        {
            id: 33,
            leverId: 3,
            type: "MATCH",
            question: "No!",
            order: 3,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/vikramen/d4c88ef5888cb1df3e21a54e07856c8e",
        },
        {
            id: 34,
            leverId: 3,
            type: "LISTEN",
            order: 4,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/beaen/aab0214dfc976206ac9de63758169075",
        },
        {
            id: 35,
            leverId: 3,
            type: "LISTEN",
            order: 5,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/beaen/d8b0270363319269a3dea168b5b924c8",
        },
        {
            id: 36,
            leverId: 3,
            type: "MATCH",
            question: "No, thanks.",
            order: 6,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/falstaffen/4ebd488a0efa8cdd66f58e2bde7f12fd",
        },
        {
            id: 37,
            leverId: 3,
            type: "MATCH",
            order: 7,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/d33b744cfa2dda09ab711eb23380b030",
        },
        {
            id: 38,
            leverId: 3,
            type: "MATCH",
            question: "No, water thanks.",
            order: 8,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/linen/e1646714e69e2e146b435d80e57fe82a",
        },
        {
            id: 39,
            leverId: 3,
            type: "MATCH",
            question: "Good evening!",
            order: 9,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/zarien/0fa6e5e2affcd9b221ee7f63dd875d5b",
        },
        {
            id: 40,
            leverId: 3,
            type: "MATCH",
            order: 10,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/41c7ad5d566fd0f7e66df4a409c5ae56",
        },
        {
            id: 41,
            leverId: 3,
            type: "MATCH",
            order: 11,
            question: "Good evening, Ben!",
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/vikramen/8f3e46bbb9d676e2c02d1f1c55488f12",
        },
        {
            id: 42,
            leverId: 3,
            type: "MATCH",
            order: 12,
            question: "Tea or coffee?",
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/oscaren/a455430c55b10d17f2da7abc0f6d6ad7",
        },
        {
            id: 43,
            leverId: 3,
            type: "MATCH",
            order: 13,
            question: "Với đường?",
        },
        {
            id: 44,
            leverId: 3,
            type: "MATCH",
            order: 14,
            question: "Trà hay cà phê?",
        },
        {
            id: 45,
            leverId: 3,
            type: "MATCH",
            order: 15,
            question: "Sữa hay nước?",
        },
    ]);
};

const challengeOptions = async () => {
    // challenge 31
    await db.insert(schema.challengeOptions).values([
        {
            challengeId: 31,
            text: "coffee",
            correct: false,
            imageSrc: "https://d2pur3iezf4d1j.cloudfront.net/images/6fd84b8a838c43c4a84b44b08b10177e",
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/5c4b35c4e7a5d8b8d32fb1e9d1fff6d3",
        },
        {
            challengeId: 31,
            text: "sugar",
            correct: true,
            imageSrc: "https://d2pur3iezf4d1j.cloudfront.net/images/72529140fa35af37c56e0a20f1fbe2a8",
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/linen/b96e8894ad4fca2c089098c0792bd3f8",
        },
        {
            challengeId: 31,
            text: "milk",
            correct: false,
            imageSrc: "https://d2pur3iezf4d1j.cloudfront.net/images/645fa42dcea02c7e2970a1285e321562",
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/d66a0d5b3c279d4f245a91f297d610d6",
        },
    ]);

    // challenge 34
    await db.insert(schema.challengeOptions).values([
        {
            challengeId: 34,
            text: "far",
            correct: false,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/beaen/47fc9ea9111b2aa80e88f607745d8555",
        },
        {
            challengeId: 34,
            text: "for",
            correct: true,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/beaen/aab0214dfc976206ac9de63758169075",
        },
    ]);

    // challenge 35
    await db.insert(schema.challengeOptions).values([
        {
            challengeId: 35,
            text: "like",
            correct: false,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/beaen/631f71cdb0c356e64f50c556884b8e4d",
        },
        {
            challengeId: 35,
            text: "look",
            correct: true,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/beaen/d8b0270363319269a3dea168b5b924c8",
        },
    ]);
};

const challengeParts = async () => {
    // challenge 32
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 32,
            text: "Với",
            correct: true,
            order: 1,
        },
        {
            challengeId: 32,
            text: "đường",
            correct: true,
            order: 2,
        },
        {
            challengeId: 32,
            text: "ơn",
            correct: false,
            order: 3,
        },
        {
            challengeId: 32,
            text: "hay",
            correct: false,
            order: 4,
        },
        {
            challengeId: 32,
            text: "buổi",
            correct: false,
            order: 5,
        },
        {
            challengeId: 32,
            text: "phê",
            correct: false,
            order: 6,
        },
    ]);

    // challenge 33
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 33,
            text: "Không",
            correct: true,
            order: 1,
        },
        {
            challengeId: 33,
            text: "trà",
            correct: false,
            order: 2,
        },
        {
            challengeId: 33,
            text: "ơn",
            correct: false,
            order: 3,
        },
        {
            challengeId: 33,
            text: "nước",
            correct: false,
            order: 4,
        },
        {
            challengeId: 33,
            text: "lòng",
            correct: false,
            order: 5,
        },
    ]);

    // challenge 36
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 36,
            text: "Không",
            correct: true,
            order: 1,
        },
        {
            challengeId: 36,
            text: "cảm",
            correct: true,
            order: 2,
        },
        {
            challengeId: 36,
            text: "ơn",
            correct: true,
            order: 3,
        },
        {
            challengeId: 36,
            text: "với",
            correct: false,
            order: 4,
        },
        {
            challengeId: 36,
            text: "Chào",
            correct: false,
            order: 5,
        },
        {
            challengeId: 36,
            text: "vui",
            correct: false,
            order: 6,
        },
        {
            challengeId: 36,
            text: "đường",
            correct: false,
            order: 7,
        },
    ]);

    // challenge 37
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 37,
            text: "No",
            correct: true,
            order: 1,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/9fdbb4ede9f6e6fd7908138701eef163",
        },
        {
            challengeId: 37,
            text: "thanks",
            correct: true,
            order: 2,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/ccc1f7421eceb64681c92a1406505700",
        },
        {
            challengeId: 37,
            text: "Duo",
            correct: true,
            order: 3,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/e4c60c2bf4dd6e4828bdb3946ba8933e",
        },
        {
            challengeId: 37,
            text: "yes",
            correct: false,
            order: 4,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/8eff9a0dc6c96cd19937a7c4c995c133",
        },
        {
            challengeId: 37,
            text: "hello",
            correct: false,
            order: 5,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/68544a04ae4502ac014342338234ebd4",
        },
        {
            challengeId: 37,
            text: "with",
            correct: false,
            order: 6,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/b84ee9160385ed21eda005798a10cb1d",
        },
        {
            challengeId: 37,
            text: "milk",
            correct: false,
            order: 7,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/d66a0d5b3c279d4f245a91f297d610d6",
        },
    ]);

    // challenge 38
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 38,
            text: "Không",
            correct: true,
            order: 1,
        },
        {
            challengeId: 38,
            text: "nước",
            correct: true,
            order: 2,
        },
        {
            challengeId: 38,
            text: "cảm",
            correct: true,
            order: 3,
        },
        {
            challengeId: 38,
            text: "ơn",
            correct: true,
            order: 4,
        },
        {
            challengeId: 38,
            text: "hay",
            correct: false,
            order: 5,
        },
        {
            challengeId: 38,
            text: "tối",
            correct: false,
            order: 6,
        },
        {
            challengeId: 38,
            text: "cà",
            correct: false,
            order: 7,
        },
        {
            challengeId: 38,
            text: "vui",
            correct: false,
            order: 8,
        },
    ]);

    // challenge 39
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 39,
            text: "Chào",
            correct: true,
            order: 1,
        },
        {
            challengeId: 39,
            text: "buổi",
            correct: true,
            order: 2,
        },
        {
            challengeId: 39,
            text: "tối",
            correct: true,
            order: 3,
        },
        {
            challengeId: 39,
            text: "ơn",
            correct: false,
            order: 4,
        },
        {
            challengeId: 39,
            text: "trà",
            correct: false,
            order: 5,
        },
        {
            challengeId: 39,
            text: "Vâng",
            correct: false,
            order: 6,
        },
        {
            challengeId: 39,
            text: "hay",
            correct: false,
            order: 7,
        },
        {
            challengeId: 39,
            text: "lòng",
            correct: false,
            order: 8,
        },
    ]);

    // challenge 40
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 40,
            text: "Good",
            correct: true,
            order: 1,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/7e78cc7afc85500773e389272fc7a63b",
        },
        {
            challengeId: 40,
            text: "evening",
            correct: true,
            order: 2,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/fbfb5151f4afa15f708550c8ef8ed19d",
        },
        {
            challengeId: 40,
            text: "tea",
            correct: true,
            order: 3,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/030ecb79383537aef91c4351722bf5bd",
        },
        {
            challengeId: 40,
            text: "please",
            correct: true,
            order: 4,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/48f829ed57b69aea7e873c4228ae7a24",
        },
        {
            challengeId: 40,
            text: "water",
            correct: false,
            order: 5,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/478b633dfd3118616569c46fe39d4197",
        },
        {
            challengeId: 40,
            text: "with",
            correct: false,
            order: 6,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/1b850880d1a90a8c7262b2c0ddf80359",
        },
        {
            challengeId: 40,
            text: "coffee",
            correct: false,
            order: 7,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/5132582196725fca0d6a34ce5661cc3e",
        },
        {
            challengeId: 40,
            text: "hello",
            correct: false,
            order: 8,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/1d65e941c0b68b2ca7755a1383a92db1",
        },
    ]);

    // challenge 41
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 41,
            text: "Chào",
            correct: true,
            order: 1,
        },
        {
            challengeId: 41,
            text: "buổi",
            correct: true,
            order: 2,
        },
        {
            challengeId: 41,
            text: "tối",
            correct: true,
            order: 3,
        },
        {
            challengeId: 41,
            text: "Ben",
            correct: true,
            order: 4,
        },
        {
            challengeId: 41,
            text: "trà",
            correct: false,
            order: 5,
        },
        {
            challengeId: 41,
            text: "lòng",
            correct: false,
            order: 6,
        },
        {
            challengeId: 41,
            text: "hay",
            correct: false,
            order: 7,
        },
        {
            challengeId: 41,
            text: "Không",
            correct: false,
            order: 8,
        },
    ]);

    // challenge 42
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 42,
            text: "Trà",
            correct: true,
            order: 1,
        },
        {
            challengeId: 42,
            text: "hay",
            correct: true,
            order: 2,
        },
        {
            challengeId: 42,
            text: "cà",
            correct: true,
            order: 3,
        },
        {
            challengeId: 42,
            text: "phê",
            correct: true,
            order: 4,
        },
        {
            challengeId: 42,
            text: "Chào",
            correct: false,
            order: 5,
        },
        {
            challengeId: 42,
            text: "nước",
            correct: false,
            order: 6,
        },
        {
            challengeId: 42,
            text: "tối",
            correct: false,
            order: 7,
        },
        {
            challengeId: 42,
            text: "đường",
            correct: false,
            order: 8,
        },
    ]);

    // challenge 43
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 43,
            text: "With",
            correct: true,
            order: 1,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/1b850880d1a90a8c7262b2c0ddf80359",
        },
        {
            challengeId: 43,
            text: "sugar",
            correct: true,
            order: 2,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/linen/b96e8894ad4fca2c089098c0792bd3f8",
        },
        {
            challengeId: 43,
            text: "no",
            correct: false,
            order: 3,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/vikramen/d4c88ef5888cb1df3e21a54e07856c8e",
        },
        {
            challengeId: 43,
            text: "or",
            correct: false,
            order: 4,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/beaen/5ca6b92e61079c4b6172420e4dff2585",
        },
        {
            challengeId: 43,
            text: "yes",
            correct: false,
            order: 5,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/8eff9a0dc6c96cd19937a7c4c995c133",
        },
        {
            challengeId: 43,
            text: "good morning",
            correct: false,
            order: 7,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/beaen/fb43b0db314cf10d2044b166f6406514",
        },
    ]);

    // challenge 44
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 44,
            text: "Tea",
            correct: true,
            order: 1,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/beaen/c61275f591b9ca5f6de11f9276eb3747",
        },
        {
            challengeId: 44,
            text: "or",
            correct: true,
            order: 2,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/beaen/5ca6b92e61079c4b6172420e4dff2585",
        },
        {
            challengeId: 44,
            text: "coffee",
            correct: true,
            order: 3,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/beaen/2e8cd78e30e51c6643beafb84602f13c",
        },
        {
            challengeId: 44,
            text: "good morning",
            correct: false,
            order: 4,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/beaen/fb43b0db314cf10d2044b166f6406514",
        },
        {
            challengeId: 44,
            text: "hello",
            correct: false,
            order: 5,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/beaen/9111c46a57e389e6de050bfac34719cb",
        },
        {
            challengeId: 44,
            text: "milk",
            correct: false,
            order: 6,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/beaen/980d25e143974fe1ccd2e1dea453eea6",
        },
        {
            challengeId: 44,
            text: "thanks",
            correct: false,
            order: 7,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/beaen/aa236487c6e38ba0a359df399cd7306e",
        },
    ]);

    // challenge 45
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 45,
            text: "Milk",
            correct: true,
            order: 1,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/oscaren/9213215fb4f08d46a6def69367328f45",
        },
        {
            challengeId: 45,
            text: "or",
            correct: true,
            order: 2,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/beaen/5ca6b92e61079c4b6172420e4dff2585",
        },
        {
            challengeId: 45,
            text: "water",
            correct: true,
            order: 3,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/oscaren/0e11ab23551016b7f3ccfdbdb0d75e50",
        },
        {
            challengeId: 45,
            text: "good morning",
            correct: false,
            order: 4,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/oscaren/92c820e82830bf0679813fa5d768e41e",
        },
        {
            challengeId: 45,
            text: "coffee",
            correct: false,
            order: 5,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/5132582196725fca0d6a34ce5661cc3e",
        },
        {
            challengeId: 45,
            text: "no",
            correct: false,
            order: 6,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/oscaren/5c52b607a78fed1a748e641d5eadc54a",
        },
        {
            challengeId: 45,
            text: "thanks",
            correct: false,
            order: 7,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/oscaren/9e330ba4197c0fb3d09a305643fe6b16",
        },
    ]);
};

export const level3 = async () => {
    try {
        await challenge();
        await challengeOptions();
        await challengeParts();
    } catch (error) {
        console.log(error);
    }
};
