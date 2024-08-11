"use client";
import Event from "@/components/calendar/event";
import { Arrangement } from "@/schemas/arrangement";

interface ListViewProps {
  events: Arrangement[];
}

const ListView = ({ events }: ListViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-[40rem] rounded-md text-white p-0 h-80 lg:h-full gap-y-2 lg:gap-y-3">
      {events.map((event, index) => (
        <Event key={index} {...event} />
      ))}
    </div>
  );
};

export default ListView;
