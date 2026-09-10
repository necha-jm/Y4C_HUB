import React from 'react';
import { motion } from 'framer-motion';
import { Award, Zap, Star, Target, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

const AchievementOrbit = () => {
  const achievements = [
    { icon: Award, label: 'Fast Starter', color: 'text-yellow-500', delay: 0 },
    { icon: Zap, label: 'Super Coder', color: 'text-blue-500', delay: 1 },
    { icon: Star, label: 'Top Contributor', color: 'text-purple-500', delay: 2 },
    { icon: Target, label: 'Goal Getter', color: 'text-green-500', delay: 3 },
    { icon: Trophy, label: 'Project Champ', color: 'text-orange-500', delay: 4 },
  ];

  return (
    <div className="bg-gray-950 rounded-[3rem] p-10 h-[400px] relative overflow-hidden flex flex-col items-center justify-center border border-white/10 shadow-2xl">
      <div className="absolute inset-0 opacity-20">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-dashed border-white/20 rounded-full" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-dashed border-white/20 rounded-full" />
      </div>

      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="w-28 h-24 bg-gradient-to-br from-udsm-blue to-indigo-800 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(8,100,175,0.5)] relative z-10"
      >
        <Star className="h-12 w-12 text-udsm-gold fill-udsm-gold" />
      </motion.div>

      <h3 className="text-white font-black text-2xl mt-8 relative z-10 tracking-tight uppercase">Hall of Fame</h3>
      <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] mt-3 relative z-10">Unlocked 5/12 Badges</p>

      {achievements.map((ach, i) => {
        const angle = (i / achievements.length) * (2 * Math.PI);
        const radius = 145;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: [x, x + 8, x],
              y: [y, y - 8, y]
            }}
            transition={{
              delay: i * 0.1,
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute p-4 bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 flex flex-col items-center gap-2 group cursor-help hover:bg-white/10 transition-colors"
            style={{ left: `calc(50% + ${x}px - 25px)`, top: `calc(50% + ${y}px - 25px)` }}
          >
            <ach.icon className={cn("h-7 w-7 group-hover:scale-125 transition-transform", ach.color)} />
            <span className="text-[7px] font-black text-white opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest whitespace-nowrap">{ach.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
};

export default AchievementOrbit;
