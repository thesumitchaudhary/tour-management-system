import type { Response } from "express";

export type EmptyParams = Record<string, never>;

export type ApiResponse<T> =
  | {
      success: true;
      message: string;
      data: T;
    }
  | {
      success: false;
      message: string;
    };

export const sendSuccess = <T>(
  res: Response<ApiResponse<T>>,
  statusCode: number,
  message: string,
  data: T,
): void => {
  res.status(statusCode).json({ success: true, message, data });
};

export const sendError = <T>(
  res: Response<ApiResponse<T>>,
  statusCode: number,
  message: string,
): void => {
  res.status(statusCode).json({ success: false, message });
};
