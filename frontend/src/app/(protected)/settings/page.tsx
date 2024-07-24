"use client";

import UserInfo from "@/components/admin/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "@/components/user/profile-form";


const SettingsPage = () => {
  const user = useCurrentUser();
  {/* <UserInfo user={user} label="Info" /> */}

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profil</h3>
        <p className="text-sm text-muted-foreground">
        Dette er hvordan andre vil se deg på nettstedet.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  );
};

export default SettingsPage;
