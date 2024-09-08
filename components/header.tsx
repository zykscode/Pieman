import Link from 'next/link';
import React from 'react';
import { RxAvatar } from 'react-icons/rx';

import PageLogo from './page-logo';
import { ThemeToggle } from './ThemeToggle';

const Header = () => {
  return (
    <div className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-8">
      <PageLogo />
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <Link href="/profile" className="rounded-full p-2 hover:bg-accent">
          <RxAvatar className="h-8 w-8" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
