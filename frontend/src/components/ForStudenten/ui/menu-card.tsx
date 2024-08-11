"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { title } from "process";
import { cn } from "@/lib/utils";
import Link from "next/link";

export type MenuCardProps = {
  title: string;
  description: string;
  logo?: React.ReactNode;
  buttonLabel?: string;
  href: string;
};

const MenuCard = ({
  title,
  description,
  logo,
  buttonLabel,
  href,
}: MenuCardProps) => {
  const router = useRouter();
  return (
    <Card className="min-w-[340px] h-[248px] text-[#001D21] flex flex-col justify-between">
      <CardHeader className="flex flex-row space-x-2 items-center">
        {logo}
        <CardTitle className="flex items-center pb-1 align-middle">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="mt-auto">
        {buttonLabel && (
          <Button
            className="bg-[#001D21] text-white hover:bg-[#1E4C52] hover:text-white"
            variant="outline"
            onClick={() => router.push(href)}
          >
            {buttonLabel}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MenuCard;
