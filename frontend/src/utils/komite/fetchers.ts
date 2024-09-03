import { db } from "@/lib/db";
import { KomiteLogo } from "@/types/interfaces";

async function fetchKomite() {
  try {
    const komiteinfo = await db.komite.findMany();

    return komiteinfo;
  } catch (error) {
    console.error("Error fetching logos about komitee");
    throw error;
  }
}

export default fetchKomite;
