
import Image, { ImageProps } from 'next/image'
import React, { useState } from 'react'

const HeaderImage: React.FC<ImageProps> = (props) => {

    return (
        <div className="relative flex h-52 w-full rounded-md overflow-hidden" 
        style={{
            background:`url(${props.src})`,
            backgroundSize:'100%',
            backgroundPositionY:'20%'

        }}>
            {/* <Image
                {...props}
                fill
                className="absolute object-cover"
            /> */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#011c214c] z-10"></div>
        </div>
    )
}

export default HeaderImage