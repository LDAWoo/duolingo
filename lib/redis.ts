import { Redis } from "ioredis";

const CACHE_TTL = 3600;

const getRedisUrl = () => {
    if (process.env.REDIS_URL) {
        return process.env.REDIS_URL;
    }
    throw new Error("No Redis URL provided");
};

export const redis = new Redis(getRedisUrl());

export function shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const getFromCache = async (key: string) => {
    const cachedData = await redis.get(key);
    return cachedData ? JSON.parse(cachedData) : null;
};

export const saveToCache = async (key: string, data: any) => {
    await redis.set(key, JSON.stringify(data), "EX", CACHE_TTL);
};
