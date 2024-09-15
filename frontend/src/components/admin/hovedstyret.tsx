"use client";

import useFetch from "@/hooks/use-fetch";
import { useState, useEffect } from "react";
import { Hovedstyret } from "@/schemas/hovedstyret";
import { Trash2 } from "lucide-react";
import Modal from "../ui/modal";
import EditHovedStyret from "../forms/editHovedstyret";
import { Button } from "../ui/button";
import LeggTilHovedstyret from "../forms/leggtilHovedstyret";

const HovedstyretComponent = () => {
  const [leggTil, setLeggTil] = useState<boolean>(false)
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [rolle, setRolle] = useState<Hovedstyret>();
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const { data, loading, error,  } = useFetch<{ data: Hovedstyret[] } | null>("/api/styret", refreshKey);

  const [HSData, setHSData] = useState<Hovedstyret[]>([]);

  useEffect(() => {
    if (data && data.data) {
      setHSData(data.data);
    }
  }, [data]);

  const handleRediger = (item: Hovedstyret) => {
    setRolle(item);
    toggleForm()
  };

  const handleSlett = async (rolle: Hovedstyret) => {
    const confirmed = window.confirm(`Er du sikker på at du vil slette ${rolle.rolle}?`);

    if (confirmed) {
      try {
        const response = await fetch(`/api/styret/${rolle.rolle}`, {
          method: "DELETE",
          body: JSON.stringify(rolle),
        }
      );
        if (response.status !== 200) {
          console.error("Could not delete rolle:", response.statusText);
        } else {
          // Trigger a data refresh
          setRefreshKey(prev => prev + 1);
        }
      } catch (error) {
        console.error("Internal server error:", error);
      }
    }
  };

  const toggleForm = () => {
    setOpenForm(prevState => !prevState);
  };

  const save = () => {
    setTimeout(() => setRefreshKey(prev => prev + 1), 2000);
    toggleForm();
  };

  const saveHS = () => {
    setTimeout(() => setRefreshKey(prev => prev + 1), 2000);
    handleLeggTilClick();
  }
  const handleLeggTilClick = () => {
    setLeggTil(prevState => !prevState);

  }
  return (
    <div className="flex flex-col items-center bg-white rounded-md py-6 text-black">
      <div className="w-full px-4 lg:px-8">
        <h1 className="text-black text-center font-semibold py-2 text-xl sm:text-2xl w-full">
          Hovedstyret
        </h1>
      </div>
      <div className="flex w-full px-6">
        <button onClick={handleLeggTilClick} className="text-underscore ">
          Legg til?
        </button>
      </div>
      {leggTil && (
        <Modal isOpen={leggTil} children={<LeggTilHovedstyret handleCloseForm={saveHS}/>}/>
      )}

      <div className="flex flex-col w-full p-4">
        <div className="flex justify-between bg-[#AEE0D0] rounded-md p-2">
          <div className="w-[15%] font-semibold">Rolle</div>
          <div className="w-[30%] font-semibold">Tekst</div>
          <div className="w-[10%] font-semibold">Bilde</div>
          <div className="w-[10%] font-semibold">Oppdatert</div>
          <div className="w-[10%] font-semibold">Navn</div>
          <div className="w-[10%] font-semibold"></div>
        </div>

        {rolle && (
          <Modal
            isOpen={openForm}
            children={<EditHovedStyret rolle={rolle} handleCloseForm={save} />}
          />
        )}

        {HSData.sort((a, b) => (a?.rolle || "").localeCompare(b?.rolle || "")).map((item) => (
          <div key={item.userID} className="flex justify-between items-center w-full border-b-2 border-[#25504E] p-2">
            <div className="w-[15%]">{item.rolle}</div>
            <div className="w-[30%]">{item.text}</div>
            <div className="w-[10%]">
              <img
                src={item.image}
                alt="Profilbilde"
                className="w-full h-auto max-w-[100px] rounded-md"
              />
            </div>
            <div className="w-[10%] text-left">{item.updatedAt.toString().split("T")[0]}</div>
            <div className="w-[10%] ">{item.User?.name}</div>
            <div className="flex gap-x-2 items-center">
              <button onClick={() => handleRediger(item)} className="text-underscore">Rediger?</button>
              <button onClick={() => handleSlett(item)} className="icon-hover">
                <Trash2 className="text-red-600 h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HovedstyretComponent;
