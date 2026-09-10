import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" });
  };

  return (
    <section id="contact" className="py-32 px-4 relative overflow-hidden bg-white dark:bg-gray-950">
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-7xl font-black text-udsm-blue dark:text-white tracking-tight"
          >
            Get In <span className="bg-gradient-to-r from-udsm-blue to-forest-green bg-clip-text text-transparent">Touch</span>
          </motion.h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">Have a question or want to collaborate? Send us a message.</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-xl space-y-8 border border-white/20 dark:border-gray-800">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                  <Input type="text" placeholder="Innovation Lead" required className="bg-gray-50/50 dark:bg-gray-800/50 h-14 rounded-xl border-gray-100 dark:border-gray-700 px-6 font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                  <Input type="email" placeholder="name@y4clab.com" required className="bg-gray-50/50 dark:bg-gray-800/50 h-14 rounded-xl border-gray-100 dark:border-gray-700 px-6 font-bold" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
                  <Input type="tel" placeholder="+255..." required className="bg-gray-50/50 dark:bg-gray-800/50 h-14 rounded-xl border-gray-100 dark:border-gray-700 px-6 font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Organization</label>
                  <Input type="text" placeholder="Your Startup/Org" className="bg-gray-50/50 dark:bg-gray-800/50 h-14 rounded-xl border-gray-100 dark:border-gray-700 px-6 font-bold" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Your Message</label>
                <Textarea placeholder="How can we innovate together?" rows={6} required className="bg-gray-50/50 dark:bg-gray-800/50 rounded-2xl border-gray-100 dark:border-gray-700 p-6 font-medium text-lg" />
              </div>
              <Button type="submit" size="lg" className="w-full h-16 bg-gradient-to-r from-udsm-blue to-forest-green hover:from-forest-green hover:to-udsm-blue hover:scale-[1.01] active:scale-[0.98] text-white text-xl font-black rounded-2xl shadow-lg shadow-udsm-blue/20 transition-all">
                SEND MESSAGE
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
