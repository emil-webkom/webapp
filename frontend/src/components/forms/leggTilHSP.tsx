import { useState } from "react";
import z from "zod";
import { Button } from "../ui/button";
import { Komite, komiteSchema } from "@/schemas/komite";
import { uploadKomiteImage } from "@/utils/firebase/upload_komiteImage";
import {
  Hovedsamarbeidspartner,
  HovedsamarbeidspartnerSchema,
} from "@/schemas/hovedsamarbeidspartner";
import { uploadHSPpic } from "@/utils/firebase/upload_HSPpic";
import { Hovedstyret } from "@/schemas/hovedstyret";

interface leggTilHSPFormProps {
  handleCloseForm: () => void;
}
const LeggTilHSPFrom: React.FC<leggTilHSPFormProps> = ({ handleCloseForm }) => {
  const [formData, setFormData] = useState<Hovedsamarbeidspartner>({
    navn: "",
    beskrivelse: "",
    active: true,
    logo: "",
    hjemmeside: "",
    annonseside: "",
    id: undefined,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(
    formData.logo || null,
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const uploadedImageURL = await uploadHSPpic(file);
      setFormData((prevData) => ({
        ...prevData,
        logo: uploadedImageURL,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const saveData = async (HSP: Hovedsamarbeidspartner) => {
    try {
      const response = await fetch(`/api/hovedsamarbeidspartner`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(HSP),
      });
      if (response.status !== 200) {
        console.error("Could not save data:", response.statusText);
      } else {
        console.log("Successfully added new HSP");
      }
    } catch (error) {
      console.error("Internal server error:", error);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const parsedData = HovedsamarbeidspartnerSchema.parse(formData);
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
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 p-4">
      <h2 className="text-xl font-bold">Legg til ny komite</h2>

      <div className="flex w-full  gap-x-4 justify-between">
        <div className="flex w-[30%] flex-col">
          <label htmlFor="rolle" className="font-semibold">
            Bedrifsnavn:
          </label>
          <input
            type="text"
            id="navn"
            name="navn"
            value={formData.navn}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Bedriftsnavn"
          />
          {errors.rolle && <span className="text-red-500">{errors.rolle}</span>}
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="text" className="font-semibold">
          Beskrivelse:
        </label>
        <input
          type="text"
          id="beskrivelse"
          name="beskrivelse"
          value={formData.beskrivelse}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Bedriftsbeskrivelse"
        />
        {errors.text && <span className="text-red-500">{errors.text}</span>}
      </div>
      <div className="flex gap-4 items-center ">
        <div className="flex flex-col">
          <label htmlFor="logo" className="font-semibold">
            Logo:
          </label>
          {imagePreview && (
            <div className="mb-4">
              <p>Gjeldende bilde:</p>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 rounded-md object-cover"
              />
            </div>
          )}
          <input
            type="file"
            id="logo"
            name="logo"
            accept="logo/*"
            onChange={handleImageChange}
            className="border p-2 rounded"
          />
          {errors.image && <span className="text-red-500">{errors.image}</span>}
        </div>
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="hjemmeside" className="font-semibold">
          Lenke til hjemmeside:
        </label>
        <input
          type="text"
          id="hjemmeside"
          name="hjemmeside"
          value={formData.hjemmeside}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Her kan du legge til lenke til bedriftens hjemmeside"
        />
        {errors.email && <span className="text-red-500">{errors.email}</span>}
      </div>

      <div className="flex flex-col w-full">
        <label htmlFor="annonseside" className="font-semibold">
          Lenke til annonseside:
        </label>
        <input
          type="text"
          id="annonseside"
          name="annonseside"
          value={formData.annonseside}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Her kan du legge til lenken til bedriftens jobbside"
        />
        {errors.email && <span className="text-red-500">{errors.email}</span>}
      </div>

      <div className="flex justify-between gap-2">
        <Button type="submit">Lagre</Button>
        <Button type="button" onClick={handleCloseForm}>
          Lukk
        </Button>
      </div>
    </form>
  );
};

export default LeggTilHSPFrom;
