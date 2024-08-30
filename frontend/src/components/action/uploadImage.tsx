"use client";
import { useState } from "react";
import { uploadImage } from "@/utils/firebase/upload_hovedstyret";
import storeData from "@/utils/styret/uploadHS";

const UploadImageForm = () => {
  const [rolle, setRolle] = useState("");
  const [text, setText] = useState("");
  const [user, setUser] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSetRolle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRolle(event.target.value);
  };
  const handleSetText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
  const handleSetUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser(event.target.value);
  };

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      throw new Error("No file supplied");
    }
    const downloadURL = await uploadImage(file);
    const upload = storeData(rolle, text, user, downloadURL);
    window.location.reload();
  };

  return (
    <div className="flex flex-col w-[65%] justify-center items-center bg-gray-100 p-6 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <input
          type="text"
          placeholder="Rolle*"
          onChange={handleSetRolle}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="text"
          placeholder="Tekst*"
          onChange={handleSetText}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="text"
          placeholder="Brukeremail*"
          onChange={handleSetUser}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="file"
          onChange={handleFile}
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

export default UploadImageForm;
