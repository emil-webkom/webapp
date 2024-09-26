import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {
  updateArrangementSchema,
  deleteArrangementSchema,
  createArrangementSchema,
} from "@/schemas/arrangement";
import { z } from "zod";

export const revalidate = 0;

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const arrangement = await db.arrangement.findUnique({
      include: {
        arrangor: true,
        paameldinger: true,
      },
      where: { id: params.id },
    });
    if (!arrangement) {
      return NextResponse.json(
        { error: "Arrangement not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(arrangement, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const parsedData = deleteArrangementSchema.parse({ id: params.id });
    await db.arrangement.delete({
      where: { id: parsedData.id },
    });
    return NextResponse.json(
      { message: "Arrangement deleted" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const body = await req.json();
    const validatedData = createArrangementSchema.parse({
      ...body,
    });

    const updatedEvent = await db.arrangement.update({
      where: { id },
      data: validatedData,
    });

    if (!updatedEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 400 },
      );
    }
    console.error("Error updating event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
