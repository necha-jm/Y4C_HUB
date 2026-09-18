import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import Breadcrumbs from '@/components/Breadcrumbs';

const eventsData = {
  'bootcamp-2025': { title: 'Innovation Bootcamp 2025' },
  'tech-talks': { title: 'Tech Talk Series' },
  'pitch-comp-2025': { title: 'Startup Pitch Competition' },
};

const EventRegister = () => {
  const { eventId } = useParams();
  const event = eventsData[eventId] || { title: 'Event' };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    console.log("Event Registration Data:", data);
    const registrations = JSON.parse(localStorage.getItem('y4c_event_registrations') || '[]');
    registrations.push({ ...data, event: event.title, submittedAt: new Date().toISOString() });
    localStorage.setItem('y4c_event_registrations', JSON.stringify(registrations));

    toast({
      title: 'Registration Submitted!',
      description: "Thank you for registering. Your information has been sent to y4c@udsm.ac.tz.",
    });
    e.target.reset();
  };

  return (
    <>
      <Helmet>
        <title>Register for {event.title} - Y4C Innovation Lab</title>
        <meta name="description" content={`Register for the ${event.title} at Y4C Innovation Lab.`} />
      </Helmet>
      <Header />
      <main className="bg-slate-50 dark:bg-gray-950 pt-20 lg:pt-28">
        <Breadcrumbs />
        <div className="container mx-auto px-4 pb-16">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-8 md:p-12 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-800">
              <h1 className="text-3xl lg:text-4xl font-black text-udsm-blue dark:text-white mb-2 tracking-tight">Register for {event.title}</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8 font-medium">Fill out the form below to secure your spot.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input name="fullName" type="text" placeholder="Full Name" required className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border-gray-100 dark:border-gray-700 font-bold" />
                  <Input name="email" type="email" placeholder="Email Address" required className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border-gray-100 dark:border-gray-700 font-bold" />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <Input name="phone" type="tel" placeholder="Phone Number" required className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border-gray-100 dark:border-gray-700 font-bold" />
                  <Input name="organization" type="text" placeholder="Organization/Institution" className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border-gray-100 dark:border-gray-700 font-bold" />
                </div>
                <div>
                  <select name="isStudent" required className="w-full bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-input text-gray-500 font-bold outline-none focus:ring-2 focus:ring-udsm-blue">
                    <option value="" disabled selected>Are you a student?</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <Button type="submit" size="lg" className="w-full h-16 bg-gradient-to-r from-udsm-blue via-forest-green to-udsm-gold hover:scale-[1.02] transition-all text-white font-black uppercase tracking-widest rounded-xl shadow-xl shadow-udsm-blue/20">
                  Complete Registration
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default EventRegister;