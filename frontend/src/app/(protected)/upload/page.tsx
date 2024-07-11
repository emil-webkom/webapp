'use client'
import UploadKomiteForm from "@/components/action/uploadKomite"
import UploadImageForm from "@/components/action/uploadImage"
import { useState, useEffect } from "react"

const Upload = () => {

    const [styret, setStyret] = useState([]);
    const [logos, setLogos] = useState([]);

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

    return(
        <div className="flex justify-center items-center m-10">
            <div>
                <p>Upload Komite</p>
                <UploadKomiteForm/>
                <ul>
                  {logos.map((item, index) => (
                    <li key={index}>{item.komite}</li>
                  ))}
                </ul>
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