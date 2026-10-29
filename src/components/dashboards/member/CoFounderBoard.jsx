import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, UserPlus, Plus, Briefcase, Tag, Send, CheckCircle } from 'lucide-react';
import apiClient from '@/core/apiClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const CoFounderBoard = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPost, setNewPost] = useState({
    projectName: '',
    lookingFor: '',
    equityOrPerk: 'Co-founder Equity (10-20%)',
    description: '',
    tags: 'React, Mobile, AI'
  });

  const fetchPosts = async () => {
    try {
      const res = await apiClient.get('/cofounder/posts');
      setPosts(res.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/cofounder/posts', {
        ...newPost,
        authorId: user?.id || 4,
        authorName: user?.name || "Baraka Mwangi",
        tags: newPost.tags.split(',').map(t => t.trim())
      });
      toast({ title: "Opportunity Posted! 🤝", description: "Your co-founder vacancy is now live on the hub board." });
      setShowAddForm(false);
      setNewPost({ projectName: '', lookingFor: '', equityOrPerk: 'Co-founder Equity (10-20%)', description: '', tags: 'React, Mobile, AI' });
      fetchPosts();
    } catch (e) {
      toast({ title: "Failed to post", variant: "destructive" });
    }
  };

  const handleApplyToTeam = (post) => {
    toast({
      title: "Application Sent! 🚀",
      description: `Your profile has been forwarded to ${post.authorName} (${post.projectName}).`
    });
  };

  return (
    <div className="space-y-8 relative z-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-4 tracking-tight">
            <div className="p-3 bg-forest-green rounded-2xl shadow-xl shadow-green-100 dark:shadow-none text-white">
              <Users className="h-8 w-8" />
            </div>
            Innovator Talent & Co-Founder Board
          </h2>
          <p className="text-gray-500 font-bold mt-2 uppercase text-[10px] tracking-widest ml-16">
            Find technical co-founders, UI/UX designers, researchers & commercialization partners
          </p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="gap-2 h-14 rounded-2xl bg-forest-green text-white px-6 font-black uppercase tracking-widest text-xs">
          <Plus className="h-4 w-4" /> Post Team Opening
        </Button>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl"
          >
            <h3 className="text-xl font-black mb-6 text-gray-900 dark:text-white">Post Team Role / Co-Founder Vacancy</h3>
            <form onSubmit={handleCreatePost} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Project / Startup Name</label>
                <Input required value={newPost.projectName} onChange={e => setNewPost({...newPost, projectName: e.target.value})} placeholder="e.g. Smart Irrigation Bot" className="h-12 rounded-xl bg-gray-50 dark:bg-gray-800 font-bold" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Role Needed</label>
                <Input required value={newPost.lookingFor} onChange={e => setNewPost({...newPost, lookingFor: e.target.value})} placeholder="e.g. Firmware / Embedded C Developer" className="h-12 rounded-xl bg-gray-50 dark:bg-gray-800 font-bold" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Compensation / Equity</label>
                <Input required value={newPost.equityOrPerk} onChange={e => setNewPost({...newPost, equityOrPerk: e.target.value})} placeholder="e.g. 15% Equity + Prototyping Stipend" className="h-12 rounded-xl bg-gray-50 dark:bg-gray-800 font-bold" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Skills Tags (Comma separated)</label>
                <Input required value={newPost.tags} onChange={e => setNewPost({...newPost, tags: e.target.value})} placeholder="e.g. IoT, C++, LoRaWAN, Hardware" className="h-12 rounded-xl bg-gray-50 dark:bg-gray-800 font-bold" />
              </div>
              <div className="md:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Venture Description & Role Scope</label>
                <Textarea required value={newPost.description} onChange={e => setNewPost({...newPost, description: e.target.value})} placeholder="Describe what you are building and why you need this collaborator" rows={3} className="rounded-xl bg-gray-50 dark:bg-gray-800 font-bold p-4" />
              </div>
              <div className="md:col-span-2 flex gap-3">
                <Button type="submit" className="h-12 rounded-xl bg-forest-green text-white font-black uppercase tracking-widest text-xs px-8">Publish Vacancy</Button>
                <Button type="button" variant="ghost" onClick={() => setShowAddForm(false)} className="h-12 rounded-xl font-black uppercase tracking-widest text-xs">Cancel</Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((p) => (
          <motion.div
            key={p.id}
            whileHover={{ y: -4 }}
            className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-md flex flex-col justify-between space-y-6"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-udsm-gold">{p.projectName}</span>
                  <h3 className="text-xl font-black text-gray-900 dark:text-white mt-0.5">{p.lookingFor}</h3>
                </div>
                <span className="px-3 py-1 bg-green-50 dark:bg-green-950 text-forest-green text-[10px] font-black uppercase tracking-widest rounded-full">
                  {p.equityOrPerk}
                </span>
              </div>
              <p className="text-xs text-gray-400 font-bold">Posted by {p.authorName}</p>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mt-4 font-medium">{p.description}</p>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {Array.isArray(p.tags) ? p.tags.map((t, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg text-[9px] font-black uppercase">
                    {t}
                  </span>
                )) : null}
              </div>
            </div>

            <Button
              onClick={() => handleApplyToTeam(p)}
              className="w-full h-12 bg-udsm-blue hover:bg-udsm-blue/90 text-white font-black uppercase tracking-widest text-xs rounded-xl gap-2"
            >
              <Send className="h-4 w-4" /> Apply to Join Venture
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CoFounderBoard;
