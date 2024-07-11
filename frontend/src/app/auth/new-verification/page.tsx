import { NewVerificationForm } from "@/components/auth/new-verification-form";
import { Suspense } from "react";

const NewVerificationPage = () => {
  return (
    <div className="">
      <Suspense>
        <NewVerificationForm />
      </Suspense>
    </div>
  );
};

export default NewVerificationPage;
