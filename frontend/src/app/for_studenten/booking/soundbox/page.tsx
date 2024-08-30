"use client";

import BookingForm from "@/components/ForStudenten/booking/booking-form";
import BookingWindow from "@/components/ForStudenten/booking/booking-window";

const SoundboxPage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 gap-y-6">
      <div className="flex flex-col space-y-4">
        <h1 className=" text-white text-center font-semibold text-4xl w-full">
          Soundbox
        </h1>
        <p className="text-white text-md text-center">
          Emil har 2 soundboxer som kan bookes. Se oversikten nedenfor og finn
          en dato.{" "}
        </p>
      </div>
      <BookingWindow />
    </div>
  );
};

export default SoundboxPage;
