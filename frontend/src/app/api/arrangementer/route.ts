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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received body:", body);

    const parsedBody = {
      ...body,
      dato: body.dato ? new Date(body.dato) : undefined,
    };

    const validatedData = createArrangementSchema.parse(parsedBody);
    console.log("Validated data:", validatedData);

    const newEvent = await db.arrangement.create({
      data: {
        ...validatedData,
        paameldinger: {
          create: [],
        },
      },
    });

    console.log("New event created:", newEvent);

    return NextResponse.json(
      { message: "Arrangement created successfully", data: newEvent },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error in POST /api/arrangementer:", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 },
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Database error", message: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
