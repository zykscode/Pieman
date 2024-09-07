/* eslint-disable react/no-array-index-key */
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Bank-Level Security',
    description:
      'Your funds and data are protected with cutting-edge encryption.',
  },
  {
    title: 'Smart Escrow System',
    description:
      'Funds are securely held until all parties meet the agreed conditions.',
  },
  {
    title: 'Live Exchange Rates',
    description: 'Benefit from real-time rates for Pi and Naira conversions.',
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-gray-100 py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-12 text-3xl font-bold text-gray-900">Our Features</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
            >
              <h3 className="mb-4 text-xl font-semibold text-indigo-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
