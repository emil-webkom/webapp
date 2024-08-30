import { z } from "zod";
import { format } from "date-fns";
import { nb } from "date-fns/locale";

export const BookingSchema = z.object({
  id: z.string(),
  userID: z.string(),
  komiteID: z.string().optional(),
  item: z.enum(["KONTOR", "ONE_SOUNDBOX", "TWO_SOUNDBOXES"]),
  bookedAt: z.string().transform((str) => new Date(str)),
  duration: z.number().optional(),
});

export type Booking = z.infer<typeof BookingSchema>;

export const updateBookingSchema = BookingSchema.partial();

export const deleteBookingSchema = z.object({
  id: z.string(),
});

export const bookingFormSchema = z.object({
  item: z.enum(["ONE_SOUNDBOX", "TWO_SOUNDBOXES"]),
  bookingDate: z.date({
    required_error: "En gyldig dato er påkrevd.",
  }),
  // bookingDate: z.date().refine(
  //   (date) => {
  //     // Transform the date to the correct localization
  //     const formattedDate = format(date, "PPP", { locale: nb });
  //     return formattedDate;
  //   },
  //   { message: "Invalid date format" },
  // ),
});
