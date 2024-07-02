"use client";

import { ReactNode } from "react";

import Event, { EventProps } from "@/components/calendar/event";

interface ListViewProps {
  events: EventProps[];
}

const ListView = ({ events }: ListViewProps) => {
  return (
    <div>
      {events.map((event, index) => (
        <Event
          key={index}
          title={event.title}
          decscription={event.decscription}
        />
      ))}
    </div>
  );
};

export default ListView;
