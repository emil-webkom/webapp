"use client";

import useFetch from "@/hooks/use-fetch";
import { AeresEmiler } from "@/schemas/aeresEmiler";
import { useState } from "react";

const BrukerComponent = () => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const { data, loading, error } = useFetch<AeresEmiler[] | null>(
    "/api/aeresemiler"
  );

  const sortedData = data ? [...data].sort((a, b) => b.aar - a.aar) : [];
  
  const handleRediger = (()=>{
    setOpenForm(true);
  })

  const handleSlett = (()=>{
    //HandleSlett
  })
  const handleLeggTil = (()=>{
    //HandleLeggTil
  })

  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  return (
    <div className="flex flex-col items-center bg-[#003A42] rounded-md py-6 text-white">
      <div className="w-full px-4 lg:px-8">
        <h1 className="text-white text-center font-semibold py-2 text-xl sm:text-2xl w-full">
          Oversikt over Æresemilere og utdelte fortjenestemedaljer
        </h1>
      </div>
      <button onClick={handleLeggTil} className="flex w-full px-6 text-underscore">
        Legg til?
      </button>
      <div className="flex flex-col w-full p-4 ">
        <div className="flex bg-[#225654] rounded-md p-2">
          <div className="w-[30%]">Navn:</div>
          <div className="w-[30%]">Type pris</div>
          <div className="w-[30%]">År:</div>
        </div>
        {sortedData?.map((item) => (
          <div className="flex w-full border-b-2 border-[#25504E] p-2">
            <div className="w-[30%]">{item.navn}</div>
            <div className="w-[30%]">{item.type}</div>
            <div className="w-[30%]">{item.aar}</div>
            <div className="flex gap-x-4">
            <button onClick={handleSlett} className="text-underscore">Slett?</button>
            <button onClick={handleRediger} className="text-underscore">Rediger?</button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};
export default BrukerComponent;
