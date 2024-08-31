'use server'

import { db } from "@/lib/db";

/**
 * Retrieves bookings by a specific date.
 *
 * @param bookingDate - The date to filter bookings by.
 * @returns An array of bookings matching the specified date.
 * @throws {Error} If there was an error fetching the bookings.
 */
export const getBookingsByDate = async (bookingDate: Date) => {
  try {
    const bookings = db.booking.findMany({
      where: {
        bookedAt: bookingDate,
      },
    });
    return bookings;
  } catch (error) {
    console.error("Error fetching bookings by date:", error);
    throw new Error("Could not fetch bookings");
  }
};

export const getBookingList = async () =>{
  try {
    const bookings = await db.booking.findMany();
    return bookings
  }catch (error){
    console.error("Error fetching bookings by date:", error);
    throw new Error("Could not fetch bookings");
  }
}

export const getBookingsByUserID = async (userID: string) => {
  try {
    const user = db.user.findUnique({
      where: {
        id: userID,
      },
      include: {
        bookings: true,
      },
    });

    if (!user) {
      return { error: "Could not find user." };
    }

    if (!user.bookings) {
      return { message: "No current bookings" };
    }

    return user.bookings;
  } catch (error) {
    return { error: "Could not find bookings." };
  }
};
