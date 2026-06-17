"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import ProfilePhotoUpload from "@/components/portal/ProfilePhotoUpload";

export default function UserProfileSettings() {
  const { data: session, update } = useSession();
  const [name, setName] = useState(session?.user?.name ?? "");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState<string | null>(session?.user?.image ?? null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (password && password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || undefined,
          phone: phone.trim() || undefined,
          image,
          password: password || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Update failed");
        return;
      }
      setMessage("Profile updated successfully.");
      setPassword("");
      setConfirmPassword("");
      await update();
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={save} className="tonal-card rounded-xl p-lg max-w-xl space-y-md">
      <h3 className="text-title-md font-bold">My Profile</h3>
      <p className="text-sm text-secondary">{session?.user?.email}</p>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {message && <p className="text-sm text-green-700">{message}</p>}

      <ProfilePhotoUpload value={image} onChange={setImage} />

      <input
        className="input-premium"
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="input-premium"
        placeholder="Phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <div className="border-t border-outline-variant pt-md space-y-md">
        <p className="text-label-md font-semibold">Change password</p>
        <input
          type="password"
          className="input-premium"
          placeholder="New password (min 8 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="input-premium"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <button type="submit" disabled={loading} className="btn-primary !w-auto px-6">
        {loading ? "Saving..." : "Save profile"}
      </button>
    </form>
  );
}
