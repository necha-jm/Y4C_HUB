import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

import apiClient from '@/core/apiClient';

const MAP_LINK = 'https://www.google.com/maps?q=-6.7714228,39.2373848';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.target);
      const data = {
        name: formData.get('fullName'),
        email: formData.get('email'),
        subject: formData.get('subject') || 'General Hub Inquiry',
        phone: formData.get('phone'),
        organization: formData.get('organization'),
        message: formData.get('message')
      };

      await apiClient.post('/contact', data);

      toast({
        title: 'Message Sent to Y4C Lab! 🚀',
        description:
          "Thank you for reaching out. Your inquiry has been routed to our facilitators.",
        variant: 'success',
      });

      e.target.reset();
    } catch (err) {
      toast({
        title: 'Submission Failed',
        description: 'Could not send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-white px-4 py-12 md:py-16 dark:bg-gray-950"
    >
      <div className="container relative z-10 mx-auto">
        {/* Section Heading */}
        <div className="mx-auto mb-16 max-w-4xl space-y-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-black tracking-tight text-udsm-blue md:text-4xl lg:text-5xl dark:text-white"
          >
            Get In{' '}
            <span className="bg-gradient-to-r from-udsm-blue to-forest-green bg-clip-text text-transparent dark:from-sky-400 dark:to-emerald-400">
              Touch
            </span>
          </motion.h2>

          <p className="text-xl font-medium text-gray-700 dark:text-gray-200">
            Have a question or want to collaborate? Send us a message.
          </p>
        </div>

        {/* Contact Details and Form */}
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-3">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-xl dark:border-gray-800 dark:bg-gray-900">
              <h3 className="mb-6 text-2xl font-black uppercase tracking-tight text-gray-900 dark:text-white">
                Direct Channels
              </h3>

              <div className="space-y-6">
                {/* Email */}
                <a
                  href="mailto:y4c@udsm.ac.tz"
                  className="group flex items-center gap-4 rounded-2xl border border-transparent p-4 transition-all hover:border-udsm-blue/20 hover:bg-udsm-blue/5 dark:hover:border-sky-500/30 dark:hover:bg-gray-800/80"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-udsm-blue/10 text-udsm-blue shadow-lg transition-all group-hover:bg-udsm-blue group-hover:text-white dark:bg-sky-500/20 dark:text-sky-300 dark:group-hover:bg-sky-500 dark:group-hover:text-gray-950">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300">
                      Email Us
                    </p>
                    <p className="break-words text-base font-bold text-gray-900 dark:text-white">
                      y4c@udsm.ac.tz
                    </p>
                  </div>
                </a>

                {/* Physical Location */}
                <div className="flex items-center gap-4 rounded-2xl p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest-green/10 text-forest-green shadow-lg dark:bg-emerald-500/20 dark:text-emerald-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300">
                      Visit Hub
                    </p>
                    <p className="text-base font-bold text-gray-900 dark:text-white">
                      Room B208, UDSM CoICT
                    </p>
                  </div>
                </div>
              </div>

              {/* Operational Hours */}
              <div className="mt-8 border-t border-gray-100 pt-8 dark:border-gray-800">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-amber-600 dark:text-amber-400">
                  Operational Hours
                </p>

                <div className="flex items-center justify-between gap-3 text-sm font-bold text-gray-700 dark:text-gray-300">
                  <span>Mon - Fri</span>
                  <span className="font-extrabold text-gray-900 dark:text-white">
                    08:00 - 16:00
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-8 rounded-[2rem] border border-gray-100 bg-white p-8 shadow-xl md:p-12 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="ml-1 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    name="fullName"
                    placeholder="Innovation Lead"
                    required
                    className="h-14 rounded-xl border-gray-200 bg-gray-50/70 px-6 font-semibold text-gray-900 placeholder:text-gray-400 focus:border-udsm-blue focus:bg-white focus:ring-2 focus:ring-udsm-blue/20 dark:border-gray-700 dark:bg-gray-800/80 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-sky-400 dark:focus:bg-gray-800 dark:focus:ring-sky-400/20"
                  />
                </div>

                <div className="space-y-2">
                  <label className="ml-1 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="name@y4clab.com"
                    required
                    className="h-14 rounded-xl border-gray-200 bg-gray-50/70 px-6 font-semibold text-gray-900 placeholder:text-gray-400 focus:border-udsm-blue focus:bg-white focus:ring-2 focus:ring-udsm-blue/20 dark:border-gray-700 dark:bg-gray-800/80 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-sky-400 dark:focus:bg-gray-800 dark:focus:ring-sky-400/20"
                  />
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="ml-1 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="+255..."
                    required
                    className="h-14 rounded-xl border-gray-200 bg-gray-50/70 px-6 font-semibold text-gray-900 placeholder:text-gray-400 focus:border-udsm-blue focus:bg-white focus:ring-2 focus:ring-udsm-blue/20 dark:border-gray-700 dark:bg-gray-800/80 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-sky-400 dark:focus:bg-gray-800 dark:focus:ring-sky-400/20"
                  />
                </div>

                <div className="space-y-2">
                  <label className="ml-1 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200">
                    Organization
                  </label>
                  <Input
                    type="text"
                    name="organization"
                    placeholder="Your Startup/Org"
                    className="h-14 rounded-xl border-gray-200 bg-gray-50/70 px-6 font-semibold text-gray-900 placeholder:text-gray-400 focus:border-udsm-blue focus:bg-white focus:ring-2 focus:ring-udsm-blue/20 dark:border-gray-700 dark:bg-gray-800/80 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-sky-400 dark:focus:bg-gray-800 dark:focus:ring-sky-400/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="ml-1 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200">
                  Your Message
                </label>
                <Textarea
                  name="message"
                  placeholder="How can we innovate together?"
                  rows={6}
                  required
                  className="rounded-2xl border-gray-200 bg-gray-50/70 p-6 text-base font-medium text-gray-900 placeholder:text-gray-400 focus:border-udsm-blue focus:bg-white focus:ring-2 focus:ring-udsm-blue/20 dark:border-gray-700 dark:bg-gray-800/80 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-sky-400 dark:focus:bg-gray-800 dark:focus:ring-sky-400/20"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-udsm-blue to-forest-green text-xl font-black text-white shadow-lg shadow-udsm-blue/20 transition-all hover:scale-[1.01] hover:from-forest-green hover:to-udsm-blue active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="h-6 w-6 rounded-full border-4 border-white/30 border-t-white"
                    />
                    SENDING...
                  </>
                ) : (
                  'SEND MESSAGE'
                )}
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Location Section (link only, no iframe) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-xl sm:p-8 dark:border-gray-800 dark:bg-gray-900">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest-green/10 text-forest-green shadow-lg dark:bg-emerald-500/20 dark:text-emerald-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-amber-600 dark:text-amber-400">
                    Find Us
                  </p>
                  <h3 className="text-xl font-black text-gray-900 dark:text-white">
                    Y4C Innovation Lab
                  </h3>
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Room B208, UDSM CoICT, Dar es Salaam
                  </p>
                </div>
              </div>

              <a
                href={MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-udsm-blue px-6 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-forest-green dark:bg-blue-600 dark:hover:bg-emerald-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                View on Google Maps
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;