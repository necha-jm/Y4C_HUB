import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Message Sent! 🚀",
      description: "Thank you for getting in touch with Y4C Innovation Lab. We'll get back to you shortly.",
      variant: "success"
    });

    e.target.reset();
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-32 px-4 relative overflow-hidden bg-white dark:bg-gray-950">
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-7xl font-black text-udsm-blue dark:text-white tracking-tight"
          >
            Get In <span className="bg-gradient-to-r from-udsm-blue to-forest-green bg-clip-text text-transparent">Touch</span>
          </motion.h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">Have a question or want to collaborate? Send us a message.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Contact Details Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-xl border border-white/20 dark:border-gray-800">
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6 tracking-tight uppercase">Direct Channels</h3>

              <div className="space-y-6">
                <a
                  href="mailto:y4c@udsm.ac.tz"
                  className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-udsm-blue/5 transition-all border border-transparent hover:border-udsm-blue/10"
                >
                  <div className="w-12 h-12 bg-udsm-blue/10 rounded-xl flex items-center justify-center text-udsm-blue group-hover:bg-udsm-blue group-hover:text-white transition-all shadow-lg shadow-blue-100 dark:shadow-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Us</p>
                    <p className="font-bold text-gray-900 dark:text-gray-200">y4c@udsm.ac.tz</p>
                  </div>
                </a>

                <div className="group flex items-center gap-4 p-4 rounded-2xl">
                  <div className="w-12 h-12 bg-forest-green/10 rounded-xl flex items-center justify-center text-forest-green transition-all shadow-lg shadow-green-100 dark:shadow-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Visit Hub</p>
                    <p className="font-bold text-gray-900 dark:text-gray-200 text-sm">Room B208, UDSM CoICT</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
                <p className="text-[10px] font-black text-udsm-gold uppercase tracking-[0.2em] mb-4">Operational Hours</p>
                <div className="flex justify-between items-center text-sm font-bold text-gray-600 dark:text-gray-400">
                  <span>Mon - Fri</span>
                  <span className="text-gray-900 dark:text-white">08:00 - 16:00</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] shadow-xl space-y-8 border border-white/20 dark:border-gray-800">
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
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full h-16 bg-gradient-to-r from-udsm-blue to-forest-green hover:from-forest-green hover:to-udsm-blue hover:scale-[1.01] active:scale-[0.98] text-white text-xl font-black rounded-2xl shadow-lg shadow-udsm-blue/20 transition-all flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full"
                    />
                    SENDING...
                  </>
                ) : (
                  "SEND MESSAGE"
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
