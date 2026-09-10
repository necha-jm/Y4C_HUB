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
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-blue-50">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <CalendarDays className="h-6 w-6 text-green-500" />
          Add Schedule
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Day</label>
            <select
              className="w-full h-12 rounded-xl bg-gray-50 border-gray-100 px-4 font-bold outline-none focus:ring-2 focus:ring-green-500"
              value={newEntry.dayOfWeek}
              onChange={(e) => setNewEntry({ ...newEntry, dayOfWeek: e.target.value })}
            >
              {days.map(day => <option key={day} value={day}>{day}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Start</label>
              <Input type="time" required value={newEntry.startTime} onChange={(e) => setNewEntry({ ...newEntry, startTime: e.target.value })} className="rounded-xl" />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">End</label>
              <Input type="time" required value={newEntry.endTime} onChange={(e) => setNewEntry({ ...newEntry, endTime: e.target.value })} className="rounded-xl" />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Activity</label>
            <Input required value={newEntry.activity} onChange={(e) => setNewEntry({ ...newEntry, activity: e.target.value })} placeholder="Robotics Workshop" className="rounded-xl" />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Room/Location</label>
            <Input required value={newEntry.location} onChange={(e) => setNewEntry({ ...newEntry, location: e.target.value })} placeholder="Lab Room 3" className="rounded-xl" />
          </div>
          <Button className="w-full bg-green-600 hover:bg-green-700 h-12 rounded-xl font-bold gap-2">
            <Plus className="h-5 w-5" />
            Add Entry
          </Button>
        </form>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <h3 className="text-xl font-bold text-gray-900">Current Schedule</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {days.map(day => {
            const dayEntries = timetables.filter(t => t.dayOfWeek === day);
            if (dayEntries.length === 0) return null;
            return (
              <div key={day} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <h4 className="text-sm font-black text-green-600 uppercase tracking-widest mb-4 border-b pb-2">{day}</h4>
                <div className="space-y-4">
                  {dayEntries.map((entry, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-1 bg-green-500 rounded-full" />
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{entry.activity}</p>
                        <div className="flex items-center gap-3 text-[10px] text-gray-500 mt-1">
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {entry.startTime} - {entry.endTime}</span>
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {entry.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimetableManager;
