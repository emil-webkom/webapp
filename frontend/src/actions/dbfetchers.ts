// Page for fetcher-functions used in the page.tsx folders
// The idea is that all functions that directly fetch data from the db
// to be displayed should be stored here.

import { db } from "@/lib/db";

async function fetchStyret() {
  try {
    const hovedstyret = await db.hovedstyret.findMany({
      include: {
        User: true,
      },
    });
    console.log(hovedstyret);
  } catch (error) {
    console.error("Error fetching data from Hovedstyret table:", error);
    throw error;
  }
}

export default fetchStyret;
