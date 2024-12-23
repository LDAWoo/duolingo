import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL ?? "");

const db = drizzle(sql, { schema });

const challenge = async () => {
    // level 1
    await db.insert(schema.challenges).values([
        {
            id: 1,
            leverId: 1,
            type: "SELECT",
            question: "Đâu là 'cà phê'?",
            order: 1,
        },
        {
            id: 2,
            leverId: 1,
            type: "SELECT",
            question: "Đâu là 'nước'?",
            order: 2,
        },
        {
            id: 3,
            leverId: 1,
            type: "SELECT",
            question: "Đâu là 'trà'?",
            order: 3,
        },
        {
            id: 4,
            leverId: 1,
            type: "ASSIST",
            question: "cà phê",
            order: 4,
        },
        {
            id: 5,
            leverId: 1,
            type: "LISTEN",
            question: "sea",
            order: 5,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/beaen/b8f4d63a20258498166bfa3c521572e6",
        },
        {
            id: 6,
            leverId: 1,
            type: "ASSIST",
            question: "nước",
            order: 6,
        },
        {
            id: 7,
            leverId: 1,
            type: "MATCH",
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/e271a28d4f910a9c896b9e560dbb6936",
            order: 7,
        },
        {
            id: 8,
            leverId: 1,
            type: "MATCH",
            order: 8,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/falstaffen/031926720e053a9b2d6877da6620da19",
        },
        {
            id: 9,
            leverId: 1,
            type: "MATCH",
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/6772c39f43dd8d8c32b11d96e745c3bc",
            order: 9,
        },
        {
            id: 10,
            leverId: 1,
            type: "MATCH",
            order: 10,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/fb63192500daf006e9201c29035fcfcf",
        },
        {
            id: 11,
            leverId: 1,
            type: "MATCH",
            order: 11,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/eddyen/1a8003ab80afda69f3739d0623b7ccb0",
        },
        {
            id: 12,
            leverId: 1,
            type: "MATCH",
            question: "trà và cà phê",
            order: 12,
        },
        {
            id: 13,
            leverId: 1,
            type: "MATCH",
            question: "Xin chào, Ben và Lisa",
            order: 13,
        },
        {
            id: 14,
            leverId: 1,
            type: "MATCH",
            question: "cà phê và trà",
            order: 14,
        },
        {
            id: 15,
            leverId: 1,
            type: "CONVERSATION",
            question: "Good morning, Lisa!",
            order: 15,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/lucyen/da6589f3f7001f7458cf964c0a0730f2",
        },
    ]);
};

const challengeQuestion = async () => {
    await db.insert(schema.challengeQuestions).values([
        {
            id: 1,
            isNew: true,
            question: "Hello",
            challengeId: 8,
            order: 1,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/falstaffen/031926720e053a9b2d6877da6620da19",
        },
        {
            id: 2,
            question: "Hello",
            challengeId: 10,
            order: 1,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/68544a04ae4502ac014342338234ebd4",
        },
        {
            id: 3,
            question: "Ben",
            challengeId: 10,
            order: 2,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/c9f72fe5dd9a93b27b4c6199e6dc0124",
        },
        {
            id: 4,
            question: "water",
            challengeId: 11,
            order: 1,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/eddyen/677d36ebdf487c0a934ce8adb6ea7c4f",
        },
        {
            id: 5,
            question: "and",
            isNew: true,
            challengeId: 11,
            order: 2,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/eddyen/f8bbe7530cfb5e8dbaf1ad18c2a005d0",
        },
        {
            id: 6,
            question: "tea",
            challengeId: 11,
            order: 3,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/eddyen/583f299988a289dc687a96665bfeecdb",
        },
    ]);
};

