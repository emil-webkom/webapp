import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { BookingSchema } from "@/schemas/booking";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userID = searchParams.get("userID");

  if (userID) {
    try {
      const bookings = await db.booking.findMany({
        where: {
          userID: userID,
        },
      });
      return NextResponse.json(bookings, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to fetch bookings" },
        { status: 500 },
      );
    }
  } else {
    try {
      const bookings = await db.booking.findMany();
      return NextResponse.json(bookings, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to fetch bookings" },
        { status: 500 },
      );
    }
  }
}

 /**
 * Creates a new instance in the booking table
 * @param data: {FILL IN}
 * @returns Response indicating if the creation was successfull.
 */
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
