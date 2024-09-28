import { useState } from "react";
import z from "zod";
import { Button } from "../ui/button";
import { Komite, komiteSchema } from "@/schemas/komite";
import { uploadKomiteImage } from "@/utils/firebase/upload_komiteImage";

interface leggTilKomiteFormProps {
  handleCloseForm: () => void;
}
const LeggTilKomiteForm: React.FC<leggTilKomiteFormProps> = ({
  handleCloseForm,
}) => {
  const [formData, setFormData] = useState<Komite>({
    navn: "",
    leder: "",
    text1: "",
    text2: "",
    text3: "",
    bilde: "",
    mail: undefined,
    mappe: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(
    formData.bilde || null,
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image file upload
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const uploadedImageURL = await uploadKomiteImage(file);
      setFormData((prevData) => ({
        ...prevData,
        bilde: uploadedImageURL,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const saveData = async (komite: Komite) => {
    try {
      const response = await fetch(`/api/komite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(komite),
      });
      if (response.status !== 200) {
        console.error("Could not save data:", response.statusText);
      } else {
        console.log("Successfully added new komite");
      }
    } catch (error) {
      console.error("Internal server error:", error);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log(formData);
      // Parse and validate form data
      const parsedData = komiteSchema.parse(formData);
      setErrors({}); // Clear previous errors if validation passes
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
            Komitenavn:
          </label>
          <input
            type="text"
            id="navn"
            name="navn"
            value={formData.navn}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Skriv inn komitenavn"
          />
          {errors.rolle && <span className="text-red-500">{errors.rolle}</span>}
        </div>
        <div className="w-[30%]">
          <div className="flex flex-col">
            <label htmlFor="text" className="font-semibold">
              Leder:
            </label>
            <input
              type="text"
              id="leder"
              name="leder"
              value={formData.leder}
              onChange={handleChange}
              className="border p-2 rounded"
              placeholder="Ledernavn"
            />
            {errors.text && <span className="text-red-500">{errors.text}</span>}
          </div>
        </div>
        <div className="w-[30%]">
          <div className="flex flex-col">
            <label htmlFor="text" className="font-semibold">
              Overskrift:
            </label>
            <input
              type="text"
              id="text1"
              name="text1"
              value={formData.text1}
              onChange={handleChange}
              className="border p-2 rounded"
              placeholder="Overskrift"
            />
            {errors.text && <span className="text-red-500">{errors.text}</span>}
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="text" className="font-semibold">
          Highlighttekst:
        </label>
        <input
          type="text"
          id="text2"
          name="text2"
          value={formData.text2}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Skriv inn en tekst for highlighfeltet"
        />
        {errors.text && <span className="text-red-500">{errors.text}</span>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="text" className="font-semibold">
          Sideinnhold:
        </label>
        <input
          type="text"
          id="text3"
          name="text3"
          value={formData.text3}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Skriv inn en tekst for sideinnhold"
        />
        {errors.text && <span className="text-red-500">{errors.text}</span>}
      </div>

      <div className="flex gap-4 items-center ">
        <div className="flex flex-col w-full">
          <label htmlFor="bilde" className="font-semibold">
            Bilde (obligatorisk):
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
            id="bilde"
            name="bilde"
            accept="bilde/*"
            onChange={handleImageChange}
            className="border p-2 rounded"
          />
          {errors.image && <span className="text-red-500">{errors.image}</span>}
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="mail" className="font-semibold">
            Mail:
          </label>
          <input
            type="email"
            id="mail"
            name="mail"
            value={formData.mail}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Skriv inn mail"
          />
          {errors.email && <span className="text-red-500">{errors.email}</span>}
        </div>
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="mappe" className="font-semibold">
          Søknadsskjema:
        </label>
        <input
          type="mappe"
          id="mappe"
          name="mappe"
          value={formData.mappe}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Hvis en komite har aktiv søknadsdperiode kan du legge inn lenken til søknadsskjema her"
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

export default LeggTilKomiteForm;
