'use client'

import { useTheme } from 'next-themes'
import { Button } from './ui/button'
import { Icons } from './icons'

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant={'ghost'}
      size={'sm'}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="flex h-8 w-8 items-center justify-center rounded-full md:h-12 md:w-12 "
    >
      <span className="sr-only">Toggle mode</span>
      <Icons.sun className="rotate-0 scale-0 transition-all duration-500 dark:-rotate-90 dark:scale-[1.75] md:dark:scale-110 md:h-12 md:w-12" />
      <Icons.moon className="absolute rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 md:h-4 md:w-4" />
    </Button>
  )
}
