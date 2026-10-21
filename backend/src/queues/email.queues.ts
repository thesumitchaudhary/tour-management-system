import { Queue, type JobsOptions } from "bullmq";
import { connection } from "../config/redisConnection.js";
import {
  EMAIL_QUEUE_NAME,
  SEND_VERIFICATION_EMAIL_JOB,
  type SendVerificationEmailJobData,
  type SendVerificationEmailJobName,
  type SendVerificationEmailJobResult,
} from "./emailQueue.types.js";

const defaultEmailJobOptions: JobsOptions = {
  attempts: 3,
  backoff: {
    type: "exponential",
    delay: 5_000,
  },
  removeOnComplete: true,
  removeOnFail: 1_000,
};

export const emailQueue = new Queue<
  SendVerificationEmailJobData,
  SendVerificationEmailJobResult,
  SendVerificationEmailJobName
>(EMAIL_QUEUE_NAME, {
  connection,
  defaultJobOptions: defaultEmailJobOptions,
});

export const addVerificationEmailJob = async (
  data: SendVerificationEmailJobData,
  options: JobsOptions = {},
) =>
  emailQueue.add(SEND_VERIFICATION_EMAIL_JOB, data, {
    ...defaultEmailJobOptions,
    ...options,
  });
