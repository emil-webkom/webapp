import Link from "next/link";
import { Button } from "../ui/button";
import "./naeringsliv_cards";
import React from "react";

interface NaeringslivCardProps {
  titleImageSrc: string;
  imageLinkHref: string;
  subtitle: string;
  description: string;
  linkText: string;
  buttonText: string;
  linkHref: string;
  buttonLinkHref: string;
}

const NaeringslivCard: React.FC<NaeringslivCardProps> = ({
  titleImageSrc,
  imageLinkHref,
  subtitle,
  description,
  linkText,
  buttonText,
  linkHref,
  buttonLinkHref,
}) => {
  return (
    <div className="bg-white rounded-lg border-2 border-green-darkest lg:w-96 p-6 flex flex-col items-center">
      <div className="flex flex-col justify-between">
        <div className="flex justify-center">
          <a
            href={imageLinkHref}
            target="_blank"
            rel="noopener noreferrer"
            className="transform transition duration-300 hover:scale-105 active:scale-95"
          >
            <img
              src={titleImageSrc}
              alt="Title"
              className="w-40 h-14 object-contain"
            />
          </a>
        </div>
        <h3 className="text-xl font-medium text-green-dark flex justify-center text-center py-5 ">
          {subtitle}
        </h3>

        <p className="text-gray-700 h-60 lg:h-64 font-extralight text-sm lg:text-base pb-0">
          {description}
          <a
            href={linkHref}
            className="text-green-mid hover:text-gray-300 active:text-grey-500"
          >
            {linkText}
          </a>
        </p>

        <div className="flex justify-center mt-4">
          <a href={buttonLinkHref} target="_blank" rel="noopener noreferrer">
            <Button className="p-2 lg:p-5 hover:bg-slate-400 ">
              {buttonText}{" "}
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NaeringslivCard;
