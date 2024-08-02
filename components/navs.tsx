'use client';

import Link from 'next/link';
import React from 'react';

import type { NavItem } from '../types';

const Navs = ({ items }: { items: NavItem[] }) => {
  return (
    <nav className="flex w-full justify-around rounded-3xl  p-0 text-background   ">
      {items.map((nav) => {
        return (
          <Link
            className="button flex flex-col justify-center gap-2 capitalize"
            key={nav.title}
            href={`/${nav.href}`}
          >
            <span className="flex justify-center">
              <nav.icon className="size-8 " />
            </span>
            <div className="">{nav.title}</div>
          </Link>
        );
      })}
    </nav>
  );
};

export default Navs;
