import { useState } from "react";
import SignupForm from "../components/SignupForm";
import VerifyOtpForm from "../components/VerifyOtpForm";
import LoginForm from "../components/LoginForm";
export default function SignupPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);
  return <main className="mx-auto max-w-md p-6">{verified
    ? <LoginForm />
    : email
      ? <VerifyOtpForm email={email} onContinue={() => setVerified(true)} />
      : <SignupForm onRegistered={setEmail} />}</main>;
}
