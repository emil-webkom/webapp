import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";
import { Button } from "../ui/button";

export interface nyStudentCardProps {
  title: string;
  icon?: ReactNode;
  description?: string;
  frist?: string;
  href?: string;
  buttonText?: string;
}

const NyStudentCard = ({
  title,
  icon,
  description,
  frist,
  href,
  buttonText,
}: nyStudentCardProps) => {
  // bg-[#3333]
  return (
    <div className="flex gap-2 min-w-60 max-w-[512px] p-4 rounded-md bg-[#3333]">
      <div className="pt-1">{icon}</div>
      <div
        className={`flex flex-col ${description ? "space-y-4" : ""} justify-between`}
      >
        <div className="space-y-2">
          <h3 className="text-base font-semibold">{title}</h3>
          {description ? (
            <p className="text-[#cbcbcb]">{description}</p>
          ) : (
            <></>
          )}
        </div>
        <div className="space-y-2">
          {frist ? (
            <div>
              <h3 className="text-base font-semibold">Frist</h3>
              <p className="text-[#cbcbcb]">{frist}</p>
            </div>
          ) : (
            <></>
          )}
          {buttonText && href ? (
            <Button variant={"transparent"}>
              <Link
                href={href}
                target="_blank"
                rel="noopener norefferer"
                className="flex-row flex justify-center items-center gap-1"
              >
                <p>{buttonText}</p>
                <ArrowUpRight className="w-4"></ArrowUpRight>
              </Link>
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default NyStudentCard;
