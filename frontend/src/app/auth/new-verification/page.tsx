import { NewVerificationForm } from "@/components/auth/new-verification-form";
import { Suspense } from "react";

export const revalidate = 0;

const NewVerificationPage = () => {
  return (
    <div className="h-full">
      <Suspense>
        <NewVerificationForm />
      </Suspense>
    </div>
  );
};

export default NewVerificationPage;
