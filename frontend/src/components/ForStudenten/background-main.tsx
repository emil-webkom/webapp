"use client";
import React from "react";

const BackgroundMain = ({ children }: { children: React.ReactNode }) => {
  return <div className="max-w-screen-md">{children}</div>;
};

export default BackgroundMain;
