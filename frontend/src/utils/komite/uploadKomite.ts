"use server";

import { db } from "@/lib/db";
import errorMap from "zod/locales/en.js";
import { komiteInput } from "@/types/interfaces";
// No input checks here. Should be performed here or in HTML-section.

async function storeData(komitedata: komiteInput){

    try{
        const komite = await db.komite.create({
            data: {
                navn: komitedata.navn,
                leder: komitedata.leder,
                text1: komitedata.text1,
                text2: komitedata.text2,
                text3: komitedata.text3,
                bilde: komitedata.bildeurl,
                mail: komitedata.mail,
                Mappe: komitedata.mappe,
            },
        });
        console.log("Komite created successfully");
        return komite;
    }
    catch (error){
        console.error("Error creating komite");
    }
}
export default storeData;
