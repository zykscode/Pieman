import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Me from '#/public/static/images/me.jpg';

function PageLogo() {
  return (
    <Link
      href="/"
      className=" flex size-8 justify-center  rounded-full bg-yellow-200"
    >
      <Image alt="" src={Me} className=" size-full rounded-full " />
    </Link>
  );
}

export default PageLogo;
