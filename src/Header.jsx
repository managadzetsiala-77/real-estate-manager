import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <>
  <header className='py-9.5 px-12 border-b border-[#DBDBDB] lg:px-42'>
    <Link to={("/")}>
    <img src="/images/logo.svg" alt="" />
    </Link>
   
    </header>  
    
    </>
  )
}
