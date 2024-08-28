
import { ArrowDown, ArrowUp, CalendarDays, Clock, MapPin } from 'lucide-react'
import React, { ReactNode, useState } from 'react'
import { Button } from '../ui/button'

export interface dropdownCardProps {
  title: string
  content: ReactNode
  oneLiner?: string
  time?: string
  place?: string
}



const DropdownCard = (props: dropdownCardProps) => {
  const [cardOpen, setCardOpen] = useState(false)
  const onCardClick = () => {
    setCardOpen(!cardOpen)
  }

  return (
  <div className={`overflow-hidden ${cardOpen ? '' : 'h-fit'}`}>
  <Button onClick={onCardClick} variant={'transparent'} className={`w-full flex-col h-fit items-start gap-1 ${cardOpen ? 'border-b-[#ffffff60] rounded-b-none ' : ''}`}>
    <div className='flex flex-row justify-between w-full items-center'>
      <div className='text-left'>
        <p className='lg:text-lg text-base'>{props.title} </p>
        <div className='flex lg:flex-row flex-col text-slate-200 font-normal lg:text-sm text-xs lg:gap-2'>
          {props.time ? <div className='inline-flex items-center gap-0.5'><CalendarDays size={14} />{props.time}</div> : <></>}
          {props.place ? <div className='inline-flex items-center  gap-0.5'><MapPin size={14} />{props.place}</div> : <></>}
        </div>

      </div>
      {cardOpen ? <ArrowUp /> : <ArrowDown />}
    </div>
  </Button>
  {cardOpen? 
  <div className='border-x-[1px] border-b-[1px] rounded-md rounded-t-none border-t-none p-2'>
    {props.content}
  </div>
  : <></>
  }
  </div>
  )
}

export default DropdownCard