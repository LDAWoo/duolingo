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
        {
            id: 49,
            leverId: 4,
            type: "MATCH",
            question: "coffee and water",
            order: 4,
        },
        {
            id: 50,
            leverId: 4,
            type: "FILL",
            question: "No, water {{blank}}!",
            order: 5,
            imageSrc: "https://d2pur3iezf4d1j.cloudfront.net/images/a92d7bc5d6148af01a60ae20e70587d7",
        },
        {
            id: 51,
            leverId: 4,
            type: "MATCH",
            question: "tea, water",
            order: 6,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/oscaren/25b900c035807eb8131febd244d6c993",
        },
        {
            id: 52,
            leverId: 4,
            type: "MATCH",
            question: "water, tea",
            order: 7,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/linen/64a9de35ef24d4c279f77fd6804103a4",
        },
        {
            id: 53,
            leverId: 4,
            type: "MATCH",
            order: 8,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/c77c7d437aba25aa9cddaa56b3b12e1e",
        },
        {
            id: 54,
            leverId: 4,
            type: "MATCH",
            order: 9,
            question: "Tea with sugar, please.",
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/oscaren/d1b18e82a0796172cd9d5fdbee922819",
        },
        {
            id: 55,
            leverId: 4,
            type: "MATCH",
            order: 10,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/176096419461af6e7d66a313d8d64e9c",
        },
        {
            id: 56,
            leverId: 4,
            type: "CONVERSATION",
            order: 11,
            question: "Good morning!",
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/eddyen/bc8fa884446ee5e195f2b59af2e8ed74",
        },
        {
            id: 57,
            leverId: 4,
            type: "MATCH",
            order: 12,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/98150eebb14ef3aae2aec1c0c5e6f30f",
        },
        {
            id: 58,
            leverId: 4,
            type: "CONVERSATION",
            order: 13,
            question: "Good morning, Lisa!",
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/linen/d30acba6bd8b55ab60341247b551ee67",
        },
        {
            id: 59,
            leverId: 4,
            type: "MATCH",
            order: 14,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/024a0abaabb4a7a8371483b94a37387d",
        },
        {
            id: 60,
            leverId: 4,
            type: "FILL",
            question: "No, {{blank}} sugar, thanks.",
            order: 15,
            imageSrc: "https://d2pur3iezf4d1j.cloudfront.net/images/71561d34dfbdac9fa32b04135eea6781",
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

    // challenge 56
    await db.insert(schema.challengeOptions).values([
        {
            challengeId: 56,
            text: "With milk, thanks.",
            correct: false,
        },
        {
            challengeId: 56,
            text: "Good morning, Ben!",
            correct: true,
        },
    ]);

    // challenge 58
    await db.insert(schema.challengeOptions).values([
        {
            challengeId: 58,
            text: "Good morning!",
            correct: true,
        },
        {
            challengeId: 58,
            text: "Yes, please!",
            correct: false,
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

    // challenge 49
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 49,
            text: "cà",
            correct: true,
            order: 1,
        },
        {
            challengeId: 49,
            text: "phê",
            correct: true,
            order: 2,
        },
        {
            challengeId: 49,
            text: "và",
            correct: true,
            order: 3,
        },
        {
            challengeId: 49,
            text: "nước",
            correct: true,
            order: 4,
        },
        {
            challengeId: 49,
            text: "chào",
            correct: false,
            order: 5,
        },
        {
            challengeId: 49,
            text: "trà",
            correct: false,
            order: 6,
        },
        {
            challengeId: 49,
            text: "sữa",
            correct: false,
            order: 7,
        },
        {
            challengeId: 49,
            text: "Xin",
            correct: false,
            order: 8,
        },
    ]);

    // challenge 50
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 50,
            text: "please",
            correct: true,
            order: 1,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/418800edd9afc7e8fa4c950f61b93c38",
        },
        {
            challengeId: 50,
            text: "and",
            correct: false,
            order: 2,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/3642ddb2554e44e12cf7136989720ec6",
        },
        {
            challengeId: 50,
            text: "or",
            correct: false,
            order: 3,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/1c36047f68278858756e0e31b65f2d86",
        },
        {
            challengeId: 50,
            text: "with",
            correct: false,
            order: 4,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/b84ee9160385ed21eda005798a10cb1d",
        },
    ]);

    // challenge 51
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 51,
            text: "trà",
            correct: true,
            order: 1,
        },
        {
            challengeId: 51,
            text: "nước",
            correct: true,
            order: 2,
        },
        {
            challengeId: 51,
            text: "sữa",
            correct: false,
            order: 3,
        },
        {
            challengeId: 51,
            text: "phê",
            correct: false,
            order: 4,
        },
        {
            challengeId: 51,
            text: "cà",
            correct: false,
            order: 5,
        },
        {
            challengeId: 51,
            text: "Xin",
            correct: false,
            order: 6,
        },
    ]);

    // challenge 52
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 52,
            text: "nước",
            correct: true,
            order: 1,
        },
        {
            challengeId: 52,
            text: "trà",
            correct: true,
            order: 2,
        },
        {
            challengeId: 52,
            text: "sữa",
            correct: false,
            order: 3,
        },
        {
            challengeId: 52,
            text: "phê",
            correct: false,
            order: 4,
        },
        {
            challengeId: 52,
            text: "cà",
            correct: false,
            order: 5,
        },
        {
            challengeId: 52,
            text: "Xin",
            correct: false,
            order: 6,
        },
    ]);

    // challenge 53
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 53,
            text: "No",
            correct: true,
            order: 1,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/47ebcf943e28ccc6f55ba45a47504dd5",
        },
        {
            challengeId: 53,
            text: "with",
            correct: true,
            order: 2,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/b84ee9160385ed21eda005798a10cb1d",
        },
        {
            challengeId: 53,
            text: "sugar",
            correct: true,
            order: 3,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/f874fb5e233c75cb93d9224d658d77ac",
        },
        {
            challengeId: 53,
            text: "thanks",
            correct: true,
            order: 4,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/27ff88c881bc27bfd1f50c0a47da2012",
        },
        {
            challengeId: 53,
            text: "good evening",
            correct: false,
            order: 5,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/f7182ac76e6817b39c73d6dee3292339",
        },
        {
            challengeId: 53,
            text: "Tea",
            correct: false,
            order: 6,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/030ecb79383537aef91c4351722bf5bd",
        },
        {
            challengeId: 53,
            text: "water",
            correct: false,
            order: 7,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/478b633dfd3118616569c46fe39d4197",
        },
        {
            challengeId: 53,
            text: "or",
            correct: false,
            order: 8,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/1c36047f68278858756e0e31b65f2d86",
        },
    ]);

    // challenge 54
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 54,
            text: "Vui",
            correct: true,
            order: 1,
        },
        {
            challengeId: 54,
            text: "lòng",
            correct: true,
            order: 2,
        },
        {
            challengeId: 54,
            text: "cho",
            correct: true,
            order: 3,
        },
        {
            challengeId: 54,
            text: "trà",
            correct: true,
            order: 4,
        },
        {
            challengeId: 54,
            text: "với",
            correct: true,
            order: 5,
        },
        {
            challengeId: 54,
            text: "đường",
            correct: true,
            order: 6,
        },
        {
            challengeId: 54,
            text: "cà phê",
            correct: false,
            order: 7,
        },
        {
            challengeId: 54,
            text: "Chào",
            correct: false,
            order: 8,
        },
        {
            challengeId: 54,
            text: "Không",
            correct: false,
            order: 9,
        },
        {
            challengeId: 54,
            text: "Vâng",
            correct: false,
            order: 10,
        },
    ]);

    // challenge 55
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 55,
            text: "Milk",
            correct: true,
            order: 1,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/47ebcf943e28ccc6f55ba45a47504dd5",
        },
        {
            challengeId: 55,
            text: "or",
            correct: true,
            order: 2,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/2a0367a15143e688dacbba69d648a4dc",
        },
        {
            challengeId: 55,
            text: "water",
            correct: true,
            order: 3,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/478b633dfd3118616569c46fe39d4197",
        },
        {
            challengeId: 55,
            text: "and",
            correct: false,
            order: 4,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/55db7471f85413aea462d10d6ecb80f4",
        },
        {
            challengeId: 55,
            text: "yes",
            correct: false,
            order: 5,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/fee0675ca39034b0b806526c84c7455a",
        },
        {
            challengeId: 55,
            text: "please",
            correct: false,
            order: 6,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/48f829ed57b69aea7e873c4228ae7a24",
        },
        {
            challengeId: 55,
            text: "no",
            correct: false,
            order: 7,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/vikramen/d4c88ef5888cb1df3e21a54e07856c8e",
        },
    ]);

    // challenge 57
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 57,
            text: "Yes",
            correct: true,
            order: 1,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/8eff9a0dc6c96cd19937a7c4c995c133",
        },
        {
            challengeId: 57,
            text: "coffee",
            correct: true,
            order: 2,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/5c4b35c4e7a5d8b8d32fb1e9d1fff6d3",
        },
        {
            challengeId: 57,
            text: "with",
            correct: true,
            order: 3,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/b84ee9160385ed21eda005798a10cb1d",
        },
        {
            challengeId: 57,
            text: "milk",
            correct: true,
            order: 4,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/d66a0d5b3c279d4f245a91f297d610d6",
        },
        {
            challengeId: 57,
            text: "please",
            correct: true,
            order: 5,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/48f829ed57b69aea7e873c4228ae7a24",
        },
        {
            challengeId: 57,
            text: "water",
            correct: false,
            order: 6,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/478b633dfd3118616569c46fe39d4197",
        },
        {
            challengeId: 57,
            text: "good evening",
            correct: false,
            order: 7,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/42d9e5b77fc292068f5263471da87a97",
        },
        {
            challengeId: 57,
            text: "sugar",
            correct: false,
            order: 8,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/f874fb5e233c75cb93d9224d658d77ac",
        },
        {
            challengeId: 57,
            text: "no",
            correct: false,
            order: 9,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/vikramen/d4c88ef5888cb1df3e21a54e07856c8e",
        },
    ]);

    // challenge 59
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 59,
            text: "No",
            correct: true,
            order: 1,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/vikramen/d4c88ef5888cb1df3e21a54e07856c8e",
        },
        {
            challengeId: 59,
            text: "coffee",
            correct: true,
            order: 2,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/5c4b35c4e7a5d8b8d32fb1e9d1fff6d3",
        },
        {
            challengeId: 59,
            text: "with",
            correct: true,
            order: 3,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/b84ee9160385ed21eda005798a10cb1d",
        },
        {
            challengeId: 59,
            text: "milk",
            correct: true,
            order: 4,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/d66a0d5b3c279d4f245a91f297d610d6",
        },
        {
            challengeId: 59,
            text: "please",
            correct: true,
            order: 5,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/48f829ed57b69aea7e873c4228ae7a24",
        },
        {
            challengeId: 59,
            text: "water",
            correct: false,
            order: 6,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/478b633dfd3118616569c46fe39d4197",
        },
        {
            challengeId: 59,
            text: "yes",
            correct: false,
            order: 7,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/8eff9a0dc6c96cd19937a7c4c995c133",
        },
        {
            challengeId: 59,
            text: "thanks",
            correct: false,
            order: 8,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/ccc1f7421eceb64681c92a1406505700",
        },
        {
            challengeId: 59,
            text: "and",
            correct: false,
            order: 9,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/3642ddb2554e44e12cf7136989720ec6",
        },
    ]);

    // challenge 60
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 60,
            text: "with",
            correct: true,
            order: 1,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/b84ee9160385ed21eda005798a10cb1d",
        },
        {
            challengeId: 60,
            text: "water",
            correct: false,
            order: 2,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/478b633dfd3118616569c46fe39d4197",
        },
        {
            challengeId: 60,
            text: "yes",
            correct: false,
            order: 3,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/fee0675ca39034b0b806526c84c7455a",
        },

        {
            challengeId: 60,
            text: "hello",
            correct: false,
            order: 4,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/1d65e941c0b68b2ca7755a1383a92db1",
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
