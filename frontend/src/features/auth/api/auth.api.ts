import api from "@/lib/api";

type AuthResponse = { success: boolean; message: string };

export const signIn = (data: { email: string; password: string }) =>
  api.post<AuthResponse>("/traveller/login", data);

export const signUp = (data: {
  fullName: string;
  email: string;
  password: string;
  confirmedPassword: string;
}) => api.post<AuthResponse>("/traveller/register", data);
