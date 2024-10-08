import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export interface thumbnailButtonProps {
  imageURL?: string;
  title: string;
  oneliner: string;
  link: string;
}

const ThumbnailButton = ({
  imageURL,
  title,
  oneliner,
  link,
}: thumbnailButtonProps) => {
  return (
    <Button
      variant={"transparent"}
      className="flex flex-col h-fit text-left px-1 w-full justify-start lg:w-fit items-start gap-2"
    >
      <Link
        href={link}
        target="_blank"
        rel="noopener norefferer"
        className="flex-row flex justify-center items-start gap-1 w-full lg:w-fit"
      >
        <div className="flex size-10 lg:size-14 rounded-lg overflow-hidden self-center p-1 items-center justify-center bg-white">
          <img
            className="max-w-full max-h-full object-contain"
            src={
              imageURL
                ? imageURL
                : `/image/logoer/${title.toLowerCase().replace(/\s/g, "")}.png`
            }
            alt={title + " logo"}
          />
        </div>
        <div className="flex flex-col items-start justify-start font-normal w-full lg:w-fit">
          <div className="flex flex-row items-center justify-between w-full"><h1 className="text-sm lg:text-sm inline">{title}</h1><ArrowUpRight className="size-0 lg:size-5"></ArrowUpRight></div>
          <p className="text-xs lg:text-sm lg:w-48 text-wrap opacity-60">
            {oneliner}
          </p>
        </div>
        <ArrowUpRight className="size-5 lg:size-0 self-center"></ArrowUpRight>
      </Link>
    </Button>
  );
};

export default ThumbnailButton;
