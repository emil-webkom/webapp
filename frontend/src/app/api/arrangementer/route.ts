import { db } from "@/lib/db";
import { createArrangementSchema } from "@/schemas/arrangement";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const arrangementer = await db.arrangement.findMany({
      include: {
        arrangor: true,
        paameldinger: true,
      },
    });

    return NextResponse.json(
      {
        message: "Retrieved all arrangementer",
        data: arrangementer,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error fetching arrangementer");
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

// export async function POST(req: NextRequest) {
//   try {
//     const data = await req.json();

//     const validatedData = createArrangementSchema.parse({
//       ...data,
//       paameldinger: {
//         create: data.paameldinger || [],
//       },
//     });

//     const newEvent = await db.arrangement.create({
//       data: {
//         ...validatedData,
//         paameldinger: {
//           create: validatedData.paameldinger,
//         },
//       },
//     });
//     return NextResponse.json(newEvent, { status: 201 });
//   } catch (error) {
//     console.error("Error creating event:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validate the input data
    const validatedData = createArrangementSchema.parse(data);

    // Create the new event
    const newEvent = await db.arrangement.create({
      data: {
        ...validatedData,
        paameldinger: {
          create: validatedData.paameldinger || [],
        },
      },
      include: {
        paameldinger: true,
      },
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 },
      );
    }

    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
