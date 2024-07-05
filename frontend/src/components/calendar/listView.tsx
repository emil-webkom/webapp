"use client";
import Event, { EventProps } from "@/components/calendar/event";

interface ListViewProps {
  events: EventProps[];
}

const ListView = ({ events }: ListViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-[40rem] rounded-md text-white p-0 h-80 lg:h-full gap-y-2 lg:gap-y-3">
      {events.map((event, index) => (
        <Event
          key={index}
          id={event.id}
          title={event.title}
          decscription={event.decscription}
          trinn={event.trinn}
          location={event.location}
          date={event.date}
          icon={event.icon}
        />
      ))}
    </div>
  );
};

export default ListView;
