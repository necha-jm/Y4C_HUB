import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Rocket, Award, Heart, Search, BookOpen,
  Layout, Calendar, Layers, MessageSquare, Home, LogOut, TrendingUp, Star, Video,
  Menu, X, ChevronRight, Bell
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Import Common Components
import TimetableDisplay from './common/TimetableDisplay';
import ProjectSubmission from './common/ProjectSubmission';
import SupportRequests from './member/SupportRequests';
import AchievementOrbit from './member/AchievementOrbit';

const MemberDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Layout },
    { id: 'learning', label: 'Learning Path', icon: BookOpen },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'projects', label: 'My Projects', icon: Layers },
    { id: 'support', label: 'Support', icon: MessageSquare },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'learning':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 shadow-xl border border-gray-50 dark:border-gray-800 max-w-5xl mx-auto"
          >
            <h2 className="text-2xl font-black mb-10 text-gray-900 dark:text-white flex items-center gap-4">
              <div className="p-3 bg-udsm-blue/10 rounded-2xl">
                <BookOpen className="h-7 w-7 text-udsm-blue" />
              </div>
              Your Learning Path
            </h2>
            <div className="space-y-8">
              {[
                { title: 'Intro to React', progress: 100, status: 'Completed', color: 'bg-udsm-blue' },
                { title: 'UI/UX Design Basics', progress: 45, status: 'In Progress', color: 'bg-udsm-gold' },
                { title: 'Advanced Backend', progress: 0, status: 'Not Started', color: 'bg-gray-300' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-8 group cursor-pointer">
                  <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center flex-shrink-0 transition-all ${
                    item.progress === 100 ? 'bg-udsm-blue/10 text-udsm-blue group-hover:scale-110' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                  }`}>
                    {item.progress === 100 ? <Award className="h-8 w-8" /> : <BookOpen className="h-8 w-8" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-3">
                      <p className="font-black text-gray-900 dark:text-white text-lg tracking-tight group-hover:text-udsm-blue transition-colors uppercase">{item.title}</p>
                      <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{item.status}</span>
                    </div>
                    <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.progress}%` }}
                        className={`h-full ${item.color} shadow-lg shadow-current/20`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'schedule': return <TimetableDisplay />;
      case 'projects': return <ProjectSubmission user={user} />;
      case 'support': return <SupportRequests user={user} />;
      default:
        return (
          <div className="max-w-7xl mx-auto space-y-10">
            {/* Minimal Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Rocket, label: 'Programs', val: '4', color: 'text-udsm-blue', bg: 'bg-blue-50 dark:bg-blue-900/10' },
                { icon: Award, label: 'Badges', val: '12', color: 'text-forest-green', bg: 'bg-green-50 dark:bg-green-900/10' },
                { icon: Star, label: 'Points', val: '850', color: 'text-udsm-gold', bg: 'bg-yellow-50 dark:bg-yellow-900/10' },
                { icon: Video, label: 'Sessions', val: '2', color: 'text-pink-600', bg: 'bg-pink-50 dark:bg-pink-900/10' },
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
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-2 bg-gradient-to-br from-udsm-blue to-indigo-700 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group"
              >
                <div className="relative z-10">
                  <h1 className="text-4xl font-black mb-2 tracking-tight">Hello, {user?.name?.split(' ')[0] || 'Innovator'}! 👋</h1>
                  <p className="text-white/60 font-bold uppercase tracking-widest text-[10px] mb-8">Ready for today's innovation challenges?</p>

                  <div className="flex flex-wrap gap-4 mt-8">
                    <Button onClick={() => setActiveTab('learning')} className="bg-white text-udsm-blue hover:bg-udsm-gold hover:text-black rounded-xl font-black text-[10px] uppercase tracking-widest h-12 px-8">
                      Continue Learning
                    </Button>
                    <Button onClick={() => setActiveTab('projects')} variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-xl font-black text-[10px] uppercase tracking-widest h-12 px-8">
                      Submit Project
                    </Button>
                  </div>
                </div>
                <Rocket className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 rotate-[25deg] group-hover:scale-110 transition-transform duration-700" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-gray-900/50 rounded-[2.5rem] p-8 shadow-xl border border-gray-100 dark:border-gray-800"
              >
                <h3 className="text-sm font-black text-gray-900 dark:text-white mb-6 uppercase tracking-widest flex items-center justify-between">
                  Upcoming
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                </h3>
                <div className="space-y-4">
                  {[1, 2].map(i => (
                    <div key={i} className="p-4 bg-gray-50 dark:bg-gray-800/30 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-udsm-blue/30 transition-all cursor-pointer group">
                      <p className="font-black text-[11px] text-gray-900 dark:text-white uppercase tracking-wider group-hover:text-udsm-blue">Networking Friday</p>
                      <p className="text-[10px] text-gray-400 font-bold mt-1">Tomorrow at 4:00 PM</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 bg-udsm-gold/5 p-6 rounded-2xl border border-udsm-gold/10">
                   <p className="text-[9px] font-black text-udsm-gold uppercase tracking-widest mb-1">Community Shoutout</p>
                   <p className="text-[11px] font-bold text-gray-600 dark:text-gray-400 italic leading-relaxed">"Join the #innovation channel on Discord to share your ideas!"</p>
                </div>
              </motion.div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
               <AchievementOrbit />
               <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group flex flex-col justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-udsm-blue/20 to-transparent" />
                  <Heart className="h-10 w-10 mb-6 text-udsm-gold fill-udsm-gold" />
                  <h3 className="text-2xl font-black tracking-tight uppercase">Y4C Global Community</h3>
                  <p className="text-sm font-medium text-white/50 mt-2 mb-8 leading-relaxed">Connect with 500+ other young innovators, mentors and industry experts.</p>
                  <button className="w-full py-4 bg-white text-udsm-blue rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all">
                    Launch Hub Community
                  </button>
               </div>
            </div>
          </div>
        );
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full p-6 bg-white dark:bg-gray-900">
      <div className="px-2 mb-8">
        <p className="text-[10px] font-black text-udsm-blue dark:text-udsm-gold uppercase tracking-[0.2em]">Member Portal</p>
        <div className="h-1 w-8 bg-udsm-gold mt-1 rounded-full" />
      </div>

      <nav className="flex-1 space-y-2">
        <button
          onClick={() => { navigate('/'); setIsSidebarOpen(false); }}
          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-500 hover:text-udsm-blue hover:bg-slate-50 dark:hover:bg-gray-800 transition-all"
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
              "w-full flex items-center justify-between px-4 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all group",
              activeTab === tab.id
                ? "bg-udsm-blue text-white shadow-xl shadow-blue-500/30 scale-[1.02]"
                : "text-slate-500 hover:text-udsm-blue hover:bg-slate-50 dark:text-gray-400 dark:hover:bg-gray-800"
            )}
          >
            <div className="flex items-center gap-3">
              <tab.icon className={cn("h-4 w-4", activeTab === tab.id ? "text-white" : "text-slate-400 group-hover:text-udsm-blue")} />
              <span>{tab.label}</span>
            </div>
            {activeTab === tab.id && <motion.div layoutId="activeDot" className="w-2 h-2 rounded-full bg-udsm-gold shadow-[0_0_10px_rgba(251,191,36,0.8)]" />}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800 space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-slate-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-udsm-blue font-black border-2 border-white dark:border-gray-700 shadow-sm">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-black text-gray-900 dark:text-white truncate">{user?.name || 'User'}</p>
            <p className="text-[8px] font-bold text-gray-400 uppercase truncate">Member</p>
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
                <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Innovation Lab Portal</p>
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

      {/* Close the flex flex-1 container from line 229 */}
      </div>

      {/* Background Decorative Glows */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-udsm-blue/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-udsm-gold/5 rounded-full blur-[120px] pointer-events-none -z-10" />
    </div>
  );
};

export default MemberDashboard;
