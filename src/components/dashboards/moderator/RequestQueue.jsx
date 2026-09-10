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
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MessageCircle className="h-6 w-6 text-indigo-500" />
          Support Queue
        </h2>

        <div className="space-y-3">
          {requests.length === 0 ? (
            <p className="text-gray-400 text-sm font-medium">No pending requests.</p>
          ) : (
            requests.map((req) => (
              <button
                key={req.id}
                onClick={() => setSelectedRequest(req)}
                className={`w-full text-left p-6 rounded-2xl border-2 transition-all ${
                  selectedRequest?.id === req.id
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-50 bg-white hover:border-gray-200'
                }`}
              >
                <span className="text-[10px] font-black uppercase text-indigo-500 tracking-widest">{req.type}</span>
                <h4 className="font-bold text-gray-900 mt-1">{req.subject}</h4>
                <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-2">
                  <Clock className="h-3 w-3" />
                  {new Date(req.createdAt).toLocaleDateString()}
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
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-indigo-50 h-full flex flex-col"
            >
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-8">
                   <div>
                     <h3 className="text-3xl font-black text-gray-900">{selectedRequest.subject}</h3>
                     <p className="text-indigo-600 font-bold uppercase text-xs tracking-widest mt-1">User ID: {selectedRequest.userId}</p>
                   </div>
                   <span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                     Pending Review
                   </span>
                </div>

                <div className="bg-gray-50 p-8 rounded-3xl mb-8 border border-gray-100">
                  <p className="text-gray-700 leading-relaxed font-medium">
                    {selectedRequest.message}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Write Response</label>
                <textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  className="w-full rounded-2xl bg-gray-50 border-gray-100 p-6 outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  rows={4}
                  placeholder="Approve the request or provide more details..."
                />
                <Button onClick={handleRespond} className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-lg font-bold gap-2">
                   <Send className="h-5 w-5" />
                   Send Response & Resolve
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-bold">Select a request from the queue to respond.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RequestQueue;
