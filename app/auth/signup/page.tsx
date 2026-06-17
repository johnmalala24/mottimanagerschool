"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const schoolTypes = [
  { value: "PRIMARY", label: "Primary School" },
  { value: "SECONDARY", label: "Secondary School" },
  { value: "MIXED", label: "Mixed (Primary & Secondary)" },
];

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    schoolName: "",
    schoolEmail: "",
    phone: "",
    schoolType: "PRIMARY",
    principalName: "",
    city: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/schools/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          schoolName: formData.schoolName,
          schoolEmail: formData.schoolEmail,
          phone: formData.phone,
          schoolType: formData.schoolType,
          principalName: formData.principalName,
          city: formData.city || undefined,
          password: formData.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      const signInResult = await signIn("credentials", {
        email: formData.schoolEmail,
        password: formData.password,
        redirect: false,
      });

      if (signInResult?.error) {
        router.push("/auth/signin");
        return;
      }

      router.push("/setup");
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="hidden lg:flex lg:w-[45%] auth-panel-gradient flex-col justify-between p-10 xl:p-14 relative">
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 group mb-16">
            <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
              <span className="material-symbols-outlined icon-filled text-white text-[22px]">school</span>
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight">MottiManager</span>
          </Link>
          <h1 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight mb-5">
            Register your<br />
            <span className="bg-gradient-to-r from-[#62df7d] to-[#89ceff] bg-clip-text text-transparent">
              school today.
            </span>
          </h1>
          <p className="text-white/70 text-base leading-relaxed max-w-sm">
            Create your school account and become the School Administrator. Complete the setup wizard to go live.
          </p>
        </div>
        <div className="relative z-10 space-y-3">
          {[
            "You become the School Admin (Principal)",
            "Guided setup wizard after signup",
            "M-Pesa, CBE & multi-portal ready",
            "Free to get started",
          ].map((text) => (
            <div key={text} className="flex items-center gap-3">
              <span className="material-symbols-outlined icon-filled text-[#62df7d] text-[20px]">check_circle</span>
              <span className="text-white/80 text-sm font-medium">{text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex items-start lg:items-center justify-center px-5 sm:px-8 py-8 lg:py-10 bg-[#f8f9ff]">
        <div className="w-full max-w-[480px]">
          <div className="glass-card-elevated rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-extrabold text-[#0b1c30] mb-1.5">Register Your School</h2>
            <p className="text-sm text-[#545f73] mb-6">
              The principal or director who registers becomes the School Administrator.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {error && (
                <div className="flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-200 rounded-xl">
                  <span className="material-symbols-outlined text-red-500 text-[20px]">error</span>
                  <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-[#0b1c30] mb-1.5">School Name</label>
                <input name="schoolName" value={formData.schoolName} onChange={handleChange} required className="input-premium" placeholder="Greenwood Academy" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-[#0b1c30] mb-1.5">School Type</label>
                  <select name="schoolType" value={formData.schoolType} onChange={handleChange} className="input-premium">
                    {schoolTypes.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0b1c30] mb-1.5">City</label>
                  <input name="city" value={formData.city} onChange={handleChange} className="input-premium" placeholder="Nairobi" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0b1c30] mb-1.5">Principal / Director Name</label>
                <input name="principalName" value={formData.principalName} onChange={handleChange} required className="input-premium" placeholder="Samuel Mwangi" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0b1c30] mb-1.5">School Email</label>
                <input name="schoolEmail" type="email" value={formData.schoolEmail} onChange={handleChange} required className="input-premium" placeholder="admin@school.ac.ke" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0b1c30] mb-1.5">Phone Number</label>
                <input name="phone" type="tel" value={formData.phone} onChange={handleChange} required className="input-premium" placeholder="+254712345678" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0b1c30] mb-1.5">Password</label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                    className="input-premium !pr-11"
                    placeholder="Min. 8 characters"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]">
                    <span className="material-symbols-outlined text-[20px]">{showPassword ? "visibility_off" : "visibility"}</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0b1c30] mb-1.5">Confirm Password</label>
                <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required className="input-premium" />
              </div>

              <button type="submit" disabled={isLoading} className="btn-primary w-full">
                {isLoading ? "Creating school..." : "Create School Account"}
              </button>
            </form>

            <p className="mt-5 pt-4 border-t border-[#E2E8F0] text-center text-sm text-[#545f73]">
              Already have an account?{" "}
              <Link href="/auth/signin" className="text-[#006b2c] font-bold hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
