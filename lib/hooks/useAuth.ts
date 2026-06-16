"use client";

import { useSession as useNextAuthSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { data: session, status } = useNextAuthSession();
  const router = useRouter();

  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";
  const user = session?.user;

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/auth/signin");
  };

  const handleSignIn = async (email: string, password: string) => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      throw new Error(result.error);
    }

    router.push("/");
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    signOut: handleSignOut,
    signIn: handleSignIn,
  };
}

export { useNextAuthSession as useSession, signIn, signOut };
