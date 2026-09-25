import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3, Users, MessageSquare, TrendingUp, Lightbulb,
  AlertTriangle, ShieldCheck, X, ChevronRight, Layout, CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import apiClient from '@/core/apiClient';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

const HcdAdminDashboard = () => {
  const [stats, setStats] = useState({ totalFeedback: 0, openIssues: 0, resolvedIssues: 0 });
  const [insights, setInsights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStat, setSelectedStat] = useState(null);

  useEffect(() => {
    fetchHcdData();
  }, []);

  const fetchHcdData = async () => {
    setIsLoading(true);
    try {
      const [statsRes, insightsRes] = await Promise.all([
        apiClient.get('/hcd/admin/stats'),
        apiClient.get('/hcd/admin/insights')
      ]);
      setStats(statsRes.data);
      setInsights(insightsRes.data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const generateInsights = async () => {
    try {
      await apiClient.post('/hcd/admin/insights/generate');
      toast({ title: "Insights Generated", description: "HCD system has analyzed new patterns." });
      fetchHcdData();
    } catch (e) {
      toast({ title: "Error", description: "Failed to run analysis." });
    }
  };

  const statDetails = {
    'Total Feedback': {
      title: 'Feedback Analysis',
      items: [
        { label: 'Usability Issues', val: '45%', color: 'text-udsm-blue' },
        { label: 'Feature Requests', val: '30%', color: 'text-udsm-gold' },
        { label: 'General Praise', val: '25%', color: 'text-green-500' },
      ],
      description: 'Breakdown of user sentiments collected from the feedback widget over the last 30 days.'
    },
    'Open Issues': {
      title: 'Active Friction Points',
      items: [
        { label: 'Critical Bugs', val: stats.openIssues, color: 'text-red-500' },
        { label: 'UI Inconsistencies', val: '5', color: 'text-orange-500' },
        { label: 'Latency Reports', val: '2', color: 'text-yellow-600' },
      ],
      description: 'Prioritized technical and design issues currently affecting the user experience.'
    },
    'Resolved': {
      title: 'HCD Fix Log',
      items: [
        { label: 'Patches Deployed', val: '12', color: 'text-green-600' },
        { label: 'UI Polish Tasks', val: '8', color: 'text-udsm-blue' },
        { label: 'UX Simplification', val: '4', color: 'text-purple-500' },
      ],
      description: 'Recently completed optimizations based on human-centered design principles.'
    },
    'Avg Satisfaction': {
      title: 'Experience Metrics',
      items: [
        { label: 'NPS Score', val: '72', color: 'text-udsm-blue' },
        { label: 'Retention Rate', val: '88%', color: 'text-udsm-gold' },
        { label: 'Success Rate', val: '94%', color: 'text-green-500' },
      ],
      description: 'Key performance indicators reflecting the emotional and functional success of lab members.'
    }
  };

  return (
    <div className="space-y-10 relative z-10">
      {/* Hero Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Feedback', val: stats.totalFeedback, icon: MessageSquare, color: 'text-udsm-blue', bg: 'bg-blue-50' },
          { label: 'Open Issues', val: stats.openIssues, icon: AlertTriangle, color: 'text-udsm-gold', bg: 'bg-yellow-50' },
          { label: 'Resolved', val: stats.resolvedIssues, icon: ShieldCheck, color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'Avg Satisfaction', val: '4.2/5', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50' },
        ].map((s, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => setSelectedStat(s.label)}
            className={cn(
              "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-8 rounded-[2.5rem] shadow-xl border cursor-pointer transition-all group",
              selectedStat === s.label ? "border-udsm-blue ring-4 ring-udsm-blue/10 scale-105 shadow-2xl" : "border-gray-50 dark:border-gray-800 hover:shadow-2xl hover:translate-y-[-4px]"
            )}
          >
            <div className={cn("w-14 h-14 rounded-[1.2rem] flex items-center justify-center mb-6 shadow-inner transition-transform group-hover:rotate-12", s.bg, s.color)}>
               <s.icon className="h-7 w-7" />
            </div>
            <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">{s.label}</p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-4xl font-black text-gray-900 dark:text-white mt-1 tracking-tight">{s.val}</p>
              <ChevronRight className={cn("h-5 w-5 text-gray-300 transition-all", selectedStat === s.label ? "rotate-90 text-udsm-blue" : "group-hover:translate-x-1")} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expanded Detail Section */}
      <AnimatePresence mode="wait">
        {selectedStat && (
          <motion.div
            key={selectedStat}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white dark:bg-gray-900/80 backdrop-blur-xl p-10 rounded-[3rem] border border-udsm-blue/10 shadow-2xl relative mb-12">
               <button
                 onClick={() => setSelectedStat(null)}
                 className="absolute top-8 right-8 p-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-400 hover:text-udsm-blue transition-all"
               >
                 <X className="h-5 w-5" />
               </button>

               <div className="grid md:grid-cols-3 gap-12">
                  <div className="md:col-span-1 border-r border-gray-100 dark:border-gray-800 pr-12">
                     <h3 className="text-[10px] font-black text-udsm-blue uppercase tracking-[0.3em] mb-4">Deep Dive Insight</h3>
                     <h2 className="text-3xl font-black text-gray-900 dark:text-white leading-tight">{statDetails[selectedStat].title}</h2>
                     <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 font-bold leading-relaxed">{statDetails[selectedStat].description}</p>
                     <Button className="mt-8 bg-udsm-blue rounded-xl font-black uppercase tracking-widest text-[10px] h-12 px-8 shadow-lg shadow-blue-100 dark:shadow-none">Generate Full Report</Button>
                  </div>

                  <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
                     {statDetails[selectedStat].items.map((item, i) => (
                       <div key={i} className="bg-slate-50 dark:bg-gray-800/50 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 hover:border-udsm-blue/20 transition-all group">
                          <div className={cn("w-2 h-8 rounded-full mb-6 group-hover:scale-x-150 transition-transform", item.color.replace('text-', 'bg-'))} />
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{item.label}</p>
                          <p className={cn("text-3xl font-black mt-2", item.color)}>{item.val}</p>
                          <div className="mt-6 flex items-center gap-2 text-[8px] font-black text-green-500 uppercase tracking-tighter">
                             <TrendingUp className="h-3 w-3" /> +12% vs last month
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full space-y-8">
        {/* Insights Section */}
        <div className="w-full space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3 tracking-tight">
                <Lightbulb className="h-6 w-6 text-udsm-gold" />
                Innovation Lab Insights
              </h3>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Human-Centered Design Analysis</p>
            </div>
            <Button onClick={generateInsights} variant="outline" className="gap-2 rounded-2xl border-2 h-14 px-6 font-black uppercase tracking-widest text-xs hover:bg-white shadow-sm transition-all hover:shadow-md active:scale-95">
              <TrendingUp className="h-4 w-4 text-udsm-gold" />
              Analyze Patterns
            </Button>
          </div>

          {insights.length === 0 ? (
            <div className="bg-white/80 dark:bg-gray-900/50 backdrop-blur-md p-20 rounded-[3.5rem] text-center border-2 border-dashed border-gray-100 dark:border-gray-800 shadow-sm">
               <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
                 <Lightbulb className="h-10 w-10 text-gray-200" />
               </div>
               <h4 className="text-gray-400 font-black uppercase tracking-widest text-sm">No new patterns detected</h4>
               <p className="text-gray-400 font-bold text-xs mt-2 italic">Run a fresh analysis to identify usability friction points.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {insights.map((insight, idx) => (
                <motion.div
                  key={idx}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-xl border border-gray-50 dark:border-gray-800 flex gap-8 group hover:shadow-2xl transition-all"
                >
                  <div className="w-20 h-20 bg-udsm-gold/10 rounded-[1.8rem] flex items-center justify-center flex-shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                    <TrendingUp className="h-10 w-10 text-udsm-gold" />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 dark:text-white text-xl tracking-tight leading-tight">{insight.pattern}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-3 font-bold leading-relaxed italic">"{insight.aiSummary || 'Automated pattern detection has identified a recurring usability friction point.'}"</p>
                    <div className="flex flex-wrap gap-4 mt-6">
                      <span className="bg-udsm-blue/10 text-udsm-blue px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm">Module: {insight.affectedModule}</span>
                      <span className="bg-udsm-gold/10 text-udsm-gold px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm">Impact Score: {insight.frequency * 10}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HcdAdminDashboard;
