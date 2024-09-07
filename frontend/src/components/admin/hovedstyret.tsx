"use client";

import useFetch from "@/hooks/use-fetch";
import { useState, useEffect } from "react";
import { Komite } from "@/schemas/komite";
import { Hovedstyret } from "@prisma/client";


const HovedstyretComponent = () => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const { data, loading, error } = useFetch<{data: Hovedstyret[]} | null>("/api/styret");

 
  const [HSData, setHSData] = useState<Hovedstyret[]>([]);

  useEffect(() => {
    if (data && data.data) {
      setHSData(data.data); 
    }
  }, [data]);


 

 

  return (
    <div className="flex flex-col items-center bg-white rounded-md py-6 text-black">
      <div className="w-full px-4 lg:px-8">
        <h1 className="text-black text-center font-semibold py-2 text-xl sm:text-2xl w-full">
         Komiteer
        </h1>
      </div>
      
      <div className="flex flex-col w-full p-4 ">
        <div className="flex bg-[#AEE0D0] rounded-md p-2">
          <div className="w-[30%] font-semibold">Rolle</div>
          <div className="w-[30%] font-semibold">Tekst</div>
          <div className="w-[30%] font-semibold">Bilde</div>
         
        </div>
        
        {HSData.map((item) => (
          <div key={item.userID} className="flex w-full border-b-2 border-[#25504E] p-2">
            <div className="w-[30%]">{item.rolle}</div>
            <div className="w-[30%]">{item.text}</div>
            <div className="w-[30%]">
                <img src={item.image} alt="Profilbilde" className="w-32 rounded-md " />
            </div>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default HovedstyretComponent;