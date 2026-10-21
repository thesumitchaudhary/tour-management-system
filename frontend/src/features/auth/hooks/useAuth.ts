import { useState } from "react";
import { isAxiosError } from "axios";

export const useAuth = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const submit = async (
    action: () => Promise<{ success: boolean; message: string }>,
    onSuccess?: () => void,
  ) => {
    if (isPending) return;
    setIsPending(true);
    setError("");
    setMessage("");
    try {
      const response = await action();
      if (!response.success) {
        setError(response.message);
        return;
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
      setIsPending(false);
    }
  };

  return { submit, isPending, error, message };
};
