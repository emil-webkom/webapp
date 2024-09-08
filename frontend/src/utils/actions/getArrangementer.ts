"use server";

import { db } from "@/lib/db";

export const getArrangementerByUserId = async (userID: string) => {
  if (!userID) {
    throw new Error("User ID is required");
  }

  try {
    const arrangementer = await db.arrangement.findMany({
      include: {
        paameldinger: true,
      },
    });

    const userArrangementer = arrangementer.filter((arrangement) =>
      arrangement.paameldinger.some(
        (paamelding) => paamelding.userID === userID,
      ),
    );

    if (userArrangementer.length === 0) {
      console.log("No arrangementer found for user");
      return null;
    }

    return userArrangementer;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch arrangementer");
  }
};
