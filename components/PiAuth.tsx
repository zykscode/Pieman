'use client';

import { SignIn } from '@clerk/nextjs';
import { motion } from 'framer-motion';

const PiAuth = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <SignIn />
    </motion.div>
  );
};

export default PiAuth;
