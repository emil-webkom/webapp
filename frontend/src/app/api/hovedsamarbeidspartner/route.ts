import { db } from "@/lib/db";
import { createlavterskelArrangementSchema } from "@/schemas/lavterskelArrangement";
import { NextRequest, NextResponse } from "next/server";

/**
 * Function for fetching all objects active objects in hovedsamarbeidsamarbeidspartnere
 * @returns An array of all objects active objects in the table hovedsamarbeidspartnere
 */
export async function GET(req: NextRequest) {
   try {
     const hovedsamarbeidspartnere = await db.hovedsamarbeidspartner.findMany();

     return NextResponse.json(
       {
         message: "Retrieved all hovedsamarbeidspartnere",
         data: hovedsamarbeidspartnere,
       },
       { status: 200 },
     );
   } catch (error) {
     console.log("Error fetching lavterskelarrangementer");
     return NextResponse.json({ error: error }, { status: 400 });
   }
 }

/**
 * Creates a new instance of hovedsamarbeidspartner
 * @param data: { FILL OUT LATER}
 * @returns An instance of the object created or generic error message.
 */
// export async function POST(req: NextRequest) {
//      try {
//        const requestData = await req.json();
 
//        const parsedData = createlavterskelArrangementSchema.parse(requestData);
//        const newLavterskelArrangement = await db.lavterskelArrangement.create({
//          data: parsedData,
//        });
 
//        return NextResponse.json({
//          success: true,
//          message: "Arrangement created",
//          data: newLavterskelArrangement,
//        });
//      } catch (error) {
//        console.log("Error in the POST request");
//        return NextResponse.json({ error: error }, { status: 400 });
//      }
//    }