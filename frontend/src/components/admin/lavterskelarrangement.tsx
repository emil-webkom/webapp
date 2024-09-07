"use client";

import useFetch from "@/hooks/use-fetch";
import { lavTerskelArrangement } from "@/schemas/lavterskelArrangement";
import { useState, useEffect } from "react";




const LavterskelarrangementComponent = () => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const { data, loading, error } = useFetch<{data: lavTerskelArrangement[]} | null>("/api/lavterskelarrangement");

 
  const [LTData, setLTData] = useState<lavTerskelArrangement[]>([]);

  useEffect(() => {
    if (data && data.data) {
      setLTData(data.data); 
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
        
        {LTData.map((item) => (
          <div key={item.userId} className="flex w-full border-b-2 border-[#25504E] p-2">
            <div className="w-[30%]">{item.navn}</div>
            <div className="w-[30%]">{item.sted}</div>
          
            
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default LavterskelarrangementComponent;