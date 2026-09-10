import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, UserPlus, Trash2, Edit, Save, X, Upload, ChevronDown } from 'lucide-react';
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

    const data = new FormData();
    data.append('file', file);

    try {
      const response = await apiClient.post('/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData({ ...formData, profilePicture: response.data });
      toast({ title: "Success", description: "Image uploaded successfully" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to upload image", variant: "destructive" });
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
        <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
          <Users className="h-6 w-6 text-indigo-600" />
          Expert Management
        </h2>
        <Button onClick={() => { setShowForm(true); setEditingId(null); setFormData({ name: '', title: '', bio: '', profilePicture: '', displayOrder: 0, parentId: null }); }} className="bg-indigo-600 hover:bg-indigo-700 gap-2 rounded-xl font-bold">
          <UserPlus className="h-4 w-4" /> Add Expert
        </Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100 relative mb-8"
          >
            <button onClick={() => setShowForm(false)} className="absolute top-6 right-6 text-indigo-400 hover:text-indigo-600">
              <X className="h-6 w-6" />
            </button>
            <h3 className="text-xl font-bold text-indigo-900 mb-6">{editingId ? 'Edit Expert' : 'Register New Expert'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input required placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="rounded-xl" />
                <Input required placeholder="Professional Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="rounded-xl" />
              </div>
              <textarea
                placeholder="Bio/Description"
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                className="w-full rounded-xl border-gray-200 p-3 min-h-[100px] focus:ring-indigo-500 focus:border-indigo-500"
              />
              <div className="grid md:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="text-xs font-bold text-indigo-900 mb-1 block">Display Order</label>
                  <Input type="number" placeholder="Order" value={formData.displayOrder} onChange={(e) => setFormData({...formData, displayOrder: parseInt(e.target.value)})} className="rounded-xl" />
                </div>
                <div>
                  <label className="text-xs font-bold text-indigo-900 mb-1 block">Report To (Parent Expert)</label>
                  <select
                    className="w-full rounded-xl border-gray-200 p-2.5 bg-white text-sm"
                    value={formData.parentId || ''}
                    onChange={(e) => setFormData({...formData, parentId: e.target.value ? parseInt(e.target.value) : null})}
                  >
                    <option value="">None (Top Level)</option>
                    {experts.filter(e => e.id !== editingId).map(exp => (
                      <option key={exp.id} value={exp.id}>{exp.name}</option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <Input type="file" onChange={handleFileUpload} className="hidden" id="expert-pic-upload" accept="image/*" />
                  <label htmlFor="expert-pic-upload" className="flex items-center justify-center gap-2 w-full p-2.5 border-2 border-dashed border-indigo-300 rounded-xl cursor-pointer hover:bg-indigo-100 transition-colors text-indigo-600 font-bold text-sm">
                    <Upload className="h-4 w-4" /> {formData.profilePicture ? 'Change Picture' : 'Upload Picture'}
                  </label>
                </div>
              </div>
              {formData.profilePicture && (
                <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-indigo-100">
                  <img src={formData.profilePicture} alt="Preview" className="w-12 h-12 rounded-lg object-cover" />
                  <span className="text-xs text-gray-500 truncate max-w-[200px]">{formData.profilePicture}</span>
                </div>
              )}
              <Button type="submit" className="w-full bg-indigo-600 rounded-xl font-black py-6 text-lg">{editingId ? 'Update Expert' : 'Register Expert'}</Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-4">
        {isLoading ? (
          <div className="text-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div></div>
        ) : experts.length === 0 ? (
          <div className="bg-white p-12 rounded-[2rem] text-center border-2 border-dashed border-gray-100">
            <p className="text-gray-400 font-bold">No experts registered yet.</p>
          </div>
        ) : (
          experts.map(exp => (
            <motion.div key={exp.id} layout className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow">
              <div className="flex items-center gap-6">
                <div className="relative">
                  {exp.profilePicture ? (
                    <img src={exp.profilePicture} alt={exp.name} className="w-16 h-16 rounded-2xl object-cover shadow-md" />
                  ) : (
                    <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 font-black text-2xl">
                      {exp.name.charAt(0)}
                    </div>
                  )}
                  {exp.parentId && (
                    <div className="absolute -top-2 -left-2 bg-indigo-600 text-white p-1 rounded-full shadow-lg">
                      <ChevronDown className="h-3 w-3 rotate-180" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-black text-gray-900 text-lg">{exp.name}</p>
                    <span className="px-2 py-0.5 bg-gray-100 text-[10px] font-bold text-gray-500 rounded-full">#{exp.displayOrder}</span>
                  </div>
                  <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest">{exp.title}</p>
                  {exp.parentId && (
                    <p className="text-[10px] text-gray-400 font-medium mt-1">Reports to: {experts.find(e => e.id === exp.parentId)?.name || 'Unknown'}</p>
                  )}
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button onClick={() => handleEdit(exp)} variant="outline" className="rounded-xl p-2 h-auto hover:bg-indigo-50 border-indigo-100 text-indigo-600">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button onClick={() => handleDelete(exp.id)} variant="outline" className="rounded-xl p-2 h-auto text-red-600 border-red-100 hover:bg-red-50">
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
