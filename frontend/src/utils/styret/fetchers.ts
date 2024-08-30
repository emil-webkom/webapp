import { db } from "@/lib/db";
import { Hovedstyret } from "@/types/interfaces";

export async function FetchStyret() {
  try {
    const hovedstyret = await db.hovedstyret.findMany({
      include: {
        User: true,
      },
    });
    const hovedstyretdata: Hovedstyret[] = hovedstyret.map((item) => ({
      rolle: item.rolle,
      name: item.User.name!,
      text: item.text,
      mail: item.User.email,
      nummer: item.User.nummer!,
      bilde: item.image,
    }));
    return hovedstyretdata;
  } catch (error) {
    console.error("Error fetching data from Hovedstyret table:", error);
    throw error;
  }
}

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
