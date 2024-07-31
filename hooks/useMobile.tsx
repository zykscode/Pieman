// hooks/useMobileOnly.js
"use client";
import { useEffect, useState } from 'react';

const useMobileOnly = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isProduction, setIsProduction] = useState(false);

  useEffect(() => {
    // Set environment
    setIsProduction(process.env.NODE_ENV === 'production');

    // Function to handle resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    handleResize();

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMobile, isProduction };
};

export default useMobileOnly;
