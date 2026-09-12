import { type FormEvent } from "react";

const fieldClassName =
  "h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/30";

const SignupForm = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="signup-name">
          Full Name
        </label>
        <input
          id="signup-name"
          className={fieldClassName}
          type="text"
          placeholder="Enter your name"
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
          className={fieldClassName}
          type="password"
          placeholder="Create a password"
          autoComplete="new-password"
          required
        />
      </div>

      <button
        type="submit"
        className="h-10 w-full rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/80"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
