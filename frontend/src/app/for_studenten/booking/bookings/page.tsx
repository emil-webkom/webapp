"use client";

import BookingView from "@/components/ForStudenten/booking/booking-view";

const MineBookingerPage = () => {
  return (
    <div className="w-4/5 flex flex-col items-center justify-center p-12 gap-y-6">
      <div className="flex flex-col space-y-4">
        <h1 className=" text-white text-center font-semibold text-4xl w-full">
          Soundbox
        </h1>
        <p className="text-white text-md text-center">
          Her er din bookingoversikt{" "}
        </p>
      </div>
      <BookingView />
    </div>
  );
};

export default MineBookingerPage;
