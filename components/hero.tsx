import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-indigo-700 text-white">
      <div className="container mx-auto px-4 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-5xl font-bold"
        >
          Simplifying Secure Transactions
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 text-lg"
        >
          Trust us to safeguard your Pi and Naira exchanges with top-notch
          escrow services.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href="/get-started"
            className="rounded-full bg-green-500 px-6 py-2 font-semibold text-white hover:bg-green-600"
          >
            Get Started
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
