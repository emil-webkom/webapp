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
    <div className="w-[90%] lg:w-[25vw] flex flex-col justify-between bg-green-dark rounded-md py-6">
      <div className="text-l lg:text-xl font-semibold px-10 lg:h-[4rem]">
        {name}
      </div>
      <div className="text-m font-light px-10 ">{subname}</div>
      <div className="text-sm lg:text-base font-light px-10 lg:py-5 py-6 lg:h-[6rem] overflow-hidden">
        {text}
      </div>
      <div className="flex justify-center lg:pt-5">
        <Button
          onClick={() => window.open(link, "_blank")}
          className="text-sm lg:text-base font-medium hover:bg-slate-400"
        >
          Les mer om {subname}
        </Button>
      </div>
    </div>
  );
};
export default RetningCard;
