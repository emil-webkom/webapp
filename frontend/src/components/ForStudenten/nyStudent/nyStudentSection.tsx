import React, { ReactNode } from 'react'
import HeaderText from './headerText'
export interface nyStudentSectionProps {
    title: string,
    tag: string,
    intro?: ReactNode,
    content: ReactNode,
    bg?: string;
}

const NyStudentSection = ({title,intro,tag,bg,content} : nyStudentSectionProps) => {
  return (
    <div id={tag} key={tag} className={`bg-${bg} py-10 px-12 justify-center flex flex-col items-center`}>
        <HeaderText>{title}</HeaderText>
        <p className="max-w-[512px] mt-2 mb-4">{intro}
        </p>
        {content}
    </div>
  )
}

export default NyStudentSection