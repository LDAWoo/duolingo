import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL ?? "");

const db = drizzle(sql, { schema });

const challenge = async () => {
    // level 2
    await db.insert(schema.challenges).values([
        {
            id: 16,
            leverId: 2,
            type: "SELECT",
            question: "Đâu là 'sữa'?",
            order: 1,
        },
        {
            id: 17,
            leverId: 2,
            type: "ASSIST",
            question: "Sữa",
            order: 2,
        },
        {
            id: 18,
            leverId: 2,
            type: "MATCH",
            question: "Yes",
            order: 3,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/falstaffen/7dc95c57e230126b6ede44408266cec0",
        },
        {
            id: 19,
            leverId: 2,
            type: "LISTEN",
            order: 4,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/beaen/c3c77d3c4adfcbe5b48b19f389e0437a",
        },
        {
            id: 20,
            leverId: 2,
            type: "LISTEN",
            order: 5,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/beaen/cade1260c3d501afe79016c0df31c00f",
        },
        {
            id: 21,
            leverId: 2,
            type: "MATCH",
            question: "Yes, please",
            order: 6,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/junioren/c18e27c63e7567d7891e03ad478cbf5a",
        },
        {
            id: 22,
            leverId: 2,
            type: "MATCH",
            order: 7,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/5d5025b803ae7f5f44a4caa5eea78da2",
        },
        {
            id: 23,
            leverId: 2,
            type: "MATCH",
            order: 8,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/junioren/c18e27c63e7567d7891e03ad478cbf5a",
        },
        {
            id: 24,
            leverId: 2,
            type: "MATCH",
            order: 9,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/06facfa07e26788c56a312bcfa996b57",
        },
        {
            id: 25,
            leverId: 2,
            type: "CONVERSATION",
            order: 10,
            question: "Good morning, Lisa",
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/oscaren/d69b6f71e5a1aef00057c8ff037a9bbc",
        },
        {
            id: 26,
            leverId: 2,
            type: "MATCH",
            order: 11,
            question: "Good morning, Ben",
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/oscaren/4e79a73faa84bce59dd6b72b17b8e210",
        },
        {
            id: 27,
            leverId: 2,
            type: "MATCH",
            order: 12,
            question: "Yes, with milk.",
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/linen/43bd48f6a457c8c3cfaeda1a02765c10",
        },
        {
            id: 28,
            leverId: 2,
            type: "MATCH",
            order: 13,
            question: "Vâng, vui lòng cho cà phê và sữa.",
        },
        {
            id: 29,
            leverId: 2,
            type: "MATCH",
            order: 14,
            question: "Vâng, với sữa",
        },
        {
            id: 30,
            leverId: 2,
            type: "MATCH",
            order: 15,
            question: "Vui lòng cho cà phê với sữa.",
        },
    ]);
};

const challengeOptions = async () => {
    // challenge 16
    await db.insert(schema.challengeOptions).values([
        {
            challengeId: 16,
            text: "tea",
            correct: false,
            imageSrc: "https://d2pur3iezf4d1j.cloudfront.net/images/18a521f1507cb86689faa5b2e8277703",
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/5a642b17f3d75eebbfcdb07b26327b6c",
        },
        {
            challengeId: 16,
            text: "water",
            correct: false,
            imageSrc: "https://d2pur3iezf4d1j.cloudfront.net/images/7afea32bcf0e8c6f9d446ad4aad416be",
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/478b633dfd3118616569c46fe39d4197",
        },
        {
            challengeId: 16,
            text: "milk",
            correct: true,
            imageSrc: "https://d2pur3iezf4d1j.cloudfront.net/images/645fa42dcea02c7e2970a1285e321562",
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/d66a0d5b3c279d4f245a91f297d610d6",
        },
    ]);

    // challenge 17
    await db.insert(schema.challengeOptions).values([
        {
            challengeId: 17,
            text: "milk",
            correct: true,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/d66a0d5b3c279d4f245a91f297d610d6",
        },
        {
            challengeId: 17,
            text: "tea",
            correct: false,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/5a642b17f3d75eebbfcdb07b26327b6c",
        },
        {
            challengeId: 17,
            text: "water",
            correct: false,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/478b633dfd3118616569c46fe39d4197",
        },
    ]);

    // challenge 19
    await db.insert(schema.challengeOptions).values([
        {
            challengeId: 19,
            text: "met",
            correct: false,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/beaen/2360370d6106861f7b8f66ceee446d45",
        },
        {
            challengeId: 19,
            text: "wet",
            correct: true,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/beaen/c3c77d3c4adfcbe5b48b19f389e0437a",
        },
    ]);

    // challenge 20
    await db.insert(schema.challengeOptions).values([
        {
            challengeId: 20,
            text: "by",
            correct: false,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/beaen/d5da82074434657ae50db2b12c4e4bfb",
        },
        {
            challengeId: 20,
            text: "my",
            correct: true,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/beaen/cade1260c3d501afe79016c0df31c00f",
        },
    ]);

    // challenge 25
    await db.insert(schema.challengeOptions).values([
        {
            challengeId: 25,
            text: "Yes, please!",
            correct: false,
        },
        {
            challengeId: 25,
            text: "Good morning!",
            correct: true,
        },
    ]);
};

