'use server'
import { storage, auth } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadImage = async (file: File): Promise<string> =>{
    if (!auth.currentUser){
        throw new Error("User not authenticated");
    }
    
    if (!file){
        throw new Error("No file provided");
    } 
    const storageRef = ref(storage, `images/${file}`);

    const snapshot = await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
};