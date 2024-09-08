import Link from 'next/link'
import React, { ReactNode } from 'react'

export interface textLinkProps {
    href:string,
    children?: ReactNode
    className?:string
}


const TextLink = ({href,className,children} : textLinkProps) => {
  return (
    <Link
            href={href}
            target="_blank"
            rel="noopener norefferer"
            className={`text-green-lightest underline underline-offset-2 ${className}`}
          >
            {children}
    </Link>
  )
}

export default TextLink