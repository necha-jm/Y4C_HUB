import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, MessageSquare, Flag, Users,
  FileText, CheckSquare, Layout,
  UserPlus, Calendar, CalendarDays, Layers, Monitor, BarChart3, Video, TrendingUp, PieChart, Clock
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, Cell, PieChart as RePieChart, Pie } from 'recharts';
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
    { id: 'overview', label: 'Overview', icon: Layout, color: 'text-purple-500' },
    { id: 'hcd', label: 'HCD Lab', icon: BarChart3, color: 'text-yellow-500' },
    { id: 'landing', label: 'Landing Page', icon: Monitor, color: 'text-pink-500' },
    { id: 'requests', label: 'Student Requests', icon: MessageSquare, color: 'text-indigo-500' },
    { id: 'members', label: 'Members', icon: UserPlus, color: 'text-blue-500' },
    { id: 'events', label: 'Events & Media', icon: Calendar, color: 'text-pink-500' },
    { id: 'projects', label: 'Projects', icon: Layers, color: 'text-orange-500' },
    { id: 'timetable', label: 'Timetable', icon: CalendarDays, color: 'text-green-500' },
  ];

  const statData = [
    { name: 'Week 1', students: 400, projects: 240 },
    { name: 'Week 2', students: 300, projects: 139 },
    { name: 'Week 3', students: 200, projects: 980 },
    { name: 'Week 4', students: 278, projects: 390 },
    { name: 'Week 5', students: 189, projects: 480 },
  ];

  const projectStatus = [
    { name: 'Completed', value: 400, color: '#10b981' },
    { name: 'In Progress', value: 300, color: '#3b82f6' },
    { name: 'Pending', value: 300, color: '#f59e0b' },
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
        <div className="space-y-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
             <button onClick={launchZoom} className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-200 hover:scale-105 transition-all flex flex-col items-center gap-4 group">
                <div className="p-4 bg-white/20 rounded-2xl group-hover:rotate-12 transition-transform">
                  <Video className="h-8 w-8" />
                </div>
                <span className="font-black uppercase tracking-widest text-sm">Launch Zoom Meeting</span>
             </button>

             <div className="bg-white p-8 rounded-[2.5rem] border border-purple-100 flex flex-col items-center justify-center text-center">
                <p className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em] mb-2">Total Students</p>
                <p className="text-5xl font-black text-gray-900">{stats?.totalStudents || 0}</p>
                <div className="flex items-center gap-1 text-green-500 text-xs font-bold mt-2">
                  <TrendingUp className="h-3 w-3" /> {stats?.pendingUsers || 0} pending admission
                </div>
             </div>

             <div className="bg-white p-8 rounded-[2.5rem] border border-orange-100 flex flex-col items-center justify-center text-center">
                <p className="text-[10px] font-black text-orange-400 uppercase tracking-[0.2em] mb-2">Active Projects</p>
                <p className="text-5xl font-black text-gray-900">{stats?.activeProjects || 0}</p>
                <div className="flex items-center gap-1 text-orange-500 text-xs font-bold mt-2">
                  <Clock className="h-3 w-3" /> {stats?.pendingProjects || 0} pending review
                </div>
             </div>

             <div className="bg-gray-900 p-8 rounded-[2.5rem] text-white flex flex-col items-center justify-center text-center shadow-2xl">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">Lab Efficiency</p>
                <p className="text-5xl font-black text-white">{stats?.efficiency || 0}%</p>
                <div className="w-full bg-white/10 h-1.5 rounded-full mt-4 overflow-hidden">
                   <motion.div initial={{ width: 0 }} animate={{ width: `${stats?.efficiency || 0}%` }} transition={{ duration: 1.5 }} className="h-full bg-purple-500 shadow-[0_0_10px_#a855f7]" />
                </div>
             </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Main Progress Chart */}
              <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-gray-100 h-[500px]">
                <div className="flex items-center justify-between mb-8">
                   <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                     <BarChart3 className="h-6 w-6 text-blue-500" />
                     Growth & Progress
                   </h2>
                   <select className="bg-gray-50 border-none rounded-xl px-4 py-2 font-bold text-sm outline-none">
                      <option>Last 30 Days</option>
                      <option>Last 6 Months</option>
                   </select>
                </div>
                <div className="h-full pb-16">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stats?.growthData || statData}>
                      <defs>
                        <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 700, fontSize: 12}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 700, fontSize: 12}} />
                      <Tooltip
                        contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}}
                        itemStyle={{fontWeight: 900, textTransform: 'uppercase', fontSize: '10px'}}
                      />
                      <Area type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorStudents)" />
                      <Area type="monotone" dataKey="projects" stroke="#a855f7" strokeWidth={4} fillOpacity={0} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              {/* Project Status Pie */}
              <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-gray-100 h-[500px] flex flex-col">
                 <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                   <PieChart className="h-5 w-5 text-orange-500" />
                   Project Lifecycle
                 </h3>
                 <div className="flex-grow">
                   <ResponsiveContainer width="100%" height="100%">
                      <RePieChart>
                        <Pie
                          data={stats?.lifecycleData || projectStatus}
                          cx="50%"
                          cy="50%"
                          innerRadius={80}
                          outerRadius={120}
                          paddingAngle={8}
                          dataKey="value"
                        >
                          {(stats?.lifecycleData || projectStatus).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RePieChart>
                   </ResponsiveContainer>
                 </div>
                 <div className="grid grid-cols-1 gap-3 mt-4">
                    {(stats?.lifecycleData || projectStatus).map(s => (
                      <div key={s.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                         <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full" style={{backgroundColor: s.color}} />
                            <span className="font-bold text-sm text-gray-700">{s.name}</span>
                         </div>
                         <span className="font-black text-gray-900">{s.value}</span>
                      </div>
                    ))}
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-purple-50 to-white min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-6"
      >
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-purple-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-purple-200 rotate-3">
            <ShieldCheck className="h-10 w-10 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Community Facilitator</h1>
            <p className="text-purple-600 font-bold text-sm tracking-widest uppercase mt-1">Trust & Safety Dashboard</p>
          </div>
        </div>

        <div className="flex bg-white/50 backdrop-blur-sm p-1.5 rounded-[2rem] shadow-sm border border-purple-100 max-w-fit">
          <button className="px-6 py-3 bg-purple-600 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-lg shadow-purple-100 flex items-center gap-2">
            <Monitor className="h-4 w-4" /> Live Hub
          </button>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white shadow-xl shadow-purple-200 scale-105'
                : 'bg-white text-gray-500 hover:bg-purple-50 border border-purple-100'
            }`}
          >
            <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? 'text-white' : tab.color}`} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
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
  );
};

export default FacilitatorDashboard;
