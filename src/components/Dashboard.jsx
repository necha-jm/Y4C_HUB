import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthService } from '@/core/services/AuthService';

// Import Role-Specific Dashboards
import SuperuserDashboard from './dashboards/SuperuserDashboard';
import FacilitatorDashboard from './dashboards/FacilitatorDashboard';
import CoordinatorDashboard from './dashboards/CoordinatorDashboard';
import MemberDashboard from './dashboards/MemberDashboard';
import GuestDashboard from './dashboards/GuestDashboard';

const Dashboard = ({ onLogout }) => {
  const currentUser = AuthService.getCurrentUser();

  const getDashboard = () => {
    const role = currentUser?.role?.toLowerCase();
    switch (role) {
      case 'superuser': return <SuperuserDashboard user={currentUser} onLogout={onLogout} />;
      case 'facilitator': return <FacilitatorDashboard user={currentUser} onLogout={onLogout} />;
      case 'coordinator': return <CoordinatorDashboard user={currentUser} onLogout={onLogout} />;
      case 'member': return <MemberDashboard user={currentUser} onLogout={onLogout} />;
      case 'guest': return <GuestDashboard user={currentUser} onLogout={onLogout} />;
      default: return <MemberDashboard user={currentUser} onLogout={onLogout} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 transition-colors duration-500 overflow-x-hidden">
      {/* Main Content Area */}
      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentUser?.role}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {getDashboard()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Dashboard;
