"use client";
import Event from "@/components/calendar/event";
import { Arrangement } from "@/schemas/arrangement";

interface ListViewProps {
  events: Arrangement[];
}

const ListView = ({ events }: ListViewProps) => {
  return (
    <div className="w-[100%] flex flex-col items-center justify-center rounded-md text-white gap-y-2 lg:gap-y-3">
      {events.map((event, index) => (
        <Event key={index} {...event} />
      ))}
    </div>
  );
};

export default ListView;
