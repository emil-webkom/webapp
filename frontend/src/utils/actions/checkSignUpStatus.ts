"use server";

import { db } from "@/lib/db";

export const checkSignUpStatus = async (
  arrangementID: string,
  userID: string,
) => {
  const existingPaamelding = await db.arrangementPaamelding.findFirst({
    where: {
      arrangementID,
      userID,
    },
  });

  return { isSignedUp: !!existingPaamelding };
};
