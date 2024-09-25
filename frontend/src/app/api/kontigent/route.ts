import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const revalidate = 0;
/**
 * Function for fetching Kontigent
 * @returns An array of the kontigent
 */
export async function GET(request: NextRequest) {
  try {
    const kontigent = await db.kontigentpris.findMany();
    return NextResponse.json({status: 200, data: kontigent});
  } catch (error) {
    console.error("Error fetching aeresEmilere:", error);
    return NextResponse.json(
      { error: "Failed to fetch aeresEmilere" },
      { status: 500 },
    );
  }
}
