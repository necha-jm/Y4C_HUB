import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCheck, UserX, UserPlus, Search, RefreshCw, X } from 'lucide-react';
import apiClient from '@/core/apiClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const MemberManagement = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: 'password123',
    role: 'member'
  });

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/auth/register', { ...newUser, status: 'ACTIVE' });
      toast({ title: "Success", description: "Member added directly" });
      setShowAddForm(false);
      fetchPendingUsers();
    } catch (error) {
      toast({ title: "Error", description: "Failed to add member", variant: "destructive" });
    }
  };

  const fetchPendingUsers = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get('/facilitator/users/pending');
      if (response.data && Array.isArray(response.data)) {
        setPendingUsers(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch pending users', error);
      toast({ title: "Error", description: "Could not load pending users", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const handleAdmit = async (userId) => {
    try {
      await apiClient.put(`/facilitator/users/${userId}/admit`);
      toast({ title: "Success", description: "User admitted successfully" });
      fetchPendingUsers();
    } catch (error) {
      toast({ title: "Error", description: "Failed to admit user", variant: "destructive" });
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this registration request?')) {
      try {
        await apiClient.delete(`/facilitator/users/${userId}`);
        toast({ title: "Deleted", description: "Registration request removed" });
        fetchPendingUsers();
      } catch (error) {
        toast({ title: "Error", description: "Failed to delete request", variant: "destructive" });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black flex items-center gap-3 tracking-tight">
          <UserPlus className="h-6 w-6 text-udsm-blue" />
          Member Management
        </h2>
        <div className="flex gap-3">
          <Button onClick={() => setShowAddForm(true)} className="bg-udsm-blue hover:bg-blue-700 gap-2 rounded-xl px-6 font-black uppercase tracking-widest text-xs h-12 shadow-lg shadow-blue-100">
            <UserPlus className="h-4 w-4" />
            Add Member
          </Button>
          <Button onClick={fetchPendingUsers} variant="outline" size="sm" className="gap-2 rounded-xl h-12 border-2 px-4">
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="font-bold text-xs">Refresh</span>
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-blue-100 mb-8 relative shadow-xl"
          >
            <button onClick={() => setShowAddForm(false)} className="absolute top-8 right-8 text-gray-400 hover:text-udsm-blue transition-colors">
              <X className="h-6 w-6" />
            </button>
            <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-2 h-8 bg-udsm-blue rounded-full" />
              Direct Member Addition
            </h3>
            <form onSubmit={handleAddMember} className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                <Input required placeholder="e.g. John Doe" value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} className="rounded-xl h-12 bg-gray-50 border-none font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                <Input required type="email" placeholder="john@example.com" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} className="rounded-xl h-12 bg-gray-50 border-none font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Role Assignment</label>
                <select
                  className="w-full h-12 rounded-xl bg-gray-50 border-none px-4 font-bold outline-none focus:ring-2 focus:ring-udsm-blue"
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                >
                  <option value="member">Normal Member</option>
                  <option value="facilitator">Facilitator</option>
                  <option value="coordinator">Coordinator</option>
                </select>
              </div>
              <Button type="submit" className="bg-udsm-blue hover:bg-blue-700 h-14 rounded-xl font-black uppercase tracking-widest md:col-span-3 mt-2 shadow-lg shadow-blue-100">
                Create Account (Active Status)
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {pendingUsers.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border-2 border-dashed border-gray-200 text-center">
          <p className="text-gray-500 font-medium">No pending registration requests at the moment.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {pendingUsers.map((user) => (
            <motion.div
              layout
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between"
            >
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-udsm-blue rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-blue-100 rotate-3">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-black text-gray-900 tracking-tight">{user.name}</h3>
                  <p className="text-xs text-gray-500 font-bold">{user.email} • <span className="uppercase font-black text-[9px] text-udsm-blue tracking-widest">{user.role}</span></p>
                  {user.university && <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tighter">{user.university} — {user.program}</p>}
                </div>
              </div>
              <div className="flex gap-3">
                <Button onClick={() => handleAdmit(user.id)} variant="outline" className="text-green-600 border-green-100 hover:bg-green-50 gap-2 rounded-xl font-bold border-2">
                  <UserCheck className="h-4 w-4" />
                  Admit
                </Button>
                <Button onClick={() => handleDelete(user.id)} variant="outline" className="text-red-500 border-red-50 hover:bg-red-50 gap-2 rounded-xl font-bold border-2">
                  <UserX className="h-4 w-4" />
                  Reject
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemberManagement;
