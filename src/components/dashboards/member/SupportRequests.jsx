import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Wrench, Users, MapPin, Sparkles } from 'lucide-react';
import apiClient from '@/core/apiClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SupportRequests = ({ user }) => {
  const [request, setRequest] = useState({
    type: 'EQUIPMENT',
    subject: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);

  const types = [
    { id: 'EQUIPMENT', label: 'Hardware/Tools', icon: Wrench, color: 'bg-blue-500' },
    { id: 'MENTORSHIP', label: 'Mentorship', icon: Sparkles, color: 'bg-purple-500' },
    { id: 'LAB_SPACE', label: 'Lab Booking', icon: MapPin, color: 'bg-green-500' },
    { id: 'OTHER', label: 'Other Support', icon: MessageSquare, color: 'bg-pink-500' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    try {
      await apiClient.post('/member/requests', { ...request, userId: user.id });
      toast({ title: "Success!", description: "A facilitator will review your request soon." });
      setRequest({ ...request, subject: '', message: '' });
    } catch (error) {
      toast({ title: "Error", description: "Failed to submit request.", variant: "destructive" });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-950 rounded-[3rem] p-12 shadow-2xl border border-gray-50 dark:border-gray-900 mt-12 overflow-hidden relative group">
      {/* Animated Background Decor */}
      <motion.div
        animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -right-20 w-80 h-80 bg-udsm-blue/5 rounded-full blur-[100px] opacity-50 group-hover:bg-udsm-gold/5 transition-colors duration-1000"
      />

      <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-12 flex items-center gap-4 relative z-10">
        <div className="p-3 bg-udsm-blue/10 rounded-2xl">
          <MessageSquare className="h-8 w-8 text-udsm-blue" />
        </div>
        Lab Support & Requests
      </h2>

      <div className="grid lg:grid-cols-3 gap-16 relative z-10">
        <div className="space-y-8">
          <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-xs">What do you need help with?</p>
          <div className="grid grid-cols-1 gap-4">
            {types.map((t) => (
              <motion.button
                key={t.id}
                whileHover={{ scale: 1.02, x: 10 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setRequest({...request, type: t.id})}
                className={`flex items-center gap-5 p-5 rounded-[1.5rem] border-2 transition-all ${
                  request.type === t.id
                  ? 'border-udsm-blue bg-udsm-blue/5 shadow-xl shadow-blue-100/20'
                  : 'border-gray-50 dark:border-gray-900 bg-gray-50/30 dark:bg-gray-900/40 hover:border-udsm-blue/30'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl ${t.color} flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform`}>
                  <t.icon className="h-6 w-6" />
                </div>
                <span className="font-black text-gray-800 dark:text-white uppercase tracking-wider text-sm">{t.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">Subject of Request</label>
            <Input
              required
              value={request.subject}
              onChange={(e) => setRequest({...request, subject: e.target.value})}
              placeholder="e.g., Access to 3D Printer for my project"
              className="h-16 rounded-2xl border-gray-100 bg-gray-50/50 font-bold px-8 text-lg"
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">Detailed Message</label>
            <textarea
              required
              value={request.message}
              onChange={(e) => setRequest({...request, message: e.target.value})}
              placeholder="Provide as much detail as possible about your requirements..."
              rows={6}
              className="w-full rounded-[2rem] border-gray-100 bg-gray-50/50 p-8 outline-none focus:ring-2 focus:ring-udsm-blue font-medium text-lg transition-all"
            />
          </div>
          <Button
            disabled={isSending}
            className="w-full h-18 bg-udsm-blue hover:bg-blue-700 rounded-[1.5rem] text-xl font-black shadow-2xl shadow-blue-200 mt-4 uppercase tracking-[0.2em] py-8"
          >
            {isSending ? 'Sending Request...' : 'Submit Request'}
            <Send className="ml-4 h-6 w-6" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SupportRequests;
