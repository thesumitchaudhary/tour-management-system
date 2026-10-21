import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

if (!emailUser || !emailPass) {
  throw new Error("EMAIL_USER and EMAIL_PASS must be defined in your .env");
}

const parseSmtpPort = (): number => {
  const port = Number.parseInt(process.env.SMTP_PORT ?? "587", 10);

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error("SMTP_PORT must be a positive integer");
  }
  return port;
};

const smtpPort = parseSmtpPort();
const smtpSecure =
  process.env.SMTP_SECURE === "true" ||
  (process.env.SMTP_SECURE === undefined && smtpPort === 465);

// Create a transporter using SMTP
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? "smtp.gmail.com",
  port: smtpPort,
  secure: smtpSecure, // true for 465, false for 587
  auth: {
    user: emailUser,
    pass: emailPass,
  },
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 20_000,
});
