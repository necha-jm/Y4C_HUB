import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, CheckCircle, Send, RefreshCw, Clock, User, Building } from 'lucide-react';
import apiClient from '@/core/apiClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const ContactInquiriesManager = () => {
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeInquiry, setActiveInquiry] = useState(null);
  const [replyText, setReplyText] = useState('');

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get('/contact');
      setInquiries(res.data || []);
    } catch (e) {
      toast({ title: "Fetch Failed", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleSendReply = async () => {
    if (!activeInquiry || !replyText.trim()) return;
    try {
      await apiClient.put(`/contact/${activeInquiry.id}/reply`, { replyText });
      toast({ title: "Response Sent! 📨", description: `Replied to ${activeInquiry.email}` });
      setActiveInquiry(null);
      setReplyText('');
      fetchInquiries();
    } catch (e) {
      toast({ title: "Reply Failed", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-8 relative z-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-4 tracking-tight">
            <div className="p-3 bg-udsm-blue rounded-2xl shadow-xl shadow-blue-100 dark:shadow-none text-white">
              <Mail className="h-8 w-8" />
            </div>
            Public Inquiries & Outreach Queue
          </h2>
          <p className="text-gray-500 font-bold mt-2 uppercase text-[10px] tracking-widest ml-16">
            Direct communications sent from the Y4C Web contact page
          </p>
        </div>
        <Button onClick={fetchInquiries} variant="outline" className="gap-2 h-14 rounded-2xl border-2 px-6">
          <RefreshCw className={cn("h-4 w-4 text-udsm-blue", isLoading && "animate-spin")} />
          <span className="font-black uppercase tracking-widest text-xs">Sync Inquiries</span>
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Inquiries List */}
        <div className="lg:col-span-2 space-y-4">
          {inquiries.map((inq) => (
            <motion.div
              key={inq.id}
              onClick={() => { setActiveInquiry(inq); setReplyText(inq.replyText || ''); }}
              whileHover={{ scale: 1.01 }}
              className={cn(
                "p-6 rounded-3xl border transition-all cursor-pointer",
                activeInquiry?.id === inq.id
                  ? "bg-blue-50/50 dark:bg-blue-950/30 border-udsm-blue shadow-lg"
                  : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 shadow-sm"
              )}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-black text-base text-gray-900 dark:text-white">{inq.subject || 'Hub Inquiry'}</span>
                  <p className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                    <User className="h-3.5 w-3.5 text-udsm-blue" /> {inq.name} ({inq.email})
                  </p>
                </div>
                <span className={cn(
                  "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                  inq.status === 'REPLIED' ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                )}>
                  {inq.status}
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mt-2">{inq.message}</p>
            </motion.div>
          ))}
          {inquiries.length === 0 && (
            <div className="p-16 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">No inquiries in inbox</div>
          )}
        </div>

        {/* Detail & Reply Panel */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl h-fit">
          {activeInquiry ? (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-udsm-gold">Inquiry Details</span>
                <h3 className="font-black text-lg text-gray-900 dark:text-white mt-1">{activeInquiry.subject}</h3>
                <p className="text-xs font-bold text-gray-400 mt-1">From: {activeInquiry.name} &lt;{activeInquiry.email}&gt;</p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700 text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                {activeInquiry.message}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Facilitator Response</label>
                <Textarea
                  rows={4}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type official response here..."
                  className="rounded-2xl bg-gray-50 dark:bg-gray-800 border-none font-bold text-xs p-4"
                />
              </div>

              <Button onClick={handleSendReply} className="w-full h-12 rounded-xl bg-udsm-blue text-white font-black uppercase tracking-widest text-xs gap-2">
                <Send className="h-4 w-4" /> Send Email Response
              </Button>
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-700" />
              <p className="text-xs font-black uppercase tracking-widest">Select an inquiry to view & reply</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactInquiriesManager;
