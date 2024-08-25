import React,{ ReactNode }  from 'react'

interface headerTextProps {
    children : ReactNode, 
    className?: string
}

const HeaderText = ({children, className}: headerTextProps) => {
    const defaultStyles = 'font-semibold text-2xl text-center';
  return (
    <h1 className={`${className} ${defaultStyles}`}>{children}</h1>
  )
}

export default HeaderText