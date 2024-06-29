"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Hero from "@/components/hero/hero1";
import TransissionIn from "@/components/hero/transissions/transissionIn";
import TransissionOut from "@/components/hero/transissions/transissionOut";

const HomePage = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/for_studenten");
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col m-14 items-center justify-center space-x-5 pt-4">
        <div className="flex ">
          <Hero title="Energi og Miljø" undertitle="Velkommen til Emil!" />
          <div>
            <img
              src="/image/logo.png"
              alt="Emil Logo"
              className="w-[8rem] h-[8rem]"
            />
          </div>
        </div>
        <div className="flex items-center text-left w-[100%] space-x-5 pt-9">
          <div className="flex items-center space-x-2">
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
      <TransissionIn />
      <div className="h-screen w-screen background-dark ">
        <p className="text-white">Stuff goes here</p>
      </div>
      <TransissionOut />
      <TransissionIn />
    </div>
  );
};

export default HomePage;
