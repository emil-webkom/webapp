import { Button } from '@/components/ui/button'
import React from 'react'

export interface thumbnailButtonProps {
    imageURL?: string
    title: string
    oneliner: string
}

const ThumbnailButton = ({imageURL,title,oneliner} : thumbnailButtonProps) => {
  return (
    <Button variant={'transparent'} className='flex h-fit text-left px-1 w-fit items-start gap-2'>
        <div className='size-10 lg:size-16 rounded-lg overflow-hidden self-center'>
            <img src={imageURL? imageURL : `/image/logoer/${title.toLowerCase().replace(/\s/g, "")}.png`} alt={title + " logo"} />
        </div>
        <div className='flex flex-col items-start justify-start'>
            <h1 className='text-sm lg:text-base leading-0'>{title}</h1>
            <p className='text-xs lg:text-sm lg:w-48 text-wrap opacity-60'>{oneliner}</p>
        </div>
    </Button>
  )
}

export default ThumbnailButton