const challengeQuestionTranslation = async () => {
    await db.insert(schema.challengeQuestionTranslations).values([
        {
            translation: "vâng",
            challengeQuestionId: 1,
        },
        {
            translation: "phải",
            challengeQuestionId: 1,
        },
        {
            translation: "có",
            challengeQuestionId: 1,
        },
    ]);

    await db.insert(schema.challengeQuestionTranslations).values([
        {
            translation: "Xin chào",
            challengeQuestionId: 2,
        },
    ]);

    await db.insert(schema.challengeQuestionTranslations).values([
        {
            translation: "Ben",
            challengeQuestionId: 3,
        },
    ]);

    await db.insert(schema.challengeQuestionTranslations).values([
        {
            translation: "nước",
            challengeQuestionId: 4,
        },
    ]);

    await db.insert(schema.challengeQuestionTranslations).values([
        {
            translation: "và",
            challengeQuestionId: 5,
        },
    ]);

    await db.insert(schema.challengeQuestionTranslations).values([
        {
            translation: "trà",
            challengeQuestionId: 6,
        },
    ]);
};
// level 1
const challengeOptions = async () => {
    // challenge 1
    await db.insert(schema.challengeOptions).values([
        {
            challengeId: 1,
            text: "tea",
            correct: false,
            imageSrc: "https://d2pur3iezf4d1j.cloudfront.net/images/18a521f1507cb86689faa5b2e8277703",
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/5a642b17f3d75eebbfcdb07b26327b6c",
        },
        {
            challengeId: 1,
            text: "coffee",
            correct: true,
            imageSrc: "https://d2pur3iezf4d1j.cloudfront.net/images/6fd84b8a838c43c4a84b44b08b10177e",
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/5c4b35c4e7a5d8b8d32fb1e9d1fff6d3",
        },
        {
            challengeId: 1,
            text: "water",
            correct: false,
            imageSrc: "https://d2pur3iezf4d1j.cloudfront.net/images/7afea32bcf0e8c6f9d446ad4aad416be",
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/478b633dfd3118616569c46fe39d4197",
        },
    ]);

    // challenge 2
    await db.insert(schema.challengeOptions).values([
        {
            challengeId: 2,
            text: "coffee",
            correct: false,
            imageSrc: "https://d2pur3iezf4d1j.cloudfront.net/images/6fd84b8a838c43c4a84b44b08b10177e",
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/5c4b35c4e7a5d8b8d32fb1e9d1fff6d3",
        },
        {
            challengeId: 2,
            text: "tea",
            correct: false,
            imageSrc: "https://d2pur3iezf4d1j.cloudfront.net/images/18a521f1507cb86689faa5b2e8277703",
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/5a642b17f3d75eebbfcdb07b26327b6c",
        },
        {
            challengeId: 2,
            text: "water",
            correct: true,
            imageSrc: "https://d2pur3iezf4d1j.cloudfront.net/images/7afea32bcf0e8c6f9d446ad4aad416be",
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/478b633dfd3118616569c46fe39d4197",
        },
    ]);

    // challenge 3
    await db.insert(schema.challengeOptions).values([
        {
            challengeId: 3,
            text: "tea",
            correct: true,
            imageSrc: "https://d2pur3iezf4d1j.cloudfront.net/images/18a521f1507cb86689faa5b2e8277703",
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/5a642b17f3d75eebbfcdb07b26327b6c",
        },
        {
            challengeId: 3,
            text: "coffee",
            correct: false,
            imageSrc: "https://d2pur3iezf4d1j.cloudfront.net/images/6fd84b8a838c43c4a84b44b08b10177e",
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/5c4b35c4e7a5d8b8d32fb1e9d1fff6d3",
        },
        {
            challengeId: 3,
            text: "water",
            correct: false,
            imageSrc: "https://d2pur3iezf4d1j.cloudfront.net/images/7afea32bcf0e8c6f9d446ad4aad416be",
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/478b633dfd3118616569c46fe39d4197",
        },
    ]);

    // challenge 4
    await db.insert(schema.challengeOptions).values([
        {
            challengeId: 4,
            text: "tea",
            correct: false,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/5a642b17f3d75eebbfcdb07b26327b6c",
        },
        {
            challengeId: 4,
            text: "coffee",
            correct: true,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/5c4b35c4e7a5d8b8d32fb1e9d1fff6d3",
        },
        {
            challengeId: 4,
            text: "water",
            correct: false,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/478b633dfd3118616569c46fe39d4197",
        },
    ]);

    // challenge 5
    await db.insert(schema.challengeOptions).values([
        {
            challengeId: 5,
            text: "sea",
            correct: true,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/beaen/b8f4d63a20258498166bfa3c521572e6",
        },
        {
            challengeId: 5,
            text: "say",
            correct: false,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/beaen/e86fc3ba000e27766d20fbc7886e6197",
        },
    ]);

    // challenge 6
    await db.insert(schema.challengeOptions).values([
        {
            challengeId: 6,
            text: "coffee",
            correct: false,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/5c4b35c4e7a5d8b8d32fb1e9d1fff6d3",
        },
        {
            challengeId: 6,
            text: "tea",
            correct: false,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/5a642b17f3d75eebbfcdb07b26327b6c",
        },
        {
            challengeId: 6,
            text: "water",
            correct: true,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/478b633dfd3118616569c46fe39d4197",
        },
    ]);

    // challenge 15
    await db.insert(schema.challengeOptions).values([
        {
            challengeId: 15,
            text: "Yes, please!",
            correct: false,
        },
        {
            challengeId: 15,
            text: "Good morning!",
            correct: true,
        },
    ]);
};

