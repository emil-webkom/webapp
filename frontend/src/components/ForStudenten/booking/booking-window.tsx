"use client";

import { Label } from "@radix-ui/react-label";
import { DatePickerForm } from "../ui/date-picker-form";
import { ReactNode, useState } from "react";
import BookingForm from "@/components/ForStudenten/booking/booking-form";
import { BookingCard } from "./booking-card";

const BookingWindow = ({ onStatusChange }: { onStatusChange: (status: string) => void }) => {
  const handleChange = (status: string) => {
    onStatusChange(status);
  }
  return (
    <div className="sm:p-0 text-white min-h-[320px] w-full rounded-md flex flex-col gap-y-2 items-center justify-center">
      {/* <BookingForm /> */}
      <BookingCard onStatusChange={handleChange}/>
    </div>
  );
};

export default BookingWindow;
