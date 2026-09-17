import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Laptop, BookOpen, Users, Calendar, Video, Star,
  ShieldCheck, UserPlus, Trash2, CheckCircle, RefreshCw, X, Layers, TrendingUp,
  LogOut, Layout, Settings, Home, Menu, Bell
} from 'lucide-react';
import apiClient from '@/core/apiClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Import Shared Components
import ProjectReview from './moderator/ProjectReview';
import EventManager from './moderator/EventManager';
import ExpertManager from './moderator/ExpertManager';
import LabCommunityGallery from './member/LabCommunityGallery';

const CoordinatorDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pendingFacilitators, setPendingFacilitators] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();

  const [newFacilitator, setNewFacilitator] = useState({
    name: '',
    email: '',
    password: 'facilitator123'
  });

  const [stats, setStats] = useState({ activeMentees: 0, coursesLed: 0, avgRating: 0, liveSessions: 0 });
  const [schedule, setSchedule] = useState([]);
  const [mentees, setMentees] = useState([]);

  const fetchCoordinatorData = async () => {
    setRefreshing(true);
    try {
      const [statsRes, scheduleRes, menteesRes] = await Promise.all([
        apiClient.get('/coordinator/stats'),
        apiClient.get('/coordinator/schedule'),
        apiClient.get('/coordinator/mentee-progress')
      ]);
      setStats(statsRes.data);
      setSchedule(scheduleRes.data);
      setMentees(menteesRes.data);
    } catch (e) {
      console.error("Failed to load coordinator data", e);
      toast({ title: "Sync Failed", description: "Database connection error.", variant: "destructive" });
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCoordinatorData();
  }, []);

  const fetchPendingFacilitators = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get('/coordinator/facilitators/pending');
      setPendingFacilitators(response.data);
    } catch (error) {
      toast({ title: "Error", description: "Failed to load facilitators", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'facilitators') {
      fetchPendingFacilitators();
    }
  }, [activeTab]);

  const handleAdmit = async (id) => {
    try {
      await apiClient.put(`/coordinator/facilitators/${id}/admit`);
      toast({ title: "Success", description: "Facilitator admitted!" });
      fetchPendingFacilitators();
    } catch (error) {
      toast({ title: "Error", description: "Operation failed.", variant: "destructive" });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this facilitator?")) {
      try {
        await apiClient.delete(`/coordinator/facilitators/${id}`);
        toast({ title: "Deleted", description: "Removed successfully." });
        fetchPendingFacilitators();
      } catch (error) {
        toast({ title: "Error", description: "Failed to delete.", variant: "destructive" });
      }
    }
  };

  const handleAddFacilitator = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/coordinator/facilitators', newFacilitator);
      toast({ title: "Success", description: "Facilitator invited!" });
      setShowAddForm(false);
      setNewFacilitator({ name: '', email: '', password: 'facilitator123' });
    } catch (error) {
      toast({ title: "Error", description: "Failed to add.", variant: "destructive" });
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Layout },
    { id: 'projects', label: 'Projects', icon: Layers },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'experts', label: 'Experts', icon: Users },
    { id: 'gallery', label: 'Lab Gallery', icon: BookOpen },
    { id: 'facilitators', label: 'Facilitators', icon: ShieldCheck },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'projects': return <ProjectReview role="coordinator" />;
      case 'events': return <EventManager role="coordinator" />;
      case 'experts': return <ExpertManager />;
      case 'gallery': return <LabCommunityGallery user={user} />;
      case 'facilitators':
        return (
          <div className="space-y-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-udsm-blue" />
                Facilitator Management
              </h2>
              <div className="flex gap-4">
                <Button onClick={() => setShowAddForm(true)} className="bg-udsm-blue hover:bg-blue-700 gap-2 rounded-xl font-bold">
                  <UserPlus className="h-4 w-4" /> Add Facilitator
                </Button>
                <Button onClick={fetchPendingFacilitators} variant="outline" className="rounded-xl border-gray-200 dark:border-gray-800">
                  <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {showAddForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-udsm-blue/5 p-8 rounded-3xl border border-udsm-blue/10 relative mb-8"
                >
                  <button onClick={() => setShowAddForm(false)} className="absolute top-6 right-6 text-udsm-blue/40 hover:text-udsm-blue">
                    <X className="h-6 w-6" />
                  </button>
                  <h3 className="text-xl font-bold text-udsm-blue mb-6">Create New Facilitator</h3>
                  <form onSubmit={handleAddFacilitator} className="grid md:grid-cols-3 gap-4">
                    <Input required placeholder="Full Name" value={newFacilitator.name} onChange={(e) => setNewFacilitator({...newFacilitator, name: e.target.value})} className="rounded-xl bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800" />
                    <Input required type="email" placeholder="Email Address" value={newFacilitator.email} onChange={(e) => setNewFacilitator({...newFacilitator, email: e.target.value})} className="rounded-xl bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800" />
                    <Button type="submit" className="bg-udsm-blue rounded-xl font-bold">Send Invite & Create</Button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid gap-4">
              {pendingFacilitators.length === 0 ? (
                <div className="bg-white dark:bg-gray-900/50 p-12 rounded-[2rem] text-center border-2 border-dashed border-gray-100 dark:border-gray-800">
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No pending facilitator requests.</p>
                </div>
              ) : (
                pendingFacilitators.map(mod => (
                  <motion.div key={mod.id} layout className="bg-white dark:bg-gray-900/50 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-udsm-blue/10 rounded-full flex items-center justify-center text-udsm-blue font-bold text-lg">
                        {mod.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">{mod.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{mod.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => handleAdmit(mod.id)} className="bg-green-600 hover:bg-green-700 rounded-xl gap-2 font-bold">
                        <CheckCircle className="h-4 w-4" /> Admit
                      </Button>
                      <Button onClick={() => handleDelete(mod.id)} variant="outline" className="text-red-600 border-red-100 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        );
      default:
        return (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                { icon: Users, label: 'Active Mentees', val: stats.activeMentees, color: 'text-udsm-blue', bg: 'bg-blue-50 dark:bg-blue-900/10' },
                { icon: BookOpen, label: 'Courses Led', val: stats.coursesLed, color: 'text-forest-green', bg: 'bg-green-50 dark:bg-green-900/10' },
                { icon: Star, label: 'Avg Rating', val: stats.avgRating, color: 'text-udsm-gold', bg: 'bg-yellow-50 dark:bg-yellow-900/10' },
                { icon: Video, label: 'Sessions', val: stats.liveSessions, color: 'text-pink-600', bg: 'bg-pink-50 dark:bg-pink-900/10' },
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
                    <Calendar className="h-5 w-5 text-udsm-blue" />
                    Live Schedule
                  </h2>
                  <Button variant="ghost" onClick={fetchCoordinatorData} className="text-udsm-blue font-black text-[10px] uppercase tracking-widest gap-2">
                    <RefreshCw className={`h-3 w-3 ${refreshing ? 'animate-spin' : ''}`} /> Sync Database
                  </Button>
                </div>
                <div className="space-y-4">
                  {schedule.length === 0 ? (
                    <div className="py-12 text-center">
                       <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">No active sessions retrieved.</p>
                    </div>
                  ) : (
                    schedule.slice(0, 4).map((ev, i) => (
                      <div key={i} className="flex items-center gap-6 p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-700 hover:border-udsm-blue/30 transition-all group">
                        <div className="text-center w-20 flex-shrink-0">
                          <p className="font-black text-udsm-blue text-lg">{ev.startTime}</p>
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">{ev.dayOfWeek}</p>
                        </div>
                        <div className="flex-grow">
                          <p className="text-base font-black text-gray-900 dark:text-white group-hover:text-udsm-blue transition-colors">{ev.activity}</p>
                          <div className="flex items-center gap-2 mt-2">
                             <span className="px-3 py-1 bg-white dark:bg-gray-900 text-udsm-blue text-[9px] font-black rounded-full uppercase tracking-widest border border-gray-200 dark:border-gray-700">
                                {ev.location}
                             </span>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" className="rounded-xl text-udsm-blue/40 hover:text-udsm-blue">Join</Button>
                      </div>
                    ))
                  )}
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
                    <h2 className="text-xl font-black tracking-tight">Mentee Progress</h2>
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                       <TrendingUp className="h-5 w-5 text-udsm-gold" />
                    </div>
                  </div>
                  <div className="space-y-8">
                    {mentees.length === 0 ? (
                      <p className="text-white/40 italic text-xs font-bold uppercase tracking-widest text-center py-10">Waiting for data...</p>
                    ) : (
                      mentees.map((m, i) => (
                        <div key={i}>
                          <div className="flex justify-between mb-3 font-black text-[10px] uppercase tracking-widest">
                            <span className="text-gray-400">{m.name}</span>
                            <span className="text-udsm-gold">{m.prog}%</span>
                          </div>
                          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${m.prog}%` }}
                              transition={{ duration: 1.5, delay: 0.2 + i * 0.1 }}
                              className="h-full bg-gradient-to-r from-udsm-blue to-udsm-gold shadow-[0_0_10px_rgba(8,100,175,0.3)]"
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <button onClick={fetchCoordinatorData} className="w-full mt-10 py-4 bg-white text-udsm-blue rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all active:scale-95">
                    Generate Monthly Report
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
        <p className="text-[10px] font-black text-udsm-blue dark:text-udsm-gold uppercase tracking-[0.2em]">Coordinator Lab</p>
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
              <tab.icon className={cn("h-4 w-4", activeTab === tab.id ? "text-white" : "text-slate-400 group-hover:text-udsm-blue")} />
              <span>{tab.label}</span>
            </div>
            {activeTab === tab.id && <motion.div layoutId="activeDotCoord" className="w-2 h-2 rounded-full bg-udsm-gold shadow-[0_0_10px_rgba(251,191,36,0.8)]" />}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800 space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-udsm-blue/10 rounded-full flex items-center justify-center text-udsm-blue font-black border-2 border-white dark:border-gray-700 shadow-sm">
            {user?.name?.charAt(0) || 'C'}
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-black text-gray-900 dark:text-white truncate">{user?.name || 'Coordinator'}</p>
            <p className="text-[8px] font-bold text-udsm-blue uppercase truncate tracking-widest">Lead Operations</p>
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
              <span className="text-[6px] lg:text-[8px] font-bold uppercase tracking-[0.3em] text-udsm-gold">College of Information and Communication Technologies</span>
            </div>
          </div>

          <div className="flex items-center justify-end w-32">
             <img src="/Images/y4c_logo.png" alt="Y4C Logo" className="h-10 lg:h-12 w-auto object-contain drop-shadow-lg" />
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
                <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Lab Leadership Portal</p>
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

      {/* Close the flex flex-1 container from line 248 */}
      </div>

      {/* Decorative background glows */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-udsm-blue/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-udsm-gold/5 rounded-full blur-[120px] pointer-events-none -z-10" />
    </div>
  );
};

export default CoordinatorDashboard;
