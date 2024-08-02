'use client';

import React from 'react';

import { marketingConfig } from '../config/marketing';
import Navs from './navs';

const PageHeader = () => {
  return (
    <header className="fixed bottom-0 z-50 w-full rounded-t-2xl bg-green-300 pb-0 opacity-100 md:hidden">
      <div className="nav-header flex justify-between  ">
        <Navs items={marketingConfig.mainNav} />
      </div>
    </header>
  );
};

export default PageHeader;
