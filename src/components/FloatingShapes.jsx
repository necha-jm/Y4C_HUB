import React from 'react';
import { motion } from 'framer-motion';

const FloatingShapes = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        className="absolute top-[10%] left-[5%] w-72 h-72 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-[80px]"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[40%] right-[10%] w-96 h-96 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-[100px]"
        animate={{
          x: [0, -40, 0],
          y: [0, 60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[20%] w-80 h-80 bg-pink-400/20 dark:bg-pink-600/10 rounded-full blur-[90px]"
        animate={{
          x: [0, 30, 0],
          y: [0, -50, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Dynamic dark mode accent */}
      <div className="hidden dark:block">
        <motion.div
          className="absolute top-[20%] left-[40%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px]"
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>
    </div>
  );
};

export default FloatingShapes;
