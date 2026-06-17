"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState(params.get("email") ?? "");
  const [token, setToken] = useState(params.get("token") ?? "");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      router.push("/auth/signin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9ff] px-4">
      <form onSubmit={submit} className="tonal-card rounded-xl p-lg w-full max-w-md space-y-md">
        <h1 className="text-xl font-bold">Reset password</h1>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <input className="input-premium" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="input-premium" placeholder="Reset token" value={token} onChange={(e) => setToken(e.target.value)} required />
        <input className="input-premium" type="password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input className="input-premium" type="password" placeholder="Confirm password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
        <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? "Resetting..." : "Reset password"}</button>
        <Link href="/auth/signin" className="block text-center text-sm text-primary">Back to sign in</Link>
      </form>
    </div>
  );
}
