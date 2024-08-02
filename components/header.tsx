import Link from 'next/link';
import React from 'react';
import { RxAvatar } from 'react-icons/rx';

import PageLogo from './page-logo';

const Header = () => {
  return (
    <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex  h-16  w-full justify-between border-border/40 p-4 backdrop-blur">
      {' '}
      <PageLogo />
      <Link href="/dashboard">
        <RxAvatar className="size-full" />
      </Link>
    </div>
  );
};

export default Header;
