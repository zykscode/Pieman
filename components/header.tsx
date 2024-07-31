import React from 'react'
import PageLogo from './page-logo'
import { RxAvatar } from 'react-icons/rx'
import Link from 'next/link'

type Props = {}

const Header = (props: Props) => {
  return (
    <div className='fixed w-full rounded-t-3xl h-16 flex justify-between p-4 '>
        <PageLogo/>
        <Link href={'/dashboard'}>
        <RxAvatar className='size-full'/>
        </Link>
    </div>
  )
}

export default Header