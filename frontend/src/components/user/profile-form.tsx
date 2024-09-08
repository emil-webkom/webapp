"use client";

import { db } from "@/lib/db";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { useSession } from "next-auth/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaCamera, FaUser } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useRef, useState } from "react";
import Modal from "../ui/modal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { uploadProfilePic } from "@/utils/firebase/upload_profilepic";
import { updateUserProfile } from "@/utils/actions/updateProfile";
import { useRouter } from "next/navigation";

// Utility function to clean phone number
const cleanPhoneNumber = (phone: string): string => {
  return phone.replace(/\s+/g, "").replace(/[^\d+]/g, "");
};

// Custom Zod schema for phone number validation
const phoneNumberSchema = z
  .string()
  .transform(cleanPhoneNumber)
  .refine((value) => /^(\+|00)?[1-9]\d{7,14}$/.test(value), {
    message:
      "Ugyldig telefonnummer format. Vennligst skriv inn et gyldig nummer.",
  });

const profileFormSchema = z.object({
  phoneNumber: phoneNumberSchema,
  avatar: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const user = useCurrentUser();
  const { data: session, update } = useSession();
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    console.log("Current user:", user);
    console.log("User image URL:", user?.image);
    console.log("Current session:", session);
  }, [user, session]);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      phoneNumber: "",
      avatar: user?.image ?? "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user?.id) {
      console.error("User ID is not available");
      return;
    }

    let profilePicUrl: string | undefined;

    if (profilePic) {
      try {
        profilePicUrl = await uploadProfilePic(profilePic);
        console.log("Profile picture uploaded successfully:", profilePicUrl);
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    }

    const result = await updateUserProfile(user.id, {
      phoneNumber: data.phoneNumber,
      imageUrl: profilePicUrl,
    });

    if (result.success) {
      console.log("User profile updated successfully");

      if (update) {
        await update({
          ...session,
          user: {
            ...session?.user,
            image: profilePicUrl || user?.image,
          },
        });
      }

      setProfilePic(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Refresh the page
      window.location.reload();
    } else {
      console.error("Failed to update user profile:", result.error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePic(file);
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);
      console.log("New preview URL:", newPreviewUrl);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleCancelUpload = () => {
    setProfilePic(null);
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getAvatarUrl = () => {
    if (previewUrl) {
      return previewUrl;
    }
    if (user?.image) {
      return user.image;
    }
    return "";
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="avatar"
          render={() => (
            <FormItem>
              <FormLabel>Profilbilde</FormLabel>
              <FormDescription>
                Det tar vanligvis litt tid før profilbildet ditt lastes opp.
              </FormDescription>
              <FormControl>
                <div className="relative w-32 h-32 mx-auto">
                  <Avatar
                    className="w-full h-full cursor-pointer"
                    onClick={handleAvatarClick}
                  >
                    <AvatarImage src={getAvatarUrl()} alt="Profile picture" />
                    <AvatarFallback className="bg-gray-200">
                      <FaUser size={40} className="text-gray-400" />
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className="absolute bottom-0 right-0 p-1 bg-primary rounded-full cursor-pointer"
                    onClick={handleAvatarClick}
                  >
                    <FaCamera className="text-white" size={16} />
                  </div>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </FormControl>
              {profilePic && (
                <div className="mt-2 text-center">
                  <Button
                    type="button"
                    onClick={handleCancelUpload}
                    variant="outline"
                    size="sm"
                    className="text-black"
                  >
                    Cancel
                  </Button>
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefonnummer</FormLabel>
              <FormControl>
                <Input
                  className="w-60 text-black"
                  placeholder="Skriv inn nummeret ditt"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="">
          Oppdater profil
        </Button>
      </form>
    </Form>
  );
}
