import { useState } from "react";
import z from "zod";
import { Button } from "../ui/button";
import { Booking, BookingSchema } from "@/schemas/booking";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserPrisma } from "@/schemas/user";

enum BookedItem {
  KONTOR,
  ONE_SOUNDBOX,
  TWO_SOUNDBOXES,
}

interface editBookingFormProps {
  handleCloseForm: () => void;
  item : Booking
  users : Record<string, string>;
}
const EditBookingForm: React.FC<editBookingFormProps> = ({ handleCloseForm, item, users }) => {
  const user = useCurrentUser();
  const [formData, setFormData] = useState<Booking>({
    id: item.id,
    userID: item.userID,
    item: item.item,
    bookedAt: item.bookedAt,
    status: item.status,
    komiteID: undefined,
    duration: undefined,
  });

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

  const saveData = async (booking: Booking) => {
    try {
      const response = await fetch(`/api/bookings/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      });
      if (response.status !== 200) {
        console.error("Could not save data:", response.statusText);
      } else {
        console.log("Successfully updated booking");
      }
    } catch (error) {
      console.error("Internal server error:", error);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const parsedData = BookingSchema.parse(formData);
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
      className="flex flex-col gap-4 p-6 rounded-md"
    >
      <div>
        <label htmlFor="userID" className="block font-semibold mb-1">Bruker</label>
        <input
          type="text"
          id="userID"
          name="userID"
          value={users[formData.userID]}
          readOnly
          className="border rounded p-2 w-full bg-gray-200"
        />
      </div>

      <div>
        <label htmlFor="item" className="block font-semibold mb-1">
          Har booket:
        </label>
        <select
          id="item"
          name="item"
          value={formData.item}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        >
          <option value="ONE_SOUNDBOX">1 soundbox</option>
          <option value="TWO_SOUNDBOXES">2 soundboxer</option>
        </select>
      </div>

      {/* Booking Date */}
      <div>
        <label htmlFor="bookedAt" className="block font-semibold mb-1">
          Når
        </label>
        <input
          type="datetime-local"
          id="bookedAt"
          name="bookedAt"
          value={new Date(formData.bookedAt).toISOString().slice(0, 16)}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              bookedAt: new Date(e.target.value),
            }))
          }
          className="border rounded p-2 w-full"
        />
      </div>

      <div>
        <label htmlFor="status" className="block font-semibold mb-1">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        >
          <option value="CONFIRMED">CONFIRMED</option>
          <option value="PENDING">PENDING</option>
          <option value="REJECTED">REJECTED</option>
        </select>
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

export default EditBookingForm;
