"use client";

import useFetch from "@/hooks/use-fetch";
import { AeresEmiler } from "@/schemas/aeresEmiler";
import { useState, useEffect } from "react";
import LeggtilAeresemilerForm from "../forms/leggtilAeresemilerForm";
import Modal from "../ui/modal";
import { Trash2 } from "lucide-react";
import { Hovedsamarbeidspartner } from "@prisma/client";
import { Booking } from "@/schemas/booking";



interface DataProps {
    message: string;
    data: Booking[]; 
  }

const BookingComponent = () => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const { data, loading, error } = useFetch<DataProps | null>("/api/bookings");
  const booked = data? data.data:[];
  

  useEffect(() => {
    console.log(data);
  }, [data]);
  

  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>Error</div>;
  } 

  return (
    <div className="flex flex-col items-center bg-white rounded-md py-6 text-black">
      <div className="w-full px-4 lg:px-8">
        <h1 className="text-black text-center font-semibold py-2 text-xl sm:text-2xl w-full">
          Booking
        </h1>
      </div>
     
      <div className="flex flex-col w-full p-4 ">
        <div className="flex bg-[#AEE0D0] rounded-md p-2">
          <div className="w-[30%] font-semibold">Bruker</div>
          <div className="w-[30%] font-semibold">Komité</div>
          <div className="w-[30%] font-semibold">Hva</div>
          <div className="w-[30%] font-semibold">Dato</div>
          <div className="w-[30%] font-semibold">Status</div>
        </div>
        
        {booked.map((item) => (
          <div key={item.id} className="flex w-full border-b-2 border-[#25504E] p-2">
            <div className="w-[30%]">{item.userID}</div>
            <div className="w-[30%]">{item.komiteID}</div>
            <div className="w-[30%]">{item.item}</div>
            <div className="w-[30%]">{item.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingComponent;

