import { db } from "@/lib/db";
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
