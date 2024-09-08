import React, { useState, useEffect, useRef } from "react";
import HeaderText from "../ForStudenten/nyStudent/headerText";
import { Button } from "../ui/button";

export interface StickyNavbarProps {
  tags: string[];
}

const StickyNavbar = ({ tags }: StickyNavbarProps) => {
  const [activeTag, setActiveTag] = useState("");
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: "smooth" });
    setActiveTag(sectionId);
  };

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -80% 0px", // Adjust these values as needed
    threshold: 0,
  };

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTag(entry.target.id);
        }
      });
    };
    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    tags.forEach((tag) => {
      const element = document.getElementById(tag);
      if (element) {
        sectionRefs.current[tag] = element;
        observer.observe(element);
      }
    });

    return () => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [tags]);

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
              activeTag === s ? "bg-slate-600" : ""
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
