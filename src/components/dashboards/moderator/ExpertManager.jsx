import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, UserPlus, Trash2, Edit, Save, X, Upload, ChevronDown, TrendingUp } from 'lucide-react';
import apiClient from '@/core/apiClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const ExpertManager = () => {
  const [experts, setExperts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    profilePicture: '',
    displayOrder: 0,
    parentId: null
  });

  const fetchExperts = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get('/coordinator/experts');
      setExperts(response.data);
    } catch (error) {
      toast({ title: "Error", description: "Failed to load experts", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExperts();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show temporary local preview while uploading
    const localPreview = URL.createObjectURL(file);
    setFormData(prev => ({ ...prev, profilePicture: localPreview }));

    const data = new FormData();
    data.append('file', file);

    try {
      const response = await apiClient.post('/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      // Replace local preview with real server path
      setFormData(prev => ({ ...prev, profilePicture: response.data }));
      toast({ title: "Success", description: "Image uploaded successfully" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to upload image", variant: "destructive" });
      setFormData(prev => ({ ...prev, profilePicture: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await apiClient.put(`/coordinator/experts/${editingId}`, formData);
        toast({ title: "Success", description: "Expert updated successfully" });
      } else {
        await apiClient.post('/coordinator/experts', formData);
        toast({ title: "Success", description: "Expert added successfully" });
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({ name: '', title: '', bio: '', profilePicture: '', displayOrder: 0, parentId: null });
      fetchExperts();
    } catch (error) {
      toast({ title: "Error", description: "Failed to save expert", variant: "destructive" });
    }
  };

  const handleEdit = (expert) => {
    setEditingId(expert.id);
    setFormData({
      name: expert.name,
      title: expert.title,
      bio: expert.bio,
      profilePicture: expert.profilePicture,
      displayOrder: expert.displayOrder,
      parentId: expert.parentId
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expert?")) {
      try {
        await apiClient.delete(`/coordinator/experts/${id}`);
        toast({ title: "Deleted", description: "Expert removed successfully" });
        fetchExperts();
      } catch (error) {
        toast({ title: "Error", description: "Failed to delete expert", variant: "destructive" });
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3 tracking-tighter">
          <Users className="h-6 w-6 text-udsm-blue" />
          Expert Ecosystem
        </h2>
        <Button onClick={() => { setShowForm(true); setEditingId(null); setFormData({ name: '', title: '', bio: '', profilePicture: '', displayOrder: 0, parentId: null }); }} className="bg-udsm-blue hover:bg-blue-700 gap-2 rounded-xl font-black uppercase tracking-widest text-xs h-12">
          <UserPlus className="h-4 w-4" /> Add New Expert
        </Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-udsm-blue/5 dark:bg-gray-900/50 p-10 rounded-[2.5rem] border border-udsm-blue/10 relative mb-8 shadow-xl"
          >
            <button onClick={() => setShowForm(false)} className="absolute top-8 right-8 text-udsm-blue/40 hover:text-udsm-blue transition-colors">
              <X className="h-7 w-7" />
            </button>
            <h3 className="text-2xl font-black text-udsm-blue mb-8 tracking-tight">{editingId ? 'Edit Profile' : 'Register New Expert'}</h3>

            <div className="flex flex-col items-center mb-10">
              <div className="relative group">
                <div className="w-40 h-40 rounded-[3rem] bg-white dark:bg-gray-800 shadow-2xl overflow-hidden border-4 border-white dark:border-gray-950 relative z-10 group-hover:scale-105 transition-transform duration-500">
                  {formData.profilePicture ? (
                    <img
                      src={formData.profilePicture}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/Images/y4c-graduation/IMG_0008.JPG";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-udsm-blue/5 flex items-center justify-center text-udsm-blue/20">
                      <Users className="h-16 w-16" />
                    </div>
                  )}

                  {/* Upload Overlay */}
                  <label htmlFor="expert-pic-upload" className="absolute inset-0 bg-udsm-blue/60 backdrop-blur-sm flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-20">
                    <Upload className="text-white h-8 w-8 mb-2" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Update Photo</span>
                  </label>
                </div>

                {/* Decorative Ring */}
                <div className="absolute -inset-3 bg-gradient-to-tr from-udsm-blue to-udsm-gold rounded-[3.5rem] opacity-20 group-hover:opacity-40 transition-opacity animate-pulse" />
              </div>
              <Input type="file" onChange={handleFileUpload} className="hidden" id="expert-pic-upload" accept="image/*" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 block ml-2">Full Name</label>
                  <Input required placeholder="e.g. Dr. Jane Doe" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="rounded-2xl h-14 bg-white dark:bg-gray-950 border-gray-100 dark:border-gray-800 font-bold" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 block ml-2">Professional Title</label>
                  <Input required placeholder="e.g. Senior Researcher" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="rounded-2xl h-14 bg-white dark:bg-gray-950 border-gray-100 dark:border-gray-800 font-bold" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 block ml-2">Biography & Expertise</label>
                <textarea
                  placeholder="Tell us about this expert's background..."
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="w-full rounded-3xl border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 p-5 min-h-[120px] focus:ring-2 focus:ring-udsm-blue outline-none font-medium text-gray-700 dark:text-gray-300 transition-all"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6 items-end">
                <div>
                  <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 block ml-2">Display Hierarchy Order</label>
                  <Input type="number" placeholder="0" value={formData.displayOrder} onChange={(e) => setFormData({...formData, displayOrder: parseInt(e.target.value)})} className="rounded-2xl h-14 bg-white dark:bg-gray-950 border-gray-100 dark:border-gray-800 font-bold" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 block ml-2">Direct Supervisor (Optional)</label>
                  <select
                    className="w-full rounded-2xl h-14 border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 px-5 font-bold text-sm outline-none focus:ring-2 focus:ring-udsm-blue appearance-none cursor-pointer text-gray-700 dark:text-gray-300"
                    value={formData.parentId || ''}
                    onChange={(e) => setFormData({...formData, parentId: e.target.value ? parseInt(e.target.value) : null})}
                  >
                    <option value="">No Supervisor (Top Level)</option>
                    {experts.filter(e => e.id !== editingId).map(exp => (
                      <option key={exp.id} value={exp.id}>{exp.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <Button type="submit" className="w-full bg-udsm-blue hover:bg-blue-700 text-white rounded-2xl font-black py-8 text-lg shadow-xl shadow-blue-500/20 uppercase tracking-[0.2em] transition-all hover:scale-[1.01] active:scale-[0.98]">
                {editingId ? 'Save Profile Changes' : 'Confirm Expert Registration'}
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-6">
        {isLoading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-udsm-blue mx-auto"></div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-4">Loading Experts...</p>
          </div>
        ) : experts.length === 0 ? (
          <div className="bg-white dark:bg-gray-900/50 p-20 rounded-[3rem] text-center border-2 border-dashed border-gray-100 dark:border-gray-800">
            <Users className="h-12 w-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 font-black uppercase tracking-widest text-xs">No experts found in the ecosystem.</p>
          </div>
        ) : (
          experts.map(exp => (
            <motion.div key={exp.id} layout className="bg-white dark:bg-gray-900/50 p-6 rounded-3xl shadow-sm border border-gray-50 dark:border-gray-800 flex items-center justify-between group hover:shadow-xl hover:border-udsm-blue/20 transition-all duration-500">
              <div className="flex items-center gap-6">
                <div className="relative">
                  {exp.profilePicture ? (
                    <img
                      src={exp.profilePicture}
                      alt={exp.name}
                      className="w-20 h-20 rounded-[1.8rem] object-cover shadow-lg border-2 border-white dark:border-gray-800 group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/Images/y4c-graduation/IMG_0008.JPG";
                      }}
                    />
                  ) : (
                    <div className="w-20 h-20 bg-udsm-blue/5 rounded-[1.8rem] flex items-center justify-center text-udsm-blue font-black text-3xl">
                      {exp.name.charAt(0)}
                    </div>
                  )}
                  {exp.parentId && (
                    <div className="absolute -top-2 -left-2 bg-udsm-gold text-white p-1.5 rounded-xl shadow-lg border-2 border-white dark:border-gray-900">
                      <TrendingUp className="h-3 w-3" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <p className="font-black text-gray-900 dark:text-white text-xl tracking-tight leading-tight">{exp.name}</p>
                    <span className="bg-gray-100 dark:bg-gray-800 text-[9px] font-black text-gray-500 px-3 py-1 rounded-full uppercase tracking-widest shadow-inner">Order: {exp.displayOrder}</span>
                  </div>
                  <p className="text-sm font-black text-udsm-blue uppercase tracking-widest mt-1.5">{exp.title}</p>
                  {exp.parentId && (
                    <div className="flex items-center gap-2 mt-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-udsm-gold" />
                       <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Supervisor: {experts.find(e => e.id === exp.parentId)?.name || 'Ecosystem Lead'}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                <Button onClick={() => handleEdit(exp)} variant="outline" className="rounded-xl w-12 h-12 hover:bg-udsm-blue hover:text-white border-gray-100 dark:border-gray-800 transition-all">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button onClick={() => handleDelete(exp.id)} variant="outline" className="rounded-xl w-12 h-12 text-red-600 border-red-50 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950 transition-all">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExpertManager;
