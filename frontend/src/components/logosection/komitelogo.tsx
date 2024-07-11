"use client";

import { FC } from "react";
import { useState } from "react";
import { KomiteLogo } from "@/types/interfaces";

import Link from "next/link";


const Logos: FC<{ data: KomiteLogo[] }> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(data.length / itemsPerSlide);

  const handleNext = () => {
    if (isSliding) return;
    setIsSliding(true);
    setTimeout(() => {
      const isLastSlide = currentIndex === totalSlides - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
      setIsSliding(false);
    }, 0); // match the transition duration
  };

  const handlePrev = () => {
    if (isSliding) return;
    setIsSliding(true);
    setTimeout(() => {
      const isFirstSlide = currentIndex === 0;
      const newIndex = isFirstSlide ? totalSlides - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
      setIsSliding(false);
    }, 0); // match the transition duration
  };

  return (
    <div>
      <div className="flex items-center justify-center space-x-5">
        <button onClick={handlePrev} className="icon-hover">
          {"<-"}
        </button>
        <div className="relative overflow-hidden">
          <div
            className={`flex transition-transform duration-300 ease-in-out transform ${
              isSliding ? "delay-300" : ""
            }`}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div
                key={slideIndex}
                className="flex-shrink-0 w-full grid grid-cols-2 gap-x-5 grid-rows-2"
              >
                {data
                  .slice(
                    slideIndex * itemsPerSlide,
                    (slideIndex + 1) * itemsPerSlide,
                  )
                  .map((item, index) => (
                    <div key={index} className="flex items-center">
                      <Link href={item.mappe}>
                        <img
                          src={item.bilde}
                          alt={`Logo ${slideIndex * itemsPerSlide + index + 1}`}
                          className="w-[15rem] object-contain"
                        />
                      </Link>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
        <button onClick={handleNext} className="icon-hover">
          {"->"}
        </button>
      </div>
      <div className="flex justify-center py-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <span
            key={index}
            className={`mx-1 h-2 w-2 rounded-full ${currentIndex === index ? "bg-primary" : "bg-zinc-400"}`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Logos;
