import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaExchangeAlt, FaShieldAlt, FaUserCheck } from 'react-icons/fa';

import { Button } from './ui/button';

export default function Hero() {
  return (
    <section className="w-full bg-gradient-to-r from-indigo-700 to-purple-700 text-white">
      <div className="container mx-auto px-4 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-5xl font-bold"
        >
          Secure Pi to Naira Exchanges
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 text-xl"
        >
          Trust MiddleMan for safe and efficient cryptocurrency transactions
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
        >
          <Button size="lg" className="bg-green-500 hover:bg-green-600">
            <Link href="/get-started">Get Started</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-indigo-700"
          >
            <Link href="/learn-more">Learn More</Link>
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-8"
        >
          <div className="flex items-center">
            <FaShieldAlt className="mr-2 text-2xl" />
            <span>Secure Escrow</span>
          </div>
          <div className="flex items-center">
            <FaExchangeAlt className="mr-2 text-2xl" />
            <span>Fast Exchanges</span>
          </div>
          <div className="flex items-center">
            <FaUserCheck className="mr-2 text-2xl" />
            <span>Verified Users</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
