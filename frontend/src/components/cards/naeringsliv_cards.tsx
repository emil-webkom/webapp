import Link from "next/link";
import { Button } from "../ui/button";
import "./naeringsliv_cards";
import React from 'react';

interface NaeringslivCardProps {
  titleImageSrc: string; 
  subtitle: string;
  description: string;
  linkText: string;
  buttonText: string;
  linkHref: string;
  buttonLinkHref: string;
}

const NaeringslivCard: React.FC<NaeringslivCardProps> = ({
  titleImageSrc,
  subtitle,
  description,
  linkText,
  buttonText,
  linkHref,
  buttonLinkHref

}) => {
  return (
    <div className="bg-white rounded-lg border-2 border-[#001D21] w-96 p-6 flex flex-col items-center">

      <div className="flex flex-col justify-between h-full ">

        <div className = "flex justify-center  ">
            <img src={titleImageSrc} alt="Title" className=" w-40 h-14 object-contain " /> {/* Title image with fixed size */}
        </div>

        <h3 className="text-xl font-medium text-[#003A42] flex justify-center text-center py-5 ">{subtitle}</h3>

        <p className="text-gray-700 h-80 font-extralight text-l">
            {description}<a href={linkHref} className="text-[#225654] underline">{linkText}</a>
        </p>

        <div className="flex justify-center mt-4">
            <a href={buttonLinkHref} target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#001D21] text-white py-2 px-4 rounded hover underline ">{buttonText} </Button>
            </a>
        </div>
    </div>

    </div>
  );
};

export default NaeringslivCard;

