import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Logo = ({ className, iconClassName, textClassName, showText = true }) => {
  return (
    <motion.div
      className={cn("flex items-center gap-3 group cursor-pointer", className)}
      whileHover="hover"
      initial="initial"
    >
      <div className="relative">
        {/* Animated Background Glow */}
        <motion.div
          className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-xl group-hover:bg-purple-500/30 transition-colors duration-500"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Logo Container */}
        <motion.div
          className={cn(
            "relative bg-black p-2.5 rounded-full shadow-2xl border-2 border-white/10 overflow-hidden",
            "group-hover:border-blue-500/50 group-hover:shadow-blue-500/20 transition-all duration-500",
            iconClassName
          )}
          variants={{
            initial: { rotate: 0, scale: 1 },
            hover: { rotate: 360, scale: 1.1 }
          }}
          transition={{
            hover: { duration: 0.8, ease: "anticipate" }
          }}
        >
          <img
            src="/Images/youth_for_children_logo.png"
            alt="Y4C Innovation Lab"
            className="w-full h-full object-contain scale-110"
          />

          {/* Shine Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full"
            variants={{
              hover: {
                translateX: ["100%", "-100%"],
                transition: { duration: 1.5, repeat: Infinity, ease: "linear" }
              }
            }}
          />
        </motion.div>
      </div>

      {showText && (
        <div className={cn("flex flex-col leading-tight", textClassName)}>
          <motion.span
            className="text-xs font-black bg-gradient-to-r from-udsm-blue to-forest-green bg-clip-text text-transparent tracking-tighter uppercase italic"
            variants={{
              initial: { x: 0 },
              hover: { x: 2 }
            }}
          >
            Y4C <span className="bg-gradient-to-r from-udsm-blue to-forest-green bg-clip-text text-transparent group-hover:from-forest-green group-hover:to-udsm-blue transition-all duration-500">Innovation</span>
          </motion.span>
          <motion.span
            className="text-[6px] font-black uppercase tracking-[0.3em] text-forest-green/60 dark:text-forest-green/40 group-hover:text-udsm-blue transition-colors duration-300"
            variants={{
              initial: { opacity: 0.8 },
              hover: { opacity: 1, letterSpacing: "0.4em" }
            }}
          >
            Lab
          </motion.span>
        </div>
      )}
    </motion.div>
  );
};

export default Logo;
