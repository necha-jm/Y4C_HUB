import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Image as ImageIcon, Upload, Plus, X, Heart, MessageSquare,
  User as UserIcon, Loader2, Trash2, Edit2, CheckCircle, ChevronDown
} from 'lucide-react';
import apiClient from '@/core/apiClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ImageUpload from '@/components/ui/ImageUpload';

const LabCommunityGallery = ({ user }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showUploadForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editCaption, setEditCaption] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);
  const [newItem, setNewItem] = useState({
    imageUrl: '',
    caption: '',
    uploaderName: user?.name || 'Innovator',
    uploaderId: user?.id
  });

  const isModerator = ['facilitator', 'coordinator', 'superuser'].includes(user?.role?.toLowerCase());

  const fetchGallery = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get('/member/gallery');
      setItems(response.data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!newItem.imageUrl) {
      toast({ title: "Image Required", description: "Please upload an image first.", variant: "destructive" });
      return;
    }

    try {
      await apiClient.post('/member/gallery', newItem);
      toast({ title: "Posted!", description: "Your memory has been added to the lab gallery." });
      setShowAddForm(false);
      setNewItem({ ...newItem, imageUrl: '', caption: '' });
      fetchGallery();
    } catch (e) {
      toast({ title: "Upload Failed", description: "Could not save to gallery.", variant: "destructive" });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Remove this image from the community gallery?")) {
      try {
        await apiClient.delete(`/facilitator/gallery/${id}`);
        toast({ title: "Deleted", description: "Memory removed successfully." });
        fetchGallery();
      } catch (error) {
        toast({ title: "Error", description: "Failed to delete.", variant: "destructive" });
      }
    }
  };

  const handleUpdate = async (id) => {
    try {
      await apiClient.put(`/facilitator/gallery/${id}`, { caption: editCaption });
      toast({ title: "Updated", description: "Caption changed successfully." });
      setEditingId(null);
      fetchGallery();
    } catch (e) {
      toast({ title: "Error", description: "Update failed.", variant: "destructive" });
    }
  };

  const visibleItems = items.slice(0, visibleCount);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3 tracking-tight">
            <ImageIcon className="h-6 w-6 text-udsm-blue" />
            Lab Community Gallery
          </h2>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Share memories from your daily lab life</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="bg-udsm-blue hover:bg-blue-700 gap-2 rounded-xl font-bold px-6">
          <Plus className="h-4 w-4" /> Share Memory
        </Button>
      </div>

      <AnimatePresence>
        {showUploadForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-2xl border border-blue-50 dark:border-gray-800 relative mb-10 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-udsm-blue to-udsm-gold" />
            <button onClick={() => setShowAddForm(false)} className="absolute top-6 right-6 text-gray-400 hover:text-udsm-blue transition-all">
              <X className="h-6 w-6" />
            </button>
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8">Post to Community Gallery</h3>

            <form onSubmit={handleUpload} className="grid lg:grid-cols-2 gap-10">
               <div>
                 <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Select Lab Photo</label>
                 <ImageUpload
                   onUploadSuccess={(url) => setNewItem({...newItem, imageUrl: url})}
                   currentImage={newItem.imageUrl}
                 />
               </div>
               <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Caption / Story</label>
                    <textarea
                      placeholder="What's happening in this photo?"
                      className="w-full h-32 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border-none p-6 outline-none focus:ring-2 focus:ring-udsm-blue text-sm font-bold text-gray-700 dark:text-gray-300"
                      value={newItem.caption}
                      onChange={(e) => setNewItem({...newItem, caption: e.target.value})}
                    />
                  </div>
                  <Button type="submit" className="w-full h-14 bg-udsm-blue rounded-xl font-black uppercase tracking-widest shadow-xl shadow-blue-100">
                    Publish to Gallery
                  </Button>
               </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
           <Loader2 className="h-10 w-10 text-udsm-blue animate-spin mb-4" />
           <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Scanning Lab Memories...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white dark:bg-gray-900/50 p-20 rounded-[3rem] text-center border-2 border-dashed border-gray-100 dark:border-gray-800">
           <ImageIcon className="h-16 w-16 text-gray-200 mx-auto mb-6" />
           <h4 className="text-gray-400 font-black uppercase tracking-widest text-sm">No photos yet</h4>
           <p className="text-gray-400 font-bold text-xs mt-2 italic">Be the first to share a memory from the Innovation Lab!</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
             {visibleItems.map((item, idx) => (
               <motion.div
                 key={item.id}
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: idx * 0.05 }}
                 className="bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 group relative"
               >
                  {isModerator && (
                    <div className="absolute top-4 right-4 flex gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => { setEditingId(item.id); setEditCaption(item.caption); }}
                        className="p-2 bg-white/90 backdrop-blur-md rounded-lg text-udsm-blue hover:bg-udsm-blue hover:text-white shadow-lg transition-all"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 bg-white/90 backdrop-blur-md rounded-lg text-red-500 hover:bg-red-500 hover:text-white shadow-lg transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}

                  <div className="aspect-square relative overflow-hidden">
                     <img src={item.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Lab Memory" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                        <div className="flex items-center gap-2 text-white">
                           <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                              <UserIcon className="h-4 w-4" />
                           </div>
                           <span className="text-[10px] font-black uppercase tracking-widest">{item.uploaderName}</span>
                        </div>
                     </div>
                  </div>
                  <div className="p-8">
                     {editingId === item.id ? (
                       <div className="space-y-4">
                          <textarea
                            className="w-full rounded-xl bg-gray-50 border p-3 text-sm font-bold"
                            value={editCaption}
                            onChange={(e) => setEditCaption(e.target.value)}
                          />
                          <div className="flex gap-2">
                             <Button onClick={() => handleUpdate(item.id)} size="sm" className="bg-green-600 rounded-lg">Save</Button>
                             <Button onClick={() => setEditingId(null)} variant="ghost" size="sm">Cancel</Button>
                          </div>
                       </div>
                     ) : (
                       <p className="text-sm font-bold text-gray-700 dark:text-gray-300 leading-relaxed italic mb-6">"{item.caption || 'A great day at the Innovation Lab!'}"</p>
                     )}

                     <div className="flex items-center justify-between pt-6 border-t border-gray-50 dark:border-gray-800">
                        <div className="flex items-center gap-4 text-gray-400">
                           <button className="flex items-center gap-1.5 hover:text-pink-500 transition-colors">
                              <Heart className="h-4 w-4" />
                              <span className="text-[10px] font-black uppercase">0</span>
                           </button>
                           <button className="flex items-center gap-1.5 hover:text-udsm-blue transition-colors">
                              <MessageSquare className="h-4 w-4" />
                              <span className="text-[10px] font-black uppercase">0</span>
                           </button>
                        </div>
                        <span className="text-[8px] font-black text-gray-300 uppercase tracking-tighter">
                          {new Date(item.uploadedAt).toLocaleDateString()}
                        </span>
                     </div>
                  </div>
               </motion.div>
             ))}
          </div>

          {items.length > visibleCount && (
            <div className="flex justify-center mt-12">
               <Button
                 onClick={() => setVisibleCount(prev => prev + 6)}
                 variant="outline"
                 className="rounded-full px-10 py-6 font-black uppercase tracking-[0.2em] text-xs gap-2 border-gray-200 hover:border-udsm-blue group transition-all"
               >
                 Explore More Memories
                 <ChevronDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
               </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LabCommunityGallery;
