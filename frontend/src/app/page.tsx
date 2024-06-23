"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Hero from "@/components/hero/hero1";

const HomePage = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/for_studenten/ny_student");
  };

  return (
    <div className="flex flex-col m-4">
      <div className="flex m-14 items-center justify-center space-x-5 ">
        <Hero title="Energi og Miljø" undertitle="Velkommen til Emil!" />
        <div>
          <img
            src="/image/logo.png"
            alt="Emil Logo"
            className="w-[8rem] h-[8rem]"
          />
        </div>
      </div>
      <div className="w-[50%] m-auto py-2 space-x-2">
        <div className="flex items-center">
          <div className="flex space-x-2 justify-left items-center px-5">
            <span className="font-bold text-xl tracking-tighter ">
              Ny Student?
            </span>
            <p className="text-l font-light tracking-tighter">
              Klikk her for å lese mer
            </p>
          </div>
          <Button onClick={handleClick}>Les mer</Button>
        </div>
      </div>
      <div className="h-[8rem]">
        <p></p>
      </div>
    </div>
  );
};

export default HomePage;
