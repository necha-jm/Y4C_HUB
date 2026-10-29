import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, CheckCircle2, XCircle, Globe, Terminal, RefreshCw, Key, ShieldCheck, Database, GitBranch, ExternalLink, X } from 'lucide-react';
import apiClient from '@/core/apiClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const HostingApprovalManager = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReq, setSelectedReq] = useState(null);

  const [provisionForm, setProvisionForm] = useState({
    liveUrl: '',
    serverIp: '196.216.240.42',
    allocatedPort: 8085,
    accessCredentials: '',
    coordinatorRemarks: 'Server container provisioned on UDSM Innovation Lab cluster. HTTPS certificate active.'
  });

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get('/hosting/requests');
      setRequests(res.data || []);
    } catch (e) {
      toast({ title: "Fetch Failed", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleOpenProvisionModal = (req) => {
    const sub = req.requestedSubdomain ? req.requestedSubdomain.toLowerCase() : 'app-' + req.id;
    const port = 8000 + (req.id * 7) % 500;
    setSelectedReq(req);
    setProvisionForm({
      liveUrl: `https://${sub}.y4chub.udsm.ac.tz`,
      serverIp: '196.216.240.42',
      allocatedPort: port,
      accessCredentials: `ssh y4c_deploy@196.216.240.42 -p ${port + 100}`,
      coordinatorRemarks: 'Server container provisioned on UDSM Innovation Lab cluster. HTTPS certificate active.'
    });
  };

  const handleApprove = async (e) => {
    e.preventDefault();
    if (!selectedReq) return;

    try {
      await apiClient.put(`/hosting/requests/${selectedReq.id}/approve`, provisionForm);
      toast({
        title: "Server Access Granted! 🌐",
        description: `Project ${selectedReq.projectName} is now LIVE on real server ${provisionForm.liveUrl}.`
      });
      setSelectedReq(null);
      fetchRequests();
    } catch (err) {
      toast({ title: "Approval Failed", variant: "destructive" });
    }
  };

  const handleReject = async (id) => {
    const reason = window.prompt("Reason for rejecting hosting demand:", "Please configure SSL environment variables first.");
    if (!reason) return;

    try {
      await apiClient.put(`/hosting/requests/${id}/reject`, { coordinatorRemarks: reason });
      toast({ title: "Demand Rejected", description: "Feedback sent to student." });
      fetchRequests();
    } catch (err) {
      toast({ title: "Rejection failed", variant: "destructive" });
    }
  };

  const pending = requests.filter(r => r.status === 'PENDING_APPROVAL');
  const active = requests.filter(r => r.status === 'ACTIVE');

  return (
    <div className="space-y-8 relative z-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-4 tracking-tight">
            <div className="p-3 bg-udsm-blue rounded-2xl shadow-xl shadow-blue-100 dark:shadow-none text-white">
              <Server className="h-8 w-8" />
            </div>
            Server Hosting Approval & Cloud Governance
          </h2>
          <p className="text-gray-500 font-bold mt-2 uppercase text-[10px] tracking-widest ml-16">
            Coordinator Authority: Review student demands, provision cloud containers & grant live server access
          </p>
        </div>
        <Button onClick={fetchRequests} variant="outline" className="gap-2 h-14 rounded-2xl border-2 px-6">
          <RefreshCw className={cn("h-4 w-4 text-udsm-blue", isLoading && "animate-spin")} />
          <span className="font-black uppercase tracking-widest text-xs">Refresh Demands</span>
        </Button>
      </div>

      {/* Metrics Header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-udsm-gold">Pending Coordinator Review</p>
          <p className="text-3xl font-black text-gray-900 dark:text-white mt-1">{pending.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-forest-green">Active Deployed Servers</p>
          <p className="text-3xl font-black text-forest-green mt-1">{active.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-udsm-blue">Cluster Infrastructure</p>
          <p className="text-lg font-black text-udsm-blue mt-1">UDSM CoICT DataCenter</p>
        </div>
      </div>

      {/* Pending Hosting Demands Queue */}
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-udsm-gold">Coordinator Authority</span>
            <h3 className="font-black text-xl text-gray-900 dark:text-white mt-0.5">Pending Student Hosting Demands</h3>
          </div>
          <span className="px-3.5 py-1.5 bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 rounded-full text-xs font-black">
            {pending.length} Demands Awaiting Decision
          </span>
        </div>

        {pending.length === 0 ? (
          <div className="py-8 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">
            All student hosting demands have been resolved.
          </div>
        ) : (
          <div className="grid gap-6">
            {pending.map((req) => (
              <div key={req.id} className="p-6 bg-gray-50 dark:bg-gray-800/40 rounded-3xl border border-gray-100 dark:border-gray-700 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-black text-gray-900 dark:text-white">{req.projectName}</h4>
                    <p className="text-xs text-gray-500 font-medium">Student: <strong>{req.studentName}</strong> ({req.studentEmail})</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleOpenProvisionModal(req)}
                      className="h-11 rounded-xl bg-forest-green hover:bg-forest-green/90 text-white font-black text-xs uppercase tracking-wider gap-2 px-5"
                    >
                      <ShieldCheck className="h-4 w-4" /> Review & Provision Access
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => handleReject(req.id)}
                      className="h-11 rounded-xl text-red-500 hover:bg-red-50 font-black text-xs uppercase tracking-wider"
                    >
                      Reject
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold text-gray-600 dark:text-gray-300 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-gray-400">Tech Stack</p>
                    <p className="text-udsm-blue mt-0.5">{req.techStack}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-gray-400">Subdomain Demand</p>
                    <p className="text-forest-green font-mono mt-0.5">{req.requestedSubdomain}.y4chub.udsm.ac.tz</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-gray-400">Database</p>
                    <p className="text-udsm-gold mt-0.5">{req.databaseNeeded}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-gray-400">Git Repository</p>
                    <a href={req.gitRepositoryUrl} target="_blank" rel="noreferrer" className="text-udsm-blue underline flex items-center gap-1 mt-0.5">
                      View Source <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                {req.deploymentNotes && (
                  <p className="text-xs text-gray-500 italic">
                    Student Deployment Note: "{req.deploymentNotes}"
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Provisioning Modal */}
      <AnimatePresence>
        {selectedReq && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] max-w-2xl w-full border border-gray-100 dark:border-gray-800 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <button onClick={() => setSelectedReq(null)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>

              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-forest-green">Coordinator Approval Suite</span>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-0.5">
                  Provision Real Server for {selectedReq.projectName}
                </h3>
                <p className="text-xs text-gray-500 font-medium">Applicant: {selectedReq.studentName} ({selectedReq.studentEmail})</p>
              </div>

              <form onSubmit={handleApprove} className="space-y-5">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Assigned Live Domain URL</label>
                  <Input required value={provisionForm.liveUrl} onChange={e => setProvisionForm({...provisionForm, liveUrl: e.target.value})} className="h-12 rounded-xl bg-gray-50 dark:bg-gray-800 font-bold font-mono text-xs text-forest-green" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Server Host IP</label>
                    <Input required value={provisionForm.serverIp} onChange={e => setProvisionForm({...provisionForm, serverIp: e.target.value})} className="h-12 rounded-xl bg-gray-50 dark:bg-gray-800 font-bold font-mono text-xs" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Allocated Port</label>
                    <Input type="number" required value={provisionForm.allocatedPort} onChange={e => setProvisionForm({...provisionForm, allocatedPort: parseInt(e.target.value)})} className="h-12 rounded-xl bg-gray-50 dark:bg-gray-800 font-bold font-mono text-xs" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">SSH / Deployment Key / Access Credential</label>
                  <Input required value={provisionForm.accessCredentials} onChange={e => setProvisionForm({...provisionForm, accessCredentials: e.target.value})} className="h-12 rounded-xl bg-gray-50 dark:bg-gray-800 font-bold font-mono text-xs text-udsm-blue" />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Coordinator Remarks & Guidelines</label>
                  <Textarea value={provisionForm.coordinatorRemarks} onChange={e => setProvisionForm({...provisionForm, coordinatorRemarks: e.target.value})} rows={2} className="rounded-xl bg-gray-50 dark:bg-gray-800 font-bold p-3 text-xs" />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button type="submit" className="h-12 rounded-xl bg-forest-green hover:bg-forest-green/90 text-white font-black uppercase tracking-widest text-xs flex-1 gap-2">
                    <CheckCircle2 className="h-4 w-4" /> Approve & Grant Live Access
                  </Button>
                  <Button type="button" variant="ghost" onClick={() => setSelectedReq(null)} className="h-12 rounded-xl font-black uppercase tracking-widest text-xs">
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Active Servers Directory */}
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
        <h3 className="font-black text-xl text-gray-900 dark:text-white">Active Hosted Projects Roster</h3>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {active.map((s) => (
            <div key={s.id} className="py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <p className="font-bold text-base text-gray-900 dark:text-white">{s.projectName}</p>
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-forest-green animate-pulse" /> LIVE
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-medium mt-1">Lead: {s.studentName} • Stack: {s.techStack}</p>
                <p className="text-xs font-mono text-udsm-blue mt-1">{s.liveUrl}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-gray-400 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-xl border">
                  IP: {s.serverIp}:{s.allocatedPort}
                </span>
                {s.liveUrl && (
                  <Button asChild size="sm" className="h-10 rounded-xl bg-forest-green text-white font-black text-xs uppercase tracking-wider gap-1.5">
                    <a href={s.liveUrl} target="_blank" rel="noreferrer">
                      <Globe className="h-3.5 w-3.5" /> Visit Site
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

export default HostingApprovalManager;
