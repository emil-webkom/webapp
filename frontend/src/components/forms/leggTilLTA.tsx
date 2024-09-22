import { useState } from "react";
import z from "zod";
import { Button } from "../ui/button";
import {
  Samarbeidspartner,
  SamarbeidspartnerSchema,
} from "@/schemas/samarbeidspartner";
import { uploadSPpic } from "@/utils/firebase/upload_SPpic";
import {
  lavTerskelArrangement,
  lavTerskelArrangementSchema,
} from "@/schemas/lavterskelArrangement";
import { useCurrentUser } from "@/hooks/use-current-user";

interface leggTilLTAProps {
  handleCloseForm: () => void;
}
const LeggTilLTAForm: React.FC<leggTilLTAProps> = ({ handleCloseForm }) => {
  const user = useCurrentUser();
  const [formData, setFormData] = useState<lavTerskelArrangement>({
    navn: "",
    dato: new Date(),
    type: "",
    userId: user?.id || "",
    id: undefined,
    sted: "",
    beskrivelse: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "dato" ? new Date(value) : value,
    }));
  };

  const saveData = async (SP: lavTerskelArrangement) => {
    try {
      const response = await fetch(`/api/lavterskelarrangement`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(SP),
      });
      if (response.status !== 200) {
        console.error("Could not save data:", response.statusText);
      } else {
        console.log("Successfully added new lavterskelarrangement");
      }
    } catch (error) {
      console.error("Internal server error:", error);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedFormData = {
      ...formData,
      dato:
        formData.dato instanceof Date
          ? formData.dato.toISOString()
          : formData.dato,
    };

    try {
      const parsedData = lavTerskelArrangementSchema.parse(formattedFormData);
      console.log(parsedData);
      setErrors({});
      await saveData(parsedData);
      handleCloseForm();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const zodErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          const field = err.path.join(".");
          zodErrors[field] = err.message;
        });
        console.log("Validation Errors:", zodErrors);
        setErrors(zodErrors);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="w-full rounded p-1 pt-2 lg:pt-4 flex flex-col lg:flex-col"
    >
      <div className="flex flex-col h-[60%]">
        <div className="flex flex-col lg:flex-row gap-x-2">
          <div className="flex flex-col lg:w-[40%]">
            <div className="mb-2 lg:mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="navn"
              >
                Arrangementnavn
              </label>
              <input
                name="navn"
                type="text"
                value={formData.navn || ""}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Navn"
                required
              />
            </div>

            <div className="mb-2 lg:mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="sted"
              >
                Sted
              </label>
              <input
                name="sted"
                type="text"
                value={formData.sted || ""}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Sted"
              />
            </div>
          </div>

          <div className="flex flex-col h-[60%]">
            <div className="mb-2 lg:mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="type"
              >
                Type
              </label>
              <select
                name="type"
                value={formData.type || ""}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="" disabled>
                  Select type
                </option>
                <option value="Internt arrangement">Internt arrangement</option>
                <option value="Eksternt arrangement">
                  Eksternt arrangement
                </option>
                <option value="Bedpress">Bedpress</option>
                <option value="Offentlig arrangement">
                  Offentlig arrangement
                </option>
              </select>
            </div>

            <div className="mb-2 lg:mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="dato"
              >
                Dato (Bruk kalenderen)
              </label>
              <input
                name="dato"
                type="datetime-local"
                value={
                  formData.dato instanceof Date
                    ? formData.dato.toISOString().slice(0, 16)
                    : formData.dato || ""
                }
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>
        </div>
        <div className="mb-2 lg:mb-4 w-full">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="beskrivelse"
          >
            Beskrivelse
          </label>
          <textarea
            name="beskrivelse"
            value={formData.beskrivelse || ""}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Beskrivelse"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-primary hover:bg-slate-400 text-white font-normal py-2 px-4 rounded-md"
        >
          Lagre
        </button>
        <button
          type="button"
          onClick={handleCloseForm}
          className="bg-primary hover:bg-slate-400 text-white font-normal py-2 px-4 rounded-md"
        >
          Lukk
        </button>
      </div>
    </form>
  );
};

export default LeggTilLTAForm;
