import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "@/auth.config";
import { getUserById } from "@/data/user";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id!);
      if (!existingUser?.emailVerified) return false;

      return true;
    },
    async jwt({ token, user, session, trigger }) {
<<<<<<< HEAD
      // console.log("JWT callback", { token, user, session });

=======
>>>>>>> ebc4608cc9b0f399efeb793185c97cdbf7fe49f8
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

<<<<<<< HEAD
      // console.log({ user });

=======
>>>>>>> ebc4608cc9b0f399efeb793185c97cdbf7fe49f8
      return token;
    },
    async session({ token, session, user }) {
      // console.log("Session callback", { token, session, user });
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
