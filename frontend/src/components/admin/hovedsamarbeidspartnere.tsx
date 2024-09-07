"use client";

import useFetch from "@/hooks/use-fetch";
import { AeresEmiler } from "@/schemas/aeresEmiler";
import { useState, useEffect } from "react";
import LeggtilAeresemilerForm from "../forms/leggtilAeresemilerForm";
import Modal from "../ui/modal";
import { Trash2 } from "lucide-react";
import { Hovedsamarbeidspartner } from "@prisma/client";

interface dataProps{
    message: string;
    data: Hovedsamarbeidspartner[]
}

const HovedsamarbeidspartnerComponent = () => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const { data, loading, error } = useFetch<dataProps | null>("/api/hovedsamarbeidspartner");
  const HSP = data? (data.data):[];

  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>Error</div>;
  } 

  

  return (
    <div className="flex flex-col items-center bg-white rounded-md py-6 text-black">
      <div className="w-full px-4 lg:px-8">
        <h1 className="text-black text-center font-semibold py-2 text-xl sm:text-2xl w-full">
          Hovedsamarbeidspartnere
        </h1>
      </div>
     
      <div className="flex flex-col w-full p-4 ">
        <div className="flex bg-[#AEE0D0] rounded-md p-2">
          <div className="w-[20%] font-semibold ">Bedrift</div>
          <div className="w-[30%] font-semibold">Beskrivelse</div>
          
          <div className="w-[30%] font-semibold">Hjemmeside</div>
          <div className="w-[30%] font-semibold">Annonseside</div>
          <div className="w-[30%] font-semibold">Logo</div>
        </div>
        
        {HSP.map((item) => (
          <div key={item.id} className="flex w-full border-b-2 border-[#25504E] p-2">
            <div className="w-[20%] ">{item.navn}</div>
            <div className="w-[30%]">{item.beskrivelse}</div>
            
            <a href={item.hjemmeside} target="_blank" rel="noopener noreferrer" className="w-[30%]">
                Hjemmeside
              </a>
            <a href={item.annonseside} target="_blank" rel="noopener noreferrer" className="w-[30%]">
                Annnonseside
              </a>

              <div className="w-[30%]">
              <img src={item.logo} alt="Logo" className="w-32" />
            </div>
             
          </div>
        ))}
      </div>
    </div>
  );
};

export default HovedsamarbeidspartnerComponent;

  