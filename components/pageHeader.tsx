'use client';

import React from 'react';

import { marketingConfig } from '../config/marketing';
import Navs from './navs';

const PageHeader = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg md:relative md:bg-transparent md:shadow-none">
      <div className="mx-auto max-w-md">
        <Navs items={marketingConfig.mainNav} />
      </div>
    </nav>
  );
};

export default PageHeader;
