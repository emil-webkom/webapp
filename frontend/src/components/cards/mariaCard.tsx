import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";
import { Button } from "../ui/button";
import { link } from "fs";

export interface MariaCardProps {
  title: string;
  icon?: ReactNode;
  description?: string | JSX.Element;
  frist?: string;
  buttons?: {text : string,href:string}[]

}

const MariaCard = ({
  title,
  icon,
  description,
  frist,
  buttons
  

}: MariaCardProps) => {
  // bg-green-mid-backdrop
  return (
    <div className="flex gap-2 min-w-60 max-w-[512px] p-4 rounded-md bg-green-mid-backdrop">
      <div className="pt-1">{icon}</div>
      <div
        className={`flex flex-col ${description ? "space-y-4" : ""} justify-between`}
      >
        <div className="space-y-2">
          <h3 className="text-base font-semibold">{title}</h3>
          {description ? (
            <div className="text-grayed">{description}</div>
          ) : (
            <></>
          )}
        </div>
        <div className="space-y-2">
          {frist ? (
            <div>
              <h3 className="text-base font-semibold">Frist</h3>
              <p className="text-grayed">{frist}</p>
            </div>
          ) : (
            <></>
          )}
         <div className="flex flex-row gap-2 flex-wrap">
         {buttons?.map((b,i) => (
            <Button key={i} variant={"transparent"}>
              <Link
                href={b.href}
                target="_blank"
                rel="noopener norefferer"
                className="flex-row flex justify-center items-center gap-1"
                >
                <p>{b.text}</p>
                <ArrowUpRight className="w-4"></ArrowUpRight>
              </Link>
            </Button>
          ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default MariaCard;
