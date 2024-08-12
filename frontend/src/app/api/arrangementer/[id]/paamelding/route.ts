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

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const arrangement = await db.arrangement.findFirst({
      where: { id: params.id },
    });

    if (!arrangement) {
      return NextResponse.json({ error: "Arrangement not found" });
    }
    const parsedData = ArrangementPaameldingSchema.parse(await req.json());
    console.log(parsedData);
    const arrangementPaamelding = await db.arrangementPaamelding.create({
      data: parsedData,
    });

    await db.user.update({
      where: { id: parsedData.userID },
      data: {
        paameldinger: {
          connect: { id: arrangementPaamelding.id },
        },
      },
    });

    await db.arrangement.update({
      where: { id: params.id },
      data: {
        paameldinger: {
          connect: { id: arrangementPaamelding.id },
        },
      },
    });

    return NextResponse.json(
      { message: "Paamelding successfull", arrangementPaamelding },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
