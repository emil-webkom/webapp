import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { BookingSchema } from "@/schemas/booking";

export async function GET() {
  const bookings = await db.booking.findMany();
  return NextResponse.json(bookings, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const parsedData = BookingSchema.parse(await req.json());
    const booking = await db.booking.create({
      data: parsedData,
    });
    return NextResponse.json(
      { message: "Booking created", booking },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
