"use client";

import { useCallback, useEffect, useState } from "react";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";

import { newVerification } from "@/utils/new-verification";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { db } from "@/lib/db";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    if (success || error) return;

    if (!token) {
      setError("Missing token");
      return;
    }

    try {
      const data = await newVerification(token);
      setSuccess(data!.success);

      if (data!.success) {
        // Check success from `data`, not `success` since it is updated asynchronously
        const existingToken = await getVerificationTokenByToken(token);
        await db.verificationToken.delete({
          where: { id: existingToken!.id },
        });
      }

      setError(data!.error);
    } catch (error) {
      setError("Something went wrong");
    }
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Bekrefter mailen din"
      backButtonHref="/auth/login"
      backButtonLabel="Tilbake til innlogging"
      headerTitle="Bekreft mail"
    >
      <div className="p-4 flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};
