import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, MessageSquare, TrendingUp, Lightbulb, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import apiClient from '@/core/apiClient';
import { toast } from '@/components/ui/use-toast';

const HcdAdminDashboard = () => {
  const [stats, setStats] = useState({ totalFeedback: 0, openIssues: 0, resolvedIssues: 0 });
  const [insights, setInsights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="space-y-10 relative z-10">
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
            className="bg-white/90 backdrop-blur-sm p-8 rounded-[2.5rem] shadow-xl border border-gray-50 group hover:shadow-2xl transition-all"
          >
            <div className={`w-14 h-14 ${s.bg} rounded-[1.2rem] flex items-center justify-center ${s.color} mb-6 shadow-inner group-hover:rotate-12 transition-transform`}>
               <s.icon className="h-7 w-7" />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{s.label}</p>
            <p className="text-4xl font-black text-gray-900 mt-2 tracking-tight">{s.val}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Insights Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3 tracking-tight">
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
            <div className="bg-white/80 backdrop-blur-md p-20 rounded-[3.5rem] text-center border-2 border-dashed border-gray-100 shadow-sm">
               <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
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
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-50 flex gap-8 group hover:shadow-2xl transition-all"
                >
                  <div className="w-20 h-20 bg-udsm-gold/10 rounded-[1.8rem] flex items-center justify-center flex-shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                    <TrendingUp className="h-10 w-10 text-udsm-gold" />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 text-xl tracking-tight leading-tight">{insight.pattern}</h4>
                    <p className="text-gray-600 text-sm mt-3 font-bold leading-relaxed italic">"{insight.aiSummary || 'Automated pattern detection has identified a recurring usability friction point.'}"</p>
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

        {/* Action History */}
        <div className="bg-white/90 backdrop-blur-md p-10 rounded-[3.5rem] shadow-2xl border border-gray-50 h-fit sticky top-24">
           <h3 className="text-xl font-black text-gray-900 mb-10 flex items-center gap-3">
             <div className="w-2 h-8 bg-udsm-blue rounded-full" />
             Strategic Log
           </h3>
           <div className="space-y-10">
              {[
                { t: 'Prioritized Bug #104', d: 'High impact on student registration', c: 'bg-udsm-blue' },
                { t: 'User Research Updated', d: 'Added Graduate Persona', c: 'bg-udsm-gold' },
                { t: 'Resolved UI Friction', d: 'Program detail page layout', c: 'bg-green-500' },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                   <div className="flex flex-col items-center">
                     <div className={`w-4 h-4 rounded-full ${item.c} shadow-[0_0_10px_rgba(0,0,0,0.1)] group-hover:scale-125 transition-transform`} />
                     {i < 2 && <div className="w-0.5 h-16 bg-gray-100 mt-2" />}
                   </div>
                   <div className="-mt-1">
                     <p className="font-black text-gray-900 tracking-tight">{item.t}</p>
                     <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1.5 leading-relaxed">{item.d}</p>
                   </div>
                </div>
              ))}
           </div>
           <div className="mt-12 pt-8 border-t border-gray-50">
             <Button variant="ghost" className="w-full font-black text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-udsm-blue transition-colors">View Full History</Button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default HcdAdminDashboard;
