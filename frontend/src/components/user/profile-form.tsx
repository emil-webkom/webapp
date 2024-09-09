"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { useSession } from "next-auth/react";

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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaCamera, FaUser } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useRef, useState } from "react";
import { uploadProfilePic } from "@/utils/firebase/upload_profilepic";
import { updateUserProfile } from "@/utils/actions/updateProfile";
import { useRouter } from "next/navigation";
import { getUserByEmail, getUserById } from "@/data/user";
import { User } from "next-auth";
import { UserPrisma } from "@/schemas/user";

const cleanPhoneNumber = (phone: string): string => {
  return phone.replace(/\s+/g, "").replace(/[^\d+]/g, "");
};

const phoneNumberSchema = z
  .string()
  .transform(cleanPhoneNumber)
  .refine((value) => /^(\+|00)?[1-9]\d{7,14}$/.test(value), {
    message:
      "Ugyldig telefonnummer format. Vennligst skriv inn et gyldig nummer.",
  })
  .optional();

const profileFormSchema = z.object({
  phoneNumber: phoneNumberSchema.optional(),
  avatar: z.string().optional(),
  username: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const user = useCurrentUser();

  const { data: session, update } = useSession();
  const [userFull, setUser] = useState<UserPrisma>();
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchAndSetUser = async () => {
      if (user?.email) {
        try {
          const fetchedUser = await getUserByEmail(user.email);

          if (fetchedUser) {
            setUser(fetchedUser);
          } else {
            console.error("User not found");
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      } else {
        console.error("No valid session or email found");
      }
    };
    fetchAndSetUser();
  }, [user, session]);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      phoneNumber: undefined,
      avatar: user?.image ?? "",
      username: "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    console.log(data);
    if (!user?.email) {
      console.error("User email is not available");
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

    const result = await updateUserProfile(user.email, {
      phoneNumber: data.phoneNumber,
      imageUrl: profilePicUrl,
      username: data.username,
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
    if (userFull?.image) {
      return userFull.image;
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
              <FormDescription>Under kan du endre profilbilde</FormDescription>
              <FormControl>
                <div className="relative w-32 h-32">
                  <Avatar
                    className="w-full h-full cursor-pointer"
                    onClick={handleAvatarClick}
                  >
                    <AvatarImage
                      src={getAvatarUrl()}
                      className="object-cover"
                      alt="Profile picture"
                    />
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
                <div className="mt-2 flex justify-start text-center">
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brukernavn</FormLabel>
              <FormControl>
                <Input
                  className="w-60 text-black"
                  placeholder={`${userFull?.username ? userFull.username : "Skriv inn et brukernavn"}`}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefonnummer</FormLabel>
              <FormControl>
                <Input
                  className="w-60 text-black"
                  placeholder={`${userFull?.nummer ? userFull.nummer : "Skriv inn et telefonnummer"}`}
                  {...field}
                />
              </FormControl>
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
