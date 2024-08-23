
import { ArrowDown, ArrowUp, Clock, MapPin } from 'lucide-react'
import React, { ReactNode, useState } from 'react'

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

  return (<button onClick={onCardClick} className='border-[1px] text-left rounded-md p-3'>
    <div className='flex flex-row justify-between border-b-[1px] w-full pb-2 border-gray-600'>
      <h2 className='font-semibold'>{props.title}</h2>
      {cardOpen ? <ArrowDown /> : <ArrowUp />}
    </div>
    <div className={`border-b-[1px] border-gray-600 p-2 overflow-hidden bg-[#00343B] ${cardOpen? 'h-fit' : 'h-10'}`}>
      {props.content}
    </div>

      
    <div className='flex flex-col flex-wrap gap-1 mt-3'>
      {props.time ? <div className='flex flex-row gap-1 items-center text-sm'><Clock size={16} />{props.time}</div> : <></>}
      {props.place ? <div className='flex flex-row gap-1 items-center text-sm'><MapPin size={16} />{props.place}</div> : <></>}
      <div className='flex flex-row'></div>
    </div>
  </button>
  )
}

export default DropdownCard