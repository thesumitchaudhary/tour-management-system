import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../api/auth.api";
import { useAuth } from "../hooks/useAuth";
import GlobeLoader from "@/components/GlobeLoader";
import { Eye, EyeOff } from "lucide-react";

const fieldClassName =
  "h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/30";

const SigninForm = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  const navigate = useNavigate();
  const { submit, isPending, error, message, progress } = useAuth({
    showProgress: true,
  });
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    void submit(
      () =>
        signIn({
          email: String(data.get("email")).trim(),
          password: String(data.get("password")),
        }),
      () => (onSuccess ? onSuccess() : navigate("/user/dashboard")),
    );
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {isPending && <GlobeLoader progress={progress} label="Signing in" />}
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="signin-email">
          Email
        </label>
        <input
          id="signin-email"
          name="email"
          className={fieldClassName}
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="signin-password">
          Password
        </label>
        <div className="relative">
        <input
          id="signin-password"
          name="password"
          className={`${fieldClassName} pr-12`}
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          autoComplete="current-password"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword((visible) => !visible)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          aria-controls="signin-password"
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-md text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {showPassword ? <EyeOff className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}
        </button>
          </div>
      </div>

      <div>
        <a href="" className="text-blue-600 text-sm">
          forgot password
        </a>
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
      {message && (
        <p role="status" className="text-sm">
          {message}
        </p>
      )}
      <button
        disabled={isPending}
        type="submit"
        className="h-10 w-full rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/80"
      >
        {isPending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
};

export default SigninForm;
