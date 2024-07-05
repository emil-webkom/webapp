'use client'
import { useState } from "react";
import { uploadImage } from "@/lib/upload";
import  storeData  from "@/actions/uploadHS"

const UploadImageForm = () => {
    const [rolle, setRolle] = useState("");
    const [text, setText] = useState("");
    const [user, setUser] = useState("");
    const [file, setFile] = useState<File|null>(null);

    const handleSetRolle = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setRolle(event.target.value);
    }
    const handleSetText = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setText(event.target.value);
    }
    const handleSetUser = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setUser(event.target.value);
    }

    const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
       if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
          }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!file){
            throw new Error("No file supplied");
        }
        const downloadURL = await uploadImage(file);
        const upload = storeData(rolle, text, user, downloadURL);
    }

    return (
        <div className="flex flex-col w-[65%] h-[50vh] justify-center">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Rolle" onChange={handleSetRolle}/>
                <input type="text" placeholder="Tekst" onChange={handleSetText}/>
                <input type="text" placeholder="Brukeremail" onChange={handleSetUser}/>
                <input type="file" onChange={handleFile} />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default UploadImageForm;