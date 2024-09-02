"use server";

import { getUserById } from "@/data/user";
import { db } from "@/lib/db";

export const cancelEvent = async (
  arrangementID: string,
  userID: string | undefined,
) => {
  const arrangement = await db.arrangement.findUnique({
    where: { id: arrangementID },
    include: {
      paameldinger: true,
    },
  });

  if (!arrangement) return { error: "Kunne ikke finne arrangement." };

  const user = userID ? await getUserById(userID) : null;

  if (!user) return { error: "Finner ikke bruker." };

  // Check if the user is already signed up for the event
  const existingPaamelding = await db.arrangementPaamelding.findFirst({
    where: {
      arrangementID: arrangementID,
      userID: userID,
    },
  });

  if (existingPaamelding) {
    try {
      await db.arrangementPaamelding.delete({
        where: {
          id: existingPaamelding.id,
        },
      });
      return {
        success: `Du har meldt deg av arrangementet: ${arrangement.navn}`,
      };
    } catch (error) {
      return { error: "Something went wrong." };
    }
  } else {
    return { error: "Ingen påmelding funnet." };
  }
};
