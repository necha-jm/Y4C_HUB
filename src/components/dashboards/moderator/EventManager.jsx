import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Upload, Plus, Trash2, Image as ImageIcon, MapPin } from 'lucide-react';
import apiClient from '@/core/apiClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ImageUpload from '@/components/ui/ImageUpload';

const EventManager = () => {
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    timeRange: '',
    location: '',
    imageUrl: '', // Primary banner
    images: [], // Multiple pictures
    expiryDate: '',
    isPublished: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const user = JSON.parse(localStorage.getItem('y4c_user'));
      const role = user?.role?.toLowerCase();
      const endpoint = role === 'coordinator' ? '/coordinator/events' : '/facilitator/events';

      await apiClient.post(endpoint, {
        ...newEvent,
        expiryDate: newEvent.expiryDate || newEvent.date
      });
      toast({ title: "Success", description: "Event published with media gallery." });
      setNewEvent({
        title: '', description: '', date: '',
        timeRange: '', location: '', imageUrl: '',
        images: [], expiryDate: '', isPublished: true
      });
    } catch (error) {
      toast({ title: "Error", description: "Failed to create event", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const allImages = newEvent.imageUrl ? [newEvent.imageUrl, ...newEvent.images] : newEvent.images;

  return (
    <div className="grid lg:grid-cols-2 gap-8 relative z-10">
      <div className="bg-white/80 backdrop-blur-md p-10 rounded-[3rem] shadow-xl border border-blue-50">
        <h2 className="text-2xl font-black mb-8 flex items-center gap-3 tracking-tight">
          <div className="p-2 bg-udsm-blue/10 rounded-xl">
            <Calendar className="h-6 w-6 text-udsm-blue" />
          </div>
          Publish New Event
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Event Title</label>
              <Input
                required
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="Innovation Hackathon"
                className="rounded-xl h-12 bg-gray-50 border-none font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Location</label>
              <Input
                required
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                placeholder="Y4C Lab, Hall A"
                className="rounded-xl h-12 bg-gray-50 border-none font-bold"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Event Date</label>
              <Input
                type="date"
                required
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="rounded-xl h-12 bg-gray-50 border-none font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Time Range</label>
              <Input
                required
                value={newEvent.timeRange}
                onChange={(e) => setNewEvent({ ...newEvent, timeRange: e.target.value })}
                placeholder="9:00 AM - 5:00 PM"
                className="rounded-xl h-12 bg-gray-50 border-none font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Display Until</label>
              <Input
                type="date"
                value={newEvent.expiryDate}
                onChange={(e) => setNewEvent({ ...newEvent, expiryDate: e.target.value })}
                className="rounded-xl h-12 bg-gray-50 border-none font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Media Gallery (Upload Multiple)</label>
            <div className="rounded-[2rem] border-2 border-dashed border-gray-100 p-6 bg-gray-50/50">
              <ImageUpload
                multiple={true}
                currentImage={newEvent.images}
                onUploadSuccess={(urls) => {
                  setNewEvent({ ...newEvent, images: urls, imageUrl: newEvent.imageUrl || urls[0] });
                }}
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Description</label>
            <textarea
              required
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              rows={4}
              className="w-full rounded-2xl bg-gray-50 border-none p-6 outline-none focus:ring-2 focus:ring-udsm-blue transition-all text-sm font-bold text-gray-700 leading-relaxed"
              placeholder="Describe the event goals and activities..."
            />
          </div>
          <Button disabled={isSubmitting} className="w-full bg-udsm-blue hover:bg-blue-700 h-16 rounded-[1.5rem] text-lg font-black uppercase tracking-widest gap-2 shadow-xl shadow-blue-100 transition-all hover:scale-[1.02] active:scale-95">
            <Plus className="h-6 w-6" />
            Publish Event
          </Button>
        </form>
      </div>

      <div className="space-y-8">
        <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
          <div className="w-2 h-6 bg-udsm-gold rounded-full" />
          Event Media Preview
        </h3>

        <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 aspect-[4/3] relative group shadow-blue-100/20">
          <AnimatePresence mode="wait">
            {allImages.length > 0 ? (
              <motion.img
                key={allImages[previewIndex]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                src={allImages[previewIndex]}
                alt="Preview"
                className="w-full h-full object-cover transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full bg-slate-50 flex flex-col items-center justify-center text-gray-300">
                <ImageIcon className="h-16 w-16 mb-4 animate-pulse" />
                <p className="text-xs font-black uppercase tracking-[0.2em]">Upload media to see gallery</p>
              </div>
            )}
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-10">
             <div className="space-y-2">
               <span className="bg-udsm-gold text-black px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">New Event Discovery</span>
               <h4 className="text-white text-3xl font-black leading-tight drop-shadow-md">{newEvent.title || "Your Event Title"}</h4>
               <div className="flex flex-wrap items-center gap-4 text-gray-200 text-[10px] font-black uppercase tracking-widest pt-4 border-t border-white/10 mt-4">
                 <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-udsm-gold" /> {newEvent.date ? new Date(newEvent.date).toLocaleDateString() : "Date TBD"}</span>
                 <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-udsm-gold" /> {newEvent.location || "Y4C Lab Hub"}</span>
               </div>
             </div>
          </div>

          {allImages.length > 1 && (
            <div className="absolute bottom-10 right-10 flex gap-2">
               {allImages.map((_, i) => (
                 <button
                  key={i}
                  onClick={() => setPreviewIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${previewIndex === i ? 'bg-udsm-gold w-6' : 'bg-white/50 hover:bg-white'}`}
                 />
               ))}
            </div>
          )}
        </div>

        <div className="bg-udsm-gold/5 p-8 rounded-[2rem] border border-udsm-gold/10 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-udsm-gold/5 rounded-full blur-2xl -mr-16 -mt-16" />
           <p className="text-[10px] font-black text-udsm-gold uppercase tracking-widest mb-2">Media Quality Guide</p>
           <p className="text-xs font-bold text-gray-600 leading-relaxed italic">"Facilitators: Uploading multiple high-resolution photos allows students to experience the hub's energy. Primary banner should be landscape."</p>
        </div>
      </div>
    </div>

  );
};

export default EventManager;
