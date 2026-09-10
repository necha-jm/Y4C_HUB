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
    <div className="space-y-8 p-4">
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Feedback', val: stats.totalFeedback, icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Open Issues', val: stats.openIssues, icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: 'Resolved', val: stats.resolvedIssues, icon: ShieldCheck, color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'Avg Satisfaction', val: '4.2/5', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50' },
        ].map((s, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-xl border border-gray-50 dark:border-gray-800"
          >
            <div className={`w-12 h-12 ${s.bg} rounded-2xl flex items-center justify-center ${s.color} mb-4`}>
               <s.icon className="h-6 w-6" />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{s.label}</p>
            <p className="text-3xl font-black text-gray-900 dark:text-white mt-1">{s.val}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Insights Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-yellow-500" />
              Human-Centered Insights
            </h3>
            <Button onClick={generateInsights} variant="outline" className="gap-2 border-yellow-200 text-yellow-600 hover:bg-yellow-50">
              <TrendingUp className="h-4 w-4" />
              Run Analysis
            </Button>
          </div>

          {insights.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 p-12 rounded-[2.5rem] text-center border-2 border-dashed border-gray-100 dark:border-gray-800">
               <p className="text-gray-400 font-bold">No insights detected yet. Run analysis to identify patterns.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {insights.map((insight, idx) => (
                <motion.div
                  key={idx}
                  layout
                  className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg border border-yellow-50 dark:border-yellow-900/20 flex gap-6"
                >
                  <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/40 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-8 w-8 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 dark:text-white text-lg">{insight.pattern}</h4>
                    <p className="text-gray-500 text-sm mt-2 leading-relaxed">{insight.aiSummary || 'Automated pattern detection has identified a recurring usability friction point in the specified module.'}</p>
                    <div className="flex gap-4 mt-4">
                      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">Module: {insight.affectedModule}</span>
                      <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">Frequency: {insight.frequency}x</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Action History */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-xl border border-gray-50 dark:border-gray-800">
           <h3 className="text-xl font-black mb-8 flex items-center gap-2">
             <BarChart3 className="h-6 w-6 text-blue-500" />
             Recent Actions
           </h3>
           <div className="space-y-6">
              {[
                { t: 'Prioritized Bug #104', d: 'High impact on student registration', c: 'bg-red-500' },
                { t: 'User Research Updated', d: 'Added Graduate Persona', c: 'bg-blue-500' },
                { t: 'Resolved UI Friction', d: 'Program detail page layout', c: 'bg-green-500' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                   <div className={`w-3 h-3 rounded-full ${item.c} mt-1.5`} />
                   <div>
                     <p className="font-bold text-sm text-gray-900 dark:text-white">{item.t}</p>
                     <p className="text-xs text-gray-500 mt-1">{item.d}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default HcdAdminDashboard;
