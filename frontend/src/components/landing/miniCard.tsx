"use client";

import Image from "next/image";
import Link from "next/link";

type MiniCardProps = {
  label: string;
  comitee: string;
  img: string;
  img_size?: string;
  link: string;
};

const MiniCard = ({ label, comitee, img, img_size, link }: MiniCardProps) => {
  return (
    <>
      <div className="inline-flex flex-col">
        <Link href={link}>
          <div className="flex size-44 rounded-md bg-white">
            <Image
              src={img}
              width={176}
              height={176}
              alt="image"
              className="rounded-md object-contain"
            />
          </div>
        </Link>
        <div className="px-0.5">
          <div className="text-sm font-medium text-white">{label}</div>
          <div className="text-xs font-medium text-slate-500">@{comitee}</div>
        </div>
      </div>
    </>
  );
};

export default MiniCard;
