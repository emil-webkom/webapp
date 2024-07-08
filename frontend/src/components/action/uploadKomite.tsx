'use client'
import { uploadKomiteImage } from "@/utils/firebase/upload_komiteImage";
import { useState } from "react";
import { komiteInput } from "@/types/interfaces";
import  storeData  from "@/utils/komite/uploadKomite";

const UploadKomiteForm = () => {
    
    const [formData, setFormData] = useState<komiteInput>({
        navn: "",
        leder: "",
        text1: "",
        text2: "",
        text3: "",
        bildeurl: "",
        mail: "",
        mappe: "",
    });

    const [bilde, setBilde] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!bilde){
            throw new Error("No image supplied")
        }
        const downloadURL = await uploadKomiteImage(bilde);
        const upload = storeData({...formData, bildeurl: downloadURL});
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
             setBilde(event.target.files[0]);
           }
     }

     const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name] : value
        })
     };

    return (
        <div className="flex flex-col w-[65%] h-[50vh] justify-center">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="navn"
                    placeholder="Navn"
                    value={formData.navn}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="leder"
                    placeholder="Leder"
                    value={formData.leder}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="text1"
                    placeholder="Text1"
                    value={formData.text1}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="text2"
                    placeholder="Text2"
                    value={formData.text2}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="text3"
                    placeholder="Text3"
                    value={formData.text3}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="mail"
                    placeholder="Mail"
                    value={formData.mail}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="mappe"
                    placeholder="Mappe"
                    value={formData.mappe}
                    onChange={handleInputChange}
                />
                <input
                    type="file"
                    name="bilde"
                    placeholder="Bilde"
                    onChange={handleFileChange}
                />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default UploadKomiteForm;
