import { db } from "@/lib/db";
import { Hovedstyret } from "@/types/interfaces";

// export async function FetchStyret() {

// }

export async function fetchStyretRolle(rolleToFind: string) {
  try {
    const hovedstyretRollerData = await db.hovedstyret.findUnique({
      where: {
        rolle: `${rolleToFind}`,
      },
    });

    return hovedstyretRollerData;
  } catch (error) {
    console.error("Error fetching data from Hovedstyret table:", error);
    throw error;
  }
}
