import Link from 'next/link';
import React from 'react';
import { RxAvatar } from 'react-icons/rx';

import PageLogo from './page-logo';

const Header = () => {
  return (
    <div className="sticky top-0 z-10 flex h-16 w-full justify-between bg-red-500 p-4">
      {' '}
      <PageLogo />
      <Link href="/dashboard">
        <RxAvatar className="size-full" />
      </Link>
    </div>
  );
};

export default Header;
