'use client'

import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {useRouter} from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/for studenten/ny student');
  };

  return(
      <div className="flex flex-col m-4">
        <div className="flex m-14 items-center justify-center space-x-5 ">
        <div className="flex-col">
          <p className="font-bold text-[4.3rem] text-left">Energi og Miljø</p>
          <p className="font-medium text-[2rem] text-left px-2">Velkommen til Emil!</p>
        </div>
        <div>
          <img src="/image/logo.png" alt="Emil Logo" className="w-[8rem] h-[8rem]"/>
        </div>
      </div>
        <div className="w-[50%] m-auto py-2 space-x-2">
          <div className="flex space-x-10 items-center">
            <div className="flex space-x-2 justify-left items-center">
              <span className="font-bold text-xl">Ny Student?</span>
              <p className="text-l font-light">Klikk her for å lese mer</p>
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