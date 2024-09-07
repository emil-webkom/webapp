"use client";

import useFetch from "@/hooks/use-fetch";
import { AeresEmiler } from "@/schemas/aeresEmiler";
import { useState, useEffect } from "react";
import LeggtilAeresemilerForm from "../forms/leggtilAeresemilerForm";
import Modal from "../ui/modal";
import { Trash2 } from "lucide-react";


const AeresEmilerComponent = () => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const { data, loading, error } = useFetch<AeresEmiler[] | null>("/api/aeresemiler");

  // Store sorted data in state
  const [sortedData, setSortedData] = useState<AeresEmiler[]>([]);

  // Update sortedData when the fetch data changes
  useEffect(() => {
    if (data) {
      const sorted = [...data].sort((a, b) => b.aar - a.aar);
      setSortedData(sorted); // Update sortedData when data changes
    }
  }, [data]); // Depend on `data` not `sortedData`

  // Handle delete
  const handleSlett = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`/api/aeresemiler/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the item');
      }

      console.log(`Item with id ${id} was deleted successfully`);

      // Remove the deleted item from the local state
      setSortedData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Handle adding new ÆresEmiler
  const handleLeggTil = (newItem: AeresEmiler) => {
    // Update sortedData by adding the new item
    setSortedData((prevData) => {
      const updatedData = [...prevData, newItem];
      return updatedData.sort((a, b) => b.aar - a.aar);
    });

    toggleForm();
    window.location.reload()
  };

  const handleLeggTilClick = () => {
    setOpenForm(true);
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
          Oversikt over Æresemilere og utdelte fortjenestemedaljer
        </h1>
      </div>
      <button onClick={handleLeggTilClick} className="flex w-full px-6 text-underscore ">
        Legg til?
      </button>
      <div className="flex flex-col w-full p-4 ">
        <div className="flex bg-[#AEE0D0] rounded-md p-2">
          <div className="w-[30%] font-semibold">Navn:</div>
          <div className="w-[30%] font-semibold">Type pris</div>
          <div className="w-[30%] font-semibold">År:</div>
        </div>
        {openForm && (
          <Modal
            isOpen={openForm}
            children={<LeggtilAeresemilerForm handleCloseForm={toggleForm} handleSubmit={handleLeggTil} />}
          />
        )}
        {sortedData.map((item) => (
          <div key={item.id} className="flex w-full border-b-2 border-[#25504E] p-2">
            <div className="w-[30%]">{item.navn}</div>
            <div className="w-[30%]">{item.type}</div>
            <div className="w-[30%]">{item.aar}</div>
            <button onClick={() => handleSlett(item.id)} className="icon-hover">
              <Trash2 className="text-red-600 h-4 w-4 "></Trash2>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AeresEmilerComponent;
