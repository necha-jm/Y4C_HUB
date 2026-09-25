import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCheck, UserX, UserPlus, Users, Search, RefreshCw, X, ShieldCheck, Mail, Building, Trash2 } from 'lucide-react';
import apiClient from '@/core/apiClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const MemberManagement = () => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('active'); // 'active' or 'pending'
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: 'password123',
    role: 'MEMBER',
    university: 'University of Dar es Salaam',
    program: 'Y4C Innovation Hub'
  });

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const [pendingRes, activeRes] = await Promise.all([
        apiClient.get('/facilitator/users/pending').catch(() => ({ data: [] })),
        apiClient.get('/facilitator/users/active').catch(() => ({ data: [] }))
      ]);

      if (pendingRes.data && Array.isArray(pendingRes.data)) {
        setPendingUsers(pendingRes.data);
      }
      if (activeRes.data && Array.isArray(activeRes.data)) {
        setActiveUsers(activeRes.data);
      }
    } catch (error) {
      console.error('Failed to fetch users', error);
      toast({ title: "Error", description: "Could not load members list.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/facilitator/users', {
        ...newUser,
        role: newUser.role.toUpperCase()
      });
      toast({ title: "Member Created! 🎉", description: `${newUser.name} has been added as an Active Member.` });
      setNewUser({
        name: '',
        email: '',
        password: 'password123',
        role: 'MEMBER',
        university: 'University of Dar es Salaam',
        program: 'Y4C Innovation Hub'
      });
      setShowAddForm(false);
      setActiveTab('active');
      fetchUsers();
    } catch (error) {
      const errorMsg = typeof error.response?.data === 'string'
        ? error.response.data
        : error.response?.data?.message || error.message || "Failed to add member";
      toast({ title: "Notice", description: errorMsg, variant: "destructive" });
    }
  };

  const handleAdmit = async (userId) => {
    try {
      await apiClient.put(`/facilitator/users/${userId}/admit`);
      toast({ title: "Member Admitted! ✅", description: "User has been activated and assigned member status." });
      setActiveTab('active');
      fetchUsers();
    } catch (error) {
      toast({ title: "Error", description: "Failed to admit user", variant: "destructive" });
    }
  };

  const handleDelete = async (userId, isPending = false) => {
    const actionText = isPending ? 'reject this registration request' : 'remove this active member';
    if (window.confirm(`Are you sure you want to ${actionText}?`)) {
      try {
        await apiClient.delete(`/facilitator/users/${userId}`);
        toast({ title: "Removed", description: isPending ? "Registration request rejected" : "Member removed successfully" });
        fetchUsers();
      } catch (error) {
        toast({ title: "Error", description: "Failed to delete user", variant: "destructive" });
      }
    }
  };

  const filteredActiveUsers = activeUsers.filter(u =>
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.university?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.program?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPendingUsers = pendingUsers.filter(u =>
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.university?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.program?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black flex items-center gap-3 tracking-tight text-gray-900 dark:text-white">
            <Users className="h-6 w-6 text-udsm-blue" />
            Member Management
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-bold mt-1">
            Register new members, approve pending applications, and manage active hub members.
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-udsm-blue hover:bg-blue-700 text-white gap-2 rounded-xl px-6 font-black uppercase tracking-widest text-xs h-12 shadow-lg shadow-blue-500/20"
          >
            <UserPlus className="h-4 w-4" />
            Add Member
          </Button>
          <Button
            onClick={fetchUsers}
            variant="outline"
            size="sm"
            className="gap-2 rounded-xl h-12 border-2 px-4"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="font-bold text-xs">Refresh</span>
          </Button>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'active'
                ? 'bg-udsm-blue text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            Active Members
            <span className="ml-1 px-2 py-0.5 text-[10px] rounded-full bg-white/20 text-white font-black">
              {activeUsers.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('pending')}
            className={`px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'pending'
                ? 'bg-udsm-gold text-black shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
            }`}
          >
            <UserPlus className="h-4 w-4" />
            Pending Approvals
            <span className="ml-1 px-2 py-0.5 text-[10px] rounded-full bg-black/10 text-black font-black">
              {pendingUsers.length}
            </span>
          </button>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search member name/email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-11 rounded-xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-xs font-bold"
          />
        </div>
      </div>

      {/* Add Member Form Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-blue-100 dark:border-gray-800 relative shadow-2xl space-y-6"
          >
            <button
              onClick={() => setShowAddForm(false)}
              className="absolute top-8 right-8 text-gray-400 hover:text-udsm-blue transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                <div className="w-2 h-7 bg-udsm-blue rounded-full" />
                Register New Active Member
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">
                Directly add a user to the Y4C Hub. The account will be immediately activated and assigned.
              </p>
            </div>

            <form onSubmit={handleAddMember} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name *</label>
                <Input
                  required
                  placeholder="e.g. Jane Doe"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="rounded-xl h-12 bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700 font-bold text-xs"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address *</label>
                <Input
                  required
                  type="email"
                  placeholder="jane@example.com"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="rounded-xl h-12 bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700 font-bold text-xs"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Assigned Role</label>
                <select
                  className="w-full h-12 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 px-4 font-bold text-xs outline-none focus:ring-2 focus:ring-udsm-blue text-gray-800 dark:text-white"
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                  <option value="MEMBER">Hub Member</option>
                  <option value="FACILITATOR">Facilitator</option>
                  <option value="COORDINATOR">Coordinator</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">University / Organization</label>
                <Input
                  placeholder="e.g. University of Dar es Salaam"
                  value={newUser.university}
                  onChange={(e) => setNewUser({ ...newUser, university: e.target.value })}
                  className="rounded-xl h-12 bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700 font-bold text-xs"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Program / Focus</label>
                <Input
                  placeholder="e.g. Computer Science / Innovation"
                  value={newUser.program}
                  onChange={(e) => setNewUser({ ...newUser, program: e.target.value })}
                  className="rounded-xl h-12 bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700 font-bold text-xs"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Initial Password</label>
                <Input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="rounded-xl h-12 bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700 font-bold text-xs"
                />
              </div>

              <div className="md:col-span-2 lg:col-span-3 pt-2">
                <Button
                  type="submit"
                  className="w-full bg-udsm-blue hover:bg-blue-700 text-white h-13 rounded-xl font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 text-xs"
                >
                  Register & Activate Account
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table Content Area */}
      {activeTab === 'active' ? (
        filteredActiveUsers.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 p-12 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800 text-center">
            <Users className="h-10 w-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400 font-bold text-sm">
              {searchTerm ? 'No active members match your search.' : 'No active members registered yet.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-800 text-[10px] font-black uppercase text-gray-500 dark:text-gray-400 tracking-wider">
                  <th className="py-4 px-6">Member</th>
                  <th className="py-4 px-6">University / Institution</th>
                  <th className="py-4 px-6">Program / Focus</th>
                  <th className="py-4 px-6">Role</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs font-bold text-gray-800 dark:text-gray-200">
                {filteredActiveUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-udsm-blue/10 text-udsm-blue dark:bg-blue-950 dark:text-blue-400 rounded-xl flex items-center justify-center font-black text-sm border border-udsm-blue/20 flex-shrink-0">
                          {user.name ? user.name.charAt(0).toUpperCase() : 'M'}
                        </div>
                        <div>
                          <p className="font-black text-gray-900 dark:text-white tracking-tight">{user.name}</p>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium flex items-center gap-1 mt-0.5">
                            <Mail className="h-3 w-3 text-gray-400" />
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                        <Building className="h-3.5 w-3.5 text-gray-400" />
                        <span>{user.university || 'University of Dar es Salaam'}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-gray-600 dark:text-gray-400 font-medium">
                      {user.program || 'Innovation Hub'}
                    </td>

                    <td className="py-4 px-6">
                      <span className="px-3 py-1 bg-blue-50 text-udsm-blue dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-[9px] font-black uppercase tracking-wider">
                        {user.role || 'MEMBER'}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full font-black text-[9px] uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
                        <ShieldCheck className="h-3 w-3" /> Active
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <Button
                        onClick={() => handleDelete(user.id, false)}
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 gap-1.5 rounded-xl font-bold text-xs h-8 px-3"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        filteredPendingUsers.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 p-12 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800 text-center">
            <UserCheck className="h-10 w-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400 font-bold text-sm">
              {searchTerm ? 'No pending requests match your search.' : 'No pending member registration requests.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-800 text-[10px] font-black uppercase text-gray-500 dark:text-gray-400 tracking-wider">
                  <th className="py-4 px-6">Applicant</th>
                  <th className="py-4 px-6">Institution & Program</th>
                  <th className="py-4 px-6">Requested Role</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs font-bold text-gray-800 dark:text-gray-200">
                {filteredPendingUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0">
                          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                          <p className="font-black text-gray-900 dark:text-white tracking-tight">{user.name}</p>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium flex items-center gap-1 mt-0.5">
                            <Mail className="h-3 w-3 text-gray-400" />
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <p className="text-gray-800 dark:text-gray-200">{user.university || 'University of Dar es Salaam'}</p>
                      <p className="text-[10px] text-gray-400 font-medium">{user.program || 'General Applicant'}</p>
                    </td>

                    <td className="py-4 px-6">
                      <span className="px-3 py-1 bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 rounded-full text-[9px] font-black uppercase tracking-wider">
                        {user.role || 'MEMBER'}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <span className="px-3 py-0.5 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-full font-black text-[9px] uppercase tracking-wider border border-amber-200 dark:border-amber-800">
                        Pending
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          onClick={() => handleAdmit(user.id)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5 rounded-xl font-bold text-xs h-8 px-4 shadow-sm"
                        >
                          <UserCheck className="h-3.5 w-3.5" />
                          Approve & Admit
                        </Button>
                        <Button
                          onClick={() => handleDelete(user.id, true)}
                          variant="outline"
                          className="text-red-500 border-red-200 dark:border-red-900/40 hover:bg-red-50 dark:hover:bg-red-950/30 gap-1.5 rounded-xl font-bold text-xs h-8 px-3"
                        >
                          <UserX className="h-3.5 w-3.5" />
                          Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
};

export default MemberManagement;