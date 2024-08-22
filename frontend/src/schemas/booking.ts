import { z } from "zod";

export const BookingSchema = z.object({
  userID: z.string(),
  komiteID: z.string().optional(),
  item: z.enum(["KONTOR", "ONE_SOUNDBOX", "TWO_SOUNDBOXES"]),
  bookedAt: z.string().transform((str) => new Date(str)),
  duration: z.number(),
});

export type Booking = z.infer<typeof BookingSchema>;

export const updateBookingSchema = BookingSchema.partial();

export const deleteBookingSchema = z.object({
  id: z.string(),
});