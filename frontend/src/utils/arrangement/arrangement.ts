import { Arrangement } from "../../schemas/arrangement";

const baseURL = "http://localhost:3000/api/arrangementer";

export const fetchArrangementer = async (): Promise<Arrangement[]> => {
  try {
    const res = await fetch(`${baseURL}`, {
      method: "GET",
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to fetch events");
    }
    console.log("Fetched arrangementer:");
    return data;
  } catch (error) {
    console.error("Error fetching arrangementer:", error);
    throw error;
  }
};

export const fetchArrangementById = async (id: string) => {
  try {
    const res = await fetch(`${baseURL}/${id}`, {
      method: "GET",
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to fetch event by ID");
    }
    console.log("Fetched arrangement:", data);
    return data;
  } catch (error) {
    console.error("Error fetching arrangement:", error);
  }
};

export const createArrangement = async (data: Arrangement) => {
  try {
    const response = await fetch(`${baseURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create arrangement");
    }

    const result = await response.json();
    console.log("Created arrangement:", result);
    return result;
  } catch (error) {
    console.error("Error creating arrangement:", error);
    throw error;
  }
};

export const updateArrangement = async (
  id: string,
  updateData: Partial<Arrangement>,
) => {
  try {
    const res = await fetch(`${baseURL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to update event by ID");
    }
    console.log("Updated arrangement:", data);
    return data;
  } catch (error) {
    console.error("Error updating arrangement:", error);
  }
};

export const deleteArrangement = async (id: string) => {
  try {
    const res = await fetch(`${baseURL}/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to delete event by ID");
    }
    console.log("Deleted arrangement:", data);
  } catch (error) {
    console.error("Error deleting arrangement:", error);
  }
};
