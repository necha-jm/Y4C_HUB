import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Calendar, Video, Clock, CheckCircle, ExternalLink, Sparkles, X } from 'lucide-react';
import apiClient from '@/core/apiClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const MentorshipScheduler = ({ user }) => {
  const [experts, setExperts] = useState([]);
  const [mySessions, setMySessions] = useState([]);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [bookingTopic, setBookingTopic] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');

  const fetchData = async () => {
    try {
      const [expRes, bRes] = await Promise.all([
        apiClient.get('/mentorship/experts'),
        apiClient.get('/mentorship/bookings')
      ]);
      setExperts(expRes.data || []);
      setMySessions(bRes.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBookSession = async (e) => {
    e.preventDefault();
    if (!selectedExpert || !selectedSlot) return;

    try {
      const res = await apiClient.post('/mentorship/book', {
        userId: user?.id || 4,
        userName: user?.name || "Baraka Mwangi",
        expertId: selectedExpert.id,
        expertName: selectedExpert.name,
        date: "2026-11-04",
        slot: selectedSlot,
        topic: bookingTopic || "General venture feedback"
      });

      toast({
        title: "Mentorship Session Confirmed! 🚀",
        description: `Office hour booked with ${selectedExpert.name}. Meeting link generated.`
      });
      setSelectedExpert(null);
      setBookingTopic('');
      fetchData();
    } catch (err) {
      toast({ title: "Booking failed", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-10 relative z-10">
      <div>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-4 tracking-tight">
          <div className="p-3 bg-purple-600 rounded-2xl shadow-xl shadow-purple-100 dark:shadow-none text-white">
            <Sparkles className="h-8 w-8" />
          </div>
          Book Expert Mentorship Office Hours
        </h2>
        <p className="text-gray-500 font-bold mt-2 uppercase text-[10px] tracking-widest ml-16">
          1-on-1 strategic guidance with university faculty, engineers & venture capitalists
        </p>
      </div>

      {/* Available Experts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experts.map((exp) => (
          <motion.div
            key={exp.id}
            whileHover={{ y: -4 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-md flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg mb-4">
                {exp.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h4 className="font-black text-lg text-gray-900 dark:text-white">{exp.name}</h4>
              <p className="text-xs text-udsm-gold font-bold">{exp.role} • {exp.company}</p>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {exp.expertise?.map((tag, tIdx) => (
                  <span key={tIdx} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-[9px] font-black uppercase text-gray-600 dark:text-gray-300 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <Button
              onClick={() => {
                setSelectedExpert(exp);
                setSelectedSlot(exp.availableSlots?.[0] || 'Tuesdays 2:00 PM');
              }}
              className="w-full h-11 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs uppercase tracking-wider rounded-xl gap-2"
            >
              <Calendar className="h-4 w-4" /> Book Office Hours
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedExpert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] max-w-lg w-full border border-gray-100 dark:border-gray-800 shadow-2xl relative"
            >
              <button onClick={() => setSelectedExpert(null)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-1">Book Mentorship with {selectedExpert.name}</h3>
              <p className="text-xs text-gray-500 mb-6 font-bold">{selectedExpert.role} ({selectedExpert.company})</p>

              <form onSubmit={handleBookSession} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Available Slot</label>
                  <select value={selectedSlot} onChange={e => setSelectedSlot(e.target.value)} className="w-full h-12 rounded-xl bg-gray-50 dark:bg-gray-800 border px-4 font-bold text-xs">
                    {selectedExpert.availableSlots?.map((slot, sIdx) => (
                      <option key={sIdx} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Session Objective / Challenge</label>
                  <Input required placeholder="e.g. Reviewing LoRaWAN hardware power budgets" value={bookingTopic} onChange={e => setBookingTopic(e.target.value)} className="h-12 rounded-xl bg-gray-50 dark:bg-gray-800 font-bold text-xs" />
                </div>
                <Button type="submit" className="w-full h-12 rounded-xl bg-purple-600 text-white font-black uppercase tracking-widest text-xs mt-2">
                  Confirm 1-on-1 Mentorship
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmed Sessions */}
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
        <h3 className="font-black text-lg text-gray-900 dark:text-white">My Scheduled Mentorship Sessions</h3>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {mySessions.map((s) => (
            <div key={s.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-bold text-sm text-gray-900 dark:text-white">With {s.expertName}</p>
                <p className="text-xs text-gray-500 font-medium">{s.date} • {s.slot} • Topic: "{s.topic}"</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300">
                  {s.status}
                </span>
                {s.meetingLink && (
                  <Button size="sm" asChild variant="outline" className="h-9 rounded-xl font-black text-xs gap-1.5 border-purple-300 text-purple-600">
                    <a href={s.meetingLink} target="_blank" rel="noreferrer">
                      <Video className="h-3.5 w-3.5" /> Join Call
                    </a>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorshipScheduler;
