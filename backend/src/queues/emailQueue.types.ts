export const EMAIL_QUEUE_NAME = "email-queue";
export const SEND_VERIFICATION_EMAIL_JOB = "send-verification-email";

export type SendVerificationEmailJobName = typeof SEND_VERIFICATION_EMAIL_JOB;

export type SendVerificationEmailJobData = {
  email: string;
  otp: string | number;
};

export type SendVerificationEmailJobResult = {
  messageId: string;
};
