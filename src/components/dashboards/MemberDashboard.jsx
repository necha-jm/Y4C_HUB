import React from 'react';
import { motion } from 'framer-motion';
import { User, Rocket, Award, Heart, Search, BookOpen } from 'lucide-react';

// Import Common Components
import TimetableDisplay from './common/TimetableDisplay';
import ProjectSubmission from './common/ProjectSubmission';
import SupportRequests from './member/SupportRequests';
import AchievementOrbit from './member/AchievementOrbit';

const MemberDashboard = ({ user }) => {
  return (
    <div className="p-4 md:p-8">
      {/* Hello Section */}
      <div className="flex flex-col lg:flex-row gap-8 mb-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 bg-gradient-to-br from-udsm-blue to-indigo-700 rounded-[3rem] p-12 text-white shadow-[0_20px_50px_rgba(8,100,175,0.3)] relative overflow-hidden"
        >
          <div className="relative z-10">
            <h1 className="text-4xl lg:text-5xl font-black mb-3 tracking-tight">Hello, {user?.name}! 👋</h1>
            <p className="text-udsm-blue bg-white px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] inline-block mb-10 shadow-lg">
              Innovator Member
            </p>
            <div className="flex gap-6">
              <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[2.5rem] text-center flex-1 border border-white/20 hover:bg-white/20 transition-all group">
                <p className="text-5xl font-black text-udsm-gold group-hover:scale-110 transition-transform">4</p>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mt-2">Active Programs</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[2.5rem] text-center flex-1 border border-white/20 hover:bg-white/20 transition-all group">
                <p className="text-5xl font-black text-udsm-gold group-hover:scale-110 transition-transform">12</p>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mt-2">Badges Earned</p>
              </div>
            </div>
          </div>
          <Rocket className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 rotate-[25deg]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-1/3"
        >
          <AchievementOrbit />
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 space-y-8"
        >
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 shadow-xl border border-gray-50 dark:border-gray-800">
            <h2 className="text-2xl font-black mb-10 text-gray-900 dark:text-white flex items-center gap-4">
              <div className="p-3 bg-udsm-blue/10 rounded-2xl">
                <BookOpen className="h-7 w-7 text-udsm-blue" />
              </div>
              Your Learning Path
            </h2>
            <div className="space-y-8">
              {[
                { title: 'Intro to React', progress: 100, status: 'Completed', color: 'bg-udsm-blue' },
                { title: 'UI/UX Design Basics', progress: 45, status: 'In Progress', color: 'bg-udsm-gold' },
                { title: 'Advanced Backend', progress: 0, status: 'Not Started', color: 'bg-gray-300' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-8 group cursor-pointer">
                  <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center flex-shrink-0 transition-all ${
                    item.progress === 100 ? 'bg-udsm-blue/10 text-udsm-blue group-hover:scale-110' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                  }`}>
                    {item.progress === 100 ? <Award className="h-8 w-8" /> : <BookOpen className="h-8 w-8" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-3">
                      <p className="font-black text-gray-900 dark:text-white text-lg tracking-tight group-hover:text-udsm-blue transition-colors uppercase">{item.title}</p>
                      <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{item.status}</span>
                    </div>
                    <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.progress}%` }}
                        className={`h-full ${item.color} shadow-lg shadow-current/20`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-gray-50 dark:border-gray-800">
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8 uppercase tracking-widest flex items-center justify-between">
              Upcoming Events
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            </h3>
            <div className="space-y-6">
              {[1, 2].map(i => (
                <div key={i} className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-[1.5rem] border border-gray-100 dark:border-gray-800 hover:border-udsm-blue hover:translate-x-2 transition-all cursor-pointer group">
                  <p className="font-black text-sm text-gray-900 dark:text-white uppercase tracking-wider group-hover:text-udsm-blue">Networking Friday</p>
                  <div className="text-xs text-gray-500 font-bold mt-2 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-udsm-gold" />
                    Tomorrow at 4:00 PM
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-udsm-blue via-indigo-600 to-udsm-blue rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Heart className="h-12 w-12 mb-6 text-udsm-gold fill-udsm-gold" />
            <h3 className="text-2xl font-black tracking-tight uppercase">Y4C Community</h3>
            <p className="text-sm font-medium text-white/80 mt-3 mb-8 leading-relaxed">Connect with 500+ other young innovators like you.</p>
            <button className="w-full py-5 bg-white text-udsm-blue rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:bg-udsm-gold hover:text-black transition-all transform active:scale-95">
              Join Discord
            </button>
          </div>
        </motion.div>
      </div>

      <TimetableDisplay />
      <ProjectSubmission user={user} />
      <SupportRequests user={user} />
    </div>
  );
};

export default MemberDashboard;
