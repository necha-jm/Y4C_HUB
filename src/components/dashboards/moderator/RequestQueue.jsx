import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, CheckCircle2, Clock, Send, Search } from 'lucide-react';
import apiClient from '@/core/apiClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

const RequestQueue = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [response, setResponse] = useState('');

  const fetchRequests = async () => {
    try {
      const response = await apiClient.get('/facilitator/requests/pending');
      if (response.data && Array.isArray(response.data)) {
        setRequests(response.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleRespond = async () => {
    if (!response.trim()) return;
    try {
      await apiClient.put(`/facilitator/requests/${selectedRequest.id}/respond`, response, {
        headers: { 'Content-Type': 'text/plain' }
      });
      toast({ title: "Resolved", description: "Response sent to student." });
      setRequests(requests.filter(r => r.id !== selectedRequest.id));
      setSelectedRequest(null);
      setResponse('');
    } catch (e) {
      toast({ title: "Error", description: "Failed to send response." });
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-10 relative z-10">
      <div className="lg:col-span-1 space-y-8">
        <h2 className="text-2xl font-black flex items-center gap-3 tracking-tight">
          <div className="p-2 bg-indigo-50 rounded-xl">
            <MessageCircle className="h-6 w-6 text-indigo-600" />
          </div>
          Support Queue
        </h2>

        <div className="space-y-4">
          {requests.length === 0 ? (
            <div className="bg-white/80 p-8 rounded-[2rem] border border-dashed border-gray-200 text-center">
              <p className="text-gray-400 text-xs font-black uppercase tracking-widest">No pending tickets</p>
            </div>
          ) : (
            requests.map((req) => (
              <button
                key={req.id}
                onClick={() => setSelectedRequest(req)}
                className={`w-full text-left p-8 rounded-[2.5rem] border-2 transition-all relative overflow-hidden group ${
                  selectedRequest?.id === req.id
                  ? 'border-indigo-600 bg-white shadow-xl shadow-indigo-50 scale-[1.02]'
                  : 'border-white bg-white/50 backdrop-blur-sm hover:border-indigo-100 hover:shadow-lg'
                }`}
              >
                {selectedRequest?.id === req.id && (
                  <div className="absolute top-0 right-0 w-2 h-full bg-indigo-600" />
                )}
                <span className="text-[9px] font-black uppercase text-indigo-500 tracking-[0.2em]">{req.type || "General Inquiry"}</span>
                <h4 className="font-black text-gray-900 mt-2 leading-tight text-lg">{req.subject}</h4>
                <div className="flex items-center gap-3 text-[10px] text-gray-400 font-bold mt-4 uppercase tracking-tighter">
                  <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-indigo-400" /> {new Date(req.createdAt).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1.5"><Search className="h-3.5 w-3.5 text-indigo-400" /> ID: {req.id}</span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      <div className="lg:col-span-2">
        <AnimatePresence mode="wait">
          {selectedRequest ? (
            <motion.div
              key={selectedRequest.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white p-10 rounded-[3.5rem] shadow-2xl border border-indigo-50 h-full flex flex-col relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -mr-32 -mt-32" />

              <div className="flex-grow relative z-10">
                <div className="flex justify-between items-start mb-10">
                   <div>
                     <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100 mb-4 inline-block">
                       Live Ticket
                     </span>
                     <h3 className="text-4xl font-black text-gray-900 tracking-tight leading-tight">{selectedRequest.subject}</h3>
                     <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">Submitted by Student ID: {selectedRequest.userId}</p>
                   </div>
                   <div className="bg-orange-50 text-orange-600 px-4 py-2 rounded-2xl border border-orange-100 flex items-center gap-2">
                     <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                     <span className="text-[10px] font-black uppercase tracking-widest">Awaiting Review</span>
                   </div>
                </div>

                <div className="bg-slate-50 p-10 rounded-[2.5rem] mb-10 border border-gray-100 relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black shadow-lg">
                    Q
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed font-bold italic">
                    "{selectedRequest.message}"
                  </p>
                </div>
              </div>

              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between ml-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Facilitator Response</label>
                  <span className="text-[10px] text-gray-400 font-bold italic">Student will receive an email notification</span>
                </div>
                <textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  className="w-full rounded-[2rem] bg-gray-50 border-none p-8 outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-gray-700 text-sm leading-relaxed h-40 resize-none shadow-inner"
                  placeholder="Provide guidance, approve requests, or ask for more details..."
                />
                <Button onClick={handleRespond} className="w-full h-16 bg-indigo-600 hover:bg-indigo-700 rounded-[1.5rem] text-lg font-black uppercase tracking-widest gap-3 shadow-xl shadow-indigo-100 transition-all hover:scale-[1.02] active:scale-95">
                   <Send className="h-6 w-6" />
                   Resolve & Notify Student
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm rounded-[4rem] border-2 border-dashed border-gray-200 p-20 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center mb-6">
                 <MessageCircle className="h-10 w-10 text-gray-200" />
              </div>
              <h3 className="text-xl font-black text-gray-400 mb-2 uppercase tracking-widest">Queue Clear</h3>
              <p className="text-gray-400 font-bold text-sm max-w-xs leading-relaxed italic">Select a ticket from the left sidebar to begin drafting a resolution.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RequestQueue;
