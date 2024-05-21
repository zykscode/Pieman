'use client'

import React from 'react'
import { marketingConfig } from '../config/marketing'
import Breadcrumbs from './breadcrumbs'
import Navs from './navs'

const PageHeader = () => {
   return (
    <header className="z-50 bg-background  rounded-t-2xl w-full  fixed bottom-0 ">
    <div className="nav-header  flex  justify-around  ">
      <Breadcrumbs />
      <Navs  items={marketingConfig.mainNav} />
    </div>
  </header> )
}

export default PageHeader