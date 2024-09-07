import { db } from "@/lib/db";
import { createlavterskelArrangementSchema } from "@/schemas/lavterskelArrangement";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const lavterskelArrangementer = await db.lavterskelArrangement.findMany();

    return NextResponse.json(
      {
        message: "Retrieved all lavterskelarrangementer",
        data: lavterskelArrangementer,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error fetching lavterskelarrangementer");
    return NextResponse.json({ error: error }, { status: 400 });
  }
}


export async function POST(req: NextRequest) {
    try {
      const requestData = await req.json();
  
      if (requestData.dato) {
        requestData.dato = new Date(requestData.dato);
      }
  
      const parsedData = createlavterskelArrangementSchema.parse(requestData);
      const newLavterskelArrangement = await db.lavterskelArrangement.create({
        data: parsedData,
      });
  
      return NextResponse.json({
        success: true,
        message: "Arrangement created",
        data: newLavterskelArrangement,
      });
    } catch (error) {
      console.log("Error in the POST request");
      return NextResponse.json({ error: error }, { status: 400 });
    }
  }
  