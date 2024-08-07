"use client";

import { CalendarDays } from "lucide-react";
import { MapPin } from "lucide-react";
import Link from "next/link";

export interface EventProps {
  id: string;
  title: string;
  decscription: string;
  date?: string;
  icon?: any;
  trinn?: number;
  location?: string;
}

const Event = ({ title, decscription, date, trinn, location }: EventProps) => {
  return (
    <>
      <Link
        className="w-full rounded-md h-full flex flex-row bg-[#003A42] hover:bg-[#426e72] cursor-pointer"
        href={`/for_studenten/arrangement`}
      >
        <div className="flex flex-col w-1/2 text-left p-2">
          <div className="font-normal">{title}</div>
          <div className="flex flex-row px-0.5 gap-x-1">
            <div className="flex items-center justify-center">
              <CalendarDays size={14} />
            </div>
            <div className="flex justify-center font-normal text-xs mt-0.5">
              {date}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-1/2 justify-end text-right p-2">
          <div className="text-sm">{trinn}. trinn</div>
          <div className="flex flex-row justify-end gap-x-1">
            <div className="flex font-normal text-xs mt-0.5">{location}</div>
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
