import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Plus, Trash2, CalendarDays } from 'lucide-react';
import apiClient from '@/core/apiClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const TimetableManager = () => {
  const [timetables, setTimetables] = useState([]);
  const [newEntry, setNewEntry] = useState({
    dayOfWeek: 'Monday',
    startTime: '',
    endTime: '',
    activity: '',
    location: ''
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const fetchTimetable = async () => {
    try {
      const response = await apiClient.get('/facilitator/timetables');
      if (response.data && Array.isArray(response.data)) {
        setTimetables(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTimetable();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/facilitator/timetables', newEntry);
      toast({ title: "Updated", description: "Timetable entry added" });
      fetchTimetable();
      setNewEntry({ ...newEntry, activity: '', startTime: '', endTime: '' });
    } catch (error) {
      toast({ title: "Error", description: "Failed to add entry", variant: "destructive" });
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-10 relative z-10">
      <div className="bg-white/80 backdrop-blur-md p-10 rounded-[3.5rem] shadow-xl border border-blue-50">
        <h2 className="text-2xl font-black mb-8 flex items-center gap-3 tracking-tight">
          <div className="p-2 bg-green-50 rounded-xl">
            <CalendarDays className="h-6 w-6 text-green-600" />
          </div>
          Add Schedule
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Day of Week</label>
            <select
              className="w-full h-12 rounded-xl bg-gray-50 border-none px-4 font-bold outline-none focus:ring-2 focus:ring-green-500"
              value={newEntry.dayOfWeek}
              onChange={(e) => setNewEntry({ ...newEntry, dayOfWeek: e.target.value })}
            >
              {days.map(day => <option key={day} value={day}>{day}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Start Time</label>
              <Input type="time" required value={newEntry.startTime} onChange={(e) => setNewEntry({ ...newEntry, startTime: e.target.value })} className="rounded-xl h-12 bg-gray-50 border-none font-bold" />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">End Time</label>
              <Input type="time" required value={newEntry.endTime} onChange={(e) => setNewEntry({ ...newEntry, endTime: e.target.value })} className="rounded-xl h-12 bg-gray-50 border-none font-bold" />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Activity Name</label>
            <Input required value={newEntry.activity} onChange={(e) => setNewEntry({ ...newEntry, activity: e.target.value })} placeholder="Robotics Workshop" className="rounded-xl h-12 bg-gray-50 border-none font-bold" />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Location/Hub</label>
            <Input required value={newEntry.location} onChange={(e) => setNewEntry({ ...newEntry, location: e.target.value })} placeholder="Lab Room 3" className="rounded-xl h-12 bg-gray-50 border-none font-bold" />
          </div>
          <Button className="w-full bg-green-600 hover:bg-green-700 h-16 rounded-[1.5rem] font-black uppercase tracking-widest gap-2 shadow-xl shadow-green-100 transition-all hover:scale-[1.02]">
            <Plus className="h-6 w-6" />
            Add Entry
          </Button>
        </form>
      </div>

      <div className="lg:col-span-2 space-y-8">
        <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
          <div className="w-2 h-6 bg-green-500 rounded-full" />
          Current Schedule
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {days.map(day => {
            const dayEntries = timetables.filter(t => t.dayOfWeek === day);
            if (dayEntries.length === 0) return null;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={day}
                className="bg-white/90 p-8 rounded-[2.5rem] border border-gray-100 shadow-lg hover:shadow-xl transition-all group"
              >
                <h4 className="text-xs font-black text-green-600 uppercase tracking-[0.2em] mb-6 border-b border-gray-50 pb-3 flex justify-between items-center">
                  {day}
                  <span className="bg-green-50 text-[8px] px-2 py-0.5 rounded-full">{dayEntries.length} Tasks</span>
                </h4>
                <div className="space-y-6">
                  {dayEntries.map((entry, idx) => (
                    <div key={idx} className="flex gap-4 group/item">
                      <div className="w-1.5 bg-green-500/20 group-hover/item:bg-green-500 rounded-full transition-colors h-12" />
                      <div className="flex-grow">
                        <p className="font-black text-gray-900 text-sm tracking-tight">{entry.activity}</p>
                        <div className="flex items-center gap-4 text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tighter">
                          <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-green-500" /> {entry.startTime} - {entry.endTime}</span>
                          <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-green-500" /> {entry.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimetableManager;
