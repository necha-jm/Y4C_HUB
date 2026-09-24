import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Coffee, Compass, Star, ArrowRight, Lightbulb, Zap,
  Layout, Calendar, Rocket, MessageSquare, Home, LogOut, Menu, X, Bell,
  Target, Eye, Users, ShieldCheck, Download, ExternalLink, MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import apiClient from '@/core/apiClient';

// Import Shared Components
import LabCommunityGallery from './member/LabCommunityGallery';

const GuestDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [labStats, setLabStats] = useState({ startups: '50+', members: '500+', awards: '15+', events: '120+' });
  const navigate = useNavigate();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Layout },
    { id: 'programs', label: 'Explore Programs', icon: Compass },
    { id: 'gallery', label: 'Lab Gallery', icon: ShieldCheck },
    { id: 'resources', label: 'Resources', icon: MessageSquare },
    { id: 'events', label: 'Public Events', icon: Zap },
    { id: 'membership', label: 'Join the Lab', icon: Star },
  ];

  const programs = [
    { id: 'tech-skills', title: 'Tech Skills', desc: 'Master web, mobile, and data science.', color: 'text-udsm-blue', bg: 'bg-blue-50' },
    { id: 'startup-incubation', title: 'Incubation', desc: 'Transform ideas into scalable businesses.', color: 'text-forest-green', bg: 'bg-green-50' },
    { id: 'leadership', title: 'Leadership', desc: 'Equipping the next generation of leaders.', color: 'text-udsm-gold', bg: 'bg-yellow-50' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'programs':
        return (
          <div className="space-y-10 max-w-7xl mx-auto">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight uppercase">Incubation & Learning</h2>
              <p className="text-gray-500 mt-2 font-medium">Browse transformative journeys currently active at Y4C.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {programs.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={cn("p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl group hover:border-udsm-blue transition-all")}
                >
                  <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-inner transition-transform group-hover:rotate-12", p.bg, p.color)}>
                     <Rocket className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">{p.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 font-bold leading-relaxed">{p.desc}</p>
                  <Button variant="link" onClick={() => navigate(`/program/${p.id}`)} className="p-0 h-auto mt-8 text-udsm-blue font-black uppercase tracking-widest text-[10px] gap-2 hover:no-underline hover:text-udsm-gold">
                    EXPLORE FULL CURRICULUM <ArrowRight className="h-3 w-3" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        );
      case 'resources':
        return (
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight uppercase">Knowledge Library</h2>
                <p className="text-gray-500 mt-2 font-medium italic">Curated guides and tools for young innovators.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'Innovation Framework', type: 'PDF Guide', color: 'text-udsm-blue', bg: 'bg-blue-50' },
                { title: 'Pitch Deck Template', type: 'PPTX', color: 'text-udsm-gold', bg: 'bg-yellow-50' },
                { title: 'Tech Stack Guide 2025', type: 'E-Book', color: 'text-forest-green', bg: 'bg-green-50' }
              ].map((res, i) => (
                <div key={i} className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl group hover:scale-[1.02] transition-all">
                   <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner", res.bg, res.color)}>
                      <Download className="h-6 w-6" />
                   </div>
                   <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-1">{res.type}</p>
                   <h4 className="text-xl font-black text-gray-900 dark:text-white">{res.title}</h4>
                   <Button variant="link" className="p-0 h-auto mt-6 text-udsm-blue font-black uppercase tracking-widest text-[10px] gap-2">
                      Preview Document <ExternalLink className="h-3 w-3" />
                   </Button>
                </div>
              ))}
            </div>

            <div className="p-10 bg-gray-900 rounded-[2.5rem] text-center text-white relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-r from-udsm-blue/20 to-transparent" />
               <p className="text-xs font-black uppercase tracking-[0.3em] text-udsm-gold mb-4">Premium Access Required</p>
               <h3 className="text-2xl font-black mb-6">Unlock 200+ Innovation Templates</h3>
               <Button onClick={() => setActiveTab('membership')} className="bg-white text-black rounded-xl px-10 h-14 font-black uppercase tracking-widest text-xs hover:bg-gray-100">Upgrade to Member</Button>
            </div>
          </div>
        );
      case 'events':
        return (
          <div className="max-w-7xl mx-auto space-y-10">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight uppercase">Global Events Feed</h2>
                  <p className="text-gray-500 mt-2 font-medium italic">Public workshops, masterclasses, and networking sessions.</p>
                </div>
                <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} variant="outline" className="rounded-xl border-gray-200 gap-2">
                   <Calendar className="h-4 w-4" /> Sync Events
                </Button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { title: 'Tech Innovation Summit', date: 'Oct 12, 2025', loc: 'Main Hall', type: 'Flagship' },
                  { title: 'Design Thinking Workshop', date: 'Oct 24, 2025', loc: 'Lab A', type: 'Workshop' }
                ].map((ev, i) => (
                  <motion.div key={i} whileHover={{ y: -5 }} className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl flex items-center gap-8 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform" />
                     <div className="w-24 h-24 bg-pink-50 dark:bg-pink-900/10 rounded-[2rem] flex flex-col items-center justify-center text-pink-600 flex-shrink-0">
                        <span className="text-2xl font-black">{ev.date.split(' ')[1].replace(',', '')}</span>
                        <span className="text-[10px] font-black uppercase">{ev.date.split(' ')[0]}</span>
                     </div>
                     <div className="flex-grow">
                        <span className="text-[9px] font-black uppercase text-pink-500 tracking-widest mb-1 block">{ev.type}</span>
                        <h4 className="text-xl font-black text-gray-900 dark:text-white leading-tight">{ev.title}</h4>
                        <div className="flex items-center gap-4 mt-4 text-[10px] font-bold text-gray-400">
                           <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {ev.loc}</span>
                           <span className="flex items-center gap-1"><Users className="h-3 w-3" /> Public Access</span>
                        </div>
                     </div>
                     <Button size="icon" variant="ghost" className="rounded-full hover:bg-pink-50 text-pink-400"><ArrowRight className="h-5 w-5" /></Button>
                  </motion.div>
                ))}
             </div>
          </div>
        );
      case 'about':
        return (
          <div className="max-w-5xl mx-auto space-y-12">
             <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                   <div className="p-8 bg-white dark:bg-gray-900 rounded-[3rem] shadow-2xl border border-gray-50 dark:border-gray-800">
                      <Target className="h-10 w-10 text-forest-green mb-6" />
                      <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Our Mission</h3>
                      <p className="text-gray-500 dark:text-gray-400 mt-4 leading-relaxed font-bold">Empowering young minds through technology and community-driven innovation. We provide the tools, the space, and the network to build the future of Tanzania and beyond.</p>
                   </div>
                   <div className="p-8 bg-gray-900 rounded-[3rem] shadow-2xl text-white">
                      <Eye className="h-10 w-10 text-udsm-gold mb-6" />
                      <h3 className="text-2xl font-black uppercase tracking-tight">Our Vision</h3>
                      <p className="text-gray-400 mt-4 leading-relaxed font-bold">To be the heart of a continental innovation ecosystem where ideas are the only limit to what we can achieve together.</p>
                   </div>
                </div>
                <div className="flex flex-col justify-center gap-6">
                   <h2 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tighter leading-none mb-4">A place where <span className="text-udsm-blue">Innovators</span> meet <span className="text-udsm-gold">Reality.</span></h2>
                   <div className="space-y-4">
                      {[
                        { icon: Users, l: 'Mentorship', d: 'Connect with industry experts' },
                        { icon: ShieldCheck, l: 'Security', d: 'Safe and trusted environment' },
                        { icon: Zap, l: 'Speed', d: 'Fast-track your startup idea' }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                           <div className="p-2 bg-slate-50 dark:bg-gray-800 rounded-lg"><item.icon className="h-5 w-5 text-udsm-blue" /></div>
                           <div>
                              <p className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider">{item.l}</p>
                              <p className="text-[10px] text-gray-400 font-bold">{item.d}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        );
      case 'gallery':
        return (
          <div className="space-y-8">
            <div className="p-8 bg-udsm-blue/5 rounded-[2.5rem] border border-udsm-blue/10 flex flex-col md:flex-row items-center justify-between gap-6">
               <div className="flex items-center gap-6">
                 <div className="w-16 h-16 bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg">
                    <ShieldCheck className="h-8 w-8 text-udsm-blue" />
                 </div>
                 <div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">ReadOnly Community Feed</h3>
                    <p className="text-sm text-gray-500 font-bold">You are viewing the public version of our member gallery.</p>
                 </div>
               </div>
               <Button onClick={() => navigate('/propose')} className="bg-udsm-blue rounded-xl px-8 h-12 font-black uppercase tracking-widest text-[10px]">Apply to Post</Button>
            </div>
            <LabCommunityGallery user={{ role: 'guest' }} />
          </div>
        );
      case 'membership':
        return (
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="bg-gray-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
               <div className="absolute inset-0 bg-gradient-to-br from-udsm-gold/20 to-transparent" />
               <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-none mb-6">Level up your <span className="text-udsm-gold">Innovation</span> game.</h2>
                    <p className="text-gray-400 font-bold mb-10 leading-relaxed uppercase tracking-widest text-xs">Join the Lab as a full member to unlock exclusive benefits designed for the next generation of builders.</p>
                    <ul className="space-y-4 mb-10">
                       {['24/7 Co-working Space Access', 'Seed Funding Opportunities', 'Direct Industry Mentorship', 'Cloud Computing Credits'].map((item, i) => (
                         <li key={i} className="flex items-center gap-3 text-sm font-bold">
                            <div className="w-5 h-5 bg-udsm-gold rounded-full flex items-center justify-center text-black">
                               <ShieldCheck className="h-3 w-3" />
                            </div>
                            {item}
                         </li>
                       ))}
                    </ul>
                    <Button onClick={() => navigate('/propose')} className="bg-udsm-gold hover:bg-yellow-500 text-black h-16 px-12 rounded-2xl font-black text-lg shadow-xl shadow-yellow-500/20 active:scale-95 transition-all">
                       Apply for Hub Membership
                    </Button>
                  </div>
                  <div className="hidden md:block">
                     <div className="aspect-square bg-white/5 rounded-full border border-white/10 flex items-center justify-center relative">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 border-2 border-dashed border-udsm-gold/20 rounded-full"
                        />
                        <Star className="h-24 w-24 text-udsm-gold animate-pulse" />
                     </div>
                  </div>
               </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="max-w-7xl mx-auto space-y-12">
            {/* Minimal Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Rocket, label: 'Startups', val: labStats.startups, color: 'text-udsm-blue', bg: 'bg-blue-50 dark:bg-blue-900/10' },
                { icon: Users, label: 'Innovators', val: labStats.members, color: 'text-forest-green', bg: 'bg-green-50 dark:bg-green-900/10' },
                { icon: Star, label: 'Success Rate', val: '94%', color: 'text-udsm-gold', bg: 'bg-yellow-50 dark:bg-yellow-900/10' },
                { icon: Zap, label: 'Live Events', val: '12+', color: 'text-pink-600', bg: 'bg-pink-50 dark:bg-pink-900/10' },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`${s.bg} p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center shadow-sm hover:scale-[1.02] transition-transform`}
                >
                  <div className={`p-4 rounded-2xl mb-4 ${s.color} bg-white dark:bg-gray-900 shadow-inner group-hover:rotate-6 transition-transform`}>
                    <s.icon className="h-6 w-6" />
                  </div>
                  <p className="text-gray-400 dark:text-gray-500 font-black text-[9px] uppercase tracking-[0.2em]">{s.label}</p>
                  <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">{s.val}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 rounded-[3rem] p-12 text-center border border-gray-100 dark:border-gray-800 shadow-xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-udsm-blue/5 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-gray-800 rounded-full mb-8 border border-gray-100 dark:border-gray-700">
                  <Coffee className="h-4 w-4 text-orange-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">Welcome, Guest Explorer</span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tighter leading-none mb-6">
                  Ready to turn your <span className="text-udsm-blue">ideas</span> into <span className="text-udsm-gold">impact.</span>
                </h1>
                <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 font-medium">
                  You're exploring the Y4C Innovation Lab. Join our growing community of 500+ innovators to unlock mentorship, funding, and dedicated workspace.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button onClick={() => setActiveTab('membership')} className="bg-udsm-blue hover:bg-blue-700 text-white rounded-2xl font-black px-10 py-8 text-lg shadow-2xl shadow-blue-500/20 group">
                    Why Join the Lab? <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/propose')} className="border-udsm-gold text-udsm-gold hover:bg-udsm-gold hover:text-black rounded-2xl font-black px-10 py-8 text-lg shadow-lg">
                    Propose Project
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        );
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full p-6 bg-white dark:bg-gray-900">
      <div className="px-2 mb-8">
        <p className="text-[10px] font-black text-udsm-blue dark:text-udsm-gold uppercase tracking-[0.2em]">Guest Portal</p>
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
            {activeTab === tab.id && <motion.div layoutId="activeDotGuest" className="w-2 h-2 rounded-full bg-udsm-gold shadow-[0_0_10px_rgba(251,191,36,0.8)]" />}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800 space-y-4">
        <Button
          variant="outline"
          onClick={() => {
            if (onLogout) onLogout();
            else navigate('/');
          }}
          className="w-full rounded-xl border-red-100 dark:border-red-900/30 text-red-600 hover:bg-red-600 hover:text-white font-black text-[10px] uppercase tracking-widest h-12 gap-2 shadow-sm transition-all"
        >
          <LogOut className="h-4 w-4" />
          <span>Exit Portal</span>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-gray-950 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        <aside className="hidden lg:flex w-72 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex-col z-50 shadow-xl">
          <SidebarContent />
        </aside>

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

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <header className="h-20 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-4 md:px-8 z-40">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2.5 bg-slate-100 dark:bg-gray-800 rounded-xl text-slate-600 hover:text-udsm-blue transition-all shadow-inner"
              >
                <Menu className="h-5 w-5" />
              </button>
              <h2 className="text-lg font-black text-gray-900 dark:text-white tracking-tight uppercase">
                {tabs.find(t => t.id === activeTab)?.label}
              </h2>
            </div>
            <button className="p-2.5 bg-slate-50 dark:bg-gray-900 rounded-xl text-slate-400 hover:text-udsm-blue transition-all border border-gray-100 dark:border-gray-800 relative group">
              <Bell className="h-4 w-4 group-hover:rotate-12 transition-transform" />
            </button>
          </header>

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
      </div>

      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-udsm-blue/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-udsm-gold/5 rounded-full blur-[120px] pointer-events-none -z-10" />
    </div>
  );
};

export default GuestDashboard;
