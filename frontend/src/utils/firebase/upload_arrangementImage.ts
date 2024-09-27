import { storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const uploadArrangementImage = async (file: File): Promise<string> => {
  // if (!signInAnonymously(auth)){
  //     throw new Error("Not signed in");
  // }

  const storageRef = ref(storage, `images/arrangementer/${file.name}`);

  const snapshot = await uploadBytes(storageRef, file);

  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};
