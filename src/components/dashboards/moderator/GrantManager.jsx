import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Plus, RefreshCw, CheckCircle, FileText, ArrowUpRight } from 'lucide-react';
import apiClient from '@/core/apiClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const GrantManager = () => {
  const [grants, setGrants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  const [newGrant, setNewGrant] = useState({
    projectTitle: '',
    category: 'Prototyping Grant',
    amountTsh: '',
    purpose: '',
    status: 'APPROVED'
  });

  const fetchGrants = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get('/grants');
      setGrants(res.data || []);
    } catch (e) {
      toast({ title: "Fetch Failed", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGrants();
  }, []);

  const handleAllocate = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/grants', {
        ...newGrant,
        amountTsh: newGrant.amountTsh.includes('TZS') ? newGrant.amountTsh : `${newGrant.amountTsh} TZS`
      });
      toast({ title: "Grant Allocated! 💰", description: "Disbursement record created." });
      setShowAddForm(false);
      setNewGrant({ projectTitle: '', category: 'Prototyping Grant', amountTsh: '', purpose: '', status: 'APPROVED' });
      fetchGrants();
    } catch (e) {
      toast({ title: "Failed to allocate", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-8 relative z-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-4 tracking-tight">
            <div className="p-3 bg-forest-green rounded-2xl shadow-xl shadow-green-100 dark:shadow-none text-white">
              <Coins className="h-8 w-8" />
            </div>
            Grants & Seed Funding Tracker
          </h2>
          <p className="text-gray-500 font-bold mt-2 uppercase text-[10px] tracking-widest ml-16">
            Prototyping mini-grants, competition awards & student venture stipends
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setShowAddForm(true)} className="gap-2 h-14 rounded-2xl bg-forest-green text-white px-6 font-black uppercase tracking-widest text-xs">
            <Plus className="h-4 w-4" /> Allocate Grant
          </Button>
          <Button onClick={fetchGrants} variant="outline" className="gap-2 h-14 rounded-2xl border-2 px-6">
            <RefreshCw className={cn("h-4 w-4 text-udsm-blue", isLoading && "animate-spin")} />
            <span className="font-black uppercase tracking-widest text-xs">Refresh</span>
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl"
          >
            <h3 className="text-xl font-black mb-6 text-gray-900 dark:text-white">Allocate Innovation Seed Funding</h3>
            <form onSubmit={handleAllocate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Startup Project</label>
                <Input required value={newGrant.projectTitle} onChange={e => setNewGrant({...newGrant, projectTitle: e.target.value})} placeholder="e.g. Lishe App" className="h-12 rounded-xl bg-gray-50 dark:bg-gray-800 font-bold" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Funding Category</label>
                <select value={newGrant.category} onChange={e => setNewGrant({...newGrant, category: e.target.value})} className="w-full h-12 rounded-xl bg-gray-50 dark:bg-gray-800 border px-4 font-bold text-xs">
                  <option value="Prototyping Grant">Prototyping Grant (Hardware/Cloud)</option>
                  <option value="Seed Exploration Grant">Seed Exploration Grant</option>
                  <option value="Competition Prize Award">Competition Prize Award</option>
                  <option value="Patent & IP Filing Grant">Patent & IP Filing Grant</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Amount in TZS</label>
                <Input required value={newGrant.amountTsh} onChange={e => setNewGrant({...newGrant, amountTsh: e.target.value})} placeholder="e.g. 2,000,000" className="h-12 rounded-xl bg-gray-50 dark:bg-gray-800 font-bold" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Disbursement Purpose</label>
                <Input required value={newGrant.purpose} onChange={e => setNewGrant({...newGrant, purpose: e.target.value})} placeholder="e.g. Procurement of LoRaWAN gateways" className="h-12 rounded-xl bg-gray-50 dark:bg-gray-800 font-bold" />
              </div>
              <div className="md:col-span-2 flex gap-3">
                <Button type="submit" className="h-12 rounded-xl bg-forest-green text-white font-black uppercase tracking-widest text-xs px-8">Confirm Allocation</Button>
                <Button type="button" variant="ghost" onClick={() => setShowAddForm(false)} className="h-12 rounded-xl font-black uppercase tracking-widest text-xs">Cancel</Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grants Table */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-md">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-400 uppercase tracking-widest text-[9px] font-black">
            <tr>
              <th className="p-5">Project Title</th>
              <th className="p-5">Category</th>
              <th className="p-5">Amount (TZS)</th>
              <th className="p-5">Purpose</th>
              <th className="p-5">Status</th>
              <th className="p-5">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-medium">
            {grants.map((g) => (
              <tr key={g.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50">
                <td className="p-5 font-bold text-gray-900 dark:text-white">{g.projectTitle}</td>
                <td className="p-5 text-udsm-gold font-bold">{g.category}</td>
                <td className="p-5 font-mono font-black text-forest-green text-sm">{g.amountTsh}</td>
                <td className="p-5 text-gray-500">{g.purpose}</td>
                <td className="p-5">
                  <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300">
                    {g.status}
                  </span>
                </td>
                <td className="p-5 text-gray-400 font-bold">{g.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GrantManager;
