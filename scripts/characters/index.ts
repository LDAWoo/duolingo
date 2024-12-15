import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL ?? "");

const db = drizzle(sql, { schema });

export const characters = async () => {
    try {
        // alphabet 1
        await db.insert(schema.characters).values([
            {
                name: "ɑ",
                transliteration: "hot",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/aa.mp3",
                alphabetId: 1,
            },
            {
                name: "æ",
                transliteration: "cat",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/ae.mp3",
                alphabetId: 1,
            },
            {
                name: "ʌ",
                transliteration: "but",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/ah.mp3",
                alphabetId: 1,
            },

            {
                name: "ɛ",
                transliteration: "bed",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/eh.mp3",
                alphabetId: 1,
            },
            {
                name: "eɪ",
                transliteration: "say",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/ey.mp3",
                alphabetId: 1,
            },
            {
                name: "ɚ",
                transliteration: "bird",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/er.mp3",
                alphabetId: 1,
            },

            {
                name: "ɪ",
                transliteration: "ship",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/ih.mp3",
                alphabetId: 1,
            },
            {
                name: "i",
                transliteration: "sheep",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/iy.mp3",
                alphabetId: 1,
            },
            {
                name: "ə",
                transliteration: "about",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/ah0.mp3",
                alphabetId: 1,
            },

            {
                name: "oʊ",
                transliteration: "boat",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/ow.mp3",
                alphabetId: 1,
            },
            {
                name: "ʊ",
                transliteration: "foot",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/uh.mp3",
                alphabetId: 1,
            },
            {
                name: "u",
                transliteration: "food",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/uw.mp3",
                alphabetId: 1,
            },

            {
                name: "aʊ",
                transliteration: "cow",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/aw.mp3",
                alphabetId: 1,
            },
            {
                name: "aɪ",
                transliteration: "time",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/ay.mp3",
                alphabetId: 1,
            },
            {
                name: "ɔɪ",
                transliteration: "boy",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/oy.mp3",
                alphabetId: 1,
            },
        ]);

        // alphabet 2
        await db.insert(schema.characters).values([
            {
                name: "b",
                transliteration: "book",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/b.mp3",
                alphabetId: 2,
            },
            {
                name: "ʧ",
                transliteration: "chair",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/ch.mp3",
                alphabetId: 2,
            },
            {
                name: "d",
                transliteration: "day",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/d.mp3",
                alphabetId: 2,
            },
            {
                name: "f",
                transliteration: "fish",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/f.mp3",
                alphabetId: 2,
            },
            {
                name: "g",
                transliteration: "go",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/g.mp3",
                alphabetId: 2,
            },
            {
                name: "h",
                transliteration: "home",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/hh.mp3",
                alphabetId: 2,
            },
            {
                name: "ʤ",
                transliteration: "job",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/jh.mp3",
                alphabetId: 2,
            },
            {
                name: "k",
                transliteration: "key",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/k.mp3",
                alphabetId: 2,
            },
            {
                name: "l",
                transliteration: "lion",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/l.mp3",
                alphabetId: 2,
            },
            {
                name: "m",
                transliteration: "moon",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/m.mp3",
                alphabetId: 2,
            },
            {
                name: "n",
                transliteration: "nose",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/n.mp3",
                alphabetId: 2,
            },
            {
                name: "ŋ",
                transliteration: "sing",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/ng.mp3",
                alphabetId: 2,
            },
            {
                name: "p",
                transliteration: "pig",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/p.mp3",
                alphabetId: 2,
            },
            {
                name: "ɹ",
                transliteration: "red",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/r.mp3",
                alphabetId: 2,
            },
            {
                name: "s",
                transliteration: "see",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/s.mp3",
                alphabetId: 2,
            },
            {
                name: "ʒ",
                transliteration: "measure",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/zh.mp3",
                alphabetId: 2,
            },
            {
                name: "ʃ",
                transliteration: "shoe",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/sh.mp3",
                alphabetId: 2,
            },
            {
                name: "t",
                transliteration: "time",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/t.mp3",
                alphabetId: 2,
            },
            {
                name: "ð",
                transliteration: "then",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/dh.mp3",
                alphabetId: 2,
            },
            {
                name: "θ",
                transliteration: "think",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/th.mp3",
                alphabetId: 2,
            },
            {
                name: "v",
                transliteration: "very",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/v.mp3",
                alphabetId: 2,
            },
            {
                name: "w",
                transliteration: "water",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/w.mp3",
                alphabetId: 2,
            },
            {
                name: "j",
                transliteration: "you",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/y.mp3",
                alphabetId: 2,
            },
            {
                name: "z",
                transliteration: "zoo",
                audioSrc: "https://alphabets-resources.duolingo.com/audio/pronunciation/z.mp3",
                alphabetId: 2,
            },
        ]);
    } catch (error) {
        console.log(error);
    }
};
