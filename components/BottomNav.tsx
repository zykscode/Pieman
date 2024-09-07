'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { FaExchangeAlt, FaHome, FaUser, FaWallet } from 'react-icons/fa';

const navItems = [
  { icon: FaHome, label: 'Home', href: '/' },
  { icon: FaExchangeAlt, label: 'Exchange', href: '/exchange' },
  { icon: FaWallet, label: 'Wallet', href: '/wallet' },
  { icon: FaUser, label: 'Profile', href: '/profile' },
];

const BottomNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden"
    >
      <div className="flex justify-around">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="relative flex flex-col items-center p-2 group"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center ${
                pathname === item.href
                  ? 'text-primary'
                  : 'text-muted-foreground group-hover:text-primary'
              }`}
            >
              <item.icon className="h-6 w-6 mb-1" />
              <span className="text-xs">{item.label}</span>
            </motion.div>
            {pathname === item.href && (
              <motion.div
                layoutId="bottomNavIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                initial={false}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
};

export default BottomNav;
