"use client";

import useFetch from "@/hooks/use-fetch";
import { useState } from "react";
import { UserPrisma } from "@/schemas/user";
import { Check, X, Trash2 } from "lucide-react";
import EditUserForm from "../forms/editUserFrom";
import Modal from "../ui/modal";
import { kontigentPris } from "@/schemas/kontigentPris";
import { Button } from "../ui/button";

interface UserProps {
  status: number;
  data: UserPrisma[];
}

interface Kontigent {
  status: number;
  data: kontigentPris[];
}

const BrukerComponent = () => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [kontigentFilter, setKontigentFilter] = useState<string>("ALL");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const { data, loading, error } = useFetch<UserProps | null>(
    "/api/users",
    refreshKey,
  );
  const [user, setUser] = useState<UserPrisma | null>(null);

  const {
    data: kontigentData,
    loading: loadingKontigent,
    error: errorKontigent,
  } = useFetch<Kontigent>("/api/kontigent", refreshKey);
  const kontigentPris = kontigentData ? kontigentData.data : null;
  // State to manage editable kontigentpris
  const [newKontigentPris, setNewKontigentPris] = useState<number>(
    kontigentPris ? kontigentPris[0].pris : 0,
  );
  const [isEditingKontigentPris, setIsEditingKontigentPris] =
    useState<boolean>(false);

  const findUser = (id: string): UserPrisma | null => {
    return (data?.data || []).find((user) => user.id === id) || null;
  };

  const handleSlett = async (id: string) => {
    const user = findUser(id);
    const confirmed = window.confirm(
      `Er du sikker på at du vil slette ${user?.name}?`,
    );

    if (confirmed) {
      try {
        const response = await fetch(`/api/users/${id}`, {
          method: "DELETE",
        });
        if (response.status !== 200) {
          console.error("Could not delete user:", response.statusText);
        } else {
          setRefreshKey((prev) => prev + 1); // Refresh data
        }
      } catch (error) {
        console.error("Internal server error:", error);
      }
    }
  };

  const handleRediger = (user: UserPrisma) => {
    setUser(user);
    toggleForm();
  };

  const toggleForm = () => {
    setOpenForm((prevState) => !prevState);
  };

  const handleConfirmStatus = async (id: string) => {
    const data = { kontigent: "BETALT" };
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status !== 200) {
        console.error("Could not save data:", response.statusText);
      } else {
        setRefreshKey((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Internal server error:", error);
    }
  };

  const handleCancleStatus = async (id: string) => {
    const data = { kontigent: "UBETALT" };
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status !== 200) {
        console.error("Could not save data:", response.statusText);
      } else {
        setRefreshKey((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Internal server error:", error);
    }
  };

  const save = () => {
    setTimeout(() => setRefreshKey((prev) => prev + 1), 2000);
    toggleForm();
  };

  // Function to filter and sort users by name
  const filteredData = () => {
    return (data?.data || [])
      .filter((user) => {
        const matchKontigent =
          kontigentFilter === "ALL" || user.kontigent === kontigentFilter;
        const matchRole = roleFilter === "ALL" || user.role === roleFilter;
        return matchKontigent && matchRole;
      })
      .sort((a, b) => (a?.name || "").localeCompare(b?.name || "")); // Sort by name (case insensitive)
  };

  // Function to handle updating kontigent price
  const handleUpdateKontigentPris = async () => {
    if (!newKontigentPris) return;
    try {
      const response = await fetch(
        `/api/kontigent/${kontigentPris ? kontigentPris[0].id : null}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pris: newKontigentPris }),
        },
      );
      if (response.status === 200) {
        setIsEditingKontigentPris(false);
        setRefreshKey((prev) => prev + 1);
      } else {
        console.error("Failed to update kontigentpris");
      }
    } catch (error) {
      console.error("Error updating kontigentpris:", error);
    }
  };

  if (loading || loadingKontigent) {
    return <div>Loading...</div>;
  }
  if (error || errorKontigent) {
    return <div>Error...</div>;
  }

  return (
    <div className="flex flex-col items-center text-sm bg-white rounded-md py-6 text-black">
      <div className="w-full px-4 lg:px-8">
        <h1 className="text-black text-center font-semibold py-2 text-xl sm:text-2xl w-full">
          Oversikt over aktive brukere
        </h1>

        <div className="flex justify-center gap-4 my-4">
          <div className="flex flex-col">
            <label htmlFor="kontigentFilter" className="font-semibold">
              Filtrer på Kontigent Status:
            </label>
            <select
              id="kontigentFilter"
              value={kontigentFilter}
              onChange={(e) => setKontigentFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="ALL">Alle</option>
              <option value="AVVENTER_BEKREFTELSE">Avventer Bekreftelse</option>
              <option value="BETALT">Betalt</option>
              <option value="UBETALT">Ubetalt</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="roleFilter" className="font-semibold">
              Filtrer på rolle:
            </label>
            <select
              id="roleFilter"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="ALL">Alle</option>
              <option value="ADMIN">Admin</option>
              <option value="USER">Bruker</option>
              <option value="SUPER_USER">Super bruker</option>
            </select>
          </div>
          <div>
            <div className="font-semibold">Kontigentpris</div>
            {isEditingKontigentPris ? (
              <div className="flex justify-center items-center">
                <input
                  type="number"
                  placeholder="Ny pris"
                  onChange={(e) => setNewKontigentPris(Number(e.target.value))}
                  className="border rounded p-2"
                />
                <div
                  onClick={handleUpdateKontigentPris}
                  className="cursor-pointer text-underscore px-2"
                >
                  Lagre
                </div>
                <div
                  onClick={() => setIsEditingKontigentPris(false)}
                  className="cursor-pointer text-underscore"
                >
                  Avbryt
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center gap-4">
                <div>Pris: {kontigentPris ? kontigentPris[0].pris : "N/A"}</div>
                <Button onClick={() => setIsEditingKontigentPris(true)}>
                  Rediger pris
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full p-4">
        <div className="flex justify-start gap-x-4 bg-[#AEE0D0] rounded-md p-2">
          <div className="flex gap-x-4 w-[450px] justify-between">
            <div className="font-semibold">Navn:</div>
            <div className="font-semibold">Mail:</div>
          </div>
          <div className="flex justify-between w-[300px] font-semibold">
            <div>Kontigent status</div>
            <div className="font-semibold">Rolle</div>
          </div>
        </div>

        {user && (
          <Modal
            isOpen={openForm}
            children={<EditUserForm user={user} handleCloseForm={save} />}
          />
        )}

        {filteredData().map((item) =>
          item.emailVerified ? (
            <div
              key={item.id}
              className="flex justify-between w-full gap-x-10 border-b-2 border-[#25504E] p-2"
            >
              <div className="flex gap-4">
                <div className="flex gap-x-4 w-[450px] overflow-hidden justify-between">
                  <div className="flex-none">{item.name}</div>
                  <div>{item.email}</div>
                </div>
                <div className="w-[250px] gap-x-4">
                  <div>{item.kontigent}</div>
                  {item.kontigent === "AVVENTER_BEKREFTELSE" && (
                    <div className="flex gap-x-4">
                      <Check
                        onClick={() => handleConfirmStatus(item.id)}
                        className="text-green-500 icon-hover cursor-pointer"
                      />
                      <X
                        onClick={() => handleCancleStatus(item.id)}
                        className="text-red-500 icon-hover cursor-pointer"
                      />
                    </div>
                  )}
                </div>
                <div>{item.role}</div>
              </div>
              <div className="gap-x-4 flex items-center">
                <button
                  onClick={() => handleRediger(item)}
                  className="text-underscore"
                >
                  Rediger?
                </button>
                <button
                  onClick={() => handleSlett(item.id)}
                  className="icon-hover"
                >
                  <Trash2 className="text-red-600 h-4 w-4" />
                </button>
              </div>
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
};

export default BrukerComponent;
