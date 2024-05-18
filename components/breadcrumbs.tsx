
import React from 'react'
import PageLogo from './page-logo'

const Breadcrumbs = () => {
  console.log({ todo: 'add site name' })
  return (
    <div className=" hidden md:flex ">
      <div className="breadcrumb active">
        <PageLogo />
        <span className="hidden md:block  ">Zykson.com</span>
      </div>
    </div>
  )
}

export default Breadcrumbs
