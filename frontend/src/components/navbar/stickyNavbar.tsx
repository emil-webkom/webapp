import React from 'react'
import HeaderText from '../ForStudenten/nyStudent/headerText'
import { Button } from '../ui/button';

export interface stickyNavbarProps {
    tags :string[],
}

const StickyNavbar = (props : stickyNavbarProps) => {
    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        section?.scrollIntoView({ behavior: "smooth" });
      };

  return (
    <>
    <HeaderText className="text-xl bg-[#457969] pt-4">Hva vil du lese om?</HeaderText>
    <div className="flex flex-row flex-wrap justify-center p-2 gap-4 bg-[#457969] sticky top-0">
      {props.tags.map((s, i) => (
        <Button key={i} onClick={() => scrollToSection(s)} variant={'transparent'} size={'pill'} >
          {s}
        </Button>
      ))}

    </div>
    </>
  )
}

export default StickyNavbar