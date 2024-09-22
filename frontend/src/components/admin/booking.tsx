"use client";

import useFetch from "@/hooks/use-fetch";
import { useState, useEffect } from "react";
import { Booking } from "@/schemas/booking";
import { Check, Trash2, X } from "lucide-react";
import { UserPrisma } from "@/schemas/user";
import Modal from "../ui/modal";
import LeggTilBooking from "../forms/leggTilBooking";
import EditBookingForm from "../forms/editBookingForm";

interface dataProps {
  message: string;
  data: UserPrisma[];
}

const BookingComponent = () => {
  // These states are used to edit entry
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [booked, setBooking] = useState<Booking>();
  // This state used to add entry
  const [leggTil, setLeggTil] = useState<boolean>(false);
  // This state used to update data upon DB manipulation
  const [refreshKey, setRefreshKey] = useState<number>(0);

  // Booking data fetched from API
  const { data, loading, error } = useFetch<Booking[]>(
    "/api/bookings",
    refreshKey,
  );
  const bookings = data ? data : [];

  // Userdata fetched from the API
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useFetch<dataProps | null>("/api/users", refreshKey);
  const users = userData ? userData.data : [];

  // Create a map for userID to username
  const userIdToNameMap = users.reduce(
    (acc: Record<string, string>, user: UserPrisma) => {
      acc[user.id] = user.name || "Unknown user";
      return acc;
    },
    {} as Record<string, string>,
  );

  const handleClick = async ({
    type,
    data,
  }: {
    type: string;
    data?: Booking;
  }) => {
    if (type === "slett" && data) {
      const confirmed = window.confirm(
        `Er du sikker på at du vil slette bookingen til ${userIdToNameMap[data.userID]}?`,
      );

      if (confirmed) {
        try {
          const response = await fetch(`/api/bookings/${data.id}`, {
            method: "DELETE",
          });
          if (response.status !== 200) {
            console.error("Could not delete booking:", response.statusText);
          } else {
            setRefreshKey((prev) => prev + 1);
          }
        } catch (error) {
          console.error("Internal server error:", error);
        }
      }
    } else if (type === "rediger" && data) {
      setBooking(data);
      toggleForm();
    } else if (type === "legg til") {
      setLeggTil((prevState) => !prevState);
    } else if (type === "confirm" && data) {
      data.status = "CONFIRMED";
      try {
        const response = await fetch(`/api/bookings/${data.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.status !== 200) {
          console.error("Could not save data:", response.statusText);
        } else {
          console.log("Successfully updated booking status");
        }
      } catch {
        console.error("Internal server error");
      }
      setRefreshKey((prev) => prev + 1);
    } else if (type === "reject" && data) {
      data.status = "REJECTED";
      try {
        const response = await fetch(`/api/bookings/${data.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.status !== 200) {
          console.error("Could not save data:", response.statusText);
        } else {
          console.log("Successfully updated booking status");
        }
      } catch {
        console.error("Internal server error");
      }
      setRefreshKey((prev) => prev + 1);
    }
  };

  const save = (type: string) => {
    setRefreshKey((prev) => prev + 1);
    if (type === "leggtil") {
      handleClick({ type: "legg til" });
    } else {
      toggleForm();
    }
  };

  const toggleForm = () => {
    setOpenForm((prevState) => !prevState);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading bookings</div>;
  }

  return (
    <div className="flex flex-col items-center bg-white rounded-md py-6 text-black">
      <div className="w-full px-4 lg:px-8">
        <h1 className="text-black text-center font-semibold py-2 text-xl sm:text-2xl w-full">
          Booking
        </h1>
      </div>
      <div className="flex w-full px-6">
        <button
          onClick={() => handleClick({ type: "legg til" })}
          className="text-underscore "
        >
          Legg til?
        </button>
      </div>

      {leggTil && (
        <Modal
          isOpen={leggTil}
          children={<LeggTilBooking handleCloseForm={() => save("leggtil")} />}
        />
      )}
      <div className="flex flex-col w-full p-4 ">
        <div className="flex bg-[#AEE0D0] rounded-md p-2">
          <div className="w-[25%] font-semibold">Bruker</div>
          <div className="w-[15%] font-semibold">Hva</div>
          <div className="w-[10%] font-semibold">Dato</div>
          <div className="w-[25%] font-semibold">Status</div>
        </div>

        {bookings.length > 0 ? (
          bookings.map((item: Booking) => (
            <div
              key={item.id}
              className="flex w-full border-b-2 border-[#25504E] p-2"
            >
              <div className="w-[25%]">{userIdToNameMap[item.userID]}</div>
              <div className="w-[15%]">
                {item.item === "ONE_SOUNDBOX" ? (
                  <p>1 soundbox</p>
                ) : (
                  <p>2 soundbox</p>
                )}
              </div>
              <div className="w-[10%]">
                {new Date(item.bookedAt).toISOString().split("T")[0]}
              </div>
              <div className="w-[40%]">
                {item.status === "PENDING" ? (
                  <div className="flex gap-x-4">
                    {item.status}
                    <div className="flex gap-x-4">
                      <Check
                        onClick={() =>
                          handleClick({ type: "confirm", data: item })
                        }
                        className="text-green-500 icon-hover cursor-pointer"
                      />
                      <X
                        onClick={() =>
                          handleClick({ type: "reject", data: item })
                        }
                        className="text-red-500 icon-hover cursor-pointer"
                      />
                    </div>
                  </div>
                ) : (
                  <div>{item.status}</div>
                )}
              </div>
              <div className="">
                <button
                  onClick={() => handleClick({ type: "rediger", data: item })}
                  className="text-underscore px-2"
                >
                  Rediger?
                </button>
                <button
                  onClick={() => handleClick({ type: "slett", data: item })}
                  className="icon-hover"
                >
                  <Trash2 className="text-red-600 h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>No bookings found</div>
        )}
        {openForm && booked && (
          <Modal isOpen={openForm} children={
            <EditBookingForm users={userIdToNameMap} item={booked} handleCloseForm={() => save("")}/>
          }/>
        )}
      </div>
    </div>
  );
};

export default BookingComponent;
