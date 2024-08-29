"use server";

import * as z from "zod";
import { bookingFormSchema } from "@/schemas/booking";
import { getBookingsByDate } from "@/data/booking";
import { db } from "@/lib/db";
import { BookedItem } from "@prisma/client";

export const checkBooking = async (
  values: z.infer<typeof bookingFormSchema>,
  id: string,
) => {
  const validatedFields = bookingFormSchema.safeParse(values);

  if (!validatedFields.success || id === "") {
    return { error: "Invalid details!" };
  }

  const { item, bookingDate } = validatedFields.data;

  // Check if the booking date is in the past
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  if (new Date(bookingDate) < now) {
    return { error: "Booking date cannot be in the past!" };
  }

  const existingBookings = await getBookingsByDate(bookingDate);

  if (existingBookings) {
    const oneSoundboxCount = existingBookings.filter(
      (booking) => booking.item === BookedItem.ONE_SOUNDBOX,
    ).length;

    const twoSoundboxesExists = existingBookings.some(
      (booking) => booking.item === BookedItem.TWO_SOUNDBOXES,
    );

    if (twoSoundboxesExists || oneSoundboxCount >= 2) {
      return { error: "Soundboxes already booked!" };
    }

    if (oneSoundboxCount === 1 && item === BookedItem.TWO_SOUNDBOXES) {
      return {
        error: "Cannot book 2 Soundboxes when 1 Soundbox is already booked!",
      };
    }
  }

  // No existing bookings, create a new booking
  try {
    const newBooking = await db.booking.create({
      data: {
        item: item as BookedItem,
        bookedAt: bookingDate,
        user: {
          connect: { id: id },
        },
      },
    });
    return { success: "Booking successful!", booking: newBooking };
  } catch (error) {
    console.error("Error creating new booking:", error);
    return { error: "Could not create booking" };
  }
};
