import { db } from "@/lib/db";
import { ArrangementSchema } from "@/schemas/arrangement";
import { NextRequest, NextResponse } from "next/server";

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
        arrangementer,
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
    const parsedData = ArrangementSchema.parse(await req.json());
    const booking = await db.arrangement.create({
      data: parsedData,
    });
    return NextResponse.json(
      { message: "Arrangement created", booking },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
