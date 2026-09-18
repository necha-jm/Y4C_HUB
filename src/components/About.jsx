import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, Eye, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const About = () => {
  return (
    <section id="about" className="py-32 px-4 bg-white dark:bg-gray-950 relative overflow-hidden">
      {/* Innovation Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]"
           style={{ backgroundImage: 'radial-gradient(#0864AF 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Decorative background shapes */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-udsm-blue/5 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-forest-green/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-7xl font-black text-udsm-blue dark:text-white tracking-tight"
          >
            About the <span className="bg-gradient-to-r from-udsm-blue via-forest-green to-udsm-gold bg-clip-text text-transparent italic">Lab</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
           {[
             { icon: Target, title: 'Our Mission', desc: 'Empowering youth with skills and opportunities to become leaders.', color: 'from-forest-green to-emerald-600' },
             { icon: Eye, title: 'Our Vision', desc: 'A leading center of excellence for youth innovation in Africa.', color: 'from-udsm-blue to-blue-700' },
             { icon: Users, title: 'Our Team', desc: 'A passionate group dedicated to youth empowerment.', link: '/our-team', color: 'from-udsm-gold to-orange-500' },
             { icon: Lightbulb, title: 'Innovation', desc: 'Fostering creativity through hands-on programs.', color: 'from-forest-green to-emerald-600' }
           ].map((item, idx) => (
             <motion.div
               key={idx}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               whileHover={{ y: -12, scale: 1.02 }}
               className="bg-white/80 dark:bg-gray-900/40 backdrop-blur-xl p-8 rounded-3xl shadow-xl hover:shadow-udsm-blue/10 transition-all border border-gray-100 dark:border-gray-800 group flex flex-col items-center text-center h-full"
             >
                <div className={`bg-gradient-to-br ${item.color} text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform shadow-lg`}>
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black mb-4 dark:text-white tracking-tight">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-base font-medium leading-relaxed flex-grow">
                  {item.desc}
                </p>
                {item.link && (
                  <div className="pt-6">
                    <Link to={item.link} className="text-udsm-blue dark:text-blue-400 hover:underline font-black text-sm uppercase tracking-widest inline-flex items-center gap-2 group/link">
                      View Team <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                )}
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};
export default About;