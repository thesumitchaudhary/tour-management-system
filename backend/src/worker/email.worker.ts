import { Worker } from "bullmq";
import { connection } from "../config/redisConnection.js";
import { sendVerificationCode } from "../helper/sendVerificationCode.js";
import {
  EMAIL_QUEUE_NAME,
  SEND_VERIFICATION_EMAIL_JOB,
  type SendVerificationEmailJobData,
  type SendVerificationEmailJobName,
  type SendVerificationEmailJobResult,
} from "../queues/emailQueue.types.js";

const parseWorkerConcurrency = (): number => {
  const concurrency = Number.parseInt(
    process.env.EMAIL_WORKER_CONCURRENCY ?? "5",
    10,
  );

  if (!Number.isInteger(concurrency) || concurrency <= 0) {
    throw new Error("EMAIL_WORKER_CONCURRENCY must be a positive integer");
  }

  return concurrency;
};

export const emailWorker = new Worker<
  SendVerificationEmailJobData,
  SendVerificationEmailJobResult,
  SendVerificationEmailJobName
>(
  EMAIL_QUEUE_NAME,
  async (job) => {
    if (job.name !== SEND_VERIFICATION_EMAIL_JOB) {
      throw new Error(`Unsupported email job: ${job.name}`);
    }

    const messageId = await sendVerificationCode(job.data.email, job.data.otp);

    return { messageId };
  },
  {
    connection,
    concurrency: parseWorkerConcurrency(),
  },
);

emailWorker.on("completed", (job) => {
  console.log(`Email job ${job.id} (${job.name}) has completed`);
});

emailWorker.on("failed", (job, err) => {
  console.error(`Email job ${job?.id ?? "unknown"} failed: ${err.message}`);
});

emailWorker.on("error", (err) => {
  console.error("Email worker error:", err.message);
});
