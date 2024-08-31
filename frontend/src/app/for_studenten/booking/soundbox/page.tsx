"use client";

import BookingForm from "@/components/ForStudenten/booking/booking-form";
import BookingWindow from "@/components/ForStudenten/booking/booking-window";
import { Booking } from "@/schemas/booking";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { getBookingList } from "@/utils/booking/booking";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import router from "next/router";

const SoundboxPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetchBookings();
    console.log(bookings);
  }, []);

  const fetchBookings = async () => {
    try {
      const bookings = await getBookingList();
      if (bookings) {
        const transformedBookings = bookings.map((booking) => ({
          ...booking,
        }));
        setBookings(transformedBookings);
      }
    } catch (err) {
      console.error("Could not fetch bookings:", err);
    }
  };
  const handleStatusChange = (status: string) => {
    if (status === "Booking successful!") {
      fetchBookings();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#225654] rounded-b-md gap-y-4 px-4">
      <div className="flex justify-start w-full">
        <Link href="/for_studenten/booking" className="flex px-4 font-light text-md items-center text-underscore"><ArrowLeft/>Tilbake</Link>
      </div>
      <div className="max-w-[512px]">
        <h1 className=" text-white text-center font-semibold text-2xl w-full">
          Soundbox
        </h1>
        <p className="text-white text-sm text-center">
          Emil har 2 soundboxer som kan bookes. Se oversikt over tilgjengelige datoer nedenfor og legg inn en booking.
          Når du har lagt inn en booking vil styret godkjenne bookingen din og den kommer opp i oversikten
           under<span className="text-[#9DDBAD] text-underscore"><Link href="/for_studenten/booking/bookings"> dine bookinger</Link></span>
        </p>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center lg:gap-y-4 pb-4">
        <div className="w-full max-w-[800px]">
          <div className="text-2xl font-bold flex h-[550px] flex-col items-center ">
            <p className="w-full flex justify-center">Bookinger</p>
            <div className="flex justify-start font-normal">
              <div className="flex gap-x-2 items-center px-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm lg:text-base">En ledig soundbox</span>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm lg:text-base">
                  Ingen ledige soundboxer
                </span>
              </div>
            </div>
            <Calendar
              locale="nb"
              className="text-white p-4 font-normal text-sm rounded-md flex items-center justify-center flex-col gap-y-4 lg:px-12"
              tileClassName={({ date, view }) => {
                const dateString = date.toDateString();
                const isToday = dateString === new Date().toDateString();

                return view === "month" && isToday
                  ? "bg-[#579783] text-white font-bold border border-white lg:h-[4rem] p-2 flex flex-col justify-center items-center relative cursor-default"
                  : "p-2 border border-white h-[4rem] flex flex-col justify-center items-center relative cursor-default";
              }}
              tileContent={({ date, view }) => {
                if (view === "month") {
                  const matchingBookings = bookings.filter((booking) => {
                    const bookingDate = new Date(
                      booking.bookedAt,
                    ).toDateString();
                    return bookingDate === date.toDateString();
                  });

                  // Count the number of "ONE_SOUNDBOX" bookings
                  const oneSoundboxCount = matchingBookings.filter(
                    (booking) => booking.item === "ONE_SOUNDBOX",
                  ).length;

                  // Check if there is a "TWO_SOUNDBOXES" booking
                  const hasTwoSoundboxes = matchingBookings.some(
                    (booking) => booking.item === "TWO_SOUNDBOXES",
                  );

                  // Determine the dot color: red if there is a "TWO_SOUNDBOXES" booking or more than one "ONE_SOUNDBOX" booking
                  const dotColor =
                    hasTwoSoundboxes || oneSoundboxCount > 1
                      ? "bg-red-500"
                      : "bg-yellow-500";

                  return matchingBookings.length > 0 ? (
                    <div className="flex items-center justify-center">
                      <div className={`w-2 h-2 ${dotColor} rounded-full`}></div>
                    </div>
                  ) : null;
                }
              }}
              navigationLabel={({ date, label, locale, view }) => (
                <div className="text-md w-[150px] flex justify-center flex-shrink-0 font-semibold text-white icon-hover">
                  {label.charAt(0).toUpperCase() + label.slice(1)}
                </div>
              )}
              next2Label={null}
              prev2Label={null}
              nextLabel={
                <span className="text-white font-bold text-xl">›</span>
              }
              prevLabel={
                <span className="text-white font-bold text-xl">‹</span>
              }
            />
          </div>
        </div>
        <div className="flex justify-start items-start">
          <BookingWindow onStatusChange={handleStatusChange} />
        </div>
      </div>
    </div>
  );
};

export default SoundboxPage;
