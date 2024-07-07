// Page for fetcher-functions used in the page.tsx folders
// The idea is that all functions that directly fetch data from the db
// to be displayed should be stored here.

import { db } from "@/lib/db";
import { number } from "zod";

interface Hovedstyret {
        rolle: string,
        name: string,
        text: string,
        mail: string,
        nummer: number,
        bilde: string,
}

async function fetchStyret() {
  try {
    const hovedstyret = await db.hovedstyret.findMany({
      include: {
        User: true,
      },
    });
    const hovedstyretdata: Hovedstyret[] = hovedstyret.map(item => ({
      rolle: item.rolle,
      name: item.User.name!,
      text: item.text,
      mail: item.User.email,
      nummer: item.User.nummer!,
      bilde: item.image
    }));
    return hovedstyretdata;
  } catch (error) {
    console.error("Error fetching data from Hovedstyret table:", error);
    throw error;
  }
}

export default fetchStyret;
