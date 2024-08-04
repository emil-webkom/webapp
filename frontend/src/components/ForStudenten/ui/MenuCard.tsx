"use client";

import React from "react";
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

type MenuCardProps = {
  title: string;
  description: string;
  logo?: React.ReactNode;
  buttonLabel?: string;
};

const MenuCard = ({ title, description, logo, buttonLabel }: MenuCardProps) => {
  return (
    <Card className="w-[380px] h-[248px] text-[#001D21]">
      <CardHeader className="flex flex-row space-x-2 items-center">
        {logo}
        <CardTitle className="flex items-center pb-1 align-middle">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter>
        {buttonLabel && (
          <Button
            className="bg-[#001D21] text-white hover:bg-[#1E4C52] hover:text-white"
            variant="outline"
          >
            {buttonLabel}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MenuCard;
