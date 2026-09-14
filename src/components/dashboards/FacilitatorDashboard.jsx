import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, MessageSquare, Flag, Users,
  FileText, CheckSquare, Layout,
  UserPlus, Calendar, CalendarDays, Layers, Monitor, BarChart3, Video, TrendingUp, Clock,
  LogOut, Settings, Home, RefreshCw, Menu, X, Bell
} from 'lucide-react';
import apiClient from '@/core/apiClient';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

// Import Facilitator Sub-components (formerly Moderator)
import MemberManagement from './moderator/MemberManagement';
import EventManager from './moderator/EventManager';
import TimetableManager from './moderator/TimetableManager';
import ProjectReview from './moderator/ProjectReview';
import LandingPageEditor from './moderator/LandingPageEditor';
import RequestQueue from './moderator/RequestQueue';
import HcdAdminDashboard from './moderator/hcd/HcdAdminDashboard';

const FacilitatorDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ totalStudents: 0, activeProjects: 0, pendingUsers: 0, pendingProjects: 0, efficiency: 0 });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();

  const fetchFacilitatorData = async () => {
    setRefreshing(true);
    try {
      const response = await apiClient.get('/facilitator/stats');
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching facilitator stats", error);
      toast({ title: "Sync Failed", description: "Could not retrieve latest stats.", variant: "destructive" });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFacilitatorData();
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Layout, color: 'text-udsm-blue' },
    { id: 'hcd', label: 'HCD Lab', icon: BarChart3, color: 'text-udsm-gold' },
    { id: 'landing', label: 'Landing Page', icon: Monitor, color: 'text-pink-500' },
    { id: 'requests', label: 'Requests', icon: MessageSquare, color: 'text-indigo-500' },
    { id: 'members', label: 'Members', icon: UserPlus, color: 'text-udsm-blue' },
    { id: 'events', label: 'Events', icon: Calendar, color: 'text-pink-500' },
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
        <div className="max-w-7xl mx-auto">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { icon: Users, label: 'Total Students', val: stats.totalStudents, color: 'text-udsm-blue', bg: 'bg-blue-50 dark:bg-blue-900/10' },
              { icon: Layers, label: 'Active Projects', val: stats.activeProjects, color: 'text-udsm-gold', bg: 'bg-yellow-50 dark:bg-yellow-900/10' },
              { icon: Clock, label: 'Pending Review', val: stats.pendingProjects, color: 'text-pink-600', bg: 'bg-pink-50 dark:bg-pink-900/10' },
              { icon: TrendingUp, label: 'Efficiency', val: `${stats.efficiency}%`, color: 'text-forest-green', bg: 'bg-green-50 dark:bg-green-900/10' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`${s.bg} p-5 rounded-3xl border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center group hover:scale-[1.02] transition-transform shadow-sm`}
              >
                <div className={`p-3 rounded-2xl mb-3 ${s.color} bg-white dark:bg-gray-900 shadow-inner group-hover:rotate-6 transition-transform`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <p className="text-gray-400 dark:text-gray-500 font-black text-[9px] uppercase tracking-[0.2em]">{s.label}</p>
                <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">{s.val}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 bg-white dark:bg-gray-900/50 rounded-[2.5rem] p-8 shadow-xl border border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-udsm-blue" />
                  Facilitator Control Center
                </h2>
                <Button variant="ghost" onClick={fetchFacilitatorData} className="text-udsm-blue font-black text-[10px] uppercase tracking-widest gap-2">
                  <RefreshCw className={`h-3 w-3 ${refreshing ? 'animate-spin' : ''}`} /> Sync Data
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button onClick={launchZoom} className="bg-udsm-blue p-8 rounded-[2rem] text-white shadow-xl shadow-blue-200 hover:scale-[1.02] transition-all flex flex-col items-center gap-4 group">
                  <div className="p-4 bg-white/20 rounded-2xl group-hover:rotate-12 transition-transform">
                    <Video className="h-8 w-8" />
                  </div>
                  <span className="font-black uppercase tracking-[0.2em] text-[10px]">Launch Zoom Meeting</span>
                </button>

                <div className="bg-slate-50 dark:bg-gray-800/50 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center text-center">
                  <p className="text-[10px] font-black text-udsm-blue/60 uppercase tracking-[0.2em] mb-2">Pending Admissions</p>
                  <p className="text-4xl font-black text-gray-900 dark:text-white">{stats.pendingUsers}</p>
                  <Button variant="link" onClick={() => setActiveTab('members')} className="text-udsm-blue text-[10px] font-black uppercase tracking-widest mt-2">
                    Review Members
                  </Button>
                </div>
              </div>

              <div className="mt-8 p-6 bg-udsm-gold/5 rounded-3xl border border-udsm-gold/10 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider">HCD Lab Operations</h3>
                  <p className="text-xs text-gray-500 mt-1">Manage human-centered design research and student outputs.</p>
                </div>
                <Button onClick={() => setActiveTab('hcd')} className="bg-udsm-gold hover:bg-yellow-600 text-white font-black text-[10px] uppercase tracking-widest rounded-xl">
                  Open Lab
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-udsm-blue/20 to-udsm-gold/5 opacity-50" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-black tracking-tight">Lab Efficiency</h2>
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                     <TrendingUp className="h-5 w-5 text-udsm-gold" />
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between mb-3 font-black text-[10px] uppercase tracking-widest">
                      <span className="text-gray-400">Resource Utilization</span>
                      <span className="text-udsm-gold">{stats.efficiency}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stats.efficiency}%` }}
                        transition={{ duration: 1.5 }}
                        className="h-full bg-gradient-to-r from-udsm-blue to-udsm-gold shadow-[0_0_10px_rgba(8,100,175,0.3)]"
                      />
                    </div>
                  </div>

                  <div className="pt-4 space-y-4">
                    <div className="flex items-center gap-3 text-xs font-bold text-gray-400">
                      <CheckSquare className="h-4 w-4 text-green-500" />
                      <span>{stats.activeProjects} Projects active this week</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold text-gray-400">
                      <MessageSquare className="h-4 w-4 text-udsm-blue" />
                      <span>{stats.pendingProjects} Submissions awaiting feedback</span>
                    </div>
                  </div>
                </div>

                <button onClick={() => setActiveTab('requests')} className="w-full mt-10 py-4 bg-white text-udsm-blue rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all active:scale-95">
                  View Student Requests
                </button>
              </div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-udsm-blue/10 rounded-full blur-[100px] group-hover:bg-udsm-gold/10 transition-colors duration-1000" />
            </motion.div>
          </div>
        </div>
      );
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full p-6 bg-white dark:bg-gray-900">
      <div className="px-2 mb-8">
        <p className="text-[10px] font-black text-udsm-blue dark:text-udsm-gold uppercase tracking-[0.2em]">Facilitator Hub</p>
        <div className="h-1 w-8 bg-udsm-gold mt-1 rounded-full" />
      </div>

      <nav className="flex-1 space-y-1.5 overflow-y-auto no-scrollbar pr-2">
        <button
          onClick={() => { navigate('/'); setIsSidebarOpen(false); }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-500 hover:text-udsm-blue hover:bg-slate-50 dark:hover:bg-gray-800 transition-all"
        >
          <Home className="h-4 w-4" />
          <span>Home Site</span>
        </button>

        <div className="h-px bg-gray-100 dark:bg-gray-800 my-4 mx-2" />

        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setIsSidebarOpen(false); }}
            className={cn(
              "w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all group",
              activeTab === tab.id
                ? "bg-udsm-blue text-white shadow-xl shadow-blue-500/30 scale-[1.02]"
                : "text-slate-500 hover:text-udsm-blue hover:bg-slate-50 dark:text-gray-400 dark:hover:bg-gray-800"
            )}
          >
            <div className="flex items-center gap-3">
              <tab.icon className={cn("h-4 w-4", activeTab === tab.id ? "text-white" : cn(tab.color, "opacity-70 group-hover:opacity-100"))} />
              <span>{tab.label}</span>
            </div>
            {activeTab === tab.id && <motion.div layoutId="activeDotFac" className="w-2 h-2 rounded-full bg-udsm-gold shadow-[0_0_10px_rgba(251,191,36,0.8)]" />}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800 space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-udsm-blue/10 dark:bg-udsm-blue/20 rounded-full flex items-center justify-center text-udsm-blue font-black border-2 border-white dark:border-gray-700 shadow-sm">
            {user?.name?.charAt(0) || 'F'}
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-black text-gray-900 dark:text-white truncate">{user?.name || 'Facilitator'}</p>
            <p className="text-[8px] font-bold text-udsm-blue uppercase truncate tracking-widest">Administrator</p>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={() => {
            if (onLogout) onLogout();
            else navigate('/');
          }}
          className="w-full rounded-xl border-red-100 dark:border-red-900/30 text-red-600 hover:bg-red-600 hover:text-white font-black text-[10px] uppercase tracking-widest h-12 gap-2 shadow-sm transition-all"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-gray-950 overflow-hidden">
      {/* Premium Header (Blue Bar from Landing Page) */}
      <div className="bg-udsm-blue text-white py-3 px-8 border-b border-white/10 hidden md:block rounded-b-[1.5rem] shadow-lg relative z-[60]">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          <div className="flex items-center w-32 cursor-pointer" onClick={() => navigate('/')}>
             <img src="/Images/udsm-logo.png" alt="UDSM Logo" className="h-8 lg:h-10 w-auto object-contain drop-shadow-lg" />
          </div>

          <div className="text-center flex-grow">
            <h1 className="text-xs lg:text-lg font-black uppercase tracking-[0.2em] leading-none mb-0.5 drop-shadow-2xl">
              <span className="text-white">Youth For Children</span>
              <span className="text-white ml-2">Innovation Lab</span>
            </h1>
            <div className="flex flex-col opacity-90 leading-none space-y-0.5">
              <span className="text-[6px] lg:text-[8px] font-bold uppercase tracking-[0.3em] text-udsm-gold">Community Trust & Safety Operations</span>
            </div>
          </div>

          <div className="flex items-center justify-end w-32">
             <img src="/Images/y4c_logo.png" alt="Y4C Logo" className="h-8 lg:h-10 w-auto object-contain drop-shadow-lg" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-72 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex-col z-50 shadow-xl">
          <SidebarContent />
        </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-white dark:bg-gray-900 z-[70] lg:hidden shadow-2xl"
            >
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="absolute top-6 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white lg:hidden"
              >
                <X className="h-6 w-6" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-4 md:px-8 z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2.5 bg-slate-100 dark:bg-gray-800 rounded-xl text-slate-600 hover:text-udsm-blue transition-all shadow-inner"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h2 className="text-lg font-black text-gray-900 dark:text-white tracking-tight uppercase">
                {tabs.find(t => t.id === activeTab)?.label}
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="w-1 h-1 rounded-full bg-udsm-gold animate-pulse" />
                <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Facilitator Operations Hub</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <button className="p-2.5 bg-slate-50 dark:bg-gray-900 rounded-xl text-slate-400 hover:text-udsm-blue transition-all border border-gray-100 dark:border-gray-800 relative group">
                <Bell className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-900" />
             </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/50 dark:bg-gray-950/50">
          <div className="py-8 px-4 md:px-10 max-w-7xl mx-auto min-h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Close the flex flex-1 container from line 217 */}
      </div>

      {/* Decorative background glows */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-udsm-blue/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-udsm-gold/5 rounded-full blur-[120px] pointer-events-none -z-10" />
    </div>
  );
};

export default FacilitatorDashboard;
