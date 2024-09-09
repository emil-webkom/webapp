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
  const isInternalLink = href.startsWith("/");
  return (
    <Card className="min-w-[280px] min-h-[248px] border-none bg-[#25504F] text-[#fff] flex flex-col justify-between">
      <CardHeader className="text-green-lightest flex flex-row space-x-2 items-center">
        {logo}
        <CardTitle className="flex items-center pb-1 align-middle text-white">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <CardDescription className="text-white text-ellipsis">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="mt-auto">
        {buttonLabel &&
          (isInternalLink ? (
            <Link href={href} passHref>
              <Button
                className="bg-[#25504F] text-white hover:bg-[#80b0b7] hover:text-white"
                variant="outline"
              >
                {buttonLabel}
              </Button>
            </Link>
          ) : (
            <Button
              className="bg-[#25504F] text-white hover:bg-[#80b0b7] hover:text-white"
              variant="outline"
              onClick={() => router.push(href)}
            >
              {buttonLabel}
            </Button>
          ))}
      </CardFooter>
    </Card>
  );
};

export default MenuCard;
