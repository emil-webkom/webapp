"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

// Utility function to create a delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
let verificationInProgress = false;

export const newVerification = async (token: string) => {
  verificationInProgress = true;
  console.log("Starting verification process for token:", token);

  const existingToken = await getVerificationTokenByToken(token);
  console.log("Existing token:", existingToken);

  if (!existingToken) {
    console.log("Token not found in the database");
    return { error: "Token eksisterer ikke!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  console.log("Token utgått:", hasExpired);

  if (hasExpired) {
    return { error: "Token har gått ut!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  console.log("Existing user:", existingUser);

  if (!existingUser) {
    return { error: "Email eksisterer ikke!" };
  }

  if (existingUser.emailVerified) {
    console.log("Email already verified");
    window.location.href = "/auth/login";
    return { error: "Email allerede registrert!" };
  }

  try {
    await db.user.update({
      where: { id: existingUser.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });

    await delay(3000);

    return { success: "Email verified and token deleted!" };
  } catch (error) {
    console.error("Error updating user or deleting token:", error);
    return { error: "Failed to verify email" };
  }
};
