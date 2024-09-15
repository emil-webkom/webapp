"use client";

import useFetch from "@/hooks/use-fetch";
import { useState, useEffect } from "react";
import Modal from "../ui/modal";
import { Komite } from "@/schemas/komite";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import LeggTilKomiteForm from "../forms/leggTilKomiteForm";
import EditHovedStyret from "../forms/editHovedstyret";
import EditKomiteForm from "../forms/editKomiteFrom";

const KomiteComponent = () => {
  const [leggTil, setLeggTil] = useState<boolean>(false);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [refreshKey, setRefreshKey] = useState<number>(0);
  const { data, loading, error } = useFetch<Komite[] | null>(
    "/api/komite",
    refreshKey,
  );
  const [modalContent, setModalContent] = useState<string>("");
  const [komiteData, setKomiteData] = useState<Komite[]>([]);
  const [komite, setKomite] = useState<Komite>();

  useEffect(() => {
    if (data) {
      setKomiteData(data);
    }
  }, [data]);

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

  const showModal = (content: string) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleLeggTilClick = () => {
    setLeggTil((prevState) => !prevState);
  };

  const handleRediger = (komite: Komite) => {
    setKomite(komite);
    setOpenForm((prevState) => !prevState);
  };

  const handleSlett = async (komite: Komite) => {
    const confirmed = window.confirm(
      `Er du sikker på at du vil slette ${komite.navn}?`,
    );

    if (confirmed) {
      try {
        const response = await fetch(`/api/komite/${komite.id}`, {
          method: "DELETE",
        });
        if (response.status !== 200) {
          console.error("Could not delete komite:", response.statusText);
        } else {
          // Trigger a data refresh
          setRefreshKey((prev) => prev + 1);
        }
      } catch (error) {
        console.error("Internal server error:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center bg-white rounded-md py-6 text-black">
      <div className="w-full px-4 lg:px-8">
        <h1 className="text-black text-center font-semibold py-2 text-xl sm:text-2xl w-full">
          Komiteer
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
          children={
            <LeggTilKomiteForm handleCloseForm={() => save("leggtil")} />
          }
        />
      )}
      <div className="flex flex-col w-full p-4">
        <div className="flex bg-[#AEE0D0] rounded-md p-2">
          <div className="w-[150px] font-semibold">Navn</div>
          <div className="w-[150px] font-semibold">Leder</div>
          <div className="w-[100px] font-semibold">Overskrift</div>
          <div className="w-[100px] font-semibold">Highlight tekst</div>
          <div className="w-[100px] font-semibold">Innhold</div>
          <div className="w-[150px] font-semibold">Bilde</div>
          <div className="w-[180px] font-semibold">Mail</div>
        </div>

        {komiteData.map((item) => (
          <div
            key={item.id}
            className="flex w-full border-b-2 border-[#25504E] p-2"
          >
            <div className="w-[150px]">{item.navn}</div>
            <div className="w-[150px]">{item.leder}</div>
            <div className="w-[100px]">{item.text1}</div>
            <div className="w-[100px]">
              <Button onClick={() => showModal(item.text2 ?? "")}>
                Se tekst
              </Button>
            </div>
            <div className="w-[100px]">
              <Button onClick={() => showModal(item.text3 ?? "")}>
                Se innhold
              </Button>
            </div>
            <div className="w-[150px]">
              <img src={item.bilde} alt="Bilde" className="w-32" />
            </div>
            <div className="w-[180px]">{item.mail}</div>
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
      </div>

      {openForm && komite && (
        <Modal
          isOpen={openForm}
          children={
            <EditKomiteForm komite={komite} handleCloseForm={() => save("")} />
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
  );
};

export default KomiteComponent;
