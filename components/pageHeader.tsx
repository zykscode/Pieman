'use client'

import React from 'react'
import { marketingConfig } from '../config/marketing'
import Breadcrumbs from './breadcrumbs'
import Navs from './navs'

type Props = {}

const PageHeader = (props: Props) => {
   return (
    <header className="z-50 rounded-3xl w-full  fixed bottom-0 ">
    <div className="nav-header  flex justify-between gap-4 ">
      <Breadcrumbs />
      <Navs  items={marketingConfig.mainNav} />
    </div>
  </header> )
}

export default PageHeader