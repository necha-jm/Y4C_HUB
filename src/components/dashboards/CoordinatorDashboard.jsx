import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Laptop, BookOpen, Users, Calendar, Video, Star,
  ShieldCheck, UserPlus, Trash2, CheckCircle, RefreshCw, X, Layers
} from 'lucide-react';
import apiClient from '@/core/apiClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Import Shared Components
import ProjectReview from './moderator/ProjectReview';
import EventManager from './moderator/EventManager';
import ExpertManager from './moderator/ExpertManager';

const CoordinatorDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [pendingFacilitators, setPendingFacilitators] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFacilitator, setNewFacilitator] = useState({
    name: '',
    email: '',
    password: 'facilitator123'
  });

  const [stats, setStats] = useState({ activeMentees: 0, coursesLed: 0, avgRating: 0, liveSessions: 0 });
  const [schedule, setSchedule] = useState([]);
  const [mentees, setMentees] = useState([]);

  const fetchCoordinatorData = async () => {
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
      toast({ title: "Success", description: "Facilitator admitted and notified via email!" });
      fetchPendingFacilitators();
    } catch (error) {
      toast({ title: "Error", description: "Failed to admit facilitator", variant: "destructive" });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this facilitator?")) {
      try {
        await apiClient.delete(`/coordinator/facilitators/${id}`);
        toast({ title: "Deleted", description: "Facilitator removed successfully" });
        fetchPendingFacilitators();
      } catch (error) {
        toast({ title: "Error", description: "Failed to delete", variant: "destructive" });
      }
    }
  };

  const handleAddFacilitator = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/coordinator/facilitators', newFacilitator);
      toast({ title: "Success", description: "Facilitator added and notified!" });
      setShowAddForm(false);
      setNewFacilitator({ name: '', email: '', password: 'facilitator123' });
    } catch (error) {
      toast({ title: "Error", description: "Failed to add facilitator", variant: "destructive" });
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'projects':
        return <ProjectReview role="coordinator" />;
      case 'events':
        return <EventManager role="coordinator" />;
      case 'experts':
        return <ExpertManager />;
      case 'facilitators':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-blue-600" />
                Facilitator Management
              </h2>
              <div className="flex gap-4">
                <Button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700 gap-2 rounded-xl font-bold">
                  <UserPlus className="h-4 w-4" /> Add Facilitator
                </Button>
                <Button onClick={fetchPendingFacilitators} variant="outline" className="rounded-xl">
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
                  className="bg-blue-50 p-8 rounded-3xl border border-blue-100 relative mb-8"
                >
                  <button onClick={() => setShowAddForm(false)} className="absolute top-6 right-6 text-blue-400 hover:text-blue-600">
                    <X className="h-6 w-6" />
                  </button>
                  <h3 className="text-xl font-bold text-blue-900 mb-6">Create New Facilitator</h3>
                  <form onSubmit={handleAddFacilitator} className="grid md:grid-cols-3 gap-4">
                    <Input required placeholder="Full Name" value={newFacilitator.name} onChange={(e) => setNewFacilitator({...newFacilitator, name: e.target.value})} className="rounded-xl" />
                    <Input required type="email" placeholder="Email Address" value={newFacilitator.email} onChange={(e) => setNewFacilitator({...newFacilitator, email: e.target.value})} className="rounded-xl" />
                    <Button type="submit" className="bg-blue-600 rounded-xl font-bold">Send Invite & Create</Button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid gap-4">
              {pendingFacilitators.length === 0 ? (
                <div className="bg-white p-12 rounded-[2rem] text-center border-2 border-dashed border-gray-100">
                  <p className="text-gray-400 font-bold">No pending facilitator requests.</p>
                </div>
              ) : (
                pendingFacilitators.map(mod => (
                  <motion.div key={mod.id} layout className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                        {mod.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{mod.name}</p>
                        <p className="text-sm text-gray-500">{mod.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => handleAdmit(mod.id)} className="bg-green-600 hover:bg-green-700 rounded-xl gap-2 font-bold">
                        <CheckCircle className="h-4 w-4" /> Admit
                      </Button>
                      <Button onClick={() => handleDelete(mod.id)} variant="outline" className="text-red-600 border-red-100 hover:bg-red-50 rounded-xl">
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
          <>
            <div className="grid lg:grid-cols-4 gap-6 mb-12">
              {[
                { icon: Users, label: 'Active Mentees', val: stats.activeMentees, color: 'blue' },
                { icon: BookOpen, label: 'Courses Led', val: stats.coursesLed, color: 'indigo' },
                { icon: Star, label: 'Average Rating', val: stats.avgRating, color: 'yellow' },
                { icon: Video, label: 'Live Sessions', val: stats.liveSessions, color: 'red' },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-6 rounded-[2rem] shadow-lg border border-blue-50 flex items-center gap-6"
                >
                  <div className={`p-4 bg-${s.color}-100 rounded-2xl`}>
                    <s.icon className={`h-6 w-6 text-${s.color}-600`} />
                  </div>
                  <div>
                    <p className="text-gray-500 font-bold text-[10px] uppercase tracking-widest">{s.label}</p>
                    <p className="text-2xl font-black text-gray-900">{s.val}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-blue-50"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <Calendar className="h-6 w-6 text-blue-500" />
                    Upcoming Schedule
                  </h2>
                  <button className="text-blue-600 font-bold text-sm hover:underline">View Calendar</button>
                </div>
                <div className="space-y-6">
                  {schedule.length === 0 ? (
                    <p className="text-gray-400 text-sm italic">No sessions scheduled yet.</p>
                  ) : (
                    schedule.slice(0, 3).map((ev, i) => (
                      <div key={i} className="flex items-center gap-6 p-6 rounded-3xl bg-blue-50/50 border border-blue-100 hover:bg-blue-50 transition-colors">
                        <div className="text-center w-20 flex-shrink-0">
                          <p className="font-black text-blue-600 text-lg">{ev.startTime}</p>
                          <p className="text-[10px] font-black text-blue-400 uppercase">{ev.dayOfWeek}</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-gray-900">{ev.activity}</p>
                          <span className="px-3 py-1 bg-white text-blue-600 text-[10px] font-black rounded-full uppercase tracking-widest border border-blue-200 mt-2 inline-block">
                            {ev.location}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden"
              >
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-6">Mentee Progress</h2>
                  <div className="space-y-8">
                    {mentees.length === 0 ? (
                      <p className="text-white/60 italic text-sm">No mentees active.</p>
                    ) : (
                      mentees.map((m, i) => (
                        <div key={i}>
                          <div className="flex justify-between mb-2 font-bold text-sm">
                            <span>{m.name}</span>
                            <span>{m.prog}%</span>
                          </div>
                          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${m.prog}%` }}
                              transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                              className={`h-full ${m.color}`}
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <button className="w-full mt-10 py-4 bg-white text-blue-700 rounded-2xl font-black text-lg shadow-xl hover:bg-blue-50 transition-colors">
                    Submit Monthly Report
                  </button>
                </div>
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
              </motion.div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="p-8 bg-blue-50/30 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-6"
        >
          <div className="relative">
            <div className="w-24 h-24 bg-blue-600 rounded-3xl rotate-6 shadow-xl" />
            <div className="absolute inset-0 w-24 h-24 bg-white rounded-3xl flex items-center justify-center border-4 border-blue-600 shadow-inner">
              <Laptop className="h-10 w-10 text-blue-600" />
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Program Coordinator</h1>
            <p className="text-blue-600 font-bold text-sm tracking-widest uppercase mt-1">Orchestrating Growth</p>
          </div>
        </motion.div>

        <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-blue-100">
          {[
            { id: 'overview', label: 'Overview', icon: Laptop },
            { id: 'projects', label: 'Projects', icon: Layers },
            { id: 'events', label: 'Events', icon: Calendar },
            { id: 'experts', label: 'Experts', icon: Users },
            { id: 'facilitators', label: 'Facilitators', icon: ShieldCheck },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${
                activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:bg-blue-50'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

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

export default CoordinatorDashboard;
