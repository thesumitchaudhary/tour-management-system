import { stringify } from "node:querystring";
import { connection } from "../config/redisConnection.js";

export const cacheServies = {
  async get<T>(key: string): Promise<T | null> {
    const cachedData = await connection.get(key);

    if (!cachedDate) {
      return null;
    }

    return JSON.parse(cachedData) as T;
  },

  async set<T>(key: string, data: T, ttlSeconds: number = 3600): Promise<void> {
    await connection.set(key, JSON.stringify(data), "EX", ttlSeconds);
  },

  async delete(key: string): Promise<void> {
    await connection.del(key);
  },
};
