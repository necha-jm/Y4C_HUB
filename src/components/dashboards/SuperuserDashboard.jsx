import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert, Users, Settings, Database, Activity, Server,
  Plus, Trash2, CheckCircle, RefreshCw, X, Layers, TrendingUp,
  LogOut, Layout, Home, Bell, Palette, Type, Globe, Monitor, Menu
} from 'lucide-react';
import apiClient from '@/core/apiClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Import Shared Components
import LandingPageEditor from './moderator/LandingPageEditor';

const SuperuserDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();

  const [newProject, setNewProject] = useState({
    name: '',
    title: '',
    subtitle: '',
    primaryColor: '#0864AF',
    secondaryColor: '#166534',
    accentColor: '#EAB308',
    isActive: false
  });

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get('/superuser/projects');
      setProjects(response.data);
    } catch (e) {
      toast({ title: "Fetch Failed", description: "Could not load system projects.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/superuser/projects', newProject);
      toast({ title: "Success", description: "New project context created." });
      setShowAddForm(false);
      fetchProjects();
    } catch (e) {
      toast({ title: "Error", description: "Creation failed.", variant: "destructive" });
    }
  };

  const handleActivate = async (id) => {
    try {
      await apiClient.put(`/superuser/projects/${id}/activate`);
      toast({ title: "Project Activated", description: "System branding has been updated." });
      fetchProjects();
      window.location.reload();
    } catch (e) {
      toast({ title: "Error", description: "Activation failed.", variant: "destructive" });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this project context? This cannot be undone.")) {
      try {
        await apiClient.delete(`/superuser/projects/${id}`);
        toast({ title: "Deleted", description: "Project context removed." });
        fetchProjects();
      } catch (e) {
        toast({ title: "Error", description: "Deletion failed.", variant: "destructive" });
      }
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Layout },
    { id: 'projects', label: 'Project Manager', icon: Globe },
    { id: 'cms', label: 'Global CMS', icon: Type },
    { id: 'system', label: 'System Health', icon: Activity },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'cms': return <LandingPageEditor />;
      case 'projects':
        return (
          <div className="space-y-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                <Globe className="h-6 w-6 text-red-600" />
                Project Life-Cycle Manager
              </h2>
              <Button onClick={() => setShowAddForm(true)} className="bg-red-600 hover:bg-red-700 gap-2 rounded-xl font-bold">
                <Plus className="h-4 w-4" /> New Project
              </Button>
            </div>

            <AnimatePresence>
              {showAddForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 dark:bg-red-900/10 p-8 rounded-3xl border border-red-100 relative mb-8"
                >
                  <button onClick={() => setShowAddForm(false)} className="absolute top-6 right-6 text-red-400 hover:text-red-600">
                    <X className="h-6 w-6" />
                  </button>
                  <h3 className="text-xl font-bold text-red-600 mb-6">Spawn New Project Instance</h3>
                  <form onSubmit={handleCreateProject} className="grid md:grid-cols-2 gap-6">
                    <Input required placeholder="Project Internal Name" value={newProject.name} onChange={(e) => setNewProject({...newProject, name: e.target.value})} className="rounded-xl" />
                    <Input required placeholder="Landing Page Title" value={newProject.title} onChange={(e) => setNewProject({...newProject, title: e.target.value})} className="rounded-xl" />
                    <textarea
                      placeholder="Project Subtitle / Mission Statement"
                      value={newProject.subtitle}
                      onChange={(e) => setNewProject({...newProject, subtitle: e.target.value})}
                      className="rounded-xl p-4 bg-white border border-gray-100 md:col-span-2 min-h-[100px]"
                    />
                    <div className="grid grid-cols-3 gap-4 md:col-span-2">
                       <div>
                         <label className="text-[10px] font-black uppercase mb-1 block text-gray-400">Primary</label>
                         <Input type="color" value={newProject.primaryColor} onChange={(e) => setNewProject({...newProject, primaryColor: e.target.value})} />
                       </div>
                       <div>
                         <label className="text-[10px] font-black uppercase mb-1 block text-gray-400">Secondary</label>
                         <Input type="color" value={newProject.secondaryColor} onChange={(e) => setNewProject({...newProject, secondaryColor: e.target.value})} />
                       </div>
                       <div>
                         <label className="text-[10px] font-black uppercase mb-1 block text-gray-400">Accent</label>
                         <Input type="color" value={newProject.accentColor} onChange={(e) => setNewProject({...newProject, accentColor: e.target.value})} />
                       </div>
                    </div>
                    <Button type="submit" className="bg-red-600 rounded-xl font-bold md:col-span-2">Initialize Project</Button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid gap-6">
              {projects.map(project => (
                <motion.div key={project.id} layout className={cn(
                  "bg-white dark:bg-gray-900/50 p-8 rounded-[2rem] shadow-sm border flex flex-col md:flex-row items-center justify-between transition-all",
                  project.active ? "border-red-500 shadow-xl shadow-red-500/5" : "border-gray-100 dark:border-gray-800"
                )}>
                  <div className="flex items-center gap-6">
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl shadow-inner",
                      project.active ? "bg-red-600 text-white" : "bg-gray-100 text-gray-400"
                    )}>
                      {project.name?.charAt(0) || 'P'}
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className="text-xl font-black text-gray-900 dark:text-white">{project.name}</h4>
                        {project.active && <span className="bg-red-100 text-red-600 px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest">Active Site</span>}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{project.title}</p>
                      <div className="flex gap-2 mt-4">
                        <div className="w-4 h-4 rounded-full border border-white" style={{backgroundColor: project.primaryColor}} />
                        <div className="w-4 h-4 rounded-full border border-white" style={{backgroundColor: project.secondaryColor}} />
                        <div className="w-4 h-4 rounded-full border border-white" style={{backgroundColor: project.accentColor}} />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6 md:mt-0">
                    {!project.active && (
                      <Button onClick={() => handleActivate(project.id)} className="bg-green-600 hover:bg-green-700 rounded-xl font-bold gap-2">
                        <CheckCircle className="h-4 w-4" /> Activate
                      </Button>
                    )}
                    <Button onClick={() => handleDelete(project.id)} variant="outline" className="text-red-600 border-red-100 rounded-xl">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Users, label: 'Global Users', val: '1,284', color: 'text-udsm-blue', bg: 'bg-blue-50 dark:bg-blue-900/10' },
                { icon: Globe, label: 'Projects', val: projects.length, color: 'text-udsm-gold', bg: 'bg-yellow-50 dark:bg-yellow-900/10' },
                { icon: Database, label: 'DB Storage', val: '12%', color: 'text-pink-600', bg: 'bg-pink-50 dark:bg-pink-900/10' },
                { icon: Activity, label: 'Uptime', val: '99.9%', color: 'text-forest-green', bg: 'bg-green-50 dark:bg-green-900/10' },
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

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-gray-900 rounded-[3rem] p-10 text-white relative overflow-hidden group shadow-2xl">
                 <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent" />
                 <h2 className="text-4xl font-black tracking-tight mb-4 relative z-10">System Superuser Dashboard</h2>
                 <p className="text-gray-400 font-bold mb-10 max-w-xl relative z-10 leading-relaxed uppercase tracking-widest text-xs">
                   Complete administrative control over the Youth For Children Innovation Lab infrastructure. Manage project contexts, global styles, and system-wide configurations.
                 </p>
                 <div className="flex gap-4 relative z-10">
                    <Button onClick={() => setActiveTab('projects')} className="bg-red-600 hover:bg-red-700 h-12 px-8 rounded-xl font-black text-xs uppercase tracking-widest">
                       Manage Projects
                    </Button>
                    <Button variant="outline" className="border-white/10 hover:bg-white/5 h-12 px-8 rounded-xl font-black text-xs uppercase tracking-widest">
                       Configure Backend
                    </Button>
                 </div>
                 <ShieldAlert className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 rotate-12" />
              </div>

              <div className="bg-white rounded-[3rem] p-8 border border-gray-100 shadow-xl space-y-6">
                <h3 className="text-sm font-black uppercase tracking-widest flex items-center justify-between">
                  Live Traffic
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </h3>
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                       <div className="w-1.5 h-8 bg-red-600 rounded-full" />
                       <div>
                         <p className="text-xs font-black text-gray-800">Cluster Node #{i}</p>
                         <p className="text-[10px] text-gray-400 font-bold">Stable • 12ms Latency</p>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full p-6 bg-white dark:bg-gray-900">
      <div className="px-2 mb-8">
        <p className="text-[10px] font-black text-udsm-blue dark:text-udsm-gold uppercase tracking-[0.2em]">System Admin</p>
        <div className="h-1 w-8 bg-udsm-gold mt-1 rounded-full" />
      </div>

      <nav className="flex-1 space-y-2">
        <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-500 hover:text-udsm-blue hover:bg-slate-50 dark:hover:bg-gray-800 transition-all">
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
            {activeTab === tab.id && <motion.div layoutId="activeDotSuper" className="w-2 h-2 rounded-full bg-udsm-gold shadow-[0_0_10px_rgba(251,191,36,0.8)]" />}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800 space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-udsm-blue/10 rounded-full flex items-center justify-center text-udsm-blue font-black border-2 border-white dark:border-gray-700 shadow-sm">
            {user?.name?.charAt(0) || 'S'}
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-black text-gray-900 dark:text-white truncate">{user?.name || 'Superuser'}</p>
            <p className="text-[8px] font-bold text-udsm-blue uppercase tracking-widest">Root Authority</p>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={onLogout}
          className="w-full rounded-xl border-red-100 dark:border-red-900/30 text-red-600 hover:bg-red-600 hover:text-white font-black text-[10px] uppercase h-12 gap-2 transition-all shadow-sm"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden" />
            <motion.aside initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed inset-y-0 left-0 w-[280px] bg-white dark:bg-gray-900 z-[70] lg:hidden shadow-2xl">
              <button onClick={() => setIsSidebarOpen(false)} className="absolute top-6 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white lg:hidden">
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
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2.5 bg-slate-100 dark:bg-gray-800 rounded-xl text-udsm-blue shadow-inner transition-all hover:scale-105 active:scale-95">
              <Menu className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-black text-gray-900 dark:text-white tracking-tight uppercase">{tabs.find(t => t.id === activeTab)?.label}</h2>
          </div>
          <Bell className="h-5 w-5 text-gray-400" />
        </header>

        <main className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/50 dark:bg-gray-950/50">
          <div className="py-8 px-4 md:px-10 max-w-7xl mx-auto min-h-full">
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
      {/* Close the flex flex-1 container from line 339 */}
      </div>
    </div>
  );
};

export default SuperuserDashboard;
