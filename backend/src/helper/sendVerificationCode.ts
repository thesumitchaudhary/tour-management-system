import nodemailer from "nodemailer";
import { transporter } from "./sendMail.js";
import { verificationEmailTemplate } from "../template/sendVerificationMail.js";

export const sendVerificationCode = async (
  email: string,
  otp: string | number,
): Promise<string> => {
  try {
    const otpCode = String(otp);
    const fromEmail = process.env.EMAIL_FROM ?? process.env.EMAIL_USER;

    if (!fromEmail) {
      throw new Error(
        "EMAIL_FROM or EMAIL_USER must be defined in your .env file",
      );
    }

    const info = await transporter.sendMail({
      from: fromEmail,
      to: email,
      subject: "Verify Your Email",
      text: `Your OTP code is ${otpCode}. This OTP is valid for 10 minutes.`,
      html: verificationEmailTemplate(email, otpCode),
    });

    console.log("Message sent: %s", info.messageId);

    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log("Preview URL: %s", previewUrl);
    }

    return info.messageId;
  } catch (err) {
    console.error("Error while sending mail: ", err);
    throw err;
  }
};

export const SendVerificationCode = sendVerificationCode;
