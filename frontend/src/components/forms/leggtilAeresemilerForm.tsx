import { AeresEmiler, aeresEmilerTypeEnum, createAeresEmilerSchema } from "@/schemas/aeresEmiler";
import { useState } from "react";
import z from "zod";

interface AeresEmilerFormProps {
    handleSubmit: (newitem: AeresEmiler) => void; // Callback function from the parent component
    handleCloseForm: () => void; // Callback function from the parent component
  }
  
  const AeresEmilerForm: React.FC<AeresEmilerFormProps> = ({ handleCloseForm }) => {
    const [formData, setFormData] = useState({
      type: '',
      navn: '',
      aar: "",
    });
  
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("WeGetHere");
        try {
          // Ensure `aar` is a number and `type` is correctly passed
          const parsedData = createAeresEmilerSchema.parse({
            ...formData,
            aar: parseInt(formData.aar), // Ensure 'aar' is an integer
          });
      
          console.log('Parsed Data:', parsedData);
      
          const response = await fetch('/api/aeresemiler', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(parsedData), // Send the parsed data in the request body
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          setErrors({});
      
          // Close the form after successful submission
          handleCloseForm();
        } catch (error) {
          if (error instanceof z.ZodError) {
            const zodErrors: { [key: string]: string } = {};
            error.errors.forEach((err) => {
              if (err.path[0]) {
                zodErrors[err.path[0] as string] = err.message;
              }
            });
            setErrors(zodErrors);
            console.error('Zod Validation Errors:', zodErrors); // Debugging
          } else {
            console.error('An unexpected error occurred:', error);
          }
        }
      };
        
    return (
      <form onSubmit={handleSubmit} className="w-full p-4 rounded-md border-2">
        {/* Type select */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
            Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            required
          >
            <option value="" disabled>
              Velg type
            </option>
            <option value={aeresEmilerTypeEnum.Enum.AERESEMILER}>Æresemiler</option>
            <option value={aeresEmilerTypeEnum.Enum.FORTJENESTEMEDALJE}>Fortjenestemedalje</option>
          </select>
          {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
        </div>
  
        {/* Navn input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="navn">
            Navn
          </label>
          <input
            name="navn"
            type="text"
            value={formData.navn}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            placeholder="Navn"
            required
          />
          {errors.navn && <p className="text-red-500 text-sm">{errors.navn}</p>}
        </div>
  
        {/* År input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="aar">
            År
          </label>
          <input
            name="aar"
            type="number"
            value={formData.aar}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            placeholder="År"
            required
          />
          {errors.aar && <p className="text-red-500 text-sm">{errors.aar}</p>}
        </div>
  
        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-primary hover:bg-slate-400 text-white font-normal py-2 px-4 rounded-md"
          >
            Legg til
          </button>
  
          {/* Close Form Button */}
          <button
            type="button"
            onClick={handleCloseForm} // Call the close form function when clicked
            className="bg-primary hover:bg-slate-400 text-white font-normal py-2 px-4 rounded-md"
          >
            Lukk
          </button>
        </div>
      </form>
    );
  };
  
  export default AeresEmilerForm;
  