"use client";

import useFetch from "@/hooks/use-fetch";
import { AeresEmiler } from "@/schemas/aeresEmiler";
import { useState, useEffect } from "react";
import LeggtilAeresemilerForm from "../forms/leggtilAeresemilerForm";
import Modal from "../ui/modal";
import { Trash2 } from "lucide-react";
import { Hovedsamarbeidspartner } from "@prisma/client";
import { Button } from "../ui/button";
import LeggTilHSPFrom from "../forms/leggTilHSP";
import EditHSPForm from "../forms/editHSPForm";
import { Hovedstyret } from "@/schemas/hovedstyret";

interface dataProps {
  message: string;
  data: Hovedsamarbeidspartner[];
}

const HovedsamarbeidspartnerComponent = () => {
  const [modalContent, setModalContent] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [leggTil, setLeggTil] = useState<boolean>(false);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [hovedsamarbeidspartner, setHovedsamarbeidspartner] =
    useState<Hovedsamarbeidspartner>();

  const [refreshKey, setRefreshKey] = useState<number>(0);
  const { data, loading, error } = useFetch<dataProps | null>(
    "/api/hovedsamarbeidspartner",
    refreshKey,
  );
  const HSP = data ? data.data : [];

  const handleLeggTilClick = () => {
    setLeggTil((prevState) => !prevState);
  };

  const handleRediger = (HSP: Hovedsamarbeidspartner) => {
    setHovedsamarbeidspartner(HSP);
    setOpenForm((prevState) => !prevState);
  };

  const handleSlett = async (item: Hovedsamarbeidspartner) => {
    const confirmed = window.confirm(
      `Er du sikker på at du vil slette ${item.navn}?`,
    );

    if (confirmed) {
      try {
        const response = await fetch(`/api/hovedsamarbeidspartner/${item.id}`, {
          method: "DELETE",
        });
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
  };

  const showModal = (content: string) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const toggleForm = () => {
    setOpenForm((prevState) => !prevState);
  };

  const save = (type: string) => {
    setRefreshKey((prev) => prev + 1);
    if (type === "leggtil") {
      handleLeggTilClick();
    } else {
      toggleForm();
    }
  };

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
      <div className="flex w-full px-6">
        <button
          onClick={() => handleLeggTilClick()}
          className="text-underscore "
        >
          Legg til?
        </button>
      </div>
      {leggTil && (
        <Modal
          isOpen={leggTil}
          children={<LeggTilHSPFrom handleCloseForm={() => save("leggtil")} />}
        />
      )}

      <div className="flex flex-col w-full p-4 ">
        <div className="flex gap-x-4 bg-[#AEE0D0] rounded-md p-2">
          <div className="w-[130px] font-semibold ">Bedrift</div>
          <div className="w-[130px] font-semibold">Beskrivelse</div>

          <div className="w-[250px] font-semibold">Hjemmeside</div>
          <div className="w-[250px] font-semibold">Annonseside</div>
          <div className="w-[100px] font-semibold">Logo</div>
          <div></div>
        </div>

        {HSP.map((item) => (
          <div
            key={item.id}
            className="flex justify-between gap-x-2 w-full border-b-2 border-[#25504E] p-2"
          >
            <div className="w-[130px]">{item.navn}</div>
            <div className="w-[130px]">
              <Button onClick={() => showModal(item.beskrivelse)}>
                Les beskrivelse
              </Button>
            </div>
            <div className="w-[250px] overflow-hidden">{item.hjemmeside}</div>
            <div className="w-[250px] text-wrap overflow-hidden">
              {item.annonseside}
            </div>

            <div className="w-[100px]">
              <img src={item.logo} alt="Logo" className="w-32" />
            </div>
            <div className="">
              <button
                onClick={() => handleRediger(item)}
                className="text-underscore px-2"
              >
                Rediger?
              </button>
              <button onClick={() => handleSlett(item)} className="icon-hover">
                <Trash2 className="text-red-600 h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {openForm && hovedsamarbeidspartner && (
          <Modal
            isOpen={openForm}
            children={
              <EditHSPForm
                HSP={hovedsamarbeidspartner}
                handleCloseForm={() => save("")}
              />
            }
          />
        )}
        {isModalOpen && (
          <Modal isOpen={isModalOpen}>
            <div className="w-full flex flex-col gap-y-4 p-4">
              <p className="border-b-2 border-primary">{modalContent}</p>
              <Button className="w-fit" onClick={() => setIsModalOpen(false)}>
                Lukk
              </Button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default HovedsamarbeidspartnerComponent;
