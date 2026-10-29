import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Calendar, Clock, MapPin, CheckCircle, Plus, Cpu, X } from 'lucide-react';
import apiClient from '@/core/apiClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const EquipmentBooking = ({ user }) => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    date: '2026-11-05',
    timeSlot: '10:00 AM - 01:00 PM',
    purpose: ''
  });

  const fetchData = async () => {
    try {
      const [eqRes, bRes] = await Promise.all([
        apiClient.get('/equipment'),
        apiClient.get('/equipment/bookings')
      ]);
      setEquipmentList(eqRes.data || []);
      const userBookings = (bRes.data || []).filter(b => !user?.id || String(b.userId) === String(user.id) || b.userName === user?.name);
      setMyBookings(userBookings.length > 0 ? userBookings : bRes.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBook = async (e) => {
    e.preventDefault();
    if (!selectedItem) return;

    try {
      await apiClient.post('/equipment/book', {
        userId: user?.id || 4,
        userName: user?.name || "Baraka Mwangi",
        userEmail: user?.email || "member@y4c.com",
        equipmentId: selectedItem.id,
        equipmentName: selectedItem.name,
        ...bookingForm
      });
      toast({
        title: "Reservation Request Submitted! 🛠️",
        description: `Reserved ${selectedItem.name} for ${bookingForm.date}. A facilitator will approve shortly.`
      });
      setSelectedItem(null);
      setBookingForm({ date: '2026-11-05', timeSlot: '10:00 AM - 01:00 PM', purpose: '' });
      fetchData();
    } catch (err) {
      toast({ title: "Booking Failed", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-10 relative z-10">
      <div>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-4 tracking-tight">
          <div className="p-3 bg-udsm-blue rounded-2xl shadow-xl shadow-blue-100 dark:shadow-none text-white">
            <Wrench className="h-8 w-8" />
          </div>
          Lab Equipment & Workspace Booking
        </h2>
        <p className="text-gray-500 font-bold mt-2 uppercase text-[10px] tracking-widest ml-16">
          Reserve 3D printers, VR kits, electronics testbenches & team rooms
        </p>
      </div>

      {/* Available Equipment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipmentList.map((eq) => (
          <motion.div
            key={eq.id}
            whileHover={{ y: -4 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-md flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-[9px] font-black uppercase tracking-widest text-udsm-gold">{eq.category}</span>
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300">
                  {eq.availableQuantity} Available
                </span>
              </div>
              <h4 className="font-black text-base text-gray-900 dark:text-white">{eq.name}</h4>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-forest-green" /> {eq.location}</p>
              <p className="text-xs text-gray-400 mt-2 line-clamp-2">{eq.specs}</p>
            </div>

            <Button
              onClick={() => setSelectedItem(eq)}
              className="w-full h-11 bg-udsm-blue hover:bg-udsm-blue/90 text-white font-black text-xs uppercase tracking-wider rounded-xl gap-2"
            >
              <Calendar className="h-4 w-4" /> Book Slot
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] max-w-lg w-full border border-gray-100 dark:border-gray-800 shadow-2xl relative"
            >
              <button onClick={() => setSelectedItem(null)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-1">Reserve {selectedItem.name}</h3>
              <p className="text-xs text-gray-500 mb-6 font-bold">{selectedItem.location} • {selectedItem.specs}</p>

              <form onSubmit={handleBook} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Reservation Date</label>
                  <Input type="date" required value={bookingForm.date} onChange={e => setBookingForm({...bookingForm, date: e.target.value})} className="h-12 rounded-xl bg-gray-50 dark:bg-gray-800 font-bold" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Time Window</label>
                  <select value={bookingForm.timeSlot} onChange={e => setBookingForm({...bookingForm, timeSlot: e.target.value})} className="w-full h-12 rounded-xl bg-gray-50 dark:bg-gray-800 border px-4 font-bold text-xs">
                    <option value="09:00 AM - 12:00 PM">09:00 AM - 12:00 PM (Morning Slot)</option>
                    <option value="12:00 PM - 03:00 PM">12:00 PM - 03:00 PM (Afternoon Slot)</option>
                    <option value="03:00 PM - 06:00 PM">03:00 PM - 06:00 PM (Evening Slot)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Project Prototyping Purpose</label>
                  <Input required placeholder="Describe what you are building / testing" value={bookingForm.purpose} onChange={e => setBookingForm({...bookingForm, purpose: e.target.value})} className="h-12 rounded-xl bg-gray-50 dark:bg-gray-800 font-bold text-xs" />
                </div>
                <Button type="submit" className="w-full h-12 rounded-xl bg-forest-green text-white font-black uppercase tracking-widest text-xs mt-2">
                  Confirm Reservation Request
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* My Bookings History */}
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
        <h3 className="font-black text-lg text-gray-900 dark:text-white">My Active Lab Bookings</h3>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {myBookings.map((b) => (
            <div key={b.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-bold text-sm text-gray-900 dark:text-white">{b.equipmentName}</p>
                <p className="text-xs text-gray-500 font-medium">{b.date} • {b.timeSlot} • "{b.purpose}"</p>
              </div>
              <span className={cn(
                "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest w-fit",
                b.status === 'APPROVED' ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
              )}>
                {b.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EquipmentBooking;
