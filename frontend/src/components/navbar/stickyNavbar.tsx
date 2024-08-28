import React, { useState, useEffect, useRef } from "react";
import HeaderText from "../ForStudenten/nyStudent/headerText";
import { Button } from "../ui/button";

export interface StickyNavbarProps {
  tags: string[];
}

function useInViewPort<T extends HTMLElement>(ref: React.RefObject<T>, options?: IntersectionObserverInit) {
  const [ inViewport, setInViewport ] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([ entry ]) => {
      setInViewport(entry.isIntersecting);
    }, options);
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ options, ref ]);
  return inViewport;
}


const StickyNavbar = ({ tags }: StickyNavbarProps) => {
  const [activeTag, setActiveTag] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);
  

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTag(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    tags.forEach((tag) => {
      const element = document.getElementById(tag);
      if (element) observerRef.current?.observe(element);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [tags]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: "smooth" });
    setActiveTag(sectionId);
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