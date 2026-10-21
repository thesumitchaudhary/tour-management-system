import express from "express";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { randomInt } from "node:crypto";
import { ROLES } from "../generated/prisma/enums.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { prisma } from "../libs/Prisma.js";
import { addVerificationEmailJob } from "../queues/email.queues.js";
import type { UserModel } from "../generated/prisma/models/User.js";
import { sendError, sendSuccess } from "../utils/apiTypes.js";
import type { ApiResponse, EmptyParams } from "../utils/apiTypes.js";

dotenv.config();

const router = express.Router();

const JWT_SECRET = process.env.JWTSECRET;

if (!JWT_SECRET) {
  throw new Error("JWTSECRET is missing in .env");
}

type RegisterRequestBody = {
  fullName?: unknown;
  email?: unknown;
  password?: unknown;
  confirmedPassword?: unknown;
};

type VerifyOtpRequestBody = {
  email?: unknown;
  code?: unknown;
};

type LoginRequestBody = {
  email?: unknown;
  password?: unknown;
};

type LoginResponseData = {
  token: string;
};

type UserResponse = {
  id: string;
  adminName: string;
  email: string;
};

type PublicUser = Pick<
  UserModel,
  | "id"
  | "firstName"
  | "lastName"
  | "email"
  | "role"
  | "verified_At"
  | "created_At"
  | "updated_At"
>;

type HealthCheckResponse = string;
type RegisterResponse = ApiResponse<PublicUser>;
type VerifyOtpResponse = ApiResponse<PublicUser>;
type LoginResponse = ApiResponse<LoginResponseData>;
type LogoutResponse =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      message: string;
    };

const toRequiredString = (value: unknown): string | null => {
  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }

  return null;
};

const isRequiredPassword = (value: unknown): value is string =>
  typeof value === "string" && value.length > 0;

const createUserResponse = (user: UserModel): PublicUser => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  role: user.role,
  verified_At: user.verified_At,
  created_At: user.created_At,
  updated_At: user.updated_At,
});

router.get<EmptyParams, HealthCheckResponse>(
  "/",
  (
    _req: Request<EmptyParams, HealthCheckResponse>,
    res: Response<HealthCheckResponse>,
  ): void => {
    res.json("hey it's working");
  },
);

router.post<EmptyParams, RegisterResponse, RegisterRequestBody>(
  "/register",
  async (
    req: Request<EmptyParams, RegisterResponse, RegisterRequestBody>,
    res: Response<RegisterResponse>,
  ): Promise<void> => {
    try {
      const fullName = toRequiredString(req.body.fullName);
      const email = toRequiredString(req.body.email)?.toLowerCase() ?? null;
      const { password, confirmedPassword } = req.body;

      if (
        !fullName ||
        !email ||
        !isRequiredPassword(password) ||
        !isRequiredPassword(confirmedPassword)
      ) {
        sendError(res, 400, "All fields are mandatory");
        return;
      }

      if (password !== confirmedPassword) {
        sendError(res, 400, "Passwords do not match");
        return;
      }

      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existingUser) {
        sendError(res, 409, "User already exists");
        return;
      }

      const generatedOtp = randomInt(100000, 1000000).toString();

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const [firstName, ...lastNameParts] = fullName.split(/\s+/) as [
        string,
        ...string[],
      ];
      const lastName = lastNameParts.join(" ");

      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hash,
          otp: generatedOtp,
          otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
          verified_At: true,
          created_At: true,
          updated_At: true,
        },
      });

      await addVerificationEmailJob({
        email: user.email,
        otp: generatedOtp,
      });

      const token = jwt.sign(
        {
          id: user.id,
          fullName: `${user.firstName} ${user.lastName}`.trim(),
          email: user.email,
          role: user.role,
        },
        JWT_SECRET,
        {
          expiresIn: "7d",
        },
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      sendSuccess(res, 201, "User created successfully", user);
    } catch (error) {
      if (error instanceof Error) {
        sendError(res, 500, error.message);
        return;
      }

      sendError(res, 500, "Internal Server Error");
    }
  },
);

router.post<EmptyParams, VerifyOtpResponse, VerifyOtpRequestBody>(
  "/verifyOtp",
  async (
    req: Request<EmptyParams, VerifyOtpResponse, VerifyOtpRequestBody>,
    res: Response<VerifyOtpResponse>,
  ): Promise<void> => {
    try {
      const email = toRequiredString(req.body.email)?.toLowerCase() ?? null;
      const code = toRequiredString(req.body.code);

      if (!email || !code) {
        sendError(res, 400, "Email and OTP are mandatory");
        return;
      }

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user || user.role !== ROLES.TRAVELLER) {
        sendError(res, 404, "User is not found");
        return;
      }

      if (user.otp !== code) {
        sendError(res, 401, "Invalid OTP");
        return;
      }

      if (!user.otpExpiresAt || user.otpExpiresAt <= new Date()) {
        sendError(res, 410, "OTP expired");
        return;
      }

      const verifiedUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          otp: null,
          otpExpiresAt: null,
          verified_At: new Date(),
        },
      });

      sendSuccess(
        res,
        200,
        "OTP verification successfully",
        createUserResponse(verifiedUser),
      );  
    } catch (error) {
      if (error instanceof Error) {
        sendError(res, 500, error.message);
        return;
      }

      sendError(res, 500, "Internal Server Error");
    }
  },
);

router.post<EmptyParams, LoginResponse, LoginRequestBody>(
  "/login",
  async (
    req: Request<EmptyParams, LoginResponse, LoginRequestBody>,
    res: Response<LoginResponse>,
  ): Promise<void> => {
    try {
      const email = toRequiredString(req.body.email)?.toLowerCase() ?? null;
      const { password } = req.body;

      if (!email || !isRequiredPassword(password)) {
        sendError(res, 400, "Email and password are mandatory");
        return;
      }

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        sendError(res, 404, "User does not exist");
        return;
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        sendError(res, 401, "Invalid password");
        return;
      }

      const token = jwt.sign(
        {
          id: user.id,
          fullName: `${user.firstName} ${user.lastName}`.trim(),
          email: user.email,
          role: user.role,
        },
        JWT_SECRET,
        {
          expiresIn: "7d",
        },
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      sendSuccess(res, 200, "User logged in successfully", { token });
    } catch (error) {
      if (error instanceof Error) {
        sendError(res, 500, error.message);
        return;
      }

      sendError(res, 500, "Internal Server Error");
    }
  },
);

router.get<EmptyParams, LogoutResponse>(
  "/logout",
  (
    _req: Request<EmptyParams, LogoutResponse>,
    res: Response<LogoutResponse>,
  ): void => {
    try {
      res.cookie("token", "");
      res.status(200).json({ success: true, message: "Logout Successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
        return;
      }

      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  },
);

export default router;
