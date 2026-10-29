import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, ShieldCheck, UserCheck, User, Coffee, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';
import { AuthService } from '@/core/services/AuthService';
import { toast } from '@/components/ui/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const roles = [
  { role: 'superuser', label: 'Superuser', email: 'admin@y4c.com', icon: ShieldAlert, color: 'bg-red-500' },
  { role: 'coordinator', label: 'Coordinator', email: 'coordinator@y4c.com', icon: ShieldCheck, color: 'bg-blue-600' },
  { role: 'facilitator', label: 'Facilitator', email: 'facilitator@y4c.com', icon: UserCheck, color: 'bg-emerald-600' },
  { role: 'member', label: 'Member (Student)', email: 'member@y4c.com', icon: User, color: 'bg-amber-500' },
  { role: 'guest', label: 'Guest Explorer', email: 'guest@y4c.com', icon: Coffee, color: 'bg-gray-600' }
];

const DemoRoleSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentUser = AuthService.getCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSwitchRole = (r) => {
    const userObj = {
      id: r.role === 'superuser' ? 1 : r.role === 'coordinator' ? 2 : r.role === 'facilitator' ? 3 : r.role === 'member' ? 4 : 5,
      name: `${r.label}`,
      email: r.email,
      role: r.role,
      status: 'ACTIVE',
      university: 'University of Dar es Salaam',
      program: 'Y4C Innovation Hub'
    };
    localStorage.setItem('y4c_user', JSON.stringify(userObj));
    toast({
      title: `Switched to ${r.label}! 🎭`,
      description: `Now previewing the live system as ${r.email}.`
    });
    setIsOpen(false);
    if (location.pathname !== '/dashboard') {
      navigate('/dashboard');
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[9999] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="mb-3 bg-slate-900/95 backdrop-blur-xl border border-white/20 p-4 rounded-3xl shadow-2xl w-64 space-y-2 text-white"
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10 px-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-udsm-gold flex items-center gap-1.5">
                <Sparkles className="h-3 w-3" /> Live Demo Switcher
              </span>
              <span className="text-[9px] text-gray-400 font-bold">1-Click Role</span>
            </div>

            <div className="space-y-1">
              {roles.map((r) => {
                const isActive = currentUser?.role?.toLowerCase() === r.role.toLowerCase();
                return (
                  <button
                    key={r.role}
                    onClick={() => handleSwitchRole(r)}
                    className={cn(
                      "w-full flex items-center gap-3 p-2.5 rounded-2xl text-xs font-black transition-all text-left",
                      isActive
                        ? "bg-white/20 text-udsm-gold shadow-sm"
                        : "hover:bg-white/10 text-gray-300 hover:text-white"
                    )}
                  >
                    <div className={cn("w-7 h-7 rounded-xl flex items-center justify-center text-white", r.color)}>
                      <r.icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1">
                      <p className="leading-tight">{r.label}</p>
                      <p className="text-[9px] text-gray-400 font-normal">{r.email}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 bg-slate-900 text-white rounded-2xl shadow-xl border border-white/20 hover:border-udsm-gold transition-all"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-forest-green animate-pulse" />
        <span className="text-xs font-black uppercase tracking-wider text-udsm-gold">
          Role: {currentUser?.role || 'Guest'}
        </span>
        {isOpen ? <ChevronDown className="h-4 w-4 text-gray-400" /> : <ChevronUp className="h-4 w-4 text-gray-400" />}
      </motion.button>
    </div>
  );
};

export default DemoRoleSwitcher;
