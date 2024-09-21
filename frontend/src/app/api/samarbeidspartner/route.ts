import { db } from "@/lib/db";
import { createlavterskelArrangementSchema } from "@/schemas/lavterskelArrangement";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

/**
 * Function for fetching all objects active objects in samarbeidspartnere
 * @returns An array of all objects active objects in the table samarbeidspartnere
 */
export async function GET(req: NextRequest) {
   try {
     const samarbeidspartnere = await db.samarbeidspartner.findMany({
       where: {active: true}
     });

     return NextResponse.json(
       {
         message: "Retrieved all lavterskelarrangementer",
         data: samarbeidspartnere,
       },
       { status: 200 },
     );
   } catch (error) {
     console.log("Error fetching lavterskelarrangementer");
     return NextResponse.json({ error: error }, { status: 400 });
   }
 }

/**
 * Creates a new instance of AeresEmiler
 * @param data: { FILL OUT LATER}
 * @returns An instance of the object created or generic error message.
 */
export async function POST(req: NextRequest) {
  try {
    const requestData = await req.json();

    const HSP = await db.samarbeidspartner.create({
      data: requestData,
    });

    return NextResponse.json({
      success: true,
      message: "SP created",
      data: HSP,
    });
  } catch (error) {
    console.log("Error in the POST request");
    return NextResponse.json({ error: error }, { status: 400 });
  }
}