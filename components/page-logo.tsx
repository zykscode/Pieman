import Image from 'next/image'
import React from 'react'

import Me from '#/public/static/images/me.jpg'
import Link from 'next/link'

function PageLogo() {
  return (
    <Link href={'/'} className=" size-8 flex justify-center  rounded-full bg-yellow-200">
      <Image alt="" src={Me} className=" size-full rounded-full " />
    </Link>
  )
}

export default PageLogo
