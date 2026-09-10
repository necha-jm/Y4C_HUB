import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import apiClient from '@/core/apiClient';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await apiClient.get('/public/events');
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const isEventOutdated = (eventDate) => {
    const today = new Date();
    const event = new Date(eventDate);
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    return event < today;
  };

  return (
    <section id="events" className="py-32 px-4 bg-[#0a0f1a] relative overflow-hidden text-white">
      <div className="container mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-24 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tight">
              Global <span className="bg-gradient-to-r from-udsm-blue to-forest-green bg-clip-text text-transparent">Events</span>
            </h2>
            <p className="text-xl text-gray-400 font-medium leading-relaxed">
              Connect with pioneers, attend masterclasses, and showcase your innovation on the world stage.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => {
            const outdated = isEventOutdated(event.date);
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-[#111827] rounded-3xl overflow-hidden shadow-2xl transition-all flex flex-col border border-[#1f2937]"
              >
                <div className="p-6 space-y-6 flex-grow">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-xl font-black text-white leading-tight">{event.title}</h3>
                    <div className={cn(
                      "px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest flex-shrink-0",
                      outdated ? "bg-gray-400/20 text-gray-300" : "bg-forest-green/20 text-forest-green"
                    )}>
                      {outdated ? 'Passed' : 'Upcoming'}
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 leading-relaxed font-medium line-clamp-3">{event.description}</p>

                  <div className="space-y-3 pt-6 border-t border-gray-800">
                    <div className="flex items-center gap-3 text-xs font-bold text-gray-300">
                      <div className="p-1.5 bg-udsm-blue/10 rounded-lg text-udsm-blue">
                        <Calendar className="h-3.5 w-3.5" />
                      </div>
                      <span>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold text-gray-300">
                      <div className="p-1.5 bg-udsm-gold/10 rounded-xl text-udsm-gold">
                        <Clock className="h-3.5 w-3.5" />
                      </div>
                      <span>{event.timeRange || "9:00 AM - 5:00 PM"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold text-gray-300">
                      <div className="p-1.5 bg-forest-green/10 rounded-xl text-forest-green">
                        <MapPin className="h-3.5 w-3.5" />
                      </div>
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Button
                    asChild
                    disabled={outdated}
                    className={cn(
                      "w-full h-12 rounded-xl text-base font-black tracking-wider transition-all",
                      outdated
                        ? "bg-[#1f2937] text-gray-500 cursor-not-allowed hover:bg-[#1f2937]"
                        : "bg-gradient-to-r from-udsm-blue to-forest-green text-white shadow-xl hover:shadow-udsm-blue/20"
                    )}
                  >
                    {outdated ? (
                      <span>REGISTRATION CLOSED</span>
                    ) : (
                      <Link to={`/register/${event.id}`}>SECURE YOUR SPOT</Link>
                    )}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {!isLoading && events.length === 0 && (
          <div className="text-center py-20">
             <p className="text-gray-500 text-xl font-bold italic">No active events at the moment. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;