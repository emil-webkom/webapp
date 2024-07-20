'use client'
import UploadKomiteForm from "@/components/action/uploadKomite"
import UploadImageForm from "@/components/action/uploadImage"
import { useState, useEffect } from "react"
import { KomiteLogo } from "@/types/interfaces";
import { Hovedstyret } from "@/types/interfaces";
import { testDeleteKomite } from "@/tests/api/delete/deleteKomite";

const Upload = () => {

    const [styret, setStyret] = useState<Hovedstyret[]>([]);
    const [logos, setLogos] = useState<KomiteLogo[]>([]);
    const [editKomite, setEditKomite] = useState(false);

    const fetchAndSetData= async () =>{
      const [styretData, logosData] = await Promise.all([
        fetch("api/styret").then(response => response.json()),
        fetch("api/komite/logo").then(response => response.json())
      ]);
      return {styretData, logosData};
     }

    useEffect(()=> {
      const initData = async () =>{
        try {
          const {styretData, logosData} = await fetchAndSetData();
            setStyret(styretData);
            setLogos(logosData);
        }catch(error){
          console.error("Error fetching data:", error);
        }
      }
      initData();
    }, []);

    const showform = () =>{
      setEditKomite(true);
    }

    const hidefrom = () =>{
      setEditKomite(false);
    }

    async function slettKomite(komite:string){
      try{
          const endpoint = `api/komite/komite?komite=${encodeURIComponent(komite)}`;
          const response = await fetch(endpoint,{
              method: "DELETE",
              // Can add headers for e.g. verification
          });
          if (!response.ok){
              throw new Error(`Failed to delete komite with name: ${komite}: ${response.statusText}`);
          }
          console.log("Komite successfully deleted")
          const {styretData, logosData} = await fetchAndSetData();
          setLogos(logosData);
      }catch(error){
          throw error;
      }
    }

    //RestAPI tests
    // const TestDeleteKomite = () => {
    //   testDeleteKomite("Kvinnekom");
    // }

    return(
        <div className="flex justify-center items-center m-10">
            <div className="flex flex-col items-center">
                <p>Komiter</p>
                {editKomite ? (<div>
                  <ul>
                  {logos.map((item, index) => (
                    <li key={index}>{item.komite}</li>
                  ))}
                </ul>
                <UploadKomiteForm/>
                <button onClick={() => hidefrom()}
                  className="bg-blue-500 text-white py-2 px-4 rounded">
                  Done?
                </button>
                </div>):(
                  <div className="flex flex-col items-center">
                  <ul>
                  {logos.map((item, index) => (
                    <li key={index}><div className="flex justify-between space-x-10">
                      <div>
                        {item.komite}
                      </div>
                      <button onClick={() => {slettKomite(item.komite)}} className="hover:underline">Slett</button>
                      </div></li>
                  ))}
                </ul>
                <button onClick={() => showform()}
                  className="bg-blue-500 text-white py-2 px-4 rounded">
                  Add Komite?
                </button>
                </div>
                )}
              {/* <button onClick={()=> TestDeleteKomite()}
                className="bg-blue-500 text-white py-2 px-4 rounded">Test Delete</button> */}
            </div>
            <div>
                <p>Upload Styretmember</p>
                <UploadImageForm/>
                <ul>
                  {styret.map((item, index) => (
                    <li key={index}>{item.rolle}: {item.name}</li>
                  ))}
                </ul>
            </div>
        </div>
    )
}
export default Upload;