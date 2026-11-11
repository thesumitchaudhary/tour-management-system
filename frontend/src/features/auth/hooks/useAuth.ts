import { useRef, useState } from "react";
import { isAxiosError } from "axios";

export const useAuth = ({ showProgress = false } = {}) => {
  const submitting = useRef(false);
  const [progress, setProgress] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const submit = async (
    action: () => Promise<{ success: boolean; message: string }>,
    onSuccess?: () => void,
  ) => {
    if (submitting.current) return;
    submitting.current = true;
    setProgress(0);
    setIsPending(true);
    setError("");
    setMessage("");
    const timer = showProgress ? window.setInterval(() => {
      setProgress((value) => Math.min(90, value + Math.max(1, Math.ceil((90 - value) / 10))));
    }, 80) : undefined;
    try {
      const response = await action();
      if (!response.success) {
        setError(response.message);
        return;
      }
      if (showProgress) {
        window.clearInterval(timer);
        setProgress(100);
        await new Promise<void>((resolve) => window.setTimeout(resolve, 350));
      }
      setMessage(response.message);
      onSuccess?.();
    } catch (error) {
      setError(
        isAxiosError<{ message?: string }>(error)
          ? error.response?.data?.message ?? "Cannot reach the server. Please try again."
          : "Something went wrong. Please try again.",
      );
    } finally {
      window.clearInterval(timer);
      submitting.current = false;
      setIsPending(false);
    }
  };

  return { submit, isPending, error, message, progress };
};
