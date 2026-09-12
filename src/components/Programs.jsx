import React from 'react';
import { motion } from 'framer-motion';
import { Code, Rocket, Users, BookOpen, ArrowRight, Calendar, Clock, MapPin, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Programs = () => {
  const programs = [
    { id: 'tech-skills', icon: Code, title: 'Tech Skills', description: 'Master web, mobile, and data science through intensive hands-on building.', color: 'from-udsm-blue to-blue-800', duration: '12 Weeks', location: 'CoICT Kijitonyama' },
    { id: 'startup-incubation', icon: Rocket, title: 'Incubation', description: 'Transform ideas into scalable businesses with world-class mentorship.', color: 'from-forest-green to-emerald-700', duration: '6 Months', location: 'Y4C Lab' },
    { id: 'leadership-training', icon: Users, title: 'Leadership', description: 'Equipping the next generation with essential communication mastery.', color: 'from-udsm-gold to-orange-500', duration: '4 Weeks', location: 'Virtual' },
    { id: 'mentorship-programs', icon: BookOpen, title: 'Mentorship', description: 'One-on-one sessions with industry giants to accelerate your growth.', color: 'from-udsm-blue to-forest-green', duration: 'Ongoing', location: 'Hybrid' }
  ];

  return (
    <section id="programs" className="py-32 px-4 relative bg-gray-50/50 dark:bg-gray-900/20 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-24 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-udsm-blue dark:text-white tracking-tight">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-udsm-blue to-forest-green">Programs</span></h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">Transformative journeys designed to unlock your potential and build the future.</p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="bg-white/80 dark:bg-gray-900/40 backdrop-blur-xl rounded-3xl p-6 shadow-xl hover:shadow-udsm-blue/10 transition-all group flex flex-col relative overflow-hidden border border-gray-100 dark:border-gray-800"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${program.color} opacity-[0.05] dark:opacity-[0.1] -mr-16 -mt-16 rounded-full group-hover:scale-150 transition-transform duration-1000`} />

              <div className={`bg-gradient-to-br ${program.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:rotate-12 transition-transform`}>
                <program.icon className="h-7 w-7 text-white" />
              </div>

              <h3 className="text-2xl font-black mb-3 text-gray-900 dark:text-white tracking-tight">{program.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-grow leading-relaxed font-medium line-clamp-3">{program.description}</p>

              <div className="space-y-3 pt-6 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2.5 text-xs font-bold text-gray-500">
                    <Calendar className="h-3.5 w-3.5 text-udsm-blue" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-bold text-gray-500">
                    <MapPin className="h-3.5 w-3.5 text-forest-green" />
                    <span>{program.location}</span>
                  </div>
              </div>

              <div className="mt-8 flex justify-between items-center">
                <Link to={`/program/${program.id}`} className="flex items-center text-udsm-blue dark:text-blue-400 font-black text-xs group/link uppercase tracking-wider">
                  Details
                  <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
                <div className="h-1 w-12 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ x: "-100%" }}
                    whileInView={{ x: "0%" }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "anticipate" }}
                    className={`h-full bg-gradient-to-r ${program.color}`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-20">
          <Link to="/program">
            <Button size="lg" className="bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-black dark:hover:bg-gray-100 px-12 py-8 text-xl font-black rounded-2xl shadow-xl transition-all active:scale-95 group">
              VIEW ALL PROGRAMS
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Programs;