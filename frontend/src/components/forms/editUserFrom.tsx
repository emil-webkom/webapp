import { useState } from "react";
import { UserPrisma, userPrismaSchema } from "@/schemas/user";
import z from "zod";
import { Button } from "../ui/button";
import { uploadProfilePic } from "@/utils/firebase/upload_profilepic";
import Bruker from "../admin/bruker";

interface UserFormProps {
  user: UserPrisma;
  handleCloseForm: () => void; // Callback for closing the form
}

const EditUserForm: React.FC<UserFormProps> = ({ user, handleCloseForm }) => {
  const [formData, setFormData] = useState({
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    image: user.image,
    role: user.role,
    kontigent: user.kontigent,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(user.image || null); // Preview for the uploaded image
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement | HTMLSelectElement;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image file upload
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const uploadedImageURL = await uploadProfilePic(file);
      setFormData((prevData) => ({
        ...prevData,
        image: uploadedImageURL, 
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const saveData = async (data : UserPrisma) => {
    try {
      const response = await fetch(`/api/users/${data.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.status !== 200){
        console.error("Could not save data:", response.statusText);
      }

    }catch (error) {
      console.error("Internal server error:", error);
    }

  }

  const handleFormSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const parsedData = userPrismaSchema.parse(formData);
    // Proceed with the valid parsedData (which now includes the correct image field)
    console.log(parsedData);
    
    setErrors({}); // Clear any previous errors
    saveData(parsedData);
    handleCloseForm(); 
  } catch (error) {
    // Catch Zod validation errors
    if (error instanceof z.ZodError) {
      const zodErrors: { [key: string]: string } = {};
      error.errors.forEach((err) => {
        if (err.path[0]) {
          zodErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(zodErrors); // Set errors for display
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }
};


  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 p-4">
      <h2 className="text-xl font-bold">Rediger bruker</h2>

      {/* Name Field */}
      <div className="flex flex-col">
        <label htmlFor="name" className="font-semibold">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Enter user's name"
        />
        {errors.name && <span className="text-red-500">{errors.name}</span>}
      </div>

      {/* Username Field */}
      <div className="flex flex-col">
        <label htmlFor="username" className="font-semibold">Brukernavn:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username || ""}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Enter username"
        />
        {errors.username && <span className="text-red-500">{errors.username}</span>}
      </div>

      {/* Email Field */}
      <div className="flex flex-col">
        <label htmlFor="email" className="font-semibold">Email:</label>
        <div>{formData.email}</div>
      </div>

      {/* Image Upload Field */}
      <div className="flex flex-col">
        <label htmlFor="image" className="font-semibold">Bilde:</label>

        {/* Display current or preview image */}
        {imagePreview && (
          <div className="mb-4">
            <p>Current image:</p>
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

      {/* Role Dropdown */}
      <div className="flex flex-col">
        <label htmlFor="role" className="font-semibold">Role:</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="SUPER_USER">Super User</option>
        </select>
        {errors.role && <span className="text-red-500">{errors.role}</span>}
      </div>

      {/* Kontigent Dropdown */}
      <div className="flex flex-col">
        <label htmlFor="kontigent" className="font-semibold">Kontigent Status:</label>
        <select
          id="kontigent"
          name="kontigent"
          value={formData.kontigent}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="UBETALT">Ubetalt</option>
          <option value="BETALT">Betalt</option>
          <option value="AVVENTER_BEKREFTELSE">Avventer Bekreftelse</option>
        </select>
        {errors.kontigent && <span className="text-red-500">{errors.kontigent}</span>}
      </div>

      {/* Form Buttons */}
      <div className="flex justify-end gap-2">
        <Button type="button" onClick={handleCloseForm}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default EditUserForm;
