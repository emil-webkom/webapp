"use server";
import { db } from "@/lib/db";
import { Kontigent } from "@prisma/client";

// returns the kontigentvalue stored in the DB
export async function getKontigent() {
  try {
    const kontigent = await db.kontigentpris.findMany();

    return { success: true, data: kontigent };
  } catch (error) {
    console.error("Error fetching user kontigen:", error);

    return { success: false, error: "Failed to fetch user kontigent" };
  }
}
