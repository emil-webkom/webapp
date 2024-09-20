import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { updateBookingSchema, deleteBookingSchema } from "@/schemas/booking";

export const revalidate = 0;

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const booking = await db.booking.findUnique({
      where: { id: params.id },
    });
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }
    return NextResponse.json(booking, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const parsedData = updateBookingSchema.parse(await req.json());
    const booking = await db.booking.update({
      where: { id: params.id },
      data: parsedData,
    });
    return NextResponse.json(
      { message: "Booking updated", booking },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const parsedData = deleteBookingSchema.parse({ id: params.id });
    await db.booking.delete({
      where: { id: parsedData.id },
    });
    return NextResponse.json({ message: "Booking deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
