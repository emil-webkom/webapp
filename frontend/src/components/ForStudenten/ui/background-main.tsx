"use client";
import React from "react";

const BackgroundMain = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-3/4 min-w-[530px] bg-[#003A42] rounded-xl flex-col items-center justify-center px-20 pt-14 pb-20 space-y-8 mb-28">
      {children}
    </div>
  );
};

export default BackgroundMain;
