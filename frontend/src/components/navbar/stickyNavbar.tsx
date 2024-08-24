import React from "react";
import HeaderText from "../ForStudenten/nyStudent/headerText";
import { Button } from "../ui/button";

export interface StickyNavbarProps {
  tags: string[];
  activeTag: string;
}

const StickyNavbar = ({ tags, activeTag }: StickyNavbarProps) => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <HeaderText className="text-xl bg-[#579783] pt-4">
        Hva vil du lese om?
      </HeaderText>
      <div className="flex flex-row flex-wrap justify-center p-2 gap-4 bg-[#579783] sticky top-0 z-50">
        {tags.map((s, i) => (
          <Button
            key={i}
            onClick={() => scrollToSection(s)}
            variant={"transparent"}
            size={"pill"}
            className={
              activeTag === s ? "bg-slate-400 text-white" : "text-white"
            }
          >
            {s}
          </Button>
        ))}
      </div>
    </>
  );
};

export default StickyNavbar;
