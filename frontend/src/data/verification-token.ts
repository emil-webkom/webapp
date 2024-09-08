import { db } from "@/lib/db";

// export const getVerificationTokenByToken = async (token: string) => {
//   try {
//     const verificationToken = await db.verificationToken.findUnique({
//       where: { token },
//     });

//     return verificationToken;
//   } catch {
//     return null;
//   }
// };

export const getVerificationTokenByToken = async (token: string) => {
  console.log("Searching for token:", token);
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    });
    console.log("Found token:", verificationToken);
    return verificationToken;
  } catch (error) {
    console.error("Error fetching verification token:", error);
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email },
    });

    return verificationToken;
  } catch {
    return null;
  }
};
