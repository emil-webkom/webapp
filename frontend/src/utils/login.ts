"use server";

import * as z from "zod";
import { AuthError } from "next-auth";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/lib/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import router from "next/router";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid credentials!" };
  }

  const { email, password } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );
    if (verificationToken) {
      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
      );
    }
    return { success: "Confirmation email sent!" };
  }

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Disable default redirect to handle manually
    });

    if (result?.error) {
      return { error: "Invalid credentials" };
    }

    // Reload the session to ensure credentials are updated
    const { reloadSession } = require("next-auth/react");
    reloadSession();

    router.push(DEFAULT_LOGIN_REDIRECT);
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Something went wrong" };
    }
    throw error;
  }
};
