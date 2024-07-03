/* trunk-ignore-all(prettier) */
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import { toast } from "sonner";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {

        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) {
            return null;
          }
          const passwordsMatch = await bcrypt.compare(
            password,
            user.password
          );
          if (passwordsMatch) {
            // toast("Logged in");
            return user;
          }
        }
        return null;
      }
    }),
  ],
} satisfies NextAuthConfig;