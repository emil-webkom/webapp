"use client";

import useFetch from "@/hooks/use-fetch";
import { lavTerskelArrangement } from "@/schemas/lavterskelArrangement";
import { Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import Modal from "../ui/modal";
import LeggTilLTAForm from "../forms/leggTilLTA";
import EditLTAForm from "../forms/editLTAForm";

const LavterskelarrangementComponent = () => {
  const [leggTil, setLeggTil] = useState<boolean>(false);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const { data, loading, error } = useFetch<{
    data: lavTerskelArrangement[];
  } | null>("/api/lavterskelarrangement", refreshKey);
  const [LTData, setLTData] = useState<lavTerskelArrangement>();
  const [showPastEvents, setShowPastEvents] = useState<boolean>(false);
  const LT = data ? data.data : [];

  const handleClick = async ({
    type,
    data,
  }: {
    type: string;
    data?: lavTerskelArrangement;
  }) => {
    if (type === "slett" && data) {
      const confirmed = window.confirm(
        `Er du sikker på at du vil slette ${data.navn}?`,
      );

      if (confirmed) {
        try {
          const response = await fetch(
            `/api/lavterskelarrangement/${data.id}`,
            {
              method: "DELETE",
            },
          );
          if (response.status !== 200) {
            console.error("Could not delete HSP:", response.statusText);
          } else {
            // Trigger a data refresh
            setRefreshKey((prev) => prev + 1);
          }
        } catch (error) {
          console.error("Internal server error:", error);
        }
      }
    } else if (type === "rediger" && data) {
      const formattedData = {
        ...data,
        dato: new Date(data.dato).toISOString().slice(0, 16),
      };
      setLTData(formattedData);
      toggleForm();
    } else if (type === "legg til") {
      setLeggTil((prevState) => !prevState);
    }
  };

  const save = (type: string) => {
    setRefreshKey((prev) => prev + 1);
    if (type === "leggtil") {
      handleClick({ type: "legg til" });
    } else {
      toggleForm();
    }
  };

  const toggleForm = () => {
    setOpenForm((prevState) => !prevState);
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
          onClick={() => handleClick({ type: "legg til" })}
          className="text-underscore "
        >
          Legg til?
        </button>
      </div>
      {leggTil && (
        <Modal
          isOpen={leggTil}
          children={<LeggTilLTAForm handleCloseForm={() => save("leggtil")} />}
        />
      )}

      <div className="flex flex-col w-full p-4">
        <div className="flex bg-[#AEE0D0] rounded-md p-2">
          <div className="w-[20%] font-semibold">Navn</div>
          <div className="w-[10%] font-semibold">Dato</div>
          <div className="w-[15%] font-semibold">Type arrangement</div>
          <div className="w-[15%] font-semibold">Sted</div>
          <div className="w-[30%] font-semibold">Beskrivelse</div>
        </div>

        {filterEvents(LT)
          .sort(
            (a, b) => new Date(a.dato).getTime() - new Date(b.dato).getTime(),
          )
          .map((item) => (
            <div
              key={item.id}
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
                  onClick={() => handleClick({ type: "rediger", data: item })}
                  className="text-underscore px-2"
                >
                  Rediger?
                </button>
                <button
                  onClick={() => handleClick({ type: "slett", data: item })}
                  className="icon-hover"
                >
                  <Trash2 className="text-red-600 h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        {openForm && LTData && (
          <Modal isOpen={openForm}>
            <EditLTAForm LTA={LTData} handleCloseForm={() => save("")} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default LavterskelarrangementComponent;
