"use client";
import Event, { EventProps } from "@/components/calendar/event";

interface ListViewProps {
  events: EventProps[];
}

const ListView = ({ events }: ListViewProps) => {
  return (
    <div className="w-[100%] flex flex-col items-center justify-center rounded-md text-white gap-y-2 lg:gap-y-3">
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
