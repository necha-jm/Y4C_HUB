import React from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake as Handshake, Building2, GraduationCap, Globe, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

const Collaboration = () => {
  const partners = [
    { icon: Building2, title: 'Corporate Partners', description: 'Collaborate with leading companies for internships, mentorship, and project opportunities.', color: 'from-udsm-blue to-blue-700' },
    { icon: GraduationCap, title: 'Academic Institutions', description: 'Partner with universities and schools to expand educational reach and impact.', color: 'from-udsm-gold to-orange-500' },
    { icon: Globe, title: 'International Networks', description: 'Connect with global innovation hubs and exchange programs worldwide.', color: 'from-forest-green to-emerald-700' },
    { icon: Handshake, title: 'Community Organizations', description: 'Work with local NGOs and community groups to create grassroots impact.', color: 'from-udsm-blue to-forest-green' }
  ];

  const handlePartner = () => {
    toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" });
  };

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
            <h2 className="text-5xl lg:text-7xl font-black text-udsm-blue dark:text-white tracking-tight">
              Collaboration & <span className="bg-gradient-to-r from-udsm-blue to-forest-green bg-clip-text text-transparent">Opportunities</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
              Join our growing network of partners committed to empowering the next generation of innovators.
            </p>
             <div className="pt-6">
               <Button onClick={handlePartner} size="lg" className="bg-gradient-to-r from-udsm-blue to-forest-green hover:scale-105 text-white px-10 py-8 text-xl font-bold rounded-2xl shadow-xl shadow-udsm-blue/20 group transition-all">
                  Become a Partner
                  <ExternalLink className="ml-3 h-6 w-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
             </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-gray-900/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center group"
            >
              <div className={`bg-gradient-to-br ${partner.color} w-20 h-20 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:rotate-[360deg] transition-transform duration-700`}>
                <partner.icon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-4 dark:text-white tracking-tight">{partner.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">{partner.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collaboration;