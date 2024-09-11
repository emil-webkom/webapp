'use client';

import { Komite } from "@/schemas/komite";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";

interface InfoAndScrollbarWithButtonProps {
  komiteer: Komite[];
}

const InfoAndScrollbarWithButton: React.FC<InfoAndScrollbarWithButtonProps> = ({ komiteer }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);

  const handleScroll = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      setScrollPosition(scrollContainer.scrollLeft);
      setScrollWidth(maxScrollLeft);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      handleScroll();
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, [komiteer]);

  const isScrolledToLeft = scrollPosition <= 1;
  const isScrolledToRight = scrollPosition >= scrollWidth - 1;

  return (
    <div className="w-full flex justify-center items-center py-4">
      <div className="w-full max-w-5xl relative">
        <div className="w-full py-2 lg:p-2">
          <div className="w-screen lg:w-full lg:relative px-3">
            {/* Left gradient: only visible if not scrolled all the way to the left */}
            {!isScrolledToLeft && (
              <div className="absolute top-0 left-0 rounded-xl lg:w-12 h-full bg-gradient-to-r from-green-dark to-transparent pointer-events-none"></div>
            )}
            {/* Right gradient: only visible if not scrolled all the way to the right */}
            {!isScrolledToRight && (
              <div className="absolute top-0 right-0 w-12 h-full rounded-xl bg-gradient-to-l from-green-dark to-transparent pointer-events-none"></div>
            )}
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto scrollbar-hide custom-scrollbar border-b border-white gap-x-3 lg:gap-x-6"
            >
              {komiteer.map((komite) => (
                <Link
                  key={komite.id}
                  href={`/for_studenten/komiteer/${komite.id}`}
                  className="flex-none text-white font-normal text-sm lg:text-base py-2 icon-hover"
                >
                  {komite.navn}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoAndScrollbarWithButton;
