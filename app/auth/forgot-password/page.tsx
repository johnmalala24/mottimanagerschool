"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [devToken, setDevToken] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMessage(data.message);
      if (data.devToken) setDevToken(data.devToken);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9ff] px-4">
      <form onSubmit={submit} className="tonal-card rounded-xl p-lg w-full max-w-md space-y-md">
        <h1 className="text-xl font-bold">Forgot password</h1>
        <p className="text-sm text-secondary">Enter your account email to receive reset instructions.</p>
        <input className="input-premium" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        {message && <p className="text-sm text-green-700">{message}</p>}
        {devToken && (
          <p className="text-sm bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            Dev reset token: <Link href={`/auth/reset-password?email=${encodeURIComponent(email)}&token=${devToken}`} className="text-primary font-semibold underline">Reset now</Link>
          </p>
        )}
        <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? "Sending..." : "Send reset link"}</button>
        <Link href="/auth/signin" className="block text-center text-sm text-primary">Back to sign in</Link>
      </form>
    </div>
  );
}
