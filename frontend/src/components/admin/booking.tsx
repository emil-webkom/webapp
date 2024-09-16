"use client";

import useFetch from "@/hooks/use-fetch";
import { useState, useEffect } from "react";
import { Booking } from "@/schemas/booking";
import { Trash2 } from "lucide-react";

const BookingComponent = () => {
  const [openForm, setOpenForm] = useState<boolean>(false);

  const { data, loading, error } = useFetch<Booking[]>("/api/bookings");
  const [booked, setBookings] = useState<Booking[]>([]);
  useEffect(() => {
    if (data) {
      setBookings(data);
    }
  }, [data]);

  const handleRediger = (id: string) => {
    null;
  };

  const handleSlett = (id: string) => {
    null;
  };

  const handleLeggTilClick = () => {
    null;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading bookings</div>;
  }

  return (
    <div className="flex flex-col items-center bg-white rounded-md py-6 text-black">
      <div className="w-full px-4 lg:px-8">
        <h1 className="text-black text-center font-semibold py-2 text-xl sm:text-2xl w-full">
          Booking
        </h1>
      </div>
      <div className="flex w-full px-6">
        <button
          onClick={() => handleLeggTilClick()}
          className="text-underscore "
        >
          Legg til?
        </button>
      </div>
      <div className="flex flex-col w-full p-4 ">
        <div className="flex bg-[#AEE0D0] rounded-md p-2">
          <div className="w-[15%] font-semibold">Bruker</div>
          <div className="w-[20%] font-semibold">Komité</div>
          <div className="w-[15%] font-semibold">Hva</div>
          <div className="w-[10%] font-semibold">Dato</div>
          <div className="w-[10%] font-semibold">Status</div>
        </div>

        {booked.length > 0 ? (
          booked.map((item: Booking) => (
            <div
              key={item.id}
              className="flex w-full border-b-2 border-[#25504E] p-2"
            >
              <div className="w-[15%]">{item.userID}</div>
              <div className="w-[20%]">{item.komiteID}</div>
              <div className="w-[15%]">{item.item}</div>
              <div className="w-[10%]">
                {new Date(item.bookedAt).toISOString().split("T")[0]}
              </div>
              <div className="w-[10%]">{item.status}</div>
              <div className="">
                <button
                  onClick={() => handleRediger(item.id || "")}
                  className="text-underscore px-2"
                >
                  Rediger?
                </button>
                <button
                  onClick={() => handleSlett(item.id || "")}
                  className="icon-hover"
                >
                  <Trash2 className="text-red-600 h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>No bookings found</div>
        )}
      </div>
    </div>
  );
};

export default BookingComponent;
