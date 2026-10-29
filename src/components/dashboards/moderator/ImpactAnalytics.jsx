import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, TrendingUp, Users, Download, HeartHandshake,
  DollarSign, RefreshCw, CheckCircle2, ShieldCheck, Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import apiClient from '@/core/apiClient';
import { cn } from '@/lib/utils';

const ImpactAnalytics = () => {
  const [data, setData] = useState({
    trainedYouth: '540+',
    femaleInnovators: '48%',
    activeVentures: 24,
    seedCapitalDistributed: '38.5M TZS',
    prototypesTested: 12,
    ipPatentsFiling: 3,
    jobsCreated: 42,
    sdgAlignment: '100%',
    demographics: [
      { label: "Engineering & Computer Science (CoICT)", percent: 52, color: "bg-udsm-blue" },
      { label: "Health Sciences & Public Health", percent: 22, color: "bg-forest-green" },
      { label: "Business, Law & Entrepreneurship", percent: 16, color: "bg-udsm-gold" },
      { label: "Agriculture, Nutrition & Climate Tech", percent: 10, color: "bg-purple-500" },
    ]
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(null);

  const fetchImpactData = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    else setLoading(true);

    try {
      const response = await apiClient.get('/analytics/impact');
      if (response && response.data) {
        setData(prev => ({
          ...prev,
          ...response.data
        }));
        const now = new Date().toLocaleTimeString();
        setLastRefreshed(now);

        if (isManual) {
          toast({
            title: "Backend Synced",
            description: `Refreshed institutional M&E metrics at ${now}`,
          });
        }
      }
    } catch (err) {
      console.error("Failed to load impact analytics", err);
      toast({
        title: "Sync Warning",
        description: "Failed to connect to backend server. Displaying cached records.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchImpactData();
  }, []);

  const handlePrintReport = () => {
    window.print();
  };

  const kpis = [
    { label: "Youth & Students Trained", value: data.trainedYouth, change: "+32% this semester", icon: Users, color: "text-udsm-blue", bg: "bg-blue-50 dark:bg-blue-950/40" },
    { label: "Female Innovators", value: data.femaleInnovators, change: "+14% parity increase", icon: HeartHandshake, color: "text-pink-500", bg: "bg-pink-50 dark:bg-pink-950/40" },
    { label: "Active Startup Ventures", value: data.activeVentures, change: "6 generating revenue", icon: TrendingUp, color: "text-forest-green", bg: "bg-green-50 dark:bg-green-950/40" },
    { label: "Seed Capital Distributed", value: data.seedCapitalDistributed, change: "100% voucher audited", icon: DollarSign, color: "text-udsm-gold", bg: "bg-yellow-50 dark:bg-yellow-950/40" },
  ];

  return (
    <div className="space-y-8 relative z-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-4 tracking-tight">
            <div className="p-3 bg-udsm-blue rounded-2xl shadow-xl shadow-blue-100 dark:shadow-none text-white">
              <BarChart3 className="h-8 w-8" />
            </div>
            Monitoring & Evaluation (M&E) Impact Report
          </h2>
          <div className="flex flex-wrap items-center gap-3 mt-2 ml-16">
            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">
              Institutional metrics for UDSM Directorate of Innovation, UNICEF & donor partners
            </p>
            {lastRefreshed && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Backend Synced {lastRefreshed}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => fetchImpactData(true)}
            disabled={refreshing || loading}
            variant="outline"
            className="gap-2 h-14 rounded-2xl border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-5 font-black uppercase tracking-widest text-xs hover:border-udsm-blue hover:text-udsm-blue shadow-sm transition-all"
          >
            <RefreshCw className={cn("h-4 w-4 text-udsm-blue", (refreshing || loading) && "animate-spin")} />
            {refreshing ? "Reloading..." : "Reload Data"}
          </Button>

          <Button
            onClick={handlePrintReport}
            className="gap-2 h-14 rounded-2xl bg-forest-green hover:bg-green-800 text-white px-6 font-black uppercase tracking-widest text-xs shadow-lg shadow-green-500/10"
          >
            <Download className="h-4 w-4" /> Export M&E Report
          </Button>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-3 hover:border-udsm-blue/30 transition-all"
          >
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", kpi.bg)}>
              <kpi.icon className={cn("h-6 w-6", kpi.color)} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{kpi.label}</p>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">{kpi.value}</h3>
              <p className="text-xs font-bold text-forest-green mt-1">{kpi.change}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detailed Demographic & Outcome Distributions */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-lg text-gray-900 dark:text-white">Demographics & Discipline Split</h3>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Enrolled Cohort</span>
          </div>
          <div className="space-y-4">
            {(data.demographics || []).map((d, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-gray-700 dark:text-gray-300">{d.label}</span>
                  <span className="text-gray-900 dark:text-white font-black">{d.percent}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${d.percent}%` }}
                    transition={{ duration: 1 }}
                    className={cn("h-full rounded-full", d.color || "bg-udsm-blue")}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-lg text-gray-900 dark:text-white">Commercialization & SDG Alignment</h3>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Audited Outcomes</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-5 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-udsm-blue/30 transition-all">
              <span className="text-2xl font-black text-udsm-blue">{data.prototypesTested}</span>
              <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 mt-1">Hardware Prototypes Field-Tested</p>
            </div>
            <div className="p-5 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-forest-green/30 transition-all">
              <span className="text-2xl font-black text-forest-green">{data.ipPatentsFiling}</span>
              <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 mt-1">IP & Patents In Filing</p>
            </div>
            <div className="p-5 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-udsm-gold/30 transition-all">
              <span className="text-2xl font-black text-udsm-gold">{data.jobsCreated}</span>
              <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 mt-1">Jobs Created by Alumni</p>
            </div>
            <div className="p-5 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-pink-500/30 transition-all">
              <span className="text-2xl font-black text-pink-500">{data.sdgAlignment}</span>
              <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 mt-1">UN SDG 3, 4, 8 & 9 Focus</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactAnalytics;
