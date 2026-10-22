import { type FormEvent } from "react";
import { verifyOtp } from "../api/auth.api";
import { useAuth } from "../hooks/useAuth";

type VerifyOtpFormProps = {
  email: string;
  onContinue: () => void;
};

const VerifyOtpForm = ({ email, onContinue }: VerifyOtpFormProps) => {
  const { submit, isPending, error, message } = useAuth();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    void submit(() => verifyOtp({
      email,
      code: String(data.get("code")).trim(),
    }));
  };

  if (message) {
    return (
      <div className="space-y-4">
        <p role="status" className="text-sm">Email verified successfully. You can now sign in.</p>
        <button type="button" onClick={onContinue}
          className="h-10 w-full rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/80">
          Continue to Sign In
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <p className="text-sm text-muted-foreground">
        Enter the 6-digit code sent to <span className="font-medium text-foreground">{email}</span>.
        The code expires in 10 minutes.
      </p>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="verify-otp-code">Verification code</label>
        <input id="verify-otp-code" name="code" type="text" inputMode="numeric"
          autoComplete="one-time-code" pattern="[0-9]{6}" minLength={6} maxLength={6}
          placeholder="Enter 6-digit code" required disabled={isPending}
          className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/30" />
      </div>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <button type="submit" disabled={isPending}
        className="h-10 w-full rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/80 disabled:opacity-50">
        {isPending ? "Verifying..." : "Verify Email"}
      </button>
    </form>
  );
};

export default VerifyOtpForm;
