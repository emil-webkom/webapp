'use client'

import { FC } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface CardProps{
    name: string;
    subname: string
    text: string;
    link: string;
}

const RetningCard: FC<CardProps> = ({name, subname, text, link}) =>{
    return(
        <div className="w-[25vw]  flex flex-col items-center align-top bg-[#003A42] rounded-md py-6">
            <div className="text-l font-medium px-4">{name}</div>
            <div className="text-m font-light p-2">{subname}</div>
            <div className="text-l font-light px-14 py-6 my-4">{text}</div>
            <Button onClick={()=> useRouter("`{link}`")} className="text-l font-medium ">Les mer om {subname} </Button>
        </div>
    );
};
export default RetningCard;