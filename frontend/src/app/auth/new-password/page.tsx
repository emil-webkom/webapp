import { NewPasswordForm } from "@/components/auth/new-password-form";
import { Suspense } from "react";

export const revalidate = 0;

const NewPasswordPage = () => {
  return (
    <div className="h-full">
      <Suspense>
        <NewPasswordForm />
      </Suspense>
    </div>
  );
};

export default NewPasswordPage;
