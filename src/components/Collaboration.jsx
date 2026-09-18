import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Partners from './Partners';

const Collaboration = () => {
  const navigate = useNavigate();

  return (
    <section id="collaboration" className="py-32 px-4 relative overflow-hidden bg-white dark:bg-gray-950">
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-24 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-udsm-blue dark:text-white tracking-tight">
              Our <span className="bg-gradient-to-r from-udsm-blue to-forest-green bg-clip-text text-transparent">Partners</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
              Join our growing network of partners committed to empowering the next generation of innovators.
            </p>
          </motion.div>
        </div>

        <div className="mt-12">
          <Partners />
        </div>

        <div className="mt-20 text-center">
           <Button onClick={() => navigate('/register-partner')} size="lg" className="bg-gradient-to-r from-udsm-blue to-forest-green hover:scale-105 text-white px-12 py-8 text-xl font-bold rounded-2xl shadow-xl shadow-udsm-blue/20 group transition-all">
              Become a Partner
              <ExternalLink className="ml-3 h-6 w-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
        </div>
      </div>
    </section>
  );
};

export default Collaboration;