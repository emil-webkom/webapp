"use client";

import { FC } from "react";
import { Button } from "../ui/button";

interface CardProps {
  name: string;
  rolle: string;
  text: string;
  bilde: string;
  mail: string;
  nummer: number;
}

const Fagkontakt: FC<CardProps> = ({
  name,
  rolle,
  text,
  bilde,
  mail,
  nummer,
}) => {
  return (
    <div className="w-[40%] flex flex-col items-center bg-[#003A42] rounded-md py-6 space-y-3">
      <div className="text-xl font-bold overflow-hidden">{name}</div>
      <div className="flex flex-col items-center space-y-3">
        <div className="flex items-center justify-center">
          <img
            src={bilde}
            alt="bilde"
            className="w-[50%] object-cover rounded-md"
          />
        </div>
        <div className="text-l font-semibold px-10 ">{rolle}</div>
      </div>
      <div className="text-m font-light px-10 text-center h-[13vh]">{text}</div>

      <div className="flex flex-col items-center">
        <div className="text-l font-light underline">Kontakt:</div>
        <div className="text-l font-light">{mail}</div>
        <div className="text-l font-light">+47 {nummer}</div>
      </div>
    </div>
  );
};
export default Fagkontakt;
