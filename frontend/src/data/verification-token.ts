import { db } from "@/lib/db";
import { VerificationToken } from "@prisma/client";



export const getVerificationTokenByToken = async (token: string): Promise<VerificationToken|null> => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    });

    return verificationToken;
  } catch (error) {
    throw error;
  }
};

export const getVerificationTokenByEmail = async (email: string): Promise<VerificationToken|null> => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email },
    });

    return verificationToken;
  } catch (error) {
    throw error;
  }
};
