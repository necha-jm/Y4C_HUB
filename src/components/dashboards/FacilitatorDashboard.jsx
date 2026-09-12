import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, MessageSquare, Flag, Users,
  FileText, CheckSquare, Layout,
  UserPlus, Calendar, CalendarDays, Layers, Monitor, BarChart3, Video, TrendingUp, Clock
} from 'lucide-react';
import apiClient from '@/core/apiClient';

// Import Facilitator Sub-components (formerly Moderator)
import MemberManagement from './moderator/MemberManagement';
import EventManager from './moderator/EventManager';
import TimetableManager from './moderator/TimetableManager';
import ProjectReview from './moderator/ProjectReview';
import LandingPageEditor from './moderator/LandingPageEditor';
import RequestQueue from './moderator/RequestQueue';
import HcdAdminDashboard from './moderator/hcd/HcdAdminDashboard';

const FacilitatorDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bgIndex, setBgIndex] = useState(0);

  const backgroundImages = [
    "/Images/Photo05.png",
    "/Images/Photo02.jpg",
    "/Images/y4c-graduation/IMG_0011.JPG",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex(prev => (prev + 1) % backgroundImages.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiClient.get('/facilitator/stats');
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching facilitator stats", error);
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === 'overview') {
      fetchStats();
    }
  }, [activeTab]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Layout, color: 'text-udsm-blue' },
    { id: 'hcd', label: 'HCD Lab', icon: BarChart3, color: 'text-udsm-gold' },
    { id: 'landing', label: 'Landing Page', icon: Monitor, color: 'text-pink-500' },
    { id: 'requests', label: 'Student Requests', icon: MessageSquare, color: 'text-indigo-500' },
    { id: 'members', label: 'Members', icon: UserPlus, color: 'text-udsm-blue' },
    { id: 'events', label: 'Events & Media', icon: Calendar, color: 'text-pink-500' },
    { id: 'projects', label: 'Projects', icon: Layers, color: 'text-udsm-gold' },
    { id: 'timetable', label: 'Timetable', icon: CalendarDays, color: 'text-green-500' },
  ];

  const launchZoom = () => {
    window.open('https://zoom.us/start/videomeeting', '_blank');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'members': return <MemberManagement role="facilitator" />;
      case 'events': return <EventManager role="facilitator" />;
      case 'timetable': return <TimetableManager role="facilitator" />;
      case 'projects': return <ProjectReview role="facilitator" />;
      case 'landing': return <LandingPageEditor role="facilitator" />;
      case 'requests': return <RequestQueue role="facilitator" />;
      case 'hcd': return <HcdAdminDashboard role="facilitator" />;
      default: return (
        <div className="space-y-8 relative z-10">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
             <button onClick={launchZoom} className="bg-udsm-blue p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-200 hover:scale-105 transition-all flex flex-col items-center gap-4 group">
                <div className="p-4 bg-white/20 rounded-2xl group-hover:rotate-12 transition-transform">
                  <Video className="h-8 w-8" />
                </div>
                <span className="font-black uppercase tracking-widest text-sm">Launch Zoom Meeting</span>
             </button>

             <div className="bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-blue-50 flex flex-col items-center justify-center text-center shadow-sm">
                <p className="text-[10px] font-black text-udsm-blue/60 uppercase tracking-[0.2em] mb-2">Total Students</p>
                <p className="text-5xl font-black text-gray-900">{stats?.totalStudents || 0}</p>
                <div className="flex items-center gap-1 text-green-500 text-xs font-bold mt-2">
                  <TrendingUp className="h-3 w-3" /> {stats?.pendingUsers || 0} pending admission
                </div>
             </div>

             <div className="bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-udsm-gold/20 flex flex-col items-center justify-center text-center shadow-sm">
                <p className="text-[10px] font-black text-udsm-gold uppercase tracking-[0.2em] mb-2">Active Projects</p>
                <p className="text-5xl font-black text-gray-900">{stats?.activeProjects || 0}</p>
                <div className="flex items-center gap-1 text-orange-500 text-xs font-bold mt-2">
                  <Clock className="h-3 w-3" /> {stats?.pendingProjects || 0} pending review
                </div>
             </div>

             <div className="bg-gray-900 p-8 rounded-[2.5rem] text-white flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-udsm-blue/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2 relative z-10">Lab Efficiency</p>
                <p className="text-5xl font-black text-white relative z-10">{stats?.efficiency || 0}%</p>
                <div className="w-full bg-white/10 h-1.5 rounded-full mt-4 overflow-hidden relative z-10">
                   <motion.div initial={{ width: 0 }} animate={{ width: `${stats?.efficiency || 0}%` }} transition={{ duration: 1.5 }} className="h-full bg-udsm-gold shadow-[0_0_10px_#eab308]" />
                </div>
             </div>
          </motion.div>
        </div>
      );
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-screen relative overflow-hidden bg-slate-900">
      {/* Background Hero Image (Maintaining Landing Page UI) */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={bgIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={backgroundImages[bgIndex]}
              alt="Dashboard background"
              className="w-full h-full object-cover scale-105 opacity-20 blur-[120px]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/80 to-slate-950/90" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-udsm-blue/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.15, 0.05],
            x: [0, -60, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-udsm-gold/10 rounded-full blur-[150px]"
        />
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
             style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }} />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-6 relative z-10"
      >
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-udsm-blue rounded-[2rem] flex items-center justify-center shadow-2xl shadow-blue-500/20 rotate-3 group hover:rotate-6 transition-transform">
            <ShieldCheck className="h-10 w-10 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-2">
              Community <span className="text-udsm-blue">Facilitator</span>
            </h1>
            <p className="text-udsm-gold font-black text-[10px] tracking-[0.3em] uppercase mt-1">Trust & Safety Operations</p>
          </div>
        </div>

        <div className="flex bg-white/5 backdrop-blur-xl p-1.5 rounded-[2rem] shadow-sm border border-white/10">
          <button className="px-6 py-3 bg-udsm-blue text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-500/20 flex items-center gap-2 hover:scale-105 transition-all">
            <Monitor className="h-4 w-4" /> Live Dashboard
          </button>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-10 relative z-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
              activeTab === tab.id
                ? 'bg-udsm-blue text-white shadow-xl shadow-blue-500/20 scale-105'
                : 'bg-white/5 backdrop-blur-xl text-gray-400 hover:bg-white/10 border border-white/5 hover:text-udsm-blue'
            }`}
          >
            <tab.icon className={`h-4 w-4 ${activeTab === tab.id ? 'text-white' : tab.color}`} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative z-10"
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FacilitatorDashboard;
