"use client";

import UserInfo from "@/components/admin/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "@/components/user/profile-form";

const SettingsPage = () => {
  const user = useCurrentUser();
  {
    /* <UserInfo user={user} label="Info" /> */
  }

  return (
    <div className="space-y-6">
      <Separator />
      <ProfileForm />
    </div>
  );
};

export default SettingsPage;
