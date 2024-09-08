// "use server";

// import { db } from "@/lib/db";
// import { getUserByEmail } from "@/data/user";
// import { getVerificationTokenByToken } from "@/data/verification-token";

// export const newVerification = async (token: string) => {
//   const existingToken = await getVerificationTokenByToken(token);

//   const user = existingToken ? await getUserByEmail(existingToken.email) : null;

//   if (user?.emailVerified) {
//     return { error: "Email already verified!" };
//   }

//   if (!existingToken) {
//     return { error: "Token does not exist!" };
//   }

//   const hasExpired = new Date(existingToken.expires) < new Date();

//   if (hasExpired) {
//     return { error: "Token has expired!" };
//   }

//   const existingUser = await getUserByEmail(existingToken.email);

//   if (!existingUser) {
//     return { error: "Email does not exist!" };
//   }

//   await db.user.update({
//     where: { id: existingUser.id },
//     data: {
//       emailVerified: new Date(),
//       email: existingToken.email,
//     },
//   });

//   await db.verificationToken.delete({
//     where: { id: existingToken.id },
//   });

//   return { success: "Email verified!" };
// };

"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const newVerification = async (token: string) => {
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

    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });

    console.log("Email verified successfully");
    return { success: "Email verified!" };
  } catch (error) {
    console.error("Error updating user or deleting token:", error);
    return { error: "Failed to verify email" };
  }
};
