"use client";

import { BookingCard } from "@/components/ForStudenten/booking/booking-card";

// Define props type to include selectedDate
interface BookingWindowProps {
  onStatusChange: ({ status, lukk }: { status: string; lukk: boolean }) => void;
  selectedDate: Date | null;
}

const BookingWindow = ({
  onStatusChange,
  selectedDate,
}: BookingWindowProps) => {
  // Update handleChange to receive both status and lukk
  const handleChange = ({
    status,
    lukk,
  }: {
    status: string;
    lukk: boolean;
  }) => {
    onStatusChange({ status, lukk });
  };

  return (
    <div className="sm:p-0 md:w-[400px] text-white min-h-[320px] w-full rounded-md flex flex-col gap-y-2 items-center justify-center">
      <BookingCard onStatusChange={handleChange} selectedDate={selectedDate} />
    </div>
  );
};

export default BookingWindow;
