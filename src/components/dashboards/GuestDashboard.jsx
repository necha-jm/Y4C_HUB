import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Compass, Star, ArrowRight, Lightbulb, Zap } from 'lucide-react';

const GuestDashboard = ({ user }) => {
  return (
    <div className="p-8 bg-gray-50/50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 mb-6">
          <Coffee className="h-4 w-4 text-orange-500" />
          <span className="text-xs font-black uppercase tracking-widest text-gray-500">Welcome, Guest Explorer</span>
        </div>
        <h1 className="text-5xl font-black text-gray-900 tracking-tight leading-tight mb-6">
          Ready to turn your <span className="text-orange-500">ideas</span> into <span className="text-orange-500">impact?</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          You're currently exploring the Y4C Innovation Lab. As a guest, you can see what's happening, but joining as a member unlocks the full experience.
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-10 py-4 bg-orange-500 text-white rounded-[2rem] font-black text-lg shadow-xl shadow-orange-200 hover:bg-orange-600 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center gap-2">
            Upgrade to Member <ArrowRight className="h-6 w-6" />
          </button>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          { icon: Compass, title: 'Explore Programs', desc: 'See our latest tech bootcamps and startup incubators.', color: 'blue' },
          { icon: Zap, title: 'Upcoming Events', desc: 'Join our public workshops and networking sessions.', color: 'yellow' },
          { icon: Lightbulb, title: 'Success Stories', desc: 'Be inspired by startups born right here in the hub.', color: 'purple' },
        ].map((feat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-50 text-center relative group overflow-hidden"
          >
            <div className={`absolute top-0 left-0 w-full h-2 bg-${feat.color}-500 opacity-20`} />
            <div className={`w-20 h-20 bg-${feat.color}-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 transform group-hover:rotate-12 transition-transform`}>
              <feat.icon className={`h-10 w-10 text-${feat.color}-500`} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{feat.title}</h3>
            <p className="text-gray-500 leading-relaxed">{feat.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-20 max-w-6xl mx-auto bg-gray-900 rounded-[3rem] p-12 text-center text-white relative overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent" />
        <Star className="h-12 w-12 text-orange-500 mx-auto mb-6 relative z-10" />
        <h2 className="text-3xl font-black mb-4 relative z-10">Why Join Y4C Lab?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10 relative z-10">
          {['Mentorship', 'Funding', 'Workspace', 'Network'].map((item, i) => (
            <div key={i} className="space-y-2">
              <p className="text-2xl font-black text-orange-400">{i + 1}00%</p>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{item}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default GuestDashboard;
