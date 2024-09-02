"use client";
import UploadKomiteForm from "@/components/action/uploadKomite";
import UploadImageForm from "@/components/action/uploadImage";
import { useState, useEffect } from "react";
import { KomiteLogo } from "@/types/interfaces";
import { Hovedstyret } from "@/types/interfaces";
import { testDeleteKomite } from "@/tests/api/delete/deleteKomite";
import { testEditHSRolle } from "@/tests/api/patch/editHSrolle";

const Upload = () => {
  const [styret, setStyret] = useState<Hovedstyret[]>([]);
  const [logos, setLogos] = useState<KomiteLogo[]>([]);
  const [addKomite, setAddKomite] = useState(false);
  const [addStyret, setAddStyret] = useState(false);

  const fetchAndSetData = async () => {
    const [styretData, logosData] = await Promise.all([
      fetch("api/styret").then((response) => response.json()),
      fetch("api/komite/logo").then((response) => response.json()),
    ]);
    return { styretData, logosData };
  };

  useEffect(() => {
    const initData = async () => {
      try {
        const { styretData, logosData } = await fetchAndSetData();
        setStyret(styretData);
        setLogos(logosData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    initData();
  }, []);

  const showform = (input: string) => {
    if (input === "komite") {
      setAddKomite(true);
    } else {
      setAddStyret(true);
    }
  };

  const hidefrom = (input: string) => {
    if (input === "komite") {
      setAddKomite(false);
    } else {
      setAddStyret(false);
    }
  };

  async function slettKomite(komite: string) {
    try {
      const endpoint = `api/komite/komite?komite=${encodeURIComponent(komite)}`;
      const response = await fetch(endpoint, {
        method: "DELETE",
        // Can add headers for e.g. verification
      });
      if (!response.ok) {
        throw new Error(
          `Failed to delete komite with name: ${komite}: ${response.statusText}`,
        );
      }
      console.log("Komite successfully deleted");
      const { styretData, logosData } = await fetchAndSetData();
      setLogos(logosData);
    } catch (error) {
      throw error;
    }
  }

  async function slettStyreRolle(rolle: string) {
    try {
      const endpoint = `api/styret?rolle=${encodeURIComponent(rolle)}`;
      const response = await fetch(endpoint, {
        method: "DELETE",
        // Can add headers for e.g. verification
      });
      if (!response.ok) {
        throw new Error(
          `Failed to delete rolle with name: ${rolle}: ${response.statusText}`,
        );
      }
      console.log("Komite successfully deleted");
      const { styretData, logosData } = await fetchAndSetData();
      setStyret(styretData);
    } catch (error) {
      throw error;
    }
  }
  //RestAPI tests
  // const TestDeleteKomite = () => {
  //   testDeleteKomite("Kvinnekom");
  // }
  // const testEditHSRolle()

  return (
    <div className="flex justify-center">
      <div className="flex justify-center items-center m-10 w-[65%] space-x-40">
        <div className="flex flex-col items-center">
          <p>Komiter</p>
          {addKomite ? (
            <div>
              <ul>
                {logos.map((item, index) => (
                  <li key={index}>{item.komite}</li>
                ))}
              </ul>
              <UploadKomiteForm />
              <button
                onClick={() => hidefrom("komite")}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Done?
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <ul>
                {logos.map((item, index) => (
                  <li key={index}>
                    <div className="flex justify-between space-x-10">
                      <div>{item.komite}</div>
                      <button
                        onClick={() => {
                          slettKomite(item.komite);
                        }}
                        className="hover:underline"
                      >
                        Slett
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => showform("komite")}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Add Komite?
              </button>
            </div>
          )}
          {/* <button onClick={()=> TestDeleteKomite()}
                className="bg-blue-500 text-white py-2 px-4 rounded">Test Delete</button> */}
        </div>
        <div className="flex flex-col items-center">
          <p>Upload Styretmember</p>
          <ul>
            {styret.map((item, index) => (
              <li key={index}>
                <div className="flex justify-between space-x-10">
                  <div>
                    {item.rolle}: {item.name}
                  </div>
                  <button
                    onClick={() => {
                      slettStyreRolle(item.rolle);
                    }}
                    className="hover:underline"
                  >
                    Slett
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {addStyret ? (
            <div>
              <UploadImageForm />
              <button
                onClick={() => hidefrom("Styret")}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Done?
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => showform("styret")}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Add rolle?
              </button>
            </div>
          )}
        </div>
        <button
          onClick={() =>
            testEditHSRolle("Kongsdronning", "mauritzs@stud.ntnu.no")
          }
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          TesteditHSrolle
        </button>
      </div>
    </div>
  );
};
export default Upload;
