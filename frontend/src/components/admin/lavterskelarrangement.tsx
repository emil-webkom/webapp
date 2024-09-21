"use client";

import useFetch from "@/hooks/use-fetch";
import { lavTerskelArrangement } from "@/schemas/lavterskelArrangement";
import { Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

const LavterskelarrangementComponent = () => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const { data, loading, error } = useFetch<{
    data: lavTerskelArrangement[];
  } | null>("/api/lavterskelarrangement");

  const [LTData, setLTData] = useState<lavTerskelArrangement[]>([]);
  const [showPastEvents, setShowPastEvents] = useState<boolean>(false); // State to toggle between past/future events

  useEffect(() => {
    if (data && data.data) {
      setLTData(data.data);
    }
  }, [data]);

  const handleRediger = (id: string) => {
    null;
  };

  const handleSlett = (id: string) => {
    null;
  };

  const handleLeggTilClick = () => {
    null;
  };

  const filterEvents = (events: lavTerskelArrangement[]) => {
    const today = new Date();
    if (!showPastEvents) {
      return events.filter((event) => new Date(event.dato) >= today);
    }
    return events;
  };

  return (
    <div className="flex flex-col items-center bg-white rounded-md py-6 text-black">
      <div className="w-full px-4 lg:px-8">
        <h1 className="text-black text-center font-semibold py-2 text-xl sm:text-2xl w-full">
          Lavterskelarrangementer
        </h1>
      </div>
      <div className="w-full px-6 mb-4 text-center">
        <div className="font-semibold:">Filtrer:</div>
        <select
          value={showPastEvents ? "future" : "all"}
          onChange={(e) => setShowPastEvents(e.target.value === "future")}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="all">Kommende arrangementer</option>
          <option value="future">Alle arrangementer</option>
        </select>
      </div>
      <div className="flex w-full px-6">
        <button
          onClick={() => handleLeggTilClick()}
          className="text-underscore "
        >
          Legg til?
        </button>
      </div>
      <div className="flex flex-col w-full p-4">
        <div className="flex bg-[#AEE0D0] rounded-md p-2">
          <div className="w-[20%] font-semibold">Navn</div>
          <div className="w-[10%] font-semibold">Dato</div>
          <div className="w-[15%] font-semibold">Type arrangement</div>
          <div className="w-[15%] font-semibold">Sted</div>
          <div className="w-[30%] font-semibold">Beskrivelse</div>
        </div>

        {/* Render filtered events */}
        {filterEvents(LTData)
          .sort(
            (a, b) => new Date(a.dato).getTime() - new Date(b.dato).getTime(),
          )
          .map((item) => (
            <div
              key={item.userId}
              className="flex w-full border-b-2 border-[#25504E] p-2"
            >
              <div className="w-[20%]">{item.navn}</div>
              <div className="w-[10%]">
                {item.dato.toString().split("T")[0]}
              </div>
              <div className="w-[15%]">{item.type}</div>
              <div className="w-[15%] text-wrap">{item.sted}</div>
              <div className="w-[30%] text-wrap">{item.beskrivelse}</div>
              <div className="">
                <button
                  onClick={() => handleRediger(item.id || "")}
                  className="text-underscore px-2"
                >
                  Rediger?
                </button>
                <button
                  onClick={() => handleSlett(item.id || "")}
                  className="icon-hover"
                >
                  <Trash2 className="text-red-600 h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LavterskelarrangementComponent;
