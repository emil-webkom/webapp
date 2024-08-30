"use client";

import BookingForm from "@/components/ForStudenten/booking/booking-form";
import BookingWindow from "@/components/ForStudenten/booking/booking-window";
import { Booking } from "@/schemas/booking";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { getBookingList } from "@/utils/booking/booking";

const SoundboxPage = () => {
  const [bookings, setBookings] = useState<Booking[]>();

  useEffect(() => {
    fetchBookings();
    console.log(bookings);
  }, [])

  const fetchBookings = async () => {
    try {
      const bookings = await getBookingList();
      console.log(bookings);
      if (bookings){
        // setBookings(bookings);
      }
    } catch (err) {
      console.error("Could not fetch bookings:", err);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center bg-[#225654] rounded-b-md gap-y-4 px-4">
      <div className="max-w-[512px]">
        <h1 className=" text-white text-center font-semibold text-2xl w-full">
          Soundbox
        </h1>
        <p className="text-white text-sm text-center">
          Emil har 2 soundboxer som kan bookes. Se oversikten nedenfor og finn
          en dato.{" "}
        </p>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-y-4 py-4">
        <div className="flex justify-start items-start">
          <BookingWindow />
        </div>
        <div className="w-full max-w-[800px]">
          <div className="text-2xl font-bold flex h-[500px] flex-col justify- items-start ">
            <p className="w-full flex justify-center">Bookinger</p>
            {/* RENDER COLOURS FOR BOOKED INSTANCES */}
          <Calendar
            locale="nb"
            className="text-white p-4 font-normal text-sm rounded-md flex items-center justify-center flex-col gap-y-4 lg:px-12"
            tileClassName={({ date, view }) => {
              const dateString = date.toDateString();
              const isToday = dateString === new Date().toDateString();

              return view === "month" && isToday
              ? "bg-[#579783] text-white font-bold border border-white lg:h-[4rem] p-2 flex flex-col justify-center items-center relative"
              : "p-2 border border-white h-[4rem] flex flex-col justify-center items-center relative";
            }}
            navigationLabel={({ date, label, locale, view }) => (
              <div className="text-md w-[150px] flex justify-center flex-shrink-0 font-semibold text-white icon-hover">
                {label.charAt(0).toUpperCase() + label.slice(1)}
              </div>
            )}
            next2Label={null}
            prev2Label={null}
            nextLabel={<span className="text-white font-bold text-xl">›</span>}
            prevLabel={<span className="text-white font-bold text-xl">‹</span>}
            />
            </div>
        </div>
      </div>
    </div>
  );
};

export default SoundboxPage;
