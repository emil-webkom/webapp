import { db } from "@/lib/db";
import {
  ArrangementSchema,
  createArrangementSchema,
} from "@/schemas/arrangement";
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
    const parsedData = createArrangementSchema.parse(await req.json());
    // const transformedData = {
    //   ...parsedData,
    //   paameldinger: {
    //     create: parsedData.paameldinger.map((paamelding) => ({
    //       userID: paamelding.userID,
    //       arrangementID: paamelding.arrangementID,
    //     })),
    //   },
    // };
    // const arrangement = await db.arrangement.create({
    //   data: transformedData,
    // });
    const { paameldinger, ...rest } = parsedData;

    const arrangement = await db.arrangement.create({
      data: rest,
    });
    return NextResponse.json(
      { message: "Arrangement created", arrangement },
      { status: 201 },
    );
  } catch (error) {
    console.log("Error in the POST request");
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
