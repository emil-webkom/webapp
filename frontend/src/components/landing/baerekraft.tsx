"use client";

import Image from "next/image";

const Baerekraft = () => {
  return (
    <div className="flex flex-row w-full">
      <div className="w-full flex justify-end pr-40">
        <Image
          src="/svg/windmill.svg"
          alt={"Windmill"}
          width={200}
          height={200}
        />
      </div>
      <div className="w-full flex justify-start items-center pl-30 font-bold text-xl">
        Bli med på reisen for å gjøre <br />
        Norge mer bærekraftig
      </div>
    </div>
  );
};

export default Baerekraft;
