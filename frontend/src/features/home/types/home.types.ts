import type { AuthMode } from "@/features/auth/types/auth.types";

export type Translate = (key: string) => string;

export type OpenAuthModal = (mode: AuthMode) => void;
