'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import * as React from 'react';

export function ThemeSwitcher() {
  const segment = useSelectedLayoutSegment();

  React.useEffect(() => {
    // Remove any existing theme class
    document.body.classList.forEach((className) => {
      if (className.match(/^theme.*/)) {
        document.body.classList.remove(className);
      }
    });

    // Determine the theme based on the segment
    const theme = segment === 'themes' ? 'dark' : 'light'; // Adjust this logic as needed

    // Apply the theme class to the body
    if (theme) {
      document.body.classList.add(`theme-${theme}`);
    }
  }, [segment]);

  return null;
}
