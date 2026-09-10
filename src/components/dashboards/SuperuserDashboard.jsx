import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Users, Settings, Database, Activity, Server } from 'lucide-react';

const SuperuserDashboard = ({ user }) => {
  const stats = [
    { label: 'Total Users', value: '1,284', icon: Users, color: 'bg-red-500' },
    { label: 'System Health', value: '99.9%', icon: Activity, color: 'bg-green-500' },
    { label: 'Database Load', value: '12%', icon: Database, color: 'bg-blue-500' },
    { label: 'Active Servers', value: '4', icon: Server, color: 'bg-purple-500' },
  ];

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-10"
      >
        <div className="p-4 bg-red-100 rounded-2xl">
          <ShieldAlert className="h-10 w-10 text-red-600" />
        </div>
        <div>
          <h1 className="text-4xl font-black text-gray-900">System Admin Control</h1>
          <p className="text-red-500 font-bold uppercase tracking-widest text-xs mt-1">Superuser Access Granted</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-3xl shadow-xl border border-red-50"
          >
            <div className={`${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <p className="text-gray-500 font-bold text-sm uppercase tracking-wider">{stat.label}</p>
            <p className="text-3xl font-black text-gray-900 mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-2xl overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Settings className="h-6 w-6 text-red-500" />
            Critical System Configuration
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="font-medium text-gray-300">System Kernel Node #{i}</span>
                </div>
                <button className="px-4 py-2 bg-red-600 rounded-xl text-xs font-bold uppercase hover:bg-red-700 transition-colors">Manage</button>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Security Logs</h2>
          <div className="space-y-6">
            {['Login attempt blocked', 'Database backup complete', 'Firewall rules updated'].map((log, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-0.5 h-12 bg-red-100 relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-red-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{log}</p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SuperuserDashboard;
