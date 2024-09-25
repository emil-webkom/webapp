import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { signInAnonymously } from "firebase/auth";

// Firebase access is currently set to public so everyone can upload
// and modify images if they have the URL. For now (as per development)
// this is okay, but it should not be like this for deployment and needs fixing.
export const uploadHSPpic = async (file: File): Promise<string> => {
  // if (!signInAnonymously(auth)){
  //     throw new Error("Not signed in");
  // }

  const storageRef = ref(storage, `images/HSPpic/${file.name}`);

  const snapshot = await uploadBytes(storageRef, file);

  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};

// import { storage } from "@/lib/firebase";
// import {
//   ref,
//   uploadBytes,
//   getDownloadURL,
//   deleteObject,
// } from "firebase/storage";

// export const uploadProfilePic = async (
//   file: File,
//   userId: string,
// ): Promise<string> => {
//   // Create a reference to the file location
//   // Use userId to ensure unique file names for each user
//   const fileName = `profile_${userId}.${file.name.split(".").pop()}`;
//   const storageRef = ref(storage, `images/profilepic/${fileName}`);

//   try {
//     // Check if a file already exists at this location
//     try {
//       await getDownloadURL(storageRef);
//       // If the above doesn't throw an error, it means the file exists
//       // Delete the existing file
//       await deleteObject(storageRef);
//       console.log("Existing profile picture deleted");
//     } catch (error) {
//       // File doesn't exist, which is fine
//       console.log("No existing profile picture found");
//     }

//     // Upload the new file
//     const snapshot = await uploadBytes(storageRef, file);
//     console.log("Profile picture uploaded successfully");

//     // Get the download URL
//     const downloadURL = await getDownloadURL(snapshot.ref);
//     return downloadURL;
//   } catch (error) {
//     console.error("Error in uploadProfilePic:", error);
//     throw new Error("Failed to upload profile picture");
//   }
// };