const challengeParts = async () => {
    // challenge 18
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 18,
            text: "Vâng",
            correct: true,
            order: 1,
        },
        {
            challengeId: 18,
            text: "cà phê",
            correct: false,
            order: 2,
        },
        {
            challengeId: 18,
            text: "trà",
            correct: false,
            order: 3,
        },
        {
            challengeId: 18,
            text: "sữa",
            correct: false,
            order: 4,
        },
        {
            challengeId: 18,
            text: "nước",
            correct: false,
            order: 5,
        },
    ]);

    // challenge 21
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 21,
            text: "Vâng",
            correct: true,
            order: 1,
        },
        {
            challengeId: 21,
            text: "làm",
            correct: true,
            order: 2,
        },
        {
            challengeId: 21,
            text: "ơn",
            correct: true,
            order: 3,
        },
        {
            challengeId: 21,
            text: "lòng",
            correct: false,
            order: 4,
        },
        {
            challengeId: 21,
            text: "xin",
            correct: false,
            order: 5,
        },
        {
            challengeId: 21,
            text: "chào",
            correct: false,
            order: 6,
        },
        {
            challengeId: 21,
            text: "cà",
            correct: false,
            order: 7,
        },
    ]);

    // challenge 22
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 22,
            text: "Yes",
            correct: true,
            order: 1,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/8eff9a0dc6c96cd19937a7c4c995c133",
        },
        {
            challengeId: 22,
            text: "please",
            correct: true,
            order: 2,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/418800edd9afc7e8fa4c950f61b93c38",
        },
        {
            challengeId: 22,
            text: "coffee",
            correct: false,
            order: 3,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/5c4b35c4e7a5d8b8d32fb1e9d1fff6d3",
        },
        {
            challengeId: 22,
            text: "good evening",
            correct: false,
            order: 4,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/42d9e5b77fc292068f5263471da87a97",
        },
        {
            challengeId: 22,
            text: "thanks",
            correct: false,
            order: 5,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/ccc1f7421eceb64681c92a1406505700",
        },
        {
            challengeId: 22,
            text: "with",
            correct: false,
            order: 6,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/b84ee9160385ed21eda005798a10cb1d",
        },
    ]);

    // challenge 23
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 23,
            text: "Vâng",
            correct: true,
            order: 1,
        },
        {
            challengeId: 23,
            text: "làm",
            correct: true,
            order: 2,
        },
        {
            challengeId: 23,
            text: "ơn",
            correct: true,
            order: 3,
        },
        {
            challengeId: 23,
            text: "chào",
            correct: false,
            order: 4,
        },
        {
            challengeId: 23,
            text: "lòng",
            correct: false,
            order: 5,
        },
        {
            challengeId: 23,
            text: "cà phê",
            correct: false,
            order: 6,
        },
        {
            challengeId: 23,
            text: "sữa",
            correct: false,
            order: 7,
        },
    ]);

    // challenge 24
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 24,
            text: "Yes",
            correct: true,
            order: 1,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/fee0675ca39034b0b806526c84c7455a",
        },
        {
            challengeId: 24,
            text: "coffee",
            correct: true,
            order: 2,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/5c4b35c4e7a5d8b8d32fb1e9d1fff6d3",
        },

        {
            challengeId: 24,
            text: "please",
            correct: true,
            order: 3,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/48f829ed57b69aea7e873c4228ae7a24",
        },
        {
            challengeId: 24,
            text: "sugar",
            correct: false,
            order: 4,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/3606333d331a6b6a8591d76eea80c6ba",
        },
        {
            challengeId: 24,
            text: "good evening",
            correct: false,
            order: 5,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/f7182ac76e6817b39c73d6dee3292439",
        },
        {
            challengeId: 24,
            text: "good morning",
            correct: false,
            order: 6,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/09c2ea7867be89945a9e936bf22d4786",
        },
        {
            challengeId: 24,
            text: "milk",
            correct: false,
            order: 7,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/e6c3c757843138c8197b866a2ed814dd",
        },
    ]);

    // challenge 26
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 26,
            text: "Chào",
            correct: true,
            order: 1,
        },
        {
            challengeId: 26,
            text: "buổi",
            correct: true,
            order: 2,
        },
        {
            challengeId: 26,
            text: "sáng",
            correct: true,
            order: 3,
        },
        {
            challengeId: 26,
            text: "Ben",
            correct: true,
            order: 4,
        },
        {
            challengeId: 26,
            text: "sữa",
            correct: false,
            order: 5,
        },
        {
            challengeId: 26,
            text: "Vâng",
            correct: false,
            order: 6,
        },

        {
            challengeId: 26,
            text: "ơn",
            correct: false,
            order: 7,
        },
        {
            challengeId: 26,
            text: "làm",
            correct: false,
            order: 8,
        },
    ]);

    // challenge 27
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 27,
            text: "Vâng",
            correct: true,
            order: 1,
        },
        {
            challengeId: 27,
            text: "với",
            correct: true,
            order: 2,
        },
        {
            challengeId: 27,
            text: "sữa",
            correct: true,
            order: 3,
        },
        {
            challengeId: 27,
            text: "Xin",
            correct: false,
            order: 4,
        },
        {
            challengeId: 27,
            text: "lòng",
            correct: false,
            order: 5,
        },

        {
            challengeId: 27,
            text: "làm",
            correct: false,
            order: 6,
        },
        {
            challengeId: 27,
            text: "phê",
            correct: false,
            order: 7,
        },
    ]);

    // challenge 28
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 28,
            text: "Yes",
            correct: true,
            order: 1,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/zarien/05832eb0ac4abf3e2a2e4bc178ab20bf",
        },

        {
            challengeId: 28,
            text: "coffee",
            correct: true,
            order: 2,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/zarien/5c26d4d3b38b26d9df32616651b0d39a",
        },
        {
            challengeId: 28,
            text: "with",
            correct: true,
            order: 3,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/zarien/7105652c5d14d9750bd849431bcf1de2",
        },
        {
            challengeId: 28,
            text: "milk",
            correct: true,
            order: 4,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/linen/7e48fbca64200171990d38d7fca80e89",
        },
        {
            challengeId: 28,
            text: "please",
            correct: true,
            order: 5,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/zarien/8895161d551d975ca53bbedb58cdba34",
        },
        {
            challengeId: 28,
            text: "hello",
            correct: false,
            order: 6,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/zarien/52141b34f2b5eeb982cc4331b11a5155",
        },
        {
            challengeId: 28,
            text: "and",
            correct: false,
            order: 7,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/55db7471f85413aea462d10d6ecb80f4",
        },
        {
            challengeId: 28,
            text: "sugar",
            correct: false,
            order: 8,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/3606333d331a6b6a8591d76eea80c6ba",
        },
        {
            challengeId: 28,
            text: "good evening",
            correct: false,
            order: 9,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/zarien/0dedad8834a74c88332afbd9985fb22d",
        },
    ]);

    // challenge 29
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 29,
            text: "Yes",
            correct: true,
            order: 1,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/zarien/05832eb0ac4abf3e2a2e4bc178ab20bf",
        },
        {
            challengeId: 29,
            text: "with",
            correct: true,
            order: 2,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/zarien/7105652c5d14d9750bd849431bcf1de2",
        },
        {
            challengeId: 29,
            text: "milk",
            correct: true,
            order: 3,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/linen/7e48fbca64200171990d38d7fca80e89",
        },
        {
            challengeId: 29,
            text: "please",
            correct: false,
            order: 4,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/zarien/8895161d551d975ca53bbedb58cdba34",
        },
        {
            challengeId: 29,
            text: "good evening",
            correct: false,
            order: 5,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/zarien/0dedad8834a74c88332afbd9985fb22d",
        },
        {
            challengeId: 29,
            text: "coffee",
            correct: false,
            order: 6,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/zarien/5c26d4d3b38b26d9df32616651b0d39a",
        },
        {
            challengeId: 29,
            text: "thanks",
            correct: false,
            order: 7,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/zarien/dc05164c6c3306ad36e6aa164f58df94",
        },
    ]);

    // challenge 30
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 30,
            text: "Coffee",
            correct: true,
            order: 1,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/zarien/5c26d4d3b38b26d9df32616651b0d39a",
        },
        {
            challengeId: 30,
            text: "with",
            correct: true,
            order: 2,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/zarien/7105652c5d14d9750bd849431bcf1de2",
        },
        {
            challengeId: 30,
            text: "milk",
            correct: true,
            order: 3,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/linen/7e48fbca64200171990d38d7fca80e89",
        },
        {
            challengeId: 30,
            text: "please",
            correct: true,
            order: 4,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/zarien/8895161d551d975ca53bbedb58cdba34",
        },
        {
            challengeId: 30,
            text: "Yes",
            correct: false,
            order: 5,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/zarien/05832eb0ac4abf3e2a2e4bc178ab20bf",
        },
        {
            challengeId: 30,
            text: "water",
            correct: false,
            order: 6,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/478b633dfd3118616569c46fe39d4197",
        },

        {
            challengeId: 30,
            text: "and",
            correct: false,
            order: 7,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/55db7471f85413aea462d10d6ecb80f4",
        },
        {
            challengeId: 30,
            text: "sugar",
            correct: false,
            order: 8,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/3606333d331a6b6a8591d76eea80c6ba",
        },
    ]);
};

export const level2 = async () => {
    try {
        await challenge();
        await challengeOptions();
        await challengeParts();
    } catch (error) {
        console.log(error);
    }
};
