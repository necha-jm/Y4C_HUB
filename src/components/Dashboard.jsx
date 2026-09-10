import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  LogOut, Menu, X, Bell, User,
  LayoutDashboard, ShieldAlert, ShieldCheck,
  Laptop, Users as UsersIcon, Coffee, Home
} from 'lucide-react';
import { AuthService } from '@/core/services/AuthService';
import Logo from '@/components/ui/Logo';
import { cn } from '@/lib/utils';

// Import Role-Specific Dashboards
import SuperuserDashboard from './dashboards/SuperuserDashboard';
import FacilitatorDashboard from './dashboards/FacilitatorDashboard';
import CoordinatorDashboard from './dashboards/CoordinatorDashboard';
import MemberDashboard from './dashboards/MemberDashboard';
import GuestDashboard from './dashboards/GuestDashboard';

const Dashboard = ({ onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentUser = AuthService.getCurrentUser();
  const navigate = useNavigate();

  const getDashboard = () => {
    const role = currentUser?.role?.toLowerCase();
    switch (role) {
      case 'superuser': return <SuperuserDashboard user={currentUser} />;
      case 'facilitator': return <FacilitatorDashboard user={currentUser} />;
      case 'coordinator': return <CoordinatorDashboard user={currentUser} />;
      case 'member': return <MemberDashboard user={currentUser} />;
      case 'guest': return <GuestDashboard user={currentUser} />;
      default: return <MemberDashboard user={currentUser} />;
    }
  };

  const getRoleIcon = () => {
    const iconClass = "h-6 w-6 relative z-10 animate-pulse";
    const role = currentUser?.role?.toLowerCase();
    switch (role) {
      case 'superuser': return <ShieldAlert className={`${iconClass} text-red-500`} />;
      case 'facilitator': return <ShieldCheck className={`${iconClass} text-purple-500`} />;
      case 'coordinator': return <Laptop className={`${iconClass} text-blue-500`} />;
      case 'member': return <UsersIcon className={`${iconClass} text-green-500`} />;
      case 'guest': return <Coffee className={`${iconClass} text-orange-500`} />;
      default: return <User className={iconClass} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-gray-950 transition-colors duration-500">
      {/* Navbar */}
      <nav className="h-24 bg-white/70 dark:bg-gray-900/80 backdrop-blur-2xl border-b border-gray-100 dark:border-gray-800 fixed top-0 left-0 right-0 z-50 px-12 flex items-center justify-between shadow-sm">
        <Link to="/">
          <Logo iconClassName="h-12 w-12" />
        </Link>

        <div className="flex items-center gap-8">
          <button
            onClick={() => navigate('/')}
            className="p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:shadow-inner group flex items-center gap-2"
          >
            <Home className="h-6 w-6 group-hover:-translate-y-0.5 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest hidden md:block">Main Site</span>
          </button>

          <div className="h-10 w-[1px] bg-gray-200 dark:bg-gray-700" />

          <button className="relative p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:shadow-inner group">
            <Bell className="h-6 w-6 group-hover:rotate-12 transition-transform" />
            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-900 ring-4 ring-red-500/20" />
          </button>

          <div className="h-10 w-[1px] bg-gray-200 dark:bg-gray-700" />

          <div className="flex items-center gap-5">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-gray-900 dark:text-white tracking-tight">{currentUser?.name}</p>
              <div className="flex items-center justify-end gap-1.5 mt-1">
                <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse",
                  currentUser?.role?.toLowerCase() === 'superuser' ? 'bg-red-500' :
                  currentUser?.role?.toLowerCase() === 'facilitator' ? 'bg-purple-500' :
                  currentUser?.role?.toLowerCase() === 'coordinator' ? 'bg-blue-500' :
                  'bg-green-500'
                )} />
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">{currentUser?.role}</p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center border border-gray-100 dark:border-gray-700 shadow-xl overflow-hidden">
                {getRoleIcon()}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLogout}
              className="p-3 bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 rounded-2xl hover:bg-red-500 dark:hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-red-200"
            >
              <LogOut className="h-6 w-6" />
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-20 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentUser?.role}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {getDashboard()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Quick Actions Float (Experimental) */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-10 right-10 w-16 h-16 bg-gray-900 text-white rounded-2xl shadow-2xl flex items-center justify-center z-50"
      >
        <LayoutDashboard className="h-8 w-8" />
      </motion.button>
    </div>
  );
};

export default Dashboard;
