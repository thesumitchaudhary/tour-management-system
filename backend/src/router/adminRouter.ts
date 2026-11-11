import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendError, sendSuccess } from "../utils/apiTypes.js";
import { prisma } from "../libs/Prisma.js";
import { ROLES } from "../generated/prisma/enums.js";
import type { ApiResponse, EmptyParams } from "../utils/apiTypes.js";

const router = express.Router();

dotenv.config();

const JWT_SECRET = process.env.JWTSECRET;

if (!JWT_SECRET) {
  throw new Error("JWTSECRET is missing in .env");
}

type AdminLoginBody = {
  email?: unknown;
  password?: unknown;
};

type AdminLoginResponse = ApiResponse<{ token: string }>;

const toRequiredString = (value: unknown): string | null => {
  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }
  return null;
};

const isRequiredPassword = (value: unknown): value is string =>
  typeof value === "string" && value.length > 0;

router.get("/", (req: Request, res: Response) => {
  res.json({ success: true, message: "hey it's working" });
});

router.post<EmptyParams, AdminLoginResponse, AdminLoginBody>("/login", async (req, res) => {
  try {
    const email = toRequiredString(req.body?.email)?.toLowerCase() ?? null;
    const password = req.body?.password;

    if (!email || !isRequiredPassword(password)) {
      sendError(res, 400, "Email and password are mandatory");
      return;
    }

    const existAdmin = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existAdmin || existAdmin.role !== ROLES.ADMIN) {
      sendError(res, 401, "Invalid email or password");
      return;
    }

    const isMatch = await bcrypt.compare(password, existAdmin.password);

    if (!isMatch) {
      sendError(res, 401, "Invalid email or password");
      return;
    }

    const token = jwt.sign(
      {
        id: existAdmin.id,
        fullName: `${existAdmin.firstName} ${existAdmin.lastName}`.trim(),
        email: existAdmin.email,
        role: existAdmin.role,
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
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    sendSuccess(res, 200, "Admin logged in successfully", { token });
  } catch {
    sendError(res, 500, "Internal Server Error");
  }
});

export default router;
