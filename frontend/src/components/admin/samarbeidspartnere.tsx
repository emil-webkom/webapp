"use client";

import useFetch from "@/hooks/use-fetch";
import { AeresEmiler } from "@/schemas/aeresEmiler";
import { useState, useEffect, AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";
import LeggtilAeresemilerForm from "../forms/leggtilAeresemilerForm";
import Modal from "../ui/modal";
import { Trash2 } from "lucide-react";
import { Hovedsamarbeidspartner } from "@prisma/client";
import { Samarbeidspartner } from "@/schemas/samarbeidspartner";

interface dataProps{
    message: string;
    data: Samarbeidspartner[]
}

const SamarbeidspartnereComponent = () => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const { data, loading, error } = useFetch<dataProps | null>("/api/samarbeidspartner");
  const SP = data? data.data:[];

  

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
          Samarbeidspartnere
        </h1>
      </div>
     
      <div className="flex flex-col w-full p-4 ">
        <div className="flex bg-[#AEE0D0] rounded-md p-2">
          <div className="w-[30%] font-semibold">Bedrift</div>
          <div className="w-[30%] font-semibold">Logo</div>
          <div className="w-[30%] font-semibold">Hjemmeside</div>
        </div>
        
        {SP.map((item) => (
          <div key={item.id} className="flex w-full border-b-2 border-[#25504E] p-2">
            <div className="w-[30%]">{item.navn}</div>
            <div className="w-[30%]">
              <img src={item.logo} alt="Logo" className="w-32" />
            </div>
            <div className="w-[30%]">{item.homepage}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SamarbeidspartnereComponent;