
import Image, { ImageProps } from 'next/image'
import React, { useState } from 'react'

const HeaderImage: React.FC<ImageProps> = (props) => {

    return (
        <div className="relative flex h-52 w-full rounded-md overflow-hidden">
            <Image
                {...props}
                fill
                className="absolute h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#011c213f] z-10"></div>
        </div>
    )
}

export default HeaderImage