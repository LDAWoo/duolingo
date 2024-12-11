import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "../db/schema";
import { level1 } from "./lessons/lesson1/levels/level1";
import { level2 } from "./lessons/lesson1/levels/level2";
import { level3 } from "./lessons/lesson1/levels/level3";
import { level4 } from "./lessons/lesson1/levels/level4";

const sql = neon(process.env.DATABASE_URL ?? "");

const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("Seeding database");
        // await db.delete(schema.users);
        // await db.delete(schema.courses);
        // await db.delete(schema.styles);
        // await db.delete(schema.userProgress);
        // await db.delete(schema.units);
        // await db.delete(schema.lessons);
        // await db.delete(schema.levels);
        // await db.delete(schema.challenges);
        // await db.delete(schema.challengeOptions);
        // await db.delete(schema.challengeParts);
        // await db.delete(schema.challengeProgress);

        // await db.insert(schema.courses).values([
        //     {
        //         id: 1,
        //         title: "English",
        //         imageSrc: "/en.svg",
        //     },
        //     {
        //         id: 2,
        //         title: "Chines",
        //         imageSrc: "/zh.svg",
        //     },
        // ]);

        // await db.insert(schema.styles).values([
        //     {
        //         id: 1,
        //         backgroundColor: "rgb(88, 204, 2)",
        //         color: "rgb(255, 255, 255)",
        //     },
        //     {
        //         id: 2,
        //         backgroundColor: "rgb(206, 130, 255)",
        //         color: "rgb(255, 255, 255)",
        //     },
        //     {
        //         id: 3,
        //         backgroundColor: "rgb(0, 205, 156)",
        //         color: "rgb(255, 255, 255)",
        //     },
        // ]);

        // await db.insert(schema.units).values([
        //     {
        //         id: 1,
        //         courseId: 1,
        //         title: "Phần 1, cửa 1",
        //         description: "Gọi đồ uống",
        //         src: "https://d35aaqx5ub95lt.cloudfront.net/lottie/pathCharacters/01a1427cc5613179ea3d7568a5f7445b.json",
        //         type: "json",
        //         order: 1,
        //         stylesId: 1,
        //     },
        //     {
        //         id: 2,
        //         courseId: 1,
        //         title: "Phần 1, cửa 2",
        //         description: "Giới thiệu về bản thân",
        //         src: "https://d35aaqx5ub95lt.cloudfront.net/images/pathCharacters/locked/34443969dabd59f00795cc94457c1b3b.svg",
        //         type: "image",
        //         order: 2,
        //         stylesId: 2,
        //     },
        //     {
        //         id: 3,
        //         courseId: 2,
        //         title: "Phần 1, cửa 3",
        //         description: "Nói về đồ vật của bạn",
        //         src: "https://d35aaqx5ub95lt.cloudfront.net/images/pathCharacters/locked/f1a8ca7d22677f84c9781b7e9034f688.svg",
        //         type: "image",
        //         order: 3,
        //         stylesId: 3,
        //     },
        //     {
        //         id: 4,
        //         courseId: 2,
        //         title: "Phần 1, cửa 4",
        //         description: "Đặt câu hỏi",
        //         src: "https://d35aaqx5ub95lt.cloudfront.net/images/pathCharacters/locked/bf1a9ccba05390a74cf13a0f7c9a665d.svg",
        //         type: "image",
        //         order: 4,
        //         stylesId: 1,
        //     },
        // ]);

        // await db.insert(schema.lessons).values([
        //     {
        //         id: 1,
        //         unitId: 1,
        //         title: "Vocabulary",
        //         imageSrc: "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/ef9c771afdb674f0ff82fae25c6a7b0a.svg",
        //         order: 1,
        //     },
        //     {
        //         id: 2,
        //         unitId: 1,
        //         title: "Listening",
        //         imageSrc: "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/ddd21f172a2db0f5ef169c09b4d3badb.svg",
        //         order: 2,
        //     },
        //     {
        //         id: 3,
        //         unitId: 1,
        //         title: "Speaking",
        //         imageSrc: "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/9958a4b59345641a63283a1926d54732.svg",
        //         order: 3,
        //     },
        //     {
        //         id: 4,
        //         unitId: 1,
        //         title: "Grammar",
        //         imageSrc: "https://d35aaqx5ub95lt.cloudfront.net/images/path/b841637c196f5be786d8b8578a42ffbf.svg",
        //         order: 4,
        //     },
        //     {
        //         id: 5,
        //         unitId: 1,
        //         title: "Reading",
        //         imageSrc: "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/7d84afaa096ff1f1d3f8c86d6c2c9542.svg",
        //         order: 5,
        //     },
        // ]);

        // await db.insert(schema.lessons).values([
        //     {
        //         id: 6,
        //         unitId: 2,
        //         title: "Vocabulary",
        //         imageSrc: "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/ef9c771afdb674f0ff82fae25c6a7b0a.svg",
        //         order: 1,
        //     },
        //     {
        //         id: 7,
        //         unitId: 2,
        //         title: "Listening",
        //         imageSrc: "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/ddd21f172a2db0f5ef169c09b4d3badb.svg",
        //         order: 2,
        //     },
        //     {
        //         id: 8,
        //         unitId: 2,
        //         title: "Speaking",
        //         imageSrc: "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/9958a4b59345641a63283a1926d54732.svg",
        //         order: 3,
        //     },
        //     {
        //         id: 9,
        //         unitId: 2,
        //         title: "Grammar",
        //         imageSrc: "https://d35aaqx5ub95lt.cloudfront.net/images/path/b841637c196f5be786d8b8578a42ffbf.svg",
        //         order: 4,
        //     },
        //     {
        //         id: 10,
        //         unitId: 2,
        //         title: "Reading",
        //         imageSrc: "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/7d84afaa096ff1f1d3f8c86d6c2c9542.svg",
        //         order: 5,
        //     },
        // ]);

        // await db.insert(schema.levels).values([
        //     {
        //         id: 1,
        //         title: "Level 1",
        //         order: 1,
        //         lessonId: 1,
        //     },
        //     {
        //         id: 2,
        //         title: "Level 2",
        //         order: 2,
        //         lessonId: 1,
        //     },
        //     {
        //         id: 3,
        //         title: "Level 3",
        //         order: 3,
        //         lessonId: 1,
        //     },
        //     {
        //         id: 4,
        //         title: "Level 4",
        //         order: 4,
        //         lessonId: 1,
        //     },
        // ]);

        // await db.insert(schema.levels).values([
        //     {
        //         id: 5,
        //         title: "Level 1",
        //         order: 1,
        //         lessonId: 2,
        //     },
        //     {
        //         id: 6,
        //         title: "Level 2",
        //         order: 2,
        //         lessonId: 2,
        //     },
        //     {
        //         id: 7,
        //         title: "Level 3",
        //         order: 3,
        //         lessonId: 2,
        //     },
        //     {
        //         id: 8,
        //         title: "Level 4",
        //         order: 4,
        //         lessonId: 2,
        //     },
        // ]);

        // await level1();
        // await level2();
        // await level3();
        await level4();

        console.log("Seeding finished");
    } catch (error) {
        console.error("An error occurred:", error);
        throw new Error("Failed to seed the database");
    }
};

main();
