"use client";

import { FC } from "react";
import { useState } from "react";
import { Hovedstyret } from "@/schemas/hovedstyret";

interface HSCardProps {
  data: Hovedstyret[];
}

const HSCard: FC<HSCardProps> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const totalCards = data.length;

  // Functions for scrolling through styret-cards
  const handleNext = () => {
    if (isSliding) return;
    setIsSliding(true);
    setTimeout(() => {
      const isLastSlide = currentIndex === data.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
      setIsSliding(false);
    }, 0);
  };

  const handlePrev = () => {
    if (isSliding) return;
    setIsSliding(true);
    setTimeout(() => {
      const isFirstSlide = currentIndex === 0;
      const newIndex = isFirstSlide ? data.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
      setIsSliding(false);
    }, 0);
  };

  return (
    <div>
      <div className="flex items-center justify-center space-x-5">
        <button onClick={handlePrev} className="icon-hover">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-circle-arrow-left"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M16 12H8" />
            <path d="m12 8-4 4 4 4" />
          </svg>
        </button>
        <div className="relative w-[80%] overflow-hidden">
          <div
            className={`flex transition-transform duration-300 ease-in-out transform ${
              isSliding ? "delay-300" : ""
            }`}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {data.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full flex flex-col items-center gap-x-4 p-4 lg:p-6 justify-center bg-[#003A42] rounded-md lg:space-y-0 lg:flex-row "
              >
                <div className="flex flex-col space-y-3 lg:justify-between w-full lg:w-[50vh] lg:h-[50vh]">
                  <div className="">
                    <p className="text-base lg:text-2xl font-semibold">
                      {item.rolle}
                    </p>
                    <p className="text-sm lg:text-xl font-normal">
                      {item.User.name}
                    </p>
                  </div>
                  <p className="text-xs lg:text-sm font-extralight">
                    {item.text}
                  </p>
                  <div className="flex flex-col">
                    <p className="text-xs lg:text-sm font-light">
                      Kontakt: {item.User.email}
                    </p>
                    <p className="text-xs lg:text-sm font-light">
                      Tlf: +78{item.User.nummer}
                    </p>
                  </div>
                </div>
                <div className=" items-center hidden lg:flex">
                  <img
                    src={item.image}
                    alt={item.rolle}
                    className="w-[20vh] h-[20vh] lg:w-[50vh] lg:h-[50vh] object-cover rounded-md"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={handleNext} className="icon-hover">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-circle-arrow-right"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12h8" />
            <path d="m12 16 4-4-4-4" />
          </svg>
        </button>
      </div>
      <div className="flex justify-center py-2">
        {Array.from({ length: totalCards }).map((_, index) => (
          <span
            key={index}
            className={`mx-1 h-2 w-2 rounded-full ${currentIndex === index ? "bg-white" : "bg-gray-400"}`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default HSCard;
