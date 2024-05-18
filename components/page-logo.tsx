import Image from 'next/image'
import React from 'react'

import Me from '#/public/static/images/me.jpg'

function PageLogo() {
  return (
    <div className="page-icon-inline page-icon-image">
      <Image alt="page log logo" src={Me} className="icon page-icon" />
    </div>
  )
}

export default PageLogo
