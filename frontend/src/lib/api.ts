import axios from "axios";
import type { AxiosRequestConfig } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const request = async <T>(
  path: string,
  options: AxiosRequestConfig = {},
): Promise<T> => {
  const response = await api.request<T>({
    url: path,
    ...options,
  });
  return response.data;
};

export default {
  request,
  get: <T>(path: string, options?: AxiosRequestConfig) =>
    request<T>(path, {
      method: "GET",
      ...options,
    }),

  post: <T>(path: string, data?: unknown, options?: AxiosRequestConfig) =>
    request<T>(path, {
      method: "POST",
      data,
      ...options,
    }),

  put: <T>(path: string, data?: unknown, options?: AxiosRequestConfig) =>
    request<T>(path, {
      method: "PUT",
      data,
      ...options,
    }),

  delete: <T>(path: string, options?: AxiosRequestConfig) =>
    request<T>(path, {
      method: "DELETE",
      ...options,
    }),
};
  
