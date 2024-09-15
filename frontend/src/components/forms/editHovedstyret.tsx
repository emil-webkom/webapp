import { useState } from "react";
import { Hovedstyret, hovedstyretForm } from "@/schemas/hovedstyret";
import { hovedstyretFormSchema } from "@/schemas/hovedstyret";
import z from "zod";
import { Button } from "../ui/button";
import { uploadImage } from "@/utils/firebase/upload_hovedstyret"; // Assuming this is correct
import { getUserByEmail } from "@/data/user";

interface HovedstyretFormProps {
  rolle: Hovedstyret;
  handleCloseForm: () => void; // Callback for closing the form
}

const EditHovedStyret: React.FC<HovedstyretFormProps> = ({ rolle, handleCloseForm }) => {
  const [formData, setFormData] = useState<hovedstyretForm>({
    rolle: rolle.rolle,
    text: rolle.text,
    image: rolle.image,
    updatedAt: new Date(),
    userID: rolle.userID, 
    isActive: rolle.isActive,
    email: rolle.User.email,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(rolle?.image || null); // Preview for the uploaded image
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Handle form input changes (also handling nested fields like 'user')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedFormData = {...formData, [name]:value}
    setFormData(updatedFormData);
  }

  // Handle image file upload
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const uploadedImageURL = await uploadImage(file); // Upload to Firebase or similar service
      setFormData((prevData) => ({
        ...prevData,
        image: uploadedImageURL,
      }));
      setImagePreview(URL.createObjectURL(file)); // Update preview
    }
  };

  const saveData = async (rolle: hovedstyretForm) => {
    try {
      const response = await fetch(`/api/styret/${rolle.rolle}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rolle),
      });
      if (response.status !== 200) {
        console.error("Could not save data:", response.statusText);
      }
    } catch (error) {
      console.error("Internal server error:", error);
    }
  };

  const userExists = async (email:string) => {
      const user = await getUserByEmail(email);
      return user ? true : false;
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //Does user exist?
    const foundUser = await userExists(formData?.email)? true : false; 
    if (foundUser) {
      try {
          const parsedData = hovedstyretFormSchema.parse(formData,); 
          setErrors({}); 
          await saveData(parsedData);
          handleCloseForm(); // Close the form
      } catch (error) {
          // Catch Zod validation errors
          if (error instanceof z.ZodError) {
              const zodErrors: { [key: string]: string } = {};
              error.errors.forEach((err) => {
                  const field = err.path.join(".");
                  zodErrors[field] = err.message;
              });
              console.log("Validation Errors:", zodErrors);
              setErrors(zodErrors); // Set errors for display
          } else {
              console.error("An unexpected error occurred:", error);
          }
      }

    }else {
      console.error("Could not find user based on email")
    }
};

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 p-4">
      <h2 className="text-xl font-bold">Rediger Hovedstyret</h2>

      {/* Rolle Field */}
      <div className="flex flex-col">
        <label htmlFor="rolle" className="font-semibold">Rolle:</label>
        <div>{rolle.rolle}</div>
        {errors.rolle && <span className="text-red-500">{errors.rolle}</span>}
      </div>

      {/* Text Field */}
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

      {/* Image Upload Field */}
      <div className="flex flex-col">
        <label htmlFor="image" className="font-semibold">Bilde:</label>
        {/* Display current or preview image */}
        {imagePreview && (
          <div className="mb-4">
            <p>Gjeldende bilde:</p>
            <img src={imagePreview} alt="Preview" className="w-32 h-32 rounded-md object-cover" />
          </div>
        )}
        {/* Input field for image file */}
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
        <label htmlFor="user.email" className="font-semibold">Bruker:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Enter email"
        />
        {errors["user.email"] && <span className="text-red-500">{errors["user.email"]}</span>}
      </div>

      <div className="flex justify-between gap-2">
        <Button type="submit">Lagre</Button>
        <Button type="button" onClick={handleCloseForm}>Lukk</Button>
      </div>
    </form>
  );
};

export default EditHovedStyret;
