import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Mail, Phone, Globe, CheckCircle, Trash2, Clock, ShieldCheck, User, Share2 } from 'lucide-react';
import apiClient from '@/core/apiClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

const PartnerReview = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get('/coordinator/partners/pending');
      setRequests(response.data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await apiClient.put(`/coordinator/partners/${id}/approve`);
      toast({ title: "Partner Approved", description: "The institution has been added to our network." });
      fetchRequests();
    } catch (e) {
      toast({ title: "Error", description: "Approval failed.", variant: "destructive" });
    }
  };

  const handlePublish = async (id) => {
    try {
      await apiClient.put(`/coordinator/partners/${id}/publish`);
      toast({ title: "Partner Published", description: "This partner is now visible on the landing page." });
      fetchRequests();
    } catch (e) {
      toast({ title: "Error", description: "Publishing failed.", variant: "destructive" });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Reject and delete this partnership request?")) {
      try {
        await apiClient.delete(`/coordinator/partners/${id}`);
        toast({ title: "Request Deleted", description: "Partnership request removed." });
        fetchRequests();
      } catch (e) {
        toast({ title: "Error", description: "Deletion failed.", variant: "destructive" });
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3 tracking-tight">
            <Building2 className="h-6 w-6 text-udsm-blue" />
            Partnership Queue
          </h2>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Review new institutional collaboration requests</p>
        </div>
      </div>

      {isLoading ? (
        <div className="py-20 text-center uppercase font-black text-gray-300 tracking-widest text-xs animate-pulse">Loading Partners...</div>
      ) : requests.length === 0 ? (
        <div className="bg-white p-20 rounded-[3rem] text-center border-2 border-dashed border-gray-100">
           <ShieldCheck className="h-16 w-16 text-gray-200 mx-auto mb-6" />
           <h4 className="text-gray-400 font-black uppercase tracking-widest text-sm">No pending requests</h4>
        </div>
      ) : (
        <div className="grid gap-6">
          <AnimatePresence>
            {requests.map((req) => (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-50 flex flex-col md:flex-row justify-between gap-8 group hover:shadow-2xl transition-all"
              >
                <div className="space-y-6 flex-grow">
                  <div className="flex items-start gap-6">
                    <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-inner flex-shrink-0 border border-gray-100 overflow-hidden">
                      {req.logoUrl ? (
                        <img src={req.logoUrl} className="w-full h-full object-contain p-2" alt="Logo" />
                      ) : (
                        <Building2 className="h-8 w-8 text-udsm-blue" />
                      )}
                    </div>
                    <div>
                      <span className="bg-udsm-gold/10 text-udsm-gold px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-2 inline-block">{req.partnerType}</span>
                      <h3 className="text-2xl font-black text-gray-900 leading-tight">{req.institutionName}</h3>
                      <div className="flex flex-wrap items-center gap-4 mt-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                         <span className="flex items-center gap-1.5"><User className="h-3 w-3 text-udsm-blue" /> {req.contactPerson}</span>
                         <span className="flex items-center gap-1.5"><Globe className="h-3 w-3 text-forest-green" /> {req.country}</span>
                         <span className="flex items-center gap-1.5"><Clock className="h-3 w-3 text-orange-400" /> {new Date(req.submittedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Collaboration Goal</p>
                     <p className="text-sm text-gray-700 font-medium leading-relaxed italic">"{req.collaborationGoal}"</p>
                  </div>

                  <div className="flex flex-wrap gap-6 pt-2">
                     <a href={`mailto:${req.email}`} className="flex items-center gap-2 text-[10px] font-black text-udsm-blue uppercase tracking-widest hover:underline">
                        <Mail className="h-4 w-4" /> {req.email}
                     </a>
                     <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                        <Phone className="h-4 w-4" /> {req.phone}
                     </div>
                  </div>
                </div>

                <div className="flex md:flex-col gap-3 justify-center">
                  <Button
                    onClick={() => handleApprove(req.id)}
                    className="bg-green-500 hover:bg-green-600 text-white rounded-xl h-14 w-14 p-0 shadow-lg shadow-green-100 transition-all"
                    title="Approve Only"
                  >
                    <CheckCircle className="h-6 w-6" />
                  </Button>
                  <Button
                    onClick={() => handlePublish(req.id)}
                    className="bg-udsm-blue hover:bg-blue-700 text-white rounded-xl h-14 w-14 p-0 shadow-lg shadow-blue-100 transition-all"
                    title="Approve & Publish to Landing Page"
                  >
                    <Share2 className="h-6 w-6" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(req.id)}
                    variant="outline"
                    className="border-red-100 text-red-500 hover:bg-red-50 rounded-xl h-14 w-14 p-0 transition-all"
                    title="Reject & Delete"
                  >
                    <Trash2 className="h-6 w-6" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default PartnerReview;
