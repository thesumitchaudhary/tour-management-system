import Redis from "ioredis";
import type { RedisOptions } from "ioredis";
import "./env";

type BullRedisOptions = Omit<RedisOptions, "replyMapping">;

const parseRedisNumber = (
  value: string | undefined,
  fallback: number,
  envName: string,
): number => {
  if (!value) {
    return fallback;
  }

  const parsedValue = Number.parseInt(value, 10);

  if (!Number.isInteger(parsedValue) || parsedValue < 0) {
    throw new Error(`${envName} must be a valid non-negative integer`);
  }

  return parsedValue;
};

const redisOptions: BullRedisOptions = {
  maxRetriesPerRequest: null,
};

const redisUrl = process.env.REDIS_URL;

const createRedisConnection = (): Redis => {
  if (redisUrl) {
    return new Redis(redisUrl, redisOptions);
  }

  const connectionOptions: BullRedisOptions = {
    ...redisOptions,
    host: process.env.REDIS_HOST ?? "127.0.0.1",
    port: parseRedisNumber(process.env.REDIS_PORT, 6379, "REDIS_PORT"),
    db: parseRedisNumber(process.env.REDIS_DB, 0, "REDIS_DB"),
  };

  if (process.env.REDIS_USERNAME) {
    connectionOptions.username = process.env.REDIS_USERNAME;
  }

  if (process.env.REDIS_PASSWORD) {
    connectionOptions.password = process.env.REDIS_PASSWORD;
  }

  return new Redis(connectionOptions);
};

export const connection = createRedisConnection();

connection.on("error", (error) => {
  console.error("Redis connection error:", error.message);
});
