import { db } from "@/lib/db";
import {
  lavTerskelArrangementSchema,
  createlavterskelArrangementSchema,
} from "@/schemas/lavterskelArrangement";
import { id } from "date-fns/locale";
import { User } from "lucide-react";
import next from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const arrangementer = await db.arrangement.findMany({
      include: {
        arrangor: true,
        paameldinger: true,
      },
    });
    const lavterskelArrangement = await db.lavterskelArrangement.findMany({
      include: {
        user: true,
      },
    });
    return NextResponse.json(
      {
        message: "Retrieved all arrangementer",
        arrangementer,
        lavterskelArrangement,
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

export async function DELETE(req: NextRequest) {
  try {
    const requestData = await req.json();
    await db.lavterskelArrangement.delete({
      where: { id: requestData.id },
    });
    return NextResponse.json(
      { message: "Successfully deleted lavterskelarrangement" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
