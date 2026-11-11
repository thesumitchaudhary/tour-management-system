import { useEffect, useState, type FormEvent } from "react";
import { isAxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import SigninForm from "@/features/auth/components/SigninForm";

type Profile = { firstName: string; lastName: string; email: string };
type ProfileResponse = { success: boolean; message: string; data: Profile };
const fieldClass = "mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export default function ProfileForm() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsLogin, setNeedsLogin] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const result = await api.get<{ success: boolean; message: string }>("/traveller/logout");
      if (!result.success) throw new Error(result.message);
      return result;
    },
    retry: false,
    onMutate: () => {
      setError("");
      setMessage("");
    },
    onSuccess: () => {
      setProfile(null);
      setNeedsLogin(true);
    },
    onError: () => {
      setError("Unable to log out. Please try again.");
    },
  });
  const loggingOut = logoutMutation.isPending;

  async function loadProfile() {
    try {
      const result = await api.get<ProfileResponse>("/traveller/profile");
      if (!result.success) throw new Error(result.message);
      setProfile(result.data);
      setNeedsLogin(false);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) setNeedsLogin(true);
      else setError("Unable to load your profile. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let active = true;
    void Promise.resolve().then(() => {
      if (active) void loadProfile();
    });
    return () => { active = false; };
  }, []);

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving || loggingOut) return;
    const data = new FormData(event.currentTarget);
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const result = await api.put<ProfileResponse>("/traveller/profile", {
        firstName: String(data.get("firstName")).trim(),
        lastName: String(data.get("lastName")).trim(),
      });
      if (!result.success) throw new Error(result.message);
      setProfile(result.data);
      setMessage(result.message);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        setProfile(null);
        setNeedsLogin(true);
      } else setError(isAxiosError<{ message: string }>(error)
        ? error.response?.data.message ?? "Unable to save profile. Please try again."
        : "Unable to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p role="status" className="mt-5 text-sm">Loading profile...</p>;
  if (needsLogin) return <div className="mt-5"><p className="mb-4 text-sm text-muted-foreground">Sign in to view and change your profile.</p><SigninForm onSuccess={() => void loadProfile()} /></div>;

  return <div className="mt-5">
    {profile && <form onSubmit={saveProfile} className="space-y-4">
      <label className="block text-sm font-medium" htmlFor="profile-first-name">First name
        <input id="profile-first-name" name="firstName" autoComplete="given-name" defaultValue={profile.firstName} required maxLength={100} pattern=".*\S.*" className={fieldClass} />
      </label>
      <label className="block text-sm font-medium" htmlFor="profile-last-name">Last name
        <input id="profile-last-name" name="lastName" autoComplete="family-name" defaultValue={profile.lastName} required maxLength={100} pattern=".*\S.*" className={fieldClass} />
      </label>
      <label className="block text-sm font-medium" htmlFor="profile-email">Email
        <input id="profile-email" type="email" value={profile.email} readOnly className={`${fieldClass} bg-muted text-muted-foreground`} />
      </label>
      <button disabled={saving || loggingOut} className="h-10 w-full rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50" type="submit">{saving ? "Saving..." : "Save changes"}</button>
    </form>}
    {profile && <button
      type="button"
      onClick={() => {
        if (!saving && !loggingOut) logoutMutation.mutate();
      }}
      disabled={saving || loggingOut}
      className="mt-3 h-10 w-full rounded-md border border-destructive px-4 text-sm font-medium text-destructive transition hover:bg-destructive/10 disabled:opacity-50"
    >
      {loggingOut ? "Logging out..." : "Log out"}
    </button>}
    {error && <p role="alert" className="mt-3 text-sm text-destructive">{error}</p>}
    {error && !profile && <button type="button" onClick={() => { setError(""); setLoading(true); void loadProfile(); }} className="mt-3 text-sm underline">Try again</button>}
    {message && <p role="status" className="mt-3 text-sm">{message}</p>}
  </div>;
}