const challengeParts = async () => {
    // challenge 7
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 7,
            text: "water",
            correct: true,
            order: 1,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/478b633dfd3118616569c46fe39d4197",
        },
        {
            challengeId: 7,
            text: "tea",
            correct: true,
            order: 2,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/030ecb79383537aef91c4351722bf5bd",
        },
        {
            challengeId: 7,
            text: "hello",
            correct: false,
            order: 3,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/1d65e941c0b68b2ca7755a1383a92db1",
        },
        {
            challengeId: 7,
            text: "good morning",
            correct: false,
            order: 4,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/09c2ea7867be89945a9e936bf22d4786",
        },
        {
            challengeId: 7,
            text: "and",
            correct: false,
            order: 5,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/55db7471f85413aea462d10d6ecb80f4",
        },
        {
            challengeId: 7,
            text: "good evening",
            correct: false,
            order: 6,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/f7182ac76e6817b39c73d6dee3292339",
        },
    ]);

    // challenge 8
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 8,
            text: "Xin",
            correct: true,
            order: 1,
        },
        {
            challengeId: 8,
            text: "chào",
            correct: true,
            order: 2,
        },
        {
            challengeId: 8,
            text: "phê",
            correct: false,
            order: 3,
        },
        {
            challengeId: 8,
            text: "cà phê",
            correct: false,
            order: 4,
        },
        {
            challengeId: 8,
            text: "cà",
            correct: false,
            order: 5,
        },
        {
            challengeId: 8,
            text: "trà",
            correct: false,
            order: 6,
        },
    ]);

    // challenge 9
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 9,
            text: "Hello",
            correct: true,
            order: 1,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/zarien/52141b34f2b5eeb982cc4331b11a5155",
        },
        {
            challengeId: 9,
            text: "Lisa",
            correct: true,
            order: 2,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/5a75cab5d9f30691cde43bc0e9b94f07",
        },
        {
            challengeId: 9,
            text: "please",
            correct: false,
            order: 3,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/48f829ed57b69aea7e873c4228ae7a24",
        },
        {
            challengeId: 9,
            text: "good evening",
            correct: false,
            order: 4,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/f7182ac76e6817b39c73d6dee3292339",
        },
        {
            challengeId: 9,
            text: "or",
            correct: false,
            order: 5,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/fa74720fe6b989010ef186af0399775a",
        },
        {
            challengeId: 9,
            text: "Thanks",
            correct: false,
            order: 6,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/27ff88c881bc27bfd1f50c0a47da2012",
        },
    ]);

    // challenge 10
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 10,
            text: "Xin",
            correct: true,
            order: 1,
        },
        {
            challengeId: 10,
            text: "chào",
            correct: true,
            order: 2,
        },
        {
            challengeId: 10,
            text: "Ben",
            correct: true,
            order: 3,
        },
        {
            challengeId: 10,
            text: "và",
            correct: false,
            order: 4,
        },
        {
            challengeId: 10,
            text: "trà",
            correct: false,
            order: 5,
        },
        {
            challengeId: 10,
            text: "phê",
            correct: false,
            order: 6,
        },
        {
            challengeId: 10,
            text: "nước",
            correct: false,
            order: 7,
        },
    ]);

    // challenge 11
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 11,
            text: "nước",
            correct: true,
            order: 1,
        },
        {
            challengeId: 11,
            text: "và",
            correct: true,
            order: 2,
        },
        {
            challengeId: 11,
            text: "trà",
            correct: true,
            order: 3,
        },
        {
            challengeId: 11,
            text: "phê",
            correct: false,
            order: 4,
        },
        {
            challengeId: 11,
            text: "cà",
            correct: false,
            order: 5,
        },
        {
            challengeId: 11,
            text: "cà phê",
            correct: false,
            order: 6,
        },

        {
            challengeId: 11,
            text: "sữa",
            correct: false,
            order: 7,
        },
    ]);

    // challenge 12
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 12,
            text: "tea",
            correct: true,
            order: 1,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/030ecb79383537aef91c4351722bf5bd",
        },
        {
            challengeId: 12,
            text: "and",
            correct: true,
            order: 2,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/55db7471f85413aea462d10d6ecb80f4",
        },
        {
            challengeId: 12,
            text: "coffee",
            correct: true,
            order: 3,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/5c4b35c4e7a5d8b8d32fb1e9d1fff6d3",
        },
        {
            challengeId: 12,
            text: "please",
            correct: false,
            order: 4,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/48f829ed57b69aea7e873c4228ae7a24",
        },
        {
            challengeId: 12,
            text: "sugar",
            correct: false,
            order: 5,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/3606333d331a6b6a8591d76eea80c6ba",
        },
        {
            challengeId: 12,
            text: "water",
            correct: false,
            order: 6,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/478b633dfd3118616569c46fe39d4197",
        },
        {
            challengeId: 12,
            text: "good morning",
            correct: false,
            order: 7,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/09c2ea7867be89945a9e936bf22d4786",
        },
    ]);

    // challenge 13
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 13,
            text: "Hello",
            correct: true,
            order: 1,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/zarien/52141b34f2b5eeb982cc4331b11a5155",
        },
        {
            challengeId: 13,
            text: "Ben",
            correct: true,
            order: 2,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/f02157d38172196e342a998ecbfe02a7",
        },
        {
            challengeId: 13,
            text: "and",
            correct: true,
            order: 3,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/55db7471f85413aea462d10d6ecb80f4",
        },
        {
            challengeId: 13,
            text: "Lisa",
            correct: true,
            order: 4,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/f5d468a63099dce85e776701cbbcc566",
        },
        {
            challengeId: 13,
            text: "coffee",
            correct: false,
            order: 5,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/5c4b35c4e7a5d8b8d32fb1e9d1fff6d3",
        },
        {
            challengeId: 13,
            text: "no",
            correct: false,
            order: 6,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/9fdbb4ede9f6e6fd7908138701eef163",
        },
        {
            challengeId: 13,
            text: "please",
            correct: false,
            order: 7,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/48f829ed57b69aea7e873c4228ae7a24",
        },
        {
            challengeId: 13,
            text: "sugar",
            correct: false,
            order: 8,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/3606333d331a6b6a8591d76eea80c6ba",
        },
    ]);

    // challenge 14
    await db.insert(schema.challengeParts).values([
        {
            challengeId: 14,
            text: "coffee",
            correct: true,
            order: 1,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/5c4b35c4e7a5d8b8d32fb1e9d1fff6d3",
        },
        {
            challengeId: 14,
            text: "and",
            correct: true,
            order: 2,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/55db7471f85413aea462d10d6ecb80f4",
        },
        {
            challengeId: 14,
            text: "tea",
            correct: true,
            order: 3,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/miranda/5a642b17f3d75eebbfcdb07b26327b6c",
        },
        {
            challengeId: 14,
            text: "good evening",
            correct: false,
            order: 4,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/f7182ac76e6817b39c73d6dee3292339",
        },
        {
            challengeId: 14,
            text: "thanks",
            correct: false,
            order: 5,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/27ff88c881bc27bfd1f50c0a47da2012",
        },

        {
            challengeId: 14,
            text: "yes",
            correct: false,
            order: 6,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/falstaffen/7dc95c57e230126b6ede44408266cec0",
        },
        {
            challengeId: 14,
            text: "water",
            correct: false,
            order: 7,
            audioSrc: "https://d1vq87e9lcf771.cloudfront.net/harrison/478b633dfd3118616569c46fe39d4197",
        },
    ]);
};

export const level1 = async () => {
    try {
        await challenge();
        await challengeQuestion();
        await challengeQuestionTranslation();
        await challengeOptions();
        await challengeParts();
    } catch (error) {
        console.log(error);
    }
};
