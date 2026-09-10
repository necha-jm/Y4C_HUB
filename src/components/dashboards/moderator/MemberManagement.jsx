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
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <UserPlus className="h-6 w-6 text-blue-500" />
          Member Management
        </h2>
        <div className="flex gap-2">
          <Button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700 gap-2">
            <UserPlus className="h-4 w-4" />
            Add Member
          </Button>
          <Button onClick={fetchPendingUsers} variant="outline" size="sm" className="gap-2">
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-blue-50 p-8 rounded-3xl border border-blue-100 mb-8 relative"
          >
            <button onClick={() => setShowAddForm(false)} className="absolute top-6 right-6 text-blue-400 hover:text-blue-600">
              <X className="h-6 w-6" />
            </button>
            <h3 className="text-xl font-bold text-blue-900 mb-6">Direct Member Addition</h3>
            <form onSubmit={handleAddMember} className="grid md:grid-cols-3 gap-4">
              <Input required placeholder="Full Name" value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} className="rounded-xl" />
              <Input required type="email" placeholder="Email Address" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} className="rounded-xl" />
              <select
                className="rounded-xl bg-white border border-gray-200 px-4 font-bold outline-none"
                value={newUser.role}
                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
              >
                <option value="member">Normal Member</option>
                <option value="facilitator">Facilitator</option>
                <option value="coordinator">Coordinator</option>
              </select>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 h-12 rounded-xl font-bold md:col-span-3 mt-2">
                Create Account (Active)
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
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.email} • <span className="uppercase font-bold text-[10px] text-blue-500">{user.role}</span></p>
                  {user.university && <p className="text-xs text-gray-400 mt-0.5">{user.university} - {user.program}</p>}
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => handleAdmit(user.id)} variant="outline" className="text-green-600 border-green-200 hover:bg-green-50 gap-2">
                  <UserCheck className="h-4 w-4" />
                  Admit
                </Button>
                <Button onClick={() => handleDelete(user.id)} variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 gap-2">
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
