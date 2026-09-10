import React from 'react';
import { motion } from 'framer-motion';

const HeroImage = () => {
  return (
    <div className='flex justify-center items-center relative group'>
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"
      />
      <img 
        src='/Images/Photo05.png'
        alt='Y4C Lab'
        className="relative z-10 drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
      />
    </div>
  );
};

export default HeroImage;
