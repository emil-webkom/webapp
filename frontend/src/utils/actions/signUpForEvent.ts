"use server";

import { getUserById } from "@/data/user";
import { db } from "@/lib/db";

export const signUpForEvent = async (
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
    return { error: "Du er allerede påmeldt dette arrangementet." };
  }

  const antallPaameldte = arrangement.paameldinger.length;

  if (
    arrangement.kapasitet !== null &&
    antallPaameldte >= arrangement.kapasitet
  ) {
    return { error: "Arrangmentet er dessverre fullt!" };
  }

  try {
    await db.arrangementPaamelding.create({
      data: {
        user: {
          connect: {
            id: userID,
          },
        },
        arrangement: {
          connect: {
            id: arrangementID,
          },
        },
      },
    });

    return {
      success: `Du har meldt deg på arrangementet: ${arrangement.navn}`,
    };
  } catch (error) {
    return { error: "Something went wrong." };
  }
};
