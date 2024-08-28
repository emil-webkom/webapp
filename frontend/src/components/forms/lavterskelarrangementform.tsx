import React, { useState } from 'react';
import { z } from 'zod';
import { lavTerskelArrangementSchema, lavTerskelArrangement } from '@/schemas/lavterskelArrangement'; // Adjust the import path

const LavterskelArrangementForm = ({ onSubmit, onClose }: { onSubmit: (data: lavTerskelArrangement) => void, onClose: () => void }) => {
  const [formData, setFormData] = useState<Partial<lavTerskelArrangement>>({
    navn: '',
    sted: '',
    dato: new Date(),
    type: '',
    beskrivelse: '',
    userId: ''
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate the form data against the schema
    try {
      const validatedData = lavTerskelArrangementSchema.parse({
        ...formData,
        dato: new Date(formData.dato || ''), // Ensure date is a Date object
        createdAt: new Date(), // Assuming these are set on form submission
        updatedAt: new Date(),
      });

      // If validation passes, call the onSubmit function
      onSubmit(validatedData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Handle validation errors
        setError(err.errors.map(e => e.message).join(', '));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full rounded p-1 pt-2 lg:pt-4 flex flex-col lg:flex-col border-2">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className='flex flex-col h-[60%]'>
        <div className='flex flex-col lg:flex-row gap-x-2'>
        <div className='flex flex-col lg:w-[40%]'>
          <div className="mb-2 lg:mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="navn">
              Navn
            </label>
            <input
              name="navn"
              type="text"
              value={formData.navn || ''}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Navn"
              required
            />
          </div>

          <div className="mb-2 lg:mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sted">
              Sted
            </label>
            <input
              name="sted"
              type="text"
              value={formData.sted || ''}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Sted"
            />
          </div>
        </div>

        <div className='flex flex-col h-[60%]'>
          <div className="mb-2 lg:mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
              Type
            </label>
            <select
              name="type"
              value={formData.type || ''}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="" disabled>Select type</option>
              <option value="Internt arrangement">Internt arrangement</option>
              <option value="Eksternt arrangement">Eksternt arrangement</option>
            </select>
          </div>

          <div className="mb-2 lg:mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dato">
              Dato
            </label>
            <input
              name="dato"
              type="datetime-local"
              value={formData.dato instanceof Date ? formData.dato.toISOString().slice(0, 16) : formData.dato || ''}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          </div>

          </div>
          <div className="mb-2 lg:mb-4 w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="beskrivelse">
              Beskrivelse
            </label>
            <textarea
              name="beskrivelse"
              value={formData.beskrivelse || ''}
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
          Send inn
        </button>
        <button
          type="button" // Change to type="button" to prevent form submission
          onClick={onClose} // Call the onClose prop function to hide the form
          className="bg-primary hover:bg-slate-400 text-white font-normal py-2 px-4 rounded-md"
        >
          Lukk skjema
        </button>
      </div>
    </form>
  );
};

export default LavterskelArrangementForm;
