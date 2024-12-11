import { Redis } from "ioredis";

const getRedisUrl = () => {
    if (process.env.REDIS_URL) {
        return process.env.REDIS_URL;
    }
    throw new Error("No Redis URL provided");
};

export const redis = new Redis(getRedisUrl());
