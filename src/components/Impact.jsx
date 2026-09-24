import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { Users, Briefcase, Award, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const AnimatedCounter = ({ value, duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Parse numeric value and suffix
  const numValue = parseInt(value.replace(/[^0-9]/g, ''));
  const suffix = value.replace(/[0-9]/g, '');

  const springValue = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const displayValue = useTransform(springValue, (latest) =>
    Math.floor(latest) + suffix
  );

  useEffect(() => {
    if (isInView) {
      springValue.set(numValue);
    }
  }, [isInView, numValue, springValue]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
};

const Impact = () => {
  const metrics = [
    { icon: Users, value: '500+', label: 'Youth Trained', description: 'Young minds empowered with skills and knowledge', color: 'from-udsm-blue to-blue-700' },
    { icon: Briefcase, value: '50+', label: 'Startups Launched', description: 'Innovative businesses created by our alumni', color: 'from-udsm-gold to-orange-500' },
    { icon: Award, value: '15+', label: 'Awards Won', description: 'Recognition for excellence and innovation', color: 'from-forest-green to-emerald-600' },
    { icon: TrendingUp, value: '85%', label: 'Success Rate', description: 'Participants achieving their goals', color: 'from-forest-green to-teal-500' }
  ];

  return (
    <section id="impact" className="py-32 px-4 relative overflow-hidden bg-white dark:bg-[#0a0f1a] text-gray-900 dark:text-white transition-colors duration-500">
      <div className="container mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-24 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
              Our <span className="bg-gradient-to-r from-udsm-blue via-udsm-gold to-forest-green bg-clip-text text-transparent">Impact</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              <div className="bg-white dark:bg-[#111827] rounded-3xl p-8 text-center shadow-xl dark:shadow-2xl transition-all border border-gray-100 dark:border-gray-800 overflow-hidden relative h-full flex flex-col justify-center">
                <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${metric.color}`} />
                <div className={`bg-gradient-to-br ${metric.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-lg`}>
                  <metric.icon className="h-8 w-8 text-white" />
                </div>
                <p className="text-5xl font-black text-gray-900 dark:text-white mb-3 tracking-tighter">
                  <AnimatedCounter value={metric.value} />
                </p>
                <p className="text-lg font-bold text-gray-800 dark:text-gray-300 mb-2 uppercase tracking-widest">{metric.label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium">{metric.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Impact;