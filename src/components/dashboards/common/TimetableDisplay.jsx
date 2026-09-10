import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, CalendarDays } from 'lucide-react';
import apiClient from '@/core/apiClient';

const TimetableDisplay = () => {
  const [timetables, setTimetables] = useState([]);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await apiClient.get('/facilitator/timetables');
        if (response.data && Array.isArray(response.data)) {
          setTimetables(response.data);
        }
      } catch (error) {
        console.error('Error fetching timetable', error);
      }
    };
    fetchTimetable();
  }, []);

  if (timetables.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-950 rounded-[3rem] p-10 shadow-2xl border border-gray-50 dark:border-gray-900 mt-12">
      <h2 className="text-3xl font-black mb-10 text-gray-900 dark:text-white flex items-center gap-4">
        <div className="p-3 bg-udsm-blue/10 rounded-2xl">
          <CalendarDays className="h-8 w-8 text-udsm-blue" />
        </div>
        Lab Weekly Schedule
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {days.map(day => {
          const dayEntries = timetables.filter(t => t.dayOfWeek === day);
          if (dayEntries.length === 0) return null;
          return (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h4 className="text-xs font-black text-udsm-blue dark:text-udsm-gold uppercase tracking-[0.3em] mb-6 border-b border-gray-100 dark:border-gray-800 pb-2">{day}</h4>
              <div className="space-y-4">
                {dayEntries.map((entry, idx) => (
                  <div key={idx} className="p-6 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all group">
                    <p className="font-black text-gray-900 dark:text-white text-base group-hover:text-udsm-blue transition-colors uppercase tracking-tight">{entry.activity}</p>
                    <div className="flex items-center gap-3 text-xs font-bold text-gray-500 mt-4">
                       <Clock className="h-4 w-4 text-udsm-blue" />
                       <span>{entry.startTime} - {entry.endTime}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold text-gray-500 mt-2">
                       <MapPin className="h-4 w-4 text-udsm-gold" />
                       <span>{entry.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TimetableDisplay;
