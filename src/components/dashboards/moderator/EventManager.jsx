import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Upload, Plus, Trash2, Image as ImageIcon, MapPin,
  Clock, Sparkles, CheckCircle2, ListFilter, Eye, RefreshCw, Layers
} from 'lucide-react';
import apiClient from '@/core/apiClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ImageUpload from '@/components/ui/ImageUpload';
import { cn } from '@/lib/utils';

const sampleBanners = [
  { label: 'Innovation Hackathon', url: '/Images/Photo01.jpg' },
  { label: 'HCD Masterclass', url: '/Images/Photo02.jpg' },
  { label: 'Tech Prototyping', url: '/Images/Photo03.jpg' }
];

const categories = [
  'Hackathon & Competition',
  'HCD Masterclass',
  'Tech BootCamp',
  'Demo Day & Pitching',
  'Expert Mentorship Sprint',
  'Community Meetup'
];

const EventManager = ({ role = 'coordinator' }) => {
  const [activeView, setActiveView] = useState('create'); // 'create' | 'list'
  const [events, setEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  const [newEvent, setNewEvent] = useState({
    title: '',
    category: 'Hackathon & Competition',
    description: '',
    date: '',
    timeRange: '9:00 AM - 5:00 PM',
    location: '',
    imageUrl: '/Images/Photo01.jpg', // Default primary banner
    images: ['/Images/Photo01.jpg'],
    expiryDate: '',
    isPublished: true
  });

  const fetchEvents = async () => {
    setIsLoadingEvents(true);
    try {
      const endpoint = role === 'coordinator' ? '/coordinator/events' : '/facilitator/events';
      const res = await apiClient.get(endpoint);
      setEvents(res.data || []);
    } catch (e) {
      console.error("Failed to fetch events", e);
    } finally {
      setIsLoadingEvents(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const endpoint = role === 'coordinator' ? '/coordinator/events' : '/facilitator/events';

      await apiClient.post(endpoint, {
        ...newEvent,
        imageUrl: newEvent.imageUrl || newEvent.images[0] || '/Images/Photo01.jpg',
        expiryDate: newEvent.expiryDate || newEvent.date
      });

      toast({
        title: "Event Published! 🎉",
        description: `"${newEvent.title}" is now visible to all students and members.`
      });

      setNewEvent({
        title: '',
        category: 'Hackathon & Competition',
        description: '',
        date: '',
        timeRange: '9:00 AM - 5:00 PM',
        location: '',
        imageUrl: '/Images/Photo01.jpg',
        images: ['/Images/Photo01.jpg'],
        expiryDate: '',
        isPublished: true
      });

      fetchEvents();
      setActiveView('list');
    } catch (error) {
      toast({ title: "Error", description: "Failed to publish event.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await apiClient.delete(`/events/${id}`);
      toast({ title: "Event Removed", description: "The event has been deleted." });
      fetchEvents();
    } catch (e) {
      toast({ title: "Error", description: "Failed to delete event.", variant: "destructive" });
    }
  };

  const allImages = newEvent.imageUrl
    ? Array.from(new Set([newEvent.imageUrl, ...(newEvent.images || [])]))
    : (newEvent.images || []);

  return (
    <div className="space-y-8 relative z-10">
      {/* Top Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-gray-100 dark:border-gray-800">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-4 tracking-tight">
            <div className="p-3 bg-udsm-blue rounded-2xl shadow-xl shadow-blue-500/20 text-white">
              <Calendar className="h-7 w-7" />
            </div>
            Events Manager & Publisher
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-bold mt-2 uppercase text-[10px] tracking-widest ml-16">
            Lab Leadership Portal • Coordinate hackathons, workshops & masterclasses
          </p>
        </div>

        {/* View Switcher Controls */}
        <div className="flex items-center gap-3">
          <div className="bg-gray-100 dark:bg-gray-800 p-1.5 rounded-2xl flex items-center gap-1 border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveView('create')}
              className={cn(
                "px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2",
                activeView === 'create'
                  ? "bg-white dark:bg-gray-900 text-udsm-blue dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              )}
            >
              <Plus className="h-4 w-4" />
              <span>Create Event</span>
            </button>
            <button
              onClick={() => setActiveView('list')}
              className={cn(
                "px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2",
                activeView === 'list'
                  ? "bg-white dark:bg-gray-900 text-udsm-blue dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              )}
            >
              <Layers className="h-4 w-4" />
              <span>Published ({events.length})</span>
            </button>
          </div>

          <Button
            onClick={fetchEvents}
            variant="outline"
            className="rounded-2xl h-11 w-11 p-0 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
            title="Refresh Events"
          >
            <RefreshCw className={cn("h-4 w-4 text-udsm-blue", isLoadingEvents && "animate-spin")} />
          </Button>
        </div>
      </div>

      {activeView === 'create' ? (
        /* Create Event Layout: Two Columns (Form + Live Preview) */
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Column (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-gray-900 rounded-[2.5rem] p-6 sm:p-10 border border-gray-100 dark:border-gray-800 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                <span className="w-2.5 h-6 bg-udsm-blue rounded-full" />
                Publish New Event
              </h3>
              <span className="text-[10px] font-black uppercase tracking-wider text-udsm-blue bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900/40">
                Official Hub Listing
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Event Title */}
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-2">
                  Event Title <span className="text-red-500">*</span>
                </label>
                <Input
                  required
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="e.g. UDSM Annual Innovation Hackathon 2026"
                  className="rounded-xl h-12 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 font-bold text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-udsm-blue"
                />
              </div>

              {/* Category & Location */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-2">
                    Event Category
                  </label>
                  <select
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                    className="w-full rounded-xl h-12 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 px-3 font-bold text-xs text-gray-900 dark:text-white outline-none focus:border-udsm-blue"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c} className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-2">
                    Location & Venue <span className="text-red-500">*</span>
                  </label>
                  <Input
                    required
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    placeholder="e.g. Y4C Lab, UDSM CoICT Campus, Kijitonyama"
                    className="rounded-xl h-12 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 font-bold text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-udsm-blue"
                  />
                </div>
              </div>

              {/* Date, Time Range, Expiry */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-2">
                    Event Date <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    required
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="rounded-xl h-12 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 font-bold text-gray-900 dark:text-white dark:[color-scheme:dark] focus:border-udsm-blue"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-2">
                    Time Range
                  </label>
                  <Input
                    required
                    value={newEvent.timeRange}
                    onChange={(e) => setNewEvent({ ...newEvent, timeRange: e.target.value })}
                    placeholder="9:00 AM - 5:00 PM"
                    className="rounded-xl h-12 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 font-bold text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-udsm-blue"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-2">
                    Display Until
                  </label>
                  <Input
                    type="date"
                    value={newEvent.expiryDate}
                    onChange={(e) => setNewEvent({ ...newEvent, expiryDate: e.target.value })}
                    className="rounded-xl h-12 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 font-bold text-gray-900 dark:text-white dark:[color-scheme:dark] focus:border-udsm-blue"
                  />
                </div>
              </div>

              {/* Preset Sample Banners */}
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-2">
                  Quick Select Hub Banner
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {sampleBanners.map((sb) => (
                    <button
                      type="button"
                      key={sb.label}
                      onClick={() => setNewEvent({ ...newEvent, imageUrl: sb.url, images: [sb.url] })}
                      className={cn(
                        "relative rounded-xl overflow-hidden border-2 p-1.5 text-left transition-all group",
                        newEvent.imageUrl === sb.url
                          ? "border-udsm-blue bg-blue-50/50 dark:bg-blue-950/30"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                      )}
                    >
                      <img src={sb.url} alt={sb.label} className="w-full h-14 object-cover rounded-lg mb-1.5" />
                      <p className="text-[10px] font-black text-gray-800 dark:text-gray-200 truncate">{sb.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload Multiple Images */}
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-2">
                  Or Upload Custom Images (Gallery)
                </label>
                <div className="rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-5 bg-gray-50/50 dark:bg-gray-800/30">
                  <ImageUpload
                    multiple={true}
                    currentImage={newEvent.images}
                    onUploadSuccess={(urls) => {
                      setNewEvent({ ...newEvent, images: urls, imageUrl: urls[0] || newEvent.imageUrl });
                    }}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-2">
                  Event Description & Goals <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full rounded-2xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 p-4 outline-none focus:ring-2 focus:ring-udsm-blue text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 leading-relaxed"
                  placeholder="Detail the agenda, speaker profiles, judging criteria, and who should attend..."
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-udsm-blue hover:bg-blue-700 text-white h-14 rounded-2xl text-xs font-black uppercase tracking-widest gap-2 shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.01] active:scale-95"
              >
                <Plus className="h-5 w-5" />
                {isSubmitting ? "Publishing Event..." : "Publish Event to Hub"}
              </Button>
            </form>
          </div>

          {/* Right Live Preview Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2.5">
                <div className="w-2.5 h-6 bg-udsm-gold rounded-full" />
                Live Card Preview
              </h3>
              <span className="text-[10px] font-black uppercase tracking-wider text-udsm-gold bg-yellow-50 dark:bg-yellow-950/40 px-3 py-1 rounded-full border border-yellow-200 dark:border-yellow-900/40">
                Interactive Preview
              </span>
            </div>

            {/* Event Card Preview */}
            <div className="bg-gray-950 rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 aspect-[16/11] relative group">
              <AnimatePresence mode="wait">
                {allImages.length > 0 ? (
                  <motion.img
                    key={allImages[previewIndex] || allImages[0]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    src={allImages[previewIndex] || allImages[0]}
                    alt="Preview"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-950 flex flex-col items-center justify-center text-gray-500 p-8 text-center">
                    <ImageIcon className="h-16 w-16 mb-4 text-gray-600 animate-pulse" />
                    <p className="text-xs font-black uppercase tracking-widest">Select a banner to preview</p>
                  </div>
                )}
              </AnimatePresence>

              {/* Gradient & Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-udsm-gold text-gray-950 px-3.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-md">
                      {newEvent.category || "New Event"}
                    </span>
                    <span className="bg-white/20 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">
                      Open for RSVP
                    </span>
                  </div>

                  <h4 className="text-white text-2xl sm:text-3xl font-black leading-tight drop-shadow-md line-clamp-2">
                    {newEvent.title || "Your Event Title"}
                  </h4>

                  {newEvent.description && (
                    <p className="text-gray-300 text-xs font-medium line-clamp-2 leading-relaxed">
                      {newEvent.description}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-4 text-gray-300 text-[10px] font-black uppercase tracking-widest pt-3 border-t border-white/10 mt-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-udsm-gold" />
                      {newEvent.date ? new Date(newEvent.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : "Date TBD"}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-udsm-gold" />
                      {newEvent.timeRange || "9:00 AM - 5:00 PM"}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-udsm-gold" />
                      {newEvent.location || "Y4C Lab Hub"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Multiple Gallery Image Switcher Dots */}
              {allImages.length > 1 && (
                <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full">
                  {allImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPreviewIndex(i)}
                      className={cn(
                        "h-2 rounded-full transition-all",
                        previewIndex === i ? "bg-udsm-gold w-5" : "bg-white/50 w-2 hover:bg-white"
                      )}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Media Quality & Best Practice Guide */}
            <div className="bg-udsm-gold/5 dark:bg-udsm-gold/10 p-6 rounded-2xl border border-udsm-gold/20 relative overflow-hidden">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-udsm-gold flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-udsm-gold uppercase tracking-widest">
                    Lab Media & Outreach Best Practice
                  </p>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
                    Upload landscape (16:9 or 16:10) images. High-quality cover banners boost student RSVP rates by over 40% across campus portals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Published Events Roster View */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              <div className="w-2.5 h-6 bg-forest-green rounded-full" />
              Active Published Events ({events.length})
            </h3>
            <Button onClick={() => setActiveView('create')} className="bg-udsm-blue hover:bg-blue-700 text-white rounded-xl gap-2 font-bold text-xs uppercase tracking-wider">
              <Plus className="h-4 w-4" /> New Event
            </Button>
          </div>

          {events.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 p-16 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-black text-gray-900 dark:text-white">No published events found</h4>
              <p className="text-gray-500 text-xs mt-1">Get started by publishing an event above.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all flex flex-col group"
                >
                  <div className="aspect-[16/9] w-full overflow-hidden relative bg-gray-100 dark:bg-gray-800">
                    <img
                      src={ev.imageUrl || '/Images/Photo01.jpg'}
                      alt={ev.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-udsm-blue text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow-md">
                        {ev.category || "Workshop"}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h4 className="text-lg font-black text-gray-900 dark:text-white line-clamp-1">{ev.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium line-clamp-2 mt-1">{ev.description}</p>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-gray-100 dark:border-gray-800 text-[11px] font-bold text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 text-udsm-blue" />
                        <span>{ev.date ? new Date(ev.date).toLocaleDateString() : 'TBD'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-udsm-gold" />
                        <span className="truncate">{ev.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-[10px] font-black uppercase text-forest-green bg-green-50 dark:bg-green-950/40 px-2.5 py-1 rounded-full border border-green-200 dark:border-green-900/40">
                        Live on Site
                      </span>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteEvent(ev.id)}
                        className="rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 border-red-200 dark:border-red-900/30 h-9 px-3 gap-1.5"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span className="text-[10px] font-bold uppercase">Delete</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EventManager;
