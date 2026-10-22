import { type FormEvent } from "react";
import { signUp } from "../api/auth.api";
import { useAuth } from "../hooks/useAuth";

const fieldClassName =
  "h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/30";

const SignupForm = ({ onRegistered }: { onRegistered: (email: string) => void }) => {
  const { submit, isPending, error, message } = useAuth();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    void submit(() => {
      const password = String(data.get("password"));
      const confirmedPassword = String(data.get("confirmedPassword"));
      if (password !== confirmedPassword) {
        return Promise.resolve({ success: false, message: "Passwords do not match" });
      }
      return signUp({
        firstName: String(data.get("firstName")).trim(),
        lastName: String(data.get("lastName")).trim(),
        email: String(data.get("email")).trim(),
        password,
        confirmedPassword,
      });
    }, () => {
      onRegistered(String(data.get("email")).trim());
      form.reset();
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="signup-name">
          First Name
        </label>
        <input
          id="signup-name"
          name="firstName"
          className={fieldClassName}
          type="text"
          placeholder="Enter your first name"
          autoComplete="name"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="signup-name">
          Last Name
        </label>
        <input
          id="signup-name"
          name="lastName"
          className={fieldClassName}
          type="text"
          placeholder="Enter your last name"
          autoComplete="name"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="signup-email">
          Email
        </label>
        <input
          id="signup-email"
          name="email"
          className={fieldClassName}
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="signup-password">
          Password
        </label>
        <input
          id="signup-password"
          name="password"
          className={fieldClassName}
          type="password"
          placeholder="Create a password"
          autoComplete="new-password"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="signup-confirm-password">
          Confirm Password
        </label>
        <input
          id="signup-confirm-password"
          name="confirmedPassword"
          className={fieldClassName}
          type="password"
          placeholder="Confirm your password"
          autoComplete="new-password"
          required
        />
      </div>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      {message && <p role="status" className="text-sm">{message}</p>}
      <button
        disabled={isPending}
        type="submit"
        className="h-10 w-full rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/80"
      >
        {isPending ? "Creating account..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignupForm;
