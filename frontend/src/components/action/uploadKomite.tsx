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
        window.location.reload();
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
<div className="flex flex-col w-[65%] justify-center items-center bg-gray-100 p-6 rounded-lg shadow-lg">
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <input
            type="text"
            name="navn"
            placeholder="Navn*"
            value={formData.navn}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
            type="text"
            name="leder"
            placeholder="Leder"
            value={formData.leder}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
            type="text"
            name="text1"
            placeholder="Text1"
            value={formData.text1}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
            type="text"
            name="text2"
            placeholder="Text2"
            value={formData.text2}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
            type="text"
            name="text3"
            placeholder="Text3"
            value={formData.text3}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
            type="text"
            name="mail"
            placeholder="Mail"
            value={formData.mail}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
            type="text"
            name="mappe"
            placeholder="Mappe*"
            value={formData.mappe}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
            type="file"
            name="bilde"
            placeholder="Bilde"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
            Upload
        </button>
    </form>
</div>

    );
};

export default UploadKomiteForm;
