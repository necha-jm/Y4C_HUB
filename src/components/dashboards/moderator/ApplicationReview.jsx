import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, CheckCircle2, XCircle, Calendar, RefreshCw, Search, Filter, Phone, Mail, Building, UserCheck } from 'lucide-react';
import apiClient from '@/core/apiClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const ApplicationReview = () => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterProgram, setFilterProgram] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get('/applications');
      setApplications(res.data || []);
    } catch (e) {
      toast({ title: "Sync Failed", description: "Could not fetch applications.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await apiClient.put(`/applications/${id}/status`, { status });
      toast({
        title: `Applicant ${status === 'ACCEPTED' ? 'Admitted! 🎉' : status}`,
        description: `Application status has been updated to ${status}.`
      });
      fetchApplications();
      setSelectedApp(null);
    } catch (e) {
      toast({ title: "Update Failed", description: "Could not update status.", variant: "destructive" });
    }
  };

  const filtered = applications.filter((app) => {
    const matchProg = filterProgram === 'ALL' || app.programId === filterProgram;
    const matchSearch =
      (app.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.organization || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchProg && matchSearch;
  });

  return (
    <div className="space-y-8 relative z-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-4 tracking-tight">
            <div className="p-3 bg-udsm-blue rounded-2xl shadow-xl shadow-blue-100 dark:shadow-none">
              <FileText className="h-8 w-8 text-white" />
            </div>
            Program & Cohort Applications
          </h2>
          <p className="text-gray-500 font-bold mt-2 uppercase text-[10px] tracking-widest ml-16">
            Reviewing intake admissions for Tech Bootcamps & Startup Incubation
          </p>
        </div>
        <Button onClick={fetchApplications} variant="outline" size="lg" className="gap-2 rounded-2xl border-2 h-14 px-6">
          <RefreshCw className={cn("h-4 w-4 text-udsm-blue", isLoading && "animate-spin")} />
          <span className="font-black uppercase tracking-widest text-xs">Refresh Queue</span>
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search candidate name or email..."
            className="pl-11 h-12 rounded-xl bg-gray-50 dark:bg-gray-800 border-none font-bold text-xs"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          {['ALL', 'tech-skills', 'startup-incubation', 'leadership'].map((p) => (
            <button
              key={p}
              onClick={() => setFilterProgram(p)}
              className={cn(
                "px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap",
                filterProgram === p
                  ? "bg-udsm-blue text-white shadow-md shadow-blue-500/20"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white"
              )}
            >
              {p === 'ALL' ? 'All Tracks' : p.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      {isLoading ? (
        <div className="py-20 text-center font-black uppercase tracking-widest text-xs text-gray-400 animate-pulse">
          Loading applicant records...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 p-16 rounded-[3rem] text-center border-2 border-dashed border-gray-200 dark:border-gray-800">
          <FileText className="h-16 w-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
          <h4 className="text-gray-400 font-black uppercase tracking-widest text-sm">No applications matching this filter</h4>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((app) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-lg transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-black text-lg text-gray-900 dark:text-white">{app.fullName}</span>
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                    app.status === 'ACCEPTED' ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300' :
                    app.status === 'INTERVIEW_SCHEDULED' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                    app.status === 'REJECTED' ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' :
                    'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                  )}>
                    {app.status || 'PENDING'}
                  </span>
                  <span className="text-xs font-bold text-udsm-gold uppercase tracking-wider px-2.5 py-0.5 bg-udsm-gold/10 rounded-lg">
                    {app.programId}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-gray-500 font-medium">
                  <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5 text-udsm-blue" /> {app.email}</span>
                  <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5 text-forest-green" /> {app.phone}</span>
                  <span className="flex items-center gap-1"><Building className="h-3.5 w-3.5 text-udsm-gold" /> {app.organization || 'Independent'}</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 italic pt-1">
                  "{app.motivation}"
                </p>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <Button
                  size="sm"
                  onClick={() => handleStatusUpdate(app.id, 'ACCEPTED')}
                  className="bg-forest-green hover:bg-forest-green/90 text-white font-black text-xs uppercase tracking-wider rounded-xl gap-1.5"
                >
                  <CheckCircle2 className="h-4 w-4" /> Admit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleStatusUpdate(app.id, 'INTERVIEW_SCHEDULED')}
                  className="border-amber-400 text-amber-600 hover:bg-amber-50 font-black text-xs uppercase tracking-wider rounded-xl gap-1.5"
                >
                  <Calendar className="h-4 w-4" /> Interview
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleStatusUpdate(app.id, 'REJECTED')}
                  className="text-red-500 hover:bg-red-50 font-black text-xs uppercase tracking-wider rounded-xl"
                >
                  Reject
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationReview;
