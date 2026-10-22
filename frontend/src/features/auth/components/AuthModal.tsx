import { useEffect, useState, type MouseEvent } from "react";
import { X } from "lucide-react";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";
import VerifyOtpForm from "./VerifyOtpForm";
import type { AuthMode } from "../types/auth.types";

type AuthModalProps = {
  defaultMode?: AuthMode;
  onClose?: () => void;
};

const AuthModal = ({ defaultMode = "signin", onClose }: AuthModalProps) => {
  const [mode, setMode] = useState<AuthMode>(defaultMode);
  const [verificationEmail, setVerificationEmail] = useState<string | null>(null);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
    };
  }, []);

  useEffect(() => {
    if (!onClose) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      onClick={handleBackdropClick}
    >
      <div className="max-h-full w-full max-w-md overflow-y-auto overscroll-contain rounded-lg border border-border bg-background p-6 shadow-xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 id="auth-modal-title" className="text-xl font-semibold">
              {verificationEmail ? "Verify your email" : mode === "signup" ? "Create account" : "Welcome back"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {verificationEmail
                ? "Confirm your email to complete registration."
                : mode === "signup"
                ? "Start planning your next trip with Wanderlust."
                : "Sign in to continue planning your trips."}
            </p>
          </div>

          {onClose ? (
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground"
              aria-label="Close auth modal"
              onClick={onClose}
            >
              <X className="size-4" />
            </button>
          ) : null}
        </div>

        {!verificationEmail && <div className="mb-5 grid grid-cols-2 rounded-lg bg-muted p-1">
          <button
            type="button"
            className={`rounded-md px-3 py-2 text-sm font-medium transition ${
              mode === "signin"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setMode("signin")}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`rounded-md px-3 py-2 text-sm font-medium transition ${
              mode === "signup"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
        </div>}

        {verificationEmail ? (
          <VerifyOtpForm email={verificationEmail} onContinue={() => {
            setVerificationEmail(null);
            setMode("signin");
          }} />
        ) : mode === "signup" ? <SignupForm onRegistered={setVerificationEmail} /> : <SigninForm />}
      </div>
    </div>
  );
};

export default AuthModal;
