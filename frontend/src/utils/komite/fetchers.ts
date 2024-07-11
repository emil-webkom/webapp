import { db } from "@/lib/db";
import { KomiteLogo } from "@/types/interfaces";

async function fetchKomite() {
    try{ 
        const komiteinfo = await db.komite.findMany();

        const logoinformation: KomiteLogo[] = komiteinfo.map(item =>({
            komite: item.navn,
            bilde: item.bilde,
            mappe: item.mappe,
        }));
        return logoinformation;
    } catch (error){
        console.error("Error fetching logos about komitee");
        throw error;
    }
}

export default fetchKomite;