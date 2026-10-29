import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Globe, ExternalLink, Terminal, Plus, RefreshCw, CheckCircle2, Clock, AlertTriangle, ShieldCheck, Database, GitBranch, Key } from 'lucide-react';
import apiClient from '@/core/apiClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const ProjectHostingRequest = ({ user }) => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDemandForm, setShowDemandForm] = useState(false);

  const [form, setForm] = useState({
    projectName: '',
    gitRepositoryUrl: '',
    techStack: 'Node.js / React',
    requestedSubdomain: '',
    databaseNeeded: 'PostgreSQL',
    environmentVariables: '',
    deploymentNotes: ''
  });

  const fetchMyRequests = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get(`/hosting/my-requests/${user?.id || 4}`);
      setRequests(res.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRequests();
  }, []);

  const handleSubmitDemand = async (e) => {
    e.preventDefault();
    try {
      const cleanSub = form.requestedSubdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');
      await apiClient.post('/hosting/request', {
        userId: user?.id || 4,
        studentName: user?.name || "Baraka Mwangi",
        studentEmail: user?.email || "member@y4c.com",
        ...form,
        requestedSubdomain: cleanSub
      });

      toast({
        title: "Hosting Demand Submitted! 🚀",
        description: "Your server deployment request has been routed to the Innovation Coordinator for approval."
      });

      setShowDemandForm(false);
      setForm({
        projectName: '',
        gitRepositoryUrl: '',
        techStack: 'Node.js / React',
        requestedSubdomain: '',
        databaseNeeded: 'PostgreSQL',
        environmentVariables: '',
        deploymentNotes: ''
      });
      fetchMyRequests();
    } catch (err) {
      toast({ title: "Submission Failed", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-8 relative z-10 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-4 tracking-tight">
            <div className="p-3 bg-udsm-blue rounded-2xl shadow-xl shadow-blue-100 dark:shadow-none text-white">
              <Server className="h-8 w-8" />
            </div>
            Real Server & Cloud Project Hosting
          </h2>
          <p className="text-gray-500 font-bold mt-2 uppercase text-[10px] tracking-widest ml-16">
            Deploy your student prototype to UDSM Y4C Cloud Data Center infrastructure
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setShowDemandForm(true)} className="gap-2 h-14 rounded-2xl bg-forest-green text-white px-6 font-black uppercase tracking-widest text-xs">
            <Plus className="h-4 w-4" /> Demand Server Hosting
          </Button>
          <Button onClick={fetchMyRequests} variant="outline" className="gap-2 h-14 rounded-2xl border-2 px-6">
            <RefreshCw className={cn("h-4 w-4 text-udsm-blue", isLoading && "animate-spin")} />
            <span className="font-black uppercase tracking-widest text-xs">Refresh</span>
          </Button>
        </div>
      </div>

      {/* Information Banner */}
      <div className="p-6 bg-gradient-to-r from-udsm-blue/10 via-forest-green/10 to-udsm-gold/10 rounded-3xl border border-udsm-blue/20 flex items-center gap-4">
        <ShieldCheck className="h-8 w-8 text-udsm-blue flex-shrink-0" />
        <div className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
          <strong>Coordinator-Governed Cloud Hosting:</strong> All real server allocations (subdomains, ports, Docker containers, and SSH deployment keys) must be approved and provisioned by the <strong>Innovation Coordinator</strong> to ensure campus network security and bandwidth fair-use.
        </div>
      </div>

      {/* Demand Hosting Form Modal */}
      <AnimatePresence>
        {showDemandForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl space-y-6"
          >
            <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-black text-gray-900 dark:text-white">Demand Real Server Project Hosting</h3>
              <span className="text-[10px] font-black uppercase tracking-widest text-udsm-gold">Step 1: Student Request</span>
            </div>

            <form onSubmit={handleSubmitDemand} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Project / Startup Name</label>
                <Input required value={form.projectName} onChange={e => setForm({...form, projectName: e.target.value})} placeholder="e.g. Lishe App IoT Telemetry" className="h-12 rounded-xl bg-gray-50 dark:bg-gray-800 font-bold" />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Git Repository URL</label>
                <Input required value={form.gitRepositoryUrl} onChange={e => setForm({...form, gitRepositoryUrl: e.target.value})} placeholder="https://github.com/my-org/project" className="h-12 rounded-xl bg-gray-50 dark:bg-gray-800 font-bold" />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Primary Tech Stack</label>
                <select value={form.techStack} onChange={e => setForm({...form, techStack: e.target.value})} className="w-full h-12 rounded-xl bg-gray-50 dark:bg-gray-800 border px-4 font-bold text-xs">
                  <option value="Node.js / React">Node.js + React (Vite / Express)</option>
                  <option value="Spring Boot (Java 21)">Spring Boot (Java 21 / Maven)</option>
                  <option value="Python / FastAPI / Django">Python (FastAPI / Django)</option>
                  <option value="Docker Container (Dockerfile)">Docker Container (Multi-service)</option>
                  <option value="PHP / Laravel">PHP / Laravel</option>
                  <option value="Flutter Web">Flutter Web Client</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Desired Subdomain</label>
                <div className="flex items-center">
                  <Input required value={form.requestedSubdomain} onChange={e => setForm({...form, requestedSubdomain: e.target.value})} placeholder="e.g. lishe" className="h-12 rounded-l-xl bg-gray-50 dark:bg-gray-800 font-bold" />
                  <span className="h-12 px-3 bg-gray-100 dark:bg-gray-800 border border-l-0 rounded-r-xl flex items-center text-[10px] font-mono text-gray-500 font-bold">
                    .y4chub.udsm.ac.tz
                  </span>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Database Required</label>
                <select value={form.databaseNeeded} onChange={e => setForm({...form, databaseNeeded: e.target.value})} className="w-full h-12 rounded-xl bg-gray-50 dark:bg-gray-800 border px-4 font-bold text-xs">
                  <option value="PostgreSQL">PostgreSQL 16</option>
                  <option value="MySQL">MySQL 8.0</option>
                  <option value="MongoDB">MongoDB 7</option>
                  <option value="None">None (Static / SQLite / External DB)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Environment Variables (KEY=VALUE)</label>
                <Input value={form.environmentVariables} onChange={e => setForm({...form, environmentVariables: e.target.value})} placeholder="PORT=8080, NODE_ENV=production" className="h-12 rounded-xl bg-gray-50 dark:bg-gray-800 font-bold font-mono text-xs" />
              </div>

              <div className="md:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Deployment Notes / Special Requirements</label>
                <Textarea value={form.deploymentNotes} onChange={e => setForm({...form, deploymentNotes: e.target.value})} placeholder="e.g. Need background worker thread, MQTT socket listener, or AI model weights mounted" rows={2} className="rounded-xl bg-gray-50 dark:bg-gray-800 font-bold p-4 text-xs" />
              </div>

              <div className="md:col-span-2 flex gap-3">
                <Button type="submit" className="h-12 rounded-xl bg-forest-green text-white font-black uppercase tracking-widest text-xs px-8">
                  Submit Demand to Coordinator
                </Button>
                <Button type="button" variant="ghost" onClick={() => setShowDemandForm(false)} className="h-12 rounded-xl font-black uppercase tracking-widest text-xs">
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Student's Hosting Demands & Active Deployments */}
      <div className="space-y-6">
        <h3 className="font-black text-xl text-gray-900 dark:text-white">My Server Deployments</h3>

        {requests.length === 0 ? (
          <div className="p-16 bg-white dark:bg-gray-900 rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-gray-800 text-center">
            <Server className="h-12 w-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
            <p className="text-xs font-black uppercase tracking-widest text-gray-400">No server hosting requests yet</p>
            <Button onClick={() => setShowDemandForm(true)} className="mt-4 h-10 rounded-xl bg-udsm-blue text-white font-black text-xs uppercase tracking-wider">
              Demand Your First Real Server
            </Button>
          </div>
        ) : (
          <div className="grid gap-6">
            {requests.map((req) => (
              <motion.div
                key={req.id}
                whileHover={{ y: -2 }}
                className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-md space-y-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="text-xl font-black text-gray-900 dark:text-white">{req.projectName}</h4>
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                        req.status === 'ACTIVE' ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300' :
                        req.status === 'REJECTED' ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' :
                        'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                      )}>
                        {req.status === 'PENDING_APPROVAL' ? 'Pending Coordinator Review' : req.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs font-bold text-gray-400 mt-2">
                      <span className="flex items-center gap-1.5"><GitBranch className="h-3.5 w-3.5 text-udsm-blue" /> {req.techStack}</span>
                      <span className="flex items-center gap-1.5"><Database className="h-3.5 w-3.5 text-forest-green" /> DB: {req.databaseNeeded}</span>
                      <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-udsm-gold" /> Requested: {new Date(req.requestedAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {req.status === 'ACTIVE' && req.liveUrl && (
                    <Button asChild className="h-12 rounded-xl bg-forest-green text-white font-black uppercase tracking-widest text-xs gap-2 shadow-lg shadow-green-500/20">
                      <a href={req.liveUrl} target="_blank" rel="noreferrer">
                        <Globe className="h-4 w-4" /> Open Live Project <ExternalLink className="h-3.5 w-3.5 ml-1" />
                      </a>
                    </Button>
                  )}
                </div>

                {/* Provisioned Server Access Panel */}
                {req.status === 'ACTIVE' ? (
                  <div className="p-6 bg-slate-950 rounded-2xl border border-white/10 text-white space-y-4 font-mono text-xs">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <span className="text-[10px] uppercase font-bold text-udsm-gold flex items-center gap-2">
                        <Terminal className="h-4 w-4" /> Production Server Access Granted
                      </span>
                      <span className="text-[10px] text-gray-400">Host IP: {req.serverIp} : Port {req.allocatedPort}</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-gray-400">Live Domain URL</p>
                        <p className="text-sm font-bold text-forest-green mt-0.5">{req.liveUrl}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-gray-400">SSH / Webhook Deployment Key</p>
                        <p className="text-xs text-gray-300 bg-white/5 p-2 rounded-lg mt-0.5 break-all">{req.accessCredentials}</p>
                      </div>
                    </div>

                    {req.coordinatorRemarks && (
                      <div className="pt-2 text-xs font-sans text-gray-400 italic">
                        Coordinator Note: "{req.coordinatorRemarks}"
                      </div>
                    )}
                  </div>
                ) : req.status === 'PENDING_APPROVAL' ? (
                  <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-200 flex items-center gap-3 font-medium">
                    <Clock className="h-5 w-5 text-amber-600 flex-shrink-0" />
                    <span>Your demand is in the <strong>Coordinator's review queue</strong>. Once the coordinator approves the resource allocation, your server IP, port, and live URL will appear here automatically.</span>
                  </div>
                ) : (
                  <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-2xl border border-red-200 dark:border-red-900 text-xs text-red-800 dark:text-red-200">
                    Coordinator Feedback: {req.coordinatorRemarks || "Demand rejected. Please revise requirements and re-apply."}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectHostingRequest;
