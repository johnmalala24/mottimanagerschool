import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

async function enrichToken(token: Record<string, unknown>) {
  const userId = token.id as string | undefined;
  const schoolId = token.schoolId as string | null | undefined;

  if (userId) {
    const teacher = await prisma.teacher.findUnique({
      where: { userId },
      select: {
        isClassTeacher: true,
        classesTeaching: { select: { id: true }, take: 1 },
      },
    });
    token.isClassTeacher = Boolean(
      teacher?.isClassTeacher || (teacher?.classesTeaching.length ?? 0) > 0
    );
  } else {
    token.isClassTeacher = false;
  }

  if (schoolId) {
    const settings = await prisma.schoolSettings.findUnique({
      where: { schoolId },
      select: { setupCompleted: true, disabledRoles: true },
    });
    token.setupCompleted = settings?.setupCompleted ?? false;
    token.disabledRoles = settings?.disabledRoles ?? [];
  } else {
    token.setupCompleted = true;
    token.disabledRoles = [];
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as NextAuthOptions["adapter"],
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid email or password");
        }

        if (!user.active) {
          throw new Error("Account is deactivated");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
          schoolId: user.schoolId,
        };
      },
    }),
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role;
        token.schoolId = (user as { schoolId?: string | null }).schoolId;
      }
      if (user || trigger === "update") {
        await enrichToken(token as Record<string, unknown>);
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const u = session.user as {
          id?: string;
          role?: string;
          schoolId?: string | null;
          isClassTeacher?: boolean;
          setupCompleted?: boolean;
        };
        u.id = token.id as string;
        u.role = token.role as string;
        u.schoolId = token.schoolId as string | null;
        u.isClassTeacher = token.isClassTeacher as boolean;
        u.setupCompleted = token.setupCompleted as boolean;
        (u as { disabledRoles?: string[] }).disabledRoles = (token.disabledRoles as string[]) ?? [];
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
