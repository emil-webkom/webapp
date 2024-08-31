import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import {
  ArrangementPaamelding,
  ArrangementPaameldingSchema,
} from "@/schemas/arrangement";
import { id } from "date-fns/locale";
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const arrangementPaamelding = await db.arrangementPaamelding.findUnique({
      where: {
        id: params.id,
      },
      include: {
        arrangement: true,
      },
    });

    if (arrangementPaamelding) {
      await db.arrangementPaamelding.delete({
        where: {
          id: params.id,
        },
      });

      return NextResponse.json(
        {
          success: `Du har meldt deg av: ${arrangementPaamelding.arrangement.navn}`,
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { error: "ArrangementPaamelding not found." },
        { status: 404 },
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
