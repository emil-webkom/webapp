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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [openForm, setOpenform] = useState<boolean>(false);
  useEffect(() => {
    fetchBookings();
  }, []);

  const toggleForm = () => {
    setOpenform((prevState) => !prevState);
  };

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

  const handleStatusChange = ({
    status,
    lukk,
  }: {
    status: string;
    lukk: boolean;
  }) => {
    if (lukk) {
      toggleForm();
    }
    if (status === "Booking successful!") {
      fetchBookings();
    }
  };

  // Handle date selection
  const handleDateChange = (date: Date) => {
    toggleForm();
    setSelectedDate(date);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-green-mid rounded-b-md gap-y-4 px-2 sm:px-4">
      <div className="flex justify-start w-full">
        <Link
          href="/for_studenten/booking"
          className="flex px-2 sm:px-4 font-light text-md items-center text-underscore"
        >
          <ArrowLeft />
          Tilbake
        </Link>
      </div>
      <div className="max-w-[512px] w-full p-6">
        <h1 className="text-white text-center font-semibold text-xl sm:text-2xl w-full">
          Soundbox
        </h1>
        <p className="text-white text-sm text-left">
          EMIL har 2 soundboxer som kan bookes. Se oversikt over tilgjengelige
          datoer nedenfor og legg inn en booking. Når du har lagt inn en booking
          vil styret godkjenne bookingen din og den kommer opp i oversikten
          under{" "}
          <span className="text-green-lightest text-underscore">
            <Link href="/for_studenten/booking/bookings">dine bookinger</Link>
          </span>
          .
        </p>
        <br></br>
        <div className="bg-green-mid-backdrop rounded-md sm:p-4 text-sm p-4">
          <p>Følgende regler gjelder for bruk av soundbox:</p>
          <ul className="list-disc pl-4 sm:pl-6 text-sm">
            <li className="pl-2 leading-relaxed">
              Soundboks må returneres til kontoret dagen etter bruk innen 14:00
              og den må være ladet.
            </li>
            <li className="pl-2 leading-relaxed">
              Soundboks skal <span className="underline">aldri</span> ligge med
              malt grill ned mot bakken.
            </li>
            <li className="pl-2 leading-relaxed">
              Soundboxen skal kun brukes i arrangementer hvor de går til nytte
              for emilstudenter.
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center lg:gap-y-4 pb-4 w-full">
        <div className="w-full px-2 pb-8">
          <div className="text-xl sm:text-2xl font-bold flex h-auto lg:h-[650px] flex-col items-center gap-y-4">
            <p className="text-xs sm:text-sm font-light px-4 sm:px-16 text-center">
              Hvis en dato ikke er markert i kalenderen er begge soundboxene
              ledige.
            </p>
            <div className="flex max-w-[512px] flex-wrap justify-start font-normal px-4 sm:px-8">
              <div className="flex gap-x-2 items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-xs sm:text-sm">En booket soundbox</span>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-xs sm:text-sm">
                  To bookede soundboxer
                </span>
                <div className="w-2 h-2 text-orange-500 flex justify-center items-center text-xs sm:text-sm">
                  ?
                </div>
                <span className="text-xs sm:text-sm">
                  Booking avventer bekreftelse
                </span>
              </div>
            </div>
            <Calendar
              locale="nb"
              className="text-white p-2 sm:p-4 font-normal text-xs sm:text-sm rounded-md flex items-center justify-center flex-col gap-y-4 lg:px-12"
              tileClassName={({ date, view }) => {
                const dateString = date.toDateString();
                const isToday = dateString === new Date().toDateString();

                return view === "month" && isToday
                  ? "bg-green-light text-white font-bold border border-white lg:h-[5rem] p-2 flex flex-col justify-center items-center relative"
                  : "hover:bg-slate-400 p-2 border border-white h-[5rem] flex flex-col justify-center items-center relative";
              }}
              tileContent={({ date, view }) => {
                if (view === "month") {
                  const matchingBookings = bookings.filter((booking) => {
                    const bookingDate = new Date(
                      booking.bookedAt,
                    ).toDateString();
                    return bookingDate === date.toDateString();
                  });

                  if (
                    matchingBookings.some(
                      (booking) => booking.status === "PENDING",
                    )
                  ) {
                    return (
                      <div className="flex items-center justify-center text-md text-orange-500">
                        ?
                      </div>
                    );
                  }

                  const oneSoundboxCount = matchingBookings.filter(
                    (booking) =>
                      booking.item === "ONE_SOUNDBOX" &&
                      booking.status === "CONFIRMED",
                  ).length;

                  const hasTwoSoundboxes = matchingBookings.some(
                    (booking) =>
                      booking.item === "TWO_SOUNDBOXES" &&
                      booking.status === "CONFIRMED",
                  );

                  const dotColor =
                    hasTwoSoundboxes || oneSoundboxCount > 1
                      ? "bg-red-500"
                      : "bg-yellow-500";

                  return matchingBookings.some(
                    (booking) => booking.status === "CONFIRMED",
                  ) ? (
                    <div className="flex items-center justify-center">
                      <div className={`w-2 h-2 ${dotColor} rounded-full`}></div>
                    </div>
                  ) : null;
                }
              }}
              navigationLabel={({ label }) => (
                <div className="text-md w-[120px] sm:w-[150px] flex justify-center flex-shrink-0 font-semibold text-white icon-hover">
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
              onClickDay={handleDateChange} // Handle calendar day clicks
            />
          </div>
        </div>
        {openForm && ( // Conditionally render BookingWindow based on selected date
          <div className="fixed inset-0 bg-green-light bg-opacity-30 flex items-center justify-center z-50">
            <div className="flex justify-start items-start py-4">
              <BookingWindow
                onStatusChange={handleStatusChange}
                selectedDate={selectedDate}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoundboxPage;
