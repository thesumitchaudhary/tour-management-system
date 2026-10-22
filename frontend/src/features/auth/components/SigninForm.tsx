import { type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../api/auth.api";
import { useAuth } from "../hooks/useAuth";

const fieldClassName =
  "h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/30";

const SigninForm = () => {
  const navigate = useNavigate();
  const { submit, isPending, error, message } = useAuth();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    void submit(() => signIn({
      email: String(data.get("email")).trim(),
      password: String(data.get("password")),
    }), () => navigate("/user/dashboard"));
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
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
        <input
          id="signin-password"
          name="password"
          className={fieldClassName}
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          required
        />
      </div>

      <div>
        <a href="" className="text-blue-600 text-sm">forgot password</a>
      </div>

      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      {message && <p role="status" className="text-sm">{message}</p>}
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
