/* eslint-disable react/no-array-index-key */
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaChartLine, FaHandshake, FaShieldAlt } from 'react-icons/fa';

const features = [
  {
    title: 'Bank-Level Security',
    description:
      'Your funds and data are protected with cutting-edge encryption.',
    icon: FaShieldAlt,
    details:
      'We use 256-bit AES encryption, multi-factor authentication, and regular security audits to ensure your assets are safe.',
  },
  {
    title: 'Smart Escrow System',
    description:
      'Funds are securely held until all parties meet the agreed conditions.',
    icon: FaHandshake,
    details:
      'Our blockchain-based escrow system automates the release of funds, reducing disputes and increasing trust between parties.',
  },
  {
    title: 'Live Exchange Rates',
    description: 'Benefit from real-time rates for Pi and Naira conversions.',
    icon: FaChartLine,
    details:
      'We update our exchange rates every 60 seconds, sourcing data from multiple reliable exchanges to ensure accuracy.',
  },
];

export default function Features() {
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);

  return (
    <section id="features" className="bg-gray-100 py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-8 sm:mb-12 text-2xl sm:text-3xl font-bold text-gray-900">
          Our Features
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg"
              onClick={() =>
                setExpandedFeature(expandedFeature === index ? null : index)
              }
            >
              <feature.icon className="mx-auto mb-4 text-3xl text-indigo-600" />
              <h3 className="mb-3 text-xl font-semibold text-indigo-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              {expandedFeature === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-sm text-gray-500 mt-2">
                    {feature.details}
                  </p>
                </motion.div>
              )}
              <button
                className="mt-4 text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
                aria-expanded={expandedFeature === index}
              >
                {expandedFeature === index ? 'Show Less' : 'Learn More'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
