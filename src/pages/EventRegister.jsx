import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, QrCode, Ticket, Calendar, MapPin, ArrowLeft, Download, Share2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import Breadcrumbs from '@/components/Breadcrumbs';
import apiClient from '@/core/apiClient';

const EventRegister = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState({ title: 'Y4C Innovation Event' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await apiClient.get('/public/events');
        const found = res.data?.find((e) => String(e.id) === String(eventId));
        if (found) {
          setEvent(found);
        } else {
          setEvent({
            id: eventId,
            title: `Innovation Event #${eventId}`,
            location: 'Y4C Innovation Lab, UDSM CoICT Campus',
            timeRange: '9:00 AM - 5:00 PM'
          });
        }
      } catch (e) {
        setEvent({
          id: eventId,
          title: `Innovation Event #${eventId}`,
          location: 'Y4C Innovation Lab, UDSM CoICT Campus'
        });
      }
    };
    fetchEvent();
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await apiClient.post('/events/register', {
        ...data,
        eventId,
        eventTitle: event.title
      });

      setTicket(res.data);
      toast({
        title: 'Registration Confirmed! 🎉',
        description: `Your ticket has been generated. Ticket ID: ${res.data.ticketId}`,
      });
    } catch (err) {
      toast({
        title: 'Registration Error',
        description: 'Could not complete registration. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Register for {event.title} - Y4C Innovation Lab</title>
        <meta name="description" content={`Register for the ${event.title} at Y4C Innovation Lab.`} />
      </Helmet>
      <Header />
      <main className="bg-slate-50 dark:bg-gray-950 pt-20 lg:pt-24 min-h-screen">
        <Breadcrumbs />
        <div className="container mx-auto px-4 pb-20">
          <AnimatePresence mode="wait">
            {!ticket ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-udsm-blue/10 text-udsm-blue rounded-2xl">
                    <Ticket className="h-7 w-7" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-udsm-gold">Event Registration</span>
                    <h1 className="text-2xl lg:text-3xl font-black text-udsm-blue dark:text-white tracking-tight">{event.title}</h1>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-gray-500 mb-8 p-4 bg-gray-50 dark:bg-gray-800/40 rounded-2xl">
                  <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-udsm-blue" /> {event.timeRange || 'Full Day'}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-forest-green" /> {event.location || 'Y4C Lab, UDSM'}</span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2 ml-1">Full Name</label>
                      <Input name="fullName" type="text" placeholder="Baraka Mwangi" required className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border-gray-100 dark:border-gray-700 font-bold" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2 ml-1">Email Address</label>
                      <Input name="email" type="email" placeholder="name@domain.com" required className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border-gray-100 dark:border-gray-700 font-bold" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2 ml-1">Phone Number</label>
                      <Input name="phone" type="tel" placeholder="+255..." required className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border-gray-100 dark:border-gray-700 font-bold" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2 ml-1">Organization / Department</label>
                      <Input name="organization" type="text" placeholder="UDSM CoICT / Startup" className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border-gray-100 dark:border-gray-700 font-bold" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2 ml-1">Are you a student?</label>
                    <select name="isStudent" required className="w-full bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-input text-gray-700 dark:text-gray-200 font-bold outline-none focus:ring-2 focus:ring-udsm-blue">
                      <option value="yes">Yes, currently enrolled student</option>
                      <option value="no">No, community member / entrepreneur</option>
                    </select>
                  </div>
                  <Button type="submit" disabled={isSubmitting} size="lg" className="w-full h-16 bg-gradient-to-r from-udsm-blue via-forest-green to-udsm-gold hover:scale-[1.01] transition-all text-white font-black uppercase tracking-widest rounded-xl shadow-xl shadow-udsm-blue/20">
                    {isSubmitting ? 'Securing Spot...' : 'Complete Registration & Get Ticket'}
                  </Button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="ticket"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-[3rem] shadow-2xl border-4 border-dashed border-udsm-blue/30 overflow-hidden relative"
              >
                <div className="bg-gradient-to-r from-udsm-blue via-forest-green to-udsm-gold p-8 text-white text-center relative">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30">
                    <CheckCircle2 className="h-10 w-10 text-white" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-90">Official Admission Pass</span>
                  <h2 className="text-2xl font-black mt-1">{ticket.eventTitle}</h2>
                  <p className="text-xs opacity-80 mt-1">{ticket.organization || 'Y4C Innovation Lab'}</p>
                </div>

                <div className="p-8 md:p-10 space-y-6">
                  <div className="grid grid-cols-2 gap-4 text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Attendee Name</p>
                      <p className="text-base font-black text-gray-900 dark:text-white mt-1">{ticket.fullName}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Ticket Reference</p>
                      <p className="text-base font-black text-udsm-blue dark:text-blue-400 mt-1">{ticket.ticketId}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-gray-950 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800 text-center">
                    <div className="p-4 bg-white rounded-2xl shadow-md border mb-3">
                      <QrCode className="h-28 w-28 text-gray-900" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Scan at Lab Entry</span>
                    <span className="text-xs font-mono font-bold text-gray-700 dark:text-gray-300 mt-1">{ticket.ticketId}</span>
                  </div>

                  <div className="flex gap-4">
                    <Button onClick={() => window.print()} variant="outline" className="flex-1 h-12 rounded-xl font-black uppercase tracking-widest text-xs gap-2">
                      <Download className="h-4 w-4" /> Save Ticket
                    </Button>
                    <Button asChild className="flex-1 h-12 rounded-xl bg-udsm-blue text-white font-black uppercase tracking-widest text-xs gap-2">
                      <Link to="/"><ArrowLeft className="h-4 w-4" /> Return to Hub</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default EventRegister;
