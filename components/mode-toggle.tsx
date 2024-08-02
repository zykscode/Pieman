/* eslint-disable react/jsx-pascal-case */

'use client';

import { useTheme } from 'next-themes';

import { Icons } from './icons';
import { Button } from './ui/button';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="flex size-8 items-center justify-center rounded-full md:size-12 "
    >
      <span className="sr-only">Toggle mode</span>
      <Icons.sun className="rotate-0 scale-0 transition-all duration-500 dark:-rotate-90 dark:scale-[1.75] md:size-12 md:dark:scale-110" />
      <Icons.moon className="absolute rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 md:size-4" />
    </Button>
  );
}
