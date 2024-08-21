import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React, { ReactNode } from 'react'

export interface nyStudentCardProps {
    title: string,
    icon?: ReactNode,
    description: string,
    frist?: string,
    href?: string,
    buttonText?: string,
}

const NyStudentCard = ({title,icon,description,frist,href, buttonText} :nyStudentCardProps) => {

  return (
    <div className='flex gap-2 min-w-60 max-w-[512px] p-2'>
        <div className='pt-1'>
            {icon}
        </div>
        <div className='flex flex-col space-y-4 justify-between'>
            <div className='space-y-2'>
                <h3 className='text-base font-semibold'>{title}</h3>
                <p className='text-[#cbcbcb]'>{description}</p>
            </div>
            <div className='space-y-2'>
                {frist? 
                    <div>
                        <h3 className='text-base font-semibold'>Frist</h3>
                        <p className='text-[#cbcbcb]'>{frist}</p>
                    </div> : <></>}
                {buttonText && href?
                <Link href={href} target='_blank' rel='noopener norefferer' className='border-2 rounded-md flex-row justify-center items-center hover:bg-slate-400 gap-1 p-1 hover:bg-slate-40 w-fit'>
                              {buttonText}
                              <ArrowUpRight className='w-4'></ArrowUpRight>
                    </Link>
                          : 
                <></>}
            </div>
        </div>
    </div>
  )
}

export default NyStudentCard