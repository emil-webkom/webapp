"use client";

import { FC } from "react";
import { Button } from "../ui/button";

interface CardProps {
  name: string;
  subname: string;
  text: string;
  link: string;
}

const RetningCard: FC<CardProps> = ({ name, subname, text, link }) => {
  return (
    <div className="w-[25vw] flex flex-col justify-between bg-[#003A42] rounded-md py-6">
      <div className="text-xl font-semibold px-10 h-[5.4rem] overflow-hidden">
        {name}
      </div>
      <div className="text-m font-light px-10 ">{subname}</div>
      <div className="text-l font-light px-10 py-5 h-[10rem] overflow-hidden">
        {text}
      </div>
      <div className="flex justify-center pt-5">
        <Button
          onClick={() => window.open(link, "_blank")}
          className="text-l font-medium"
        >
          Les mer om {subname}
        </Button>
      </div>
    </div>
  );
};
export default RetningCard;
