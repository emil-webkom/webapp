'use client'
import { useState } from "react";
import { uploadImage } from "@/actions/upload";

const UploadImageForm = () => {
    const [inputValue, setInputValue] = useState("")
    const [file, setFile] = useState<File|null>(null);

    const handleSubmit = () => {
        if (!file){
            throw new Error("No file selected.");
        }
        uploadImage(file);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);

    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
          }
    };

    return (
        <div className="flex flex-col w-[65%] h-[50vh] justify-center">
            <div>
                <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
                    <input type="text" value={inputValue} onChange={handleInputChange} />
                    <input type="file" onChange={handleFileChange} />
                    <button type="submit">Upload</button>
                </form>
            </div>
        </div>
    );
};

export default UploadImageForm;