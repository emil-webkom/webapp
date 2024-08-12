import { db } from "@/lib/db";
import { Hovedstyret } from "@/types/interfaces";

async function fetchStyret() {
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

export default fetchStyret;
