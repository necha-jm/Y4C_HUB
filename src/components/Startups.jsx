import React from 'react';
import { motion } from 'framer-motion';
import { Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Startups = () => {
  const startups = [
    { id: 'hcd-solutions', name: 'HCD Solutions', founder: 'Sarah Johnson', description: 'AI-powered learning platform helping students achieve better outcomes.', achievement: 'Raised $500K in seed funding' },
    { id: 'lishe-app', name: 'Lishe App', founder: 'Michael Chen', description: 'Sustainable solutions for urban farming and food security.', achievement: 'Serving 10,000+ households' },
    { id: 'swash-advocacy', name: 'SWASH Advocacy', founder: 'Amara Okafor', description: 'Telemedicine platform connecting rural communities with healthcare.', achievement: 'Winner of National Innovation Award' }
  ];

  return (
    <section id="startups" className="py-32 px-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-24 space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-7xl font-black text-udsm-blue dark:text-white tracking-tight"
          >
            Success <span className="bg-gradient-to-r from-udsm-blue to-forest-green bg-clip-text text-transparent">Stories</span>
          </motion.h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
            Celebrating the pioneers who turned ideas into thriving impact-driven ventures.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 max-w-2xl mx-auto">
            {[
              { v: '50+', l: 'Startups Launched' },
              { v: '200+', l: 'Trained' },
              { v: '15+', l: 'Awards Won' }
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <p className="text-4xl font-black text-udsm-blue dark:text-blue-400">{stat.v}</p>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">{stat.l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {startups.map((startup, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-50 dark:bg-gray-900/50 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all flex flex-col border border-gray-100 dark:border-gray-800 group"
            >
              <div className="p-8 space-y-4 flex-grow relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-forest-green/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
                 <h3 className="text-2xl font-black dark:text-white">{startup.name}</h3>
                 <p className="text-xs font-black uppercase tracking-widest text-forest-green">Founded by {startup.founder}</p>
                 <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">{startup.description}</p>
                 <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm mt-4">
                  <Award className="h-5 w-5 text-forest-green dark:text-forest-green" />
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{startup.achievement}</span>
                </div>
              </div>
              <div className="p-8 pt-0">
                <Link to={`/startup/${startup.id}`} className="flex items-center gap-2 text-udsm-blue dark:text-blue-400 font-black text-sm uppercase tracking-widest group/link">
                  Read Full Story
                  <ArrowRight className="h-4 w-4 group-hover/link:translate-x-2 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Startups;
