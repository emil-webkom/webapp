"use client";

import useFetch from "@/hooks/use-fetch";
import { useState } from "react";
import Modal from "../ui/modal";
import { Trash2 } from "lucide-react";
import { Samarbeidspartner } from "@/schemas/samarbeidspartner";
import LeggTilSPForm from "../forms/leggTilSP";
import EditSPForm from "../forms/editSPForm";

interface dataProps {
  message: string;
  data: Samarbeidspartner[];
}

const SamarbeidspartnereComponent = () => {
  const [leggTil, setLeggTil] = useState<boolean>(false);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const { data, loading, error } = useFetch<dataProps | null>(
    "/api/samarbeidspartner",
    refreshKey,
  );
  const [samarbeidspartner, setSamarbeidspartner] =
    useState<Samarbeidspartner>();
  const SP = data ? data.data : [];

  const handleClick = async ({
    type,
    data,
  }: {
    type: string;
    data?: Samarbeidspartner;
  }) => {
    if (type === "slett" && data) {
      const confirmed = window.confirm(
        `Er du sikker på at du vil slette ${data.navn}?`,
      );

      if (confirmed) {
        try {
          const response = await fetch(`/api/samarbeidspartner/${data.id}`, {
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
    } else if (type === "rediger" && data) {
      setSamarbeidspartner(data);
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
          children={<LeggTilSPForm handleCloseForm={() => save("leggtil")} />}
        />
      )}

      <div className="flex flex-col w-full p-4 ">
        <div className="flex bg-[#AEE0D0] rounded-md p-2">
          <div className="w-[30%] font-semibold">Bedrift</div>
          <div className="w-[30%] font-semibold">Logo</div>
          <div className="w-[30%] font-semibold">Hjemmeside</div>
        </div>

        {SP.map((item) => (
          <div
            key={item.id}
            className="flex w-full border-b-2 border-[#25504E] p-2"
          >
            <div className="w-[30%]">{item.navn}</div>
            <div className="w-[30%]">
              <img src={item.logo} alt="Logo" className="w-32" />
            </div>
            <div className="w-[30%] overflow-hidden">{item.homepage}</div>
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
        {openForm && samarbeidspartner && (
          <Modal
            isOpen={openForm}
            children={
              <EditSPForm
                handleCloseForm={() => save("")}
                item={samarbeidspartner}
              />
            }
          />
        )}
      </div>
    </div>
  );
};

export default SamarbeidspartnereComponent;
