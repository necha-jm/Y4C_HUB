import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Upload, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
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
    imageUrl: '',
    expiryDate: '',
    isPublished: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Use role-based endpoint
      const user = JSON.parse(localStorage.getItem('y4c_user'));
      const role = user?.role?.toLowerCase();
      const endpoint = role === 'coordinator' ? '/coordinator/events' : '/facilitator/events';

      await apiClient.post(endpoint, {
        ...newEvent,
        // If expiryDate is empty, backend handles it in @PrePersist but we can send it too
        expiryDate: newEvent.expiryDate || newEvent.date
      });
      toast({ title: "Success", description: "Event published successfully" });
      setNewEvent({
        title: '', description: '', date: '',
        timeRange: '', location: '', imageUrl: '',
        expiryDate: '', isPublished: true
      });
    } catch (error) {
      toast({ title: "Error", description: "Failed to create event", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-blue-50">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Calendar className="h-6 w-6 text-udsm-blue" />
          Publish New Event
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Event Title</label>
              <Input
                required
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="Innovation Hackathon"
                className="rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Location</label>
              <Input
                required
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                placeholder="Y4C Lab, Hall A"
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Event Date</label>
              <Input
                type="date"
                required
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Time Range</label>
              <Input
                required
                value={newEvent.timeRange}
                onChange={(e) => setNewEvent({ ...newEvent, timeRange: e.target.value })}
                placeholder="9:00 AM - 5:00 PM"
                className="rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Display Until (Expiry)</label>
              <Input
                type="date"
                value={newEvent.expiryDate}
                onChange={(e) => setNewEvent({ ...newEvent, expiryDate: e.target.value })}
                className="rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Event Banner Image</label>
            <ImageUpload
              currentImage={newEvent.imageUrl}
              onUploadSuccess={(url) => setNewEvent({ ...newEvent, imageUrl: url })}
            />
          </div>
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Description</label>
            <textarea
              required
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              rows={4}
              className="w-full rounded-xl bg-gray-50 border-gray-100 p-4 outline-none focus:ring-2 focus:ring-udsm-blue transition-all text-sm font-medium"
              placeholder="Describe the event..."
            />
          </div>
          <Button disabled={isSubmitting} className="w-full bg-gradient-to-r from-udsm-blue to-forest-green h-14 rounded-xl text-lg font-black uppercase tracking-widest gap-2 shadow-lg shadow-blue-200">
            <Plus className="h-5 w-5" />
            Publish to Site
          </Button>
        </form>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-900">Event Preview</h3>
        <div className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 aspect-video relative group">
          {newEvent.imageUrl ? (
            <img src={newEvent.imageUrl} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center text-gray-400">
              <ImageIcon className="h-12 w-12 mb-2" />
              <p className="text-sm font-bold">No Image Selected</p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
             <h4 className="text-white text-2xl font-black">{newEvent.title || "Your Event Title"}</h4>
             <p className="text-gray-200 text-sm mt-1">{newEvent.date && new Date(newEvent.date).toLocaleDateString()} • {newEvent.location || "Location"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventManager;
