import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, CheckCircle, XCircle, Plus, RefreshCw, Clock, MapPin, Cpu, Box } from 'lucide-react';
import apiClient from '@/core/apiClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const EquipmentManager = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  const [newEquipment, setNewEquipment] = useState({
    name: '',
    category: 'Fabrication',
    location: 'Hardware Lab',
    totalQuantity: 1,
    availableQuantity: 1,
    specs: ''
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [eqRes, bRes] = await Promise.all([
        apiClient.get('/equipment'),
        apiClient.get('/equipment/bookings')
      ]);
      setEquipmentList(eqRes.data || []);
      setBookings(bRes.data || []);
    } catch (e) {
      toast({ title: "Sync Failed", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddEquipment = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/equipment', newEquipment);
      toast({ title: "Equipment Added! 🛠️", description: `${newEquipment.name} registered in lab catalog.` });
      setShowAddForm(false);
      setNewEquipment({ name: '', category: 'Fabrication', location: 'Hardware Lab', totalQuantity: 1, availableQuantity: 1, specs: '' });
      fetchData();
    } catch (e) {
      toast({ title: "Failed to add", variant: "destructive" });
    }
  };

  const handleBookingAction = async (id, status) => {
    try {
      await apiClient.put(`/equipment/bookings/${id}`, { status });
      toast({ title: `Booking ${status} ✅`, description: "Student has been notified." });
      fetchData();
    } catch (e) {
      toast({ title: "Error updating booking", variant: "destructive" });
    }
  };

  const pendingBookings = bookings.filter(b => b.status === 'PENDING');

  return (
    <div className="space-y-10 relative z-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-4 tracking-tight">
            <div className="p-3 bg-udsm-blue rounded-2xl shadow-xl shadow-blue-100 dark:shadow-none">
              <Wrench className="h-8 w-8 text-white" />
            </div>
            Lab Equipment & Space Inventory
          </h2>
          <p className="text-gray-500 font-bold mt-2 uppercase text-[10px] tracking-widest ml-16">
            Managing 3D printers, VR headsets, microcontrollers & student reservation requests
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setShowAddForm(true)} className="gap-2 h-14 rounded-2xl bg-forest-green text-white px-6 font-black uppercase tracking-widest text-xs">
            <Plus className="h-4 w-4" /> Add Asset
          </Button>
          <Button onClick={fetchData} variant="outline" className="gap-2 h-14 rounded-2xl border-2 px-6">
            <RefreshCw className={cn("h-4 w-4 text-udsm-blue", isLoading && "animate-spin")} />
            <span className="font-black uppercase tracking-widest text-xs">Refresh</span>
          </Button>
        </div>
      </div>

      {/* Add Asset Form Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl"
          >
            <h3 className="text-xl font-black mb-6 text-gray-900 dark:text-white">Register Lab Asset or Hardware Tool</h3>
            <form onSubmit={handleAddEquipment} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Item Name</label>
                <Input required value={newEquipment.name} onChange={e => setNewEquipment({...newEquipment, name: e.target.value})} placeholder="e.g. Raspberry Pi 5" className="h-12 rounded-xl bg-gray-50 dark:bg-gray-800 font-bold" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Category</label>
                <select value={newEquipment.category} onChange={e => setNewEquipment({...newEquipment, category: e.target.value})} className="w-full h-12 rounded-xl bg-gray-50 dark:bg-gray-800 border px-4 font-bold text-xs">
                  <option value="Fabrication">Fabrication (3D Printers / Laser)</option>
                  <option value="AR/VR & Immersive">AR/VR & Immersive</option>
                  <option value="Embedded Systems">Embedded Systems & IoT</option>
                  <option value="Instrumentation">Instrumentation & Soldering</option>
                  <option value="Lab Space">Lab Space / Pod</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Lab Location</label>
                <Input required value={newEquipment.location} onChange={e => setNewEquipment({...newEquipment, location: e.target.value})} placeholder="Room B208 / Bench 2" className="h-12 rounded-xl bg-gray-50 dark:bg-gray-800 font-bold" />
              </div>
              <div className="md:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Specs & Instructions</label>
                <Input value={newEquipment.specs} onChange={e => setNewEquipment({...newEquipment, specs: e.target.value})} placeholder="Key specs, power requirements, filaments" className="h-12 rounded-xl bg-gray-50 dark:bg-gray-800 font-bold" />
              </div>
              <div className="flex items-end gap-3">
                <Button type="submit" className="h-12 rounded-xl bg-udsm-blue text-white font-black uppercase tracking-widest text-xs flex-1">Save Asset</Button>
                <Button type="button" variant="ghost" onClick={() => setShowAddForm(false)} className="h-12 rounded-xl font-black uppercase tracking-widest text-xs">Cancel</Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pending Reservations Queue */}
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-udsm-gold" />
            <h3 className="font-black text-lg text-gray-900 dark:text-white">Pending Student Reservations</h3>
          </div>
          <span className="px-3 py-1 bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 rounded-full text-xs font-black">
            {pendingBookings.length} Requests
          </span>
        </div>

        {pendingBookings.length === 0 ? (
          <p className="text-xs text-gray-400 font-bold italic py-4">No pending equipment booking requests.</p>
        ) : (
          <div className="grid gap-4">
            {pendingBookings.map((b) => (
              <div key={b.id} className="p-5 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm text-gray-900 dark:text-white">{b.equipmentName}</span>
                    <span className="text-[10px] font-bold text-udsm-blue bg-blue-50 dark:bg-blue-950 px-2.5 py-0.5 rounded-md">{b.date} • {b.timeSlot}</span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium mt-1">Reserved by <strong className="text-gray-700 dark:text-gray-200">{b.userName}</strong> ({b.userEmail})</p>
                  <p className="text-xs italic text-gray-600 dark:text-gray-400 mt-1">"{b.purpose}"</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleBookingAction(b.id, 'APPROVED')} className="h-10 rounded-xl bg-forest-green text-white font-black text-xs uppercase tracking-wider gap-1">
                    <CheckCircle className="h-3.5 w-3.5" /> Approve
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleBookingAction(b.id, 'REJECTED')} className="h-10 rounded-xl text-red-500 font-black text-xs uppercase tracking-wider">
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Equipment Catalog Cards */}
      <div>
        <h3 className="font-black text-xl text-gray-900 dark:text-white mb-6">Current Inventory Catalog</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipmentList.map((eq) => (
            <div key={eq.id} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-md space-y-4">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl text-udsm-blue">
                  <Cpu className="h-6 w-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300">
                  {eq.status}
                </span>
              </div>
              <div>
                <span className="text-[9px] font-black uppercase tracking-widest text-udsm-gold">{eq.category}</span>
                <h4 className="font-black text-base text-gray-900 dark:text-white mt-0.5">{eq.name}</h4>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-forest-green" /> {eq.location}</p>
                {eq.specs && <p className="text-[11px] text-gray-400 mt-2 font-medium">{eq.specs}</p>}
              </div>
              <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between text-xs font-bold text-gray-500">
                <span>Total Units: {eq.totalQuantity}</span>
                <span className="text-forest-green">Available: {eq.availableQuantity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EquipmentManager;
