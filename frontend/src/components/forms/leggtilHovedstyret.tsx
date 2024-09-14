import { useState } from "react";
import { Hovedstyret, hovedstyretForm } from "@/schemas/hovedstyret";
import { hovedstyretFormSchema } from "@/schemas/hovedstyret";
import z from "zod";
import { Button } from "../ui/button";
import { uploadImage } from "@/utils/firebase/upload_hovedstyret"; 
import { getUserByEmail } from "@/data/user";

interface HovedstyretFormProps {
  handleCloseForm: () => void;
}

const LeggTilHovedstyret: React.FC<HovedstyretFormProps> = ({ handleCloseForm }) => {
  const [formData, setFormData] = useState<hovedstyretForm>({
    rolle: "",
    text: "",
    image: "",
    updatedAt: new Date(),
    userID: "",
    isActive: true,
    email: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(formData.image || null); 
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      const uploadedImageURL = await uploadImage(file); 
      setFormData((prevData) => ({
        ...prevData,
        image: uploadedImageURL,
      }));
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

  const saveData = async (rolle: hovedstyretForm) => {
    try {
      const response = await fetch(`/api/styret`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rolle),
      });

      if (response.status !== 200) {
        console.error("Could not save data:", response.statusText);
      } else {
        console.log("Successfully added new member of styret");
      }
    } catch (error) {
      console.error("Internal server error:", error);
    }
  };

  const userExists = async (email: string) => {
    try {
      const user = await getUserByEmail(email);
      return user || false;
    } catch (error) {
      console.error("Error fetching user:", error);
      return false;
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the user exists first
    const foundUser = await userExists(formData.email);

    if (!foundUser) {
      console.error("Could not find user based on email");
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Brukeren finnes ikke",
      }));
      return; // Stop form submission if user is not found
    }

    // Update the formData with the found user's ID
    setFormData((prevData) => ({
      ...prevData,
      userID: foundUser.id,
      email: foundUser.email,
    }));

    // Proceed with form validation and submission after userID is updated
    const updatedFormData = {
      ...formData,
      userID: foundUser.id, // Ensure userID is part of the form data
      updatedAt: new Date(),
    };

    try {
      // Parse and validate form data
      const parsedData = hovedstyretFormSchema.parse(updatedFormData);
      setErrors({}); // Clear previous errors if validation passes

      // Save data if validation passes
      await saveData(parsedData);

      // Close form after successful submission
      handleCloseForm();

    } catch (error) {
      if (error instanceof z.ZodError) {
        const zodErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          const field = err.path.join(".");
          zodErrors[field] = err.message;
        });
        console.log("Validation Errors:", zodErrors);
        setErrors(zodErrors); // Display validation errors
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 p-4">
      <h2 className="text-xl font-bold">Legg til nytt medlem i hovedstyret</h2>

      <div className="flex flex-col">
        <label htmlFor="rolle" className="font-semibold">Rolle:</label>
        <input
          type="text"
          id="rolle"
          name="rolle"
          value={formData.rolle}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Skriv inn rollenavn"
        />
        {errors.rolle && <span className="text-red-500">{errors.rolle}</span>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="text" className="font-semibold">Tekst:</label>
        <input
          type="text"
          id="text"
          name="text"
          value={formData.text}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Skriv inn en beskrivelse"
        />
        {errors.text && <span className="text-red-500">{errors.text}</span>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="image" className="font-semibold">Bilde:</label>
        {imagePreview && (
          <div className="mb-4">
            <p>Gjeldende bilde:</p>
            <img src={imagePreview} alt="Preview" className="w-32 h-32 rounded-md object-cover" />
          </div>
        )}
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2 rounded"
        />
        {errors.image && <span className="text-red-500">{errors.image}</span>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="email" className="font-semibold">Bruker:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Enter email"
        />
        {errors.email && <span className="text-red-500">{errors.email}</span>}
      </div>

      <div className="flex justify-between gap-2">
        <Button type="submit">Lagre</Button>
        <Button type="button" onClick={handleCloseForm}>Lukk</Button>
      </div>
    </form>
  );
};

export default LeggTilHovedstyret;
