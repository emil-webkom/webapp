"use client";

import BookingView from "@/components/ForStudenten/booking/booking-view";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

const MineBookingerPage = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-green-mid rounded-b-md gap-y-4 p-4">
      <div className="flex justify-between w-full ">
        <Link
          href="/for_studenten/booking"
          className="flex px-4 font-light text-md items-center text-underscore"
        >
          <ArrowLeft />
          Tilbake
        </Link>
        <Link
          href="/for_studenten/booking/soundbox"
          className="flex px-4 font-light text-md items-center text-underscore"
        >
          Soundbox
          <ArrowRight />
        </Link>
      </div>
      <div className="flex flex-col space-y-4">
        <h1 className=" text-white text-center font-semibold text-4xl w-full">
          Bookinger
        </h1>
        <p className="text-white text-sm text-center">
          Under finner du en oversikt over bookingene dine{" "}
        </p>
      </div>
      <BookingView />
    </div>
  );
};

export default MineBookingerPage;
