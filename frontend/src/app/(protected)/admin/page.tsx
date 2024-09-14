'use client'

import { Dashboard } from "@/components/admin/admin-dashboard";
import { useCurrentRole } from "@/hooks/use-current-role";
import { redirect } from "next/navigation";

const AdminPage = () => {
  const rolle = useCurrentRole()
  if(rolle !=="ADMIN"){
    redirect("/");
  }
  return <Dashboard />;
};

export default AdminPage;
