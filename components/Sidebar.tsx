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

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0"
    >
      <div className="flex-1 flex flex-col min-h-0 bg-background border-r">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    pathname === item.href
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <item.icon className="mr-3 h-6 w-6" />
                  {item.label}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="sidebarIndicator"
                      className="absolute left-0 w-1 h-8 bg-primary-foreground"
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
