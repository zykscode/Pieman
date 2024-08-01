'use client'

import React from 'react'
import { marketingConfig } from '../config/marketing'
import Breadcrumbs from './breadcrumbs'
import Navs from './navs'

const PageHeader = () => {
   return (
    <header className="z-50 opacity-100 bg-green-300 rounded-t-2xl w-full fixed md:hidden bottom-0 pb-0"> 
    <div className="nav-header flex justify-between  ">
      <Navs  items={marketingConfig.mainNav} />
    </div>
  </header> )
}

export default PageHeader