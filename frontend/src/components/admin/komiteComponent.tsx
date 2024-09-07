"use client";

import useFetch from "@/hooks/use-fetch";
import { useState, useEffect } from "react";
import LeggtilAeresemilerForm from "../forms/leggtilAeresemilerForm";
import Modal from "../ui/modal";
import { Trash2 } from "lucide-react";
import { Komite } from "@/schemas/komite";


const KomiteComponent = () => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const { data, loading, error } = useFetch<Komite[] | null>("/api/komite");

  // Store sorted data in state
  const [komiteData, setKomiteData] = useState<Komite[]>([]);

  useEffect(() => {
    if (data) {
      setKomiteData(data); 
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
          <div className="w-[30%] font-semibold">Navn</div>
          <div className="w-[30%] font-semibold">Leder</div>
          <div className="w-[30%] font-semibold">Overskrift</div>
          <div className="w-[30%] font-semibold">tekst2</div>
          <div className="w-[30%] font-semibold">Innhold</div>
          <div className="w-[30%] font-semibold">bilde</div>
          <div className="w-[30%] font-semibold">mail</div>
          
        </div>
        
        {komiteData.map((item) => (
          <div key={item.id} className="flex w-full border-b-2 border-[#25504E] p-2">
            <div className="w-[30%]">{item.navn}</div>
            <div className="w-[30%]">{item.leder}</div>
            <div className="w-[30%]">{item.text1}</div>
            <div className="w-[30%]">{item.text2}</div>
            <div className="w-[30%]">{item.text3}</div>
            <div className="w-[30%]">
              <img src={item.bilde} alt="Bilde" className="w-32"/>
            </div>
            <div className="w-[30%]">{item.mail}</div>
          
          </div>
        ))}
      </div>
    </div>
  );
};

export default KomiteComponent;
