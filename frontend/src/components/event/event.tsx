"use client";
import { Arrangement } from "@/schemas/arrangement";
import { formatTrinn } from "@/utils/arrangement/trinn";
import { CalendarDays, Users } from "lucide-react";
import { MapPin } from "lucide-react";
import Link from "next/link";

const Event = ({
  navn,
  beskrivelse,
  dato,
  trinn,
  sted,
  kapasitet,
  paameldinger,
  id,
  ...props
}: Arrangement) => {
  const date = new Date(dato);
  const isFull = paameldinger.length === kapasitet;
  return (
    <>
      <Link
        className="w-full flex justify-between rounded-md h-18 bg-[#003A42] hover:bg-[#426e72] cursor-pointer"
        href={`/for_studenten/arrangement/${id}`}
      >
        <div className="flex flex-col w-1/2 text-left p-2">
          <div className="font-normal truncate">{navn}</div>
          <div className="flex flex-row px-0.5 gap-x-1">
            <div className="flex items-center justify-center">
              <CalendarDays size={14} />
            </div>
            <div className="flex flex-shrink-0 font-normal text-xs mt-0.5">
              {date.toLocaleDateString("no-NO", {
                day: "numeric",
                month: "long",
              })}
            </div>
            <div
              className={`flex items-center justify-start ml-2 ${isFull ? "text-red-500" : ""}`}
            >
              <Users size={14} />
            </div>
            <div
              className={`flex justify-center font-normal text-xs mt-0.5 ${isFull ? "text-red-500" : ""}`}
            >
              {`${paameldinger.length}/${kapasitet}`}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-end text-right p-2">
          <div className="text-sm">{formatTrinn(trinn)}</div>
          <div className="flex flex-row justify-end gap-x-1">
            <div className="flex font-normal text-xs mt-0.5">{sted}</div>
            <div className="flex items-center justify-center">
              <MapPin size={14} />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Event;
