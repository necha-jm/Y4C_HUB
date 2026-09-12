import React from 'react';
import { motion } from 'framer-motion';

const partners = [
  { name: 'University of Dar es Salaam', logo: '/Images/udsm-logo.png' },
  { name: 'UNICEF', logo: '/Images/unicef.png' },
  { name: 'Y4C Innovation Lab', logo: '/Images/y4c_logo.png' },
  { name: 'UDSM CoICT', logo: '/Images/udsm-logo.png' },
  { name: 'UNICEF Tanzania', logo: '/Images/unicef.png' },
];

const Partners = () => {
  // Triple the list to ensure the marquee is always full during animation
  const scrollingPartners = [...partners, ...partners, ...partners];

  return (
    <section className="py-24 bg-gray-50/30 dark:bg-gray-900/10 overflow-hidden border-y border-gray-100 dark:border-gray-800/50">
      <div className="container mx-auto px-4 mb-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-orange-500 font-black text-xs uppercase tracking-[0.4em] mb-4"
        >
          Our Partners
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight"
        >
          We are honored to have worked with
        </motion.h2>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <motion.div
          className="flex whitespace-nowrap gap-8 py-4"
          animate={{
            x: ['0%', '-33.33%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {scrollingPartners.map((partner, index) => (
            <div
              key={index}
              className="w-64 h-32 bg-white rounded-[2rem] flex items-center justify-center p-8 shadow-sm border border-gray-100 dark:border-gray-800/50 flex-shrink-0 hover:shadow-xl hover:border-udsm-blue/20 transition-all duration-500"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-w-full max-h-full object-contain transition-all duration-500 opacity-100 scale-90 hover:scale-105"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;
