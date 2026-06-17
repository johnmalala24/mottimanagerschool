"use client";

import { useState, Suspense } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        const session = await getSession();
        const role = (session?.user as { role?: string })?.role;
        const isClassTeacher = (session?.user as { isClassTeacher?: boolean })?.isClassTeacher;
        const setupCompleted = (session?.user as { setupCompleted?: boolean })?.setupCompleted;

        const adminHost = process.env.NEXT_PUBLIC_ADMIN_HOST ?? "admin.mottimanager.com";
        const adminOrigin =
          process.env.NODE_ENV === "production"
            ? `https://${adminHost}`
            : `${window.location.protocol}//admin.localhost${window.location.port ? `:${window.location.port}` : ":3000"}`;

        if (role === "SUPER_ADMIN") {
          window.location.href = `${adminOrigin}/super-admin`;
          return;
        }

        if (callbackUrl === "/") {
          if (role === "SCHOOL_ADMIN" && setupCompleted === false) {
            router.push("/setup");
            return;
          }
          const routes: Record<string, string> = {
            SCHOOL_ADMIN: "/school-admin",
            DEPUTY_ADMIN: "/deputy-admin",
            ICT_ADMIN: "/ict-admin",
            TEACHER: "/teacher",
            CLASS_TEACHER: "/class-teacher",
            STUDENT: "/student",
            PARENT: "/parent",
            LIBRARIAN: "/librarian",
            FINANCE: "/finance",
            RECEPTIONIST: "/receptionist",
            TRANSPORT_MANAGER: "/transport",
            HOSTEL_MANAGER: "/hostel-manager",
            ADMISSIONS_OFFICER: "/admissions",
          };
          const dest = role ? routes[role] : undefined;
          if (dest) {
            router.push(isClassTeacher && role === "TEACHER" ? "/teacher" : dest);
          } else {
            router.push("/");
          }
        } else {
          router.push(callbackUrl);
        }
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* ===== Left Panel — Branding (hidden on mobile, visible on lg+) ===== */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[42%] auth-panel-gradient flex-col justify-between p-10 xl:p-14 relative">
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 group mb-16">
            <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-colors">
              <span className="material-symbols-outlined icon-filled text-white text-[22px]">school</span>
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight">MottiManager</span>
          </Link>

          <h1 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight mb-5">
            Welcome back to<br />
            <span className="bg-gradient-to-r from-[#62df7d] to-[#89ceff] bg-clip-text text-transparent">
              your school portal.
            </span>
          </h1>
          <p className="text-white/70 text-base leading-relaxed max-w-sm">
            Sign in to access your dedicated dashboard with real-time data, analytics, and management tools.
          </p>
        </div>

        {/* Bottom decorative info */}
        <div className="relative z-10 space-y-4">
          <div className="glass-dark rounded-2xl p-5">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 bg-[#62df7d]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[#62df7d] text-[20px] icon-filled">shield</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm mb-1">Enterprise-Grade Security</p>
                <p className="text-white/50 text-xs leading-relaxed">End-to-end encryption, role-based access control, and ISO 27001 compliant infrastructure.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-white/40 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#44b649] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#44b649]"></span>
            </span>
            1,482 schools connected · 99.9% uptime
          </div>
        </div>

        {/* Background decorative circles */}
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#62df7d]/8 blur-3xl" />
      </div>

      {/* ===== Right Panel — Sign In Form ===== */}
      <div className="flex-1 flex items-center justify-center px-5 sm:px-8 py-10 sm:py-16 bg-[#f8f9ff] relative">
        {/* Mobile header (visible only on < lg) */}
        <div className="absolute top-0 left-0 right-0 lg:hidden">
          <div className="hero-gradient px-5 pt-10 pb-14 text-center">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                <span className="material-symbols-outlined icon-filled text-white text-[20px]">school</span>
              </div>
              <span className="text-lg font-extrabold text-white">MottiManager</span>
            </Link>
            <h1 className="text-xl font-extrabold text-white">Welcome Back</h1>
            <p className="text-white/70 text-sm mt-1">Sign in to your school portal</p>
          </div>
        </div>

        <div className="w-full max-w-[420px] mt-40 lg:mt-0">
          {/* Form card */}
          <div className="animate-scale-in glass-card-elevated rounded-2xl p-6 sm:p-8">
            <div className="hidden lg:block mb-6">
              <h2 className="text-2xl font-extrabold text-[#0b1c30] mb-1.5">Sign In</h2>
              <p className="text-sm text-[#545f73]">Enter your credentials to access your portal.</p>
            </div>

            <div className="lg:hidden mb-6 text-center">
              <h2 className="text-xl font-extrabold text-[#0b1c30] mb-1">Sign In</h2>
              <p className="text-sm text-[#545f73]">Enter your credentials below.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="animate-fade-in flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-200 rounded-xl">
                  <span className="material-symbols-outlined text-red-500 text-[20px] mt-0.5">error</span>
                  <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
              )}

              <div>
                <label htmlFor="signin-email" className="block text-sm font-semibold text-[#0b1c30] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#94a3b8] text-[20px]">mail</span>
                  <input
                    id="signin-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@school.edu"
                    required
                    className="input-premium !pl-11"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="signin-password" className="block text-sm font-semibold text-[#0b1c30] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#94a3b8] text-[20px]">lock</span>
                  <input
                    id="signin-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="input-premium !pl-11 !pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#545f73] transition-colors"
                    tabIndex={-1}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary mt-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px]">login</span>
                    Sign In
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-[#E2E8F0]">
              <p className="text-center text-sm text-[#545f73]">
                Don&apos;t have an account?{" "}
                <Link href="/auth/signup" className="text-[#006b2c] font-bold hover:underline transition-colors">
                  Create one
                </Link>
              </p>
            </div>
          </div>

          {/* Trust badges below card */}
          <div className="mt-6 flex items-center justify-center gap-4 text-[#94a3b8]">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="material-symbols-outlined text-[16px]">lock</span>
              <span>256-bit SSL</span>
            </div>
            <div className="w-px h-3.5 bg-[#E2E8F0]" />
            <div className="flex items-center gap-1.5 text-xs">
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              <span>GDPR Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignIn() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9ff]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#006b2c] to-[#00873a] rounded-xl flex items-center justify-center animate-pulse-glow">
            <span className="material-symbols-outlined icon-filled text-white text-[22px]">school</span>
          </div>
          <p className="text-sm text-[#545f73] font-medium">Loading...</p>
        </div>
      </div>
    }>
      <SignInContent />
    </Suspense>
  );
}
