"use client";

import UserInfo from "@/components/admin/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "@/components/user/profile-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Arrangement } from "@/schemas/arrangement";
import { getArrangementerByUserId } from "@/utils/actions/getArrangementer";
import ListView from "@/components/event/listView";
import BookingView from "@/components/ForStudenten/booking/booking-view";
import KontigentView from "@/components/user/kontigent";

const SettingsPage = () => {
  const user = useCurrentUser();
  const [arrangementer, setArrangementer] = useState<Arrangement[] | null>();

  useEffect(() => {
    const fetchArrangementer = async () => {
      if (user?.id) {
        try {
          const data = await getArrangementerByUserId(user.id);
          setArrangementer(data as Arrangement[] | null);
        } catch (error) {
          console.error("Failed to fetch arrangementer", error);
        }
      }
    };

    fetchArrangementer();
  }, [user]);

  return (
    <div className="space-y-6">
      <Separator />
      <Tabs defaultValue="Profil">
        <TabsList className="flex flex-wrap justify-start gap-2 h-fit">
          <TabsTrigger value="Profil">Profil</TabsTrigger>
          <TabsTrigger value="Arrangementer">Arrangementer</TabsTrigger>
          <TabsTrigger value="Bookinger">Bookinger</TabsTrigger>
          <TabsTrigger value="Kontigent">Kontigent</TabsTrigger>
        </TabsList>
        <TabsContent value="Profil">
          <ProfileForm />
        </TabsContent>
        <TabsContent value="Arrangementer">
          <h2>Dine påmeldte arrangementer:</h2>
          <ListView events={arrangementer ?? []}></ListView>
        </TabsContent>
        <TabsContent value="Bookinger">
          <h2>Dine bookinger:</h2>
          <BookingView />
        </TabsContent>
        <TabsContent value="Kontigent">
          <KontigentView/>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
