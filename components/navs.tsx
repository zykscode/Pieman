'use client'
import Link from 'next/link'
import React from 'react'
import { NavItem } from '../types'


const Navs = ( {items}:{items: NavItem[]}) => {
  return (
    <nav className="flex rounded-3xl text-background p-2   justify-around w-full   ">
      {items.map((nav) => {
        return (
          <Link className="button gap-2 justify-center flex flex-col capitalize" key={nav.title} href={`/${nav.href}`}>
           <span className='flex justify-center'>
            <nav.icon className='size-8 ' />
           </span>
           <div className="">
            {nav.title}
           </div>
            
          </Link>
        )
      })}
    </nav>
  )
}

export default Navs
