import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import {
  ArrangementPaamelding,
  ArrangementPaameldingSchema,
} from "@/schemas/arrangement";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const arrangementPaameldinger = await db.arrangementPaamelding.findMany({
      where: {
        arrangementID: params.id,
      },
    });

    return NextResponse.json({ arrangementPaameldinger }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
