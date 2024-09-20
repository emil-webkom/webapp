import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const revalidate = 0;
/**
 * Function for fetching all objects in AeresEmiler
 * @returns An array of all objects in the table AeresEmiler
 */
export async function GET(request: NextRequest) {
  try {
    const aeresemilere = await db.aeresEmiler.findMany();
    return NextResponse.json(aeresemilere, { status: 200 });
  } catch (error) {
    console.error("Error fetching aeresEmilere:", error);
    return NextResponse.json(
      { error: "Failed to fetch aeresEmilere" },
      { status: 500 },
    );
  }
}

/**
 * Creates a new instance of AeresEmiler
 * @param data: { aar: number; type: string; navn: string }
 * @returns An instance of the object created or generic error message.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { aar, type, navn } = body;

    // Validate the required fields
    if (!aar || !type || !navn) {
      return NextResponse.json(
        { error: "All fields (aar, type, navn) are required" },
        { status: 400 },
      );
    }

    const aeresemilere = await db.aeresEmiler.create({
      data: {
        aar,
        type,
        navn,
      },
    });

    return NextResponse.json(
      {
        message: "AeresEmiler created successfully",
        aeresemilere: aeresemilere,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating AeresEmiler", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
