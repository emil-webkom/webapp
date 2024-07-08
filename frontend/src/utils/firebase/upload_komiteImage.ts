import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { signInAnonymously } from "firebase/auth";

// Firebase access is currently set to public so everyone can upload
// and modify images if they have the URL. For now (as per development)
// this is okay, but it should not be like this for deployment and needs fixing.
export const uploadKomiteImage = async (file: File): Promise<string> => {
  // if (!signInAnonymously(auth)){
  //     throw new Error("Not signed in");
  // }

  const storageRef = ref(storage, `images/komiteer/${file.name}`);

  const snapshot = await uploadBytes(storageRef, file);

  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};
