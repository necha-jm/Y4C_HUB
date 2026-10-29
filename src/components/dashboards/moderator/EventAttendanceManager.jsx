import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QrCode, CheckCircle, Clock, Users, Download, RefreshCw, Search, Ticket } from 'lucide-react';
import apiClient from '@/core/apiClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const EventAttendanceManager = () => {
  const [attendees, setAttendees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAttendees = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get('/events/attendees');
      setAttendees(res.data || []);
    } catch (e) {
      toast({ title: "Fetch Failed", description: "Could not load attendees.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendees();
  }, []);

  const handleCheckIn = async (id) => {
    try {
      await apiClient.put(`/events/checkin/${id}`);
      toast({ title: "Check-In Verified! ✅", description: "Attendee marked as present at the hub." });
      fetchAttendees();
    } catch (e) {
      toast({ title: "Check-in failed", variant: "destructive" });
    }
  };

  const handleExportCSV = () => {
    const headers = "TicketID,FullName,Email,Phone,Organization,Event,CheckedIn\n";
    const rows = attendees.map(a => `${a.ticketId},"${a.fullName}",${a.email},${a.phone},"${a.organization}","${a.eventTitle}",${a.checkedIn ? 'YES' : 'NO'}`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `y4c_event_attendance_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const filtered = attendees.filter(a =>
    (a.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (a.ticketId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (a.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const checkedInCount = attendees.filter(a => a.checkedIn).length;
  const attendanceRate = attendees.length ? Math.round((checkedInCount / attendees.length) * 100) : 0;

  return (
    <div className="space-y-8 relative z-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-4 tracking-tight">
            <div className="p-3 bg-forest-green rounded-2xl shadow-xl shadow-green-100 dark:shadow-none">
              <QrCode className="h-8 w-8 text-white" />
            </div>
            Event Attendee & QR Check-In
          </h2>
          <p className="text-gray-500 font-bold mt-2 uppercase text-[10px] tracking-widest ml-16">
            Real-time door check-ins, attendee rosters, and ticket verification
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={handleExportCSV} variant="outline" className="gap-2 h-14 rounded-2xl border-2 px-6">
            <Download className="h-4 w-4 text-forest-green" />
            <span className="font-black uppercase tracking-widest text-xs">Export Roster</span>
          </Button>
          <Button onClick={fetchAttendees} variant="outline" className="gap-2 h-14 rounded-2xl border-2 px-6">
            <RefreshCw className={cn("h-4 w-4 text-udsm-blue", isLoading && "animate-spin")} />
            <span className="font-black uppercase tracking-widest text-xs">Sync</span>
          </Button>
        </div>
      </div>

      {/* Metrics Header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Registered</p>
          <p className="text-3xl font-black text-gray-900 dark:text-white mt-1">{attendees.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-forest-green">Checked In at Door</p>
          <p className="text-3xl font-black text-forest-green mt-1">{checkedInCount}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-udsm-blue">Attendance Turnout Rate</p>
          <p className="text-3xl font-black text-udsm-blue mt-1">{attendanceRate}%</p>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center gap-3">
        <Search className="h-4 w-4 text-gray-400 ml-2" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by ticket ID (e.g. Y4C-TKT-8921), name, or email..."
          className="border-none bg-transparent font-bold text-xs"
        />
      </div>

      {/* Attendees Table */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 dark:bg-gray-800 text-gray-400 uppercase tracking-widest text-[9px] font-black">
              <tr>
                <th className="p-5">Ticket ID</th>
                <th className="p-5">Attendee</th>
                <th className="p-5">Event</th>
                <th className="p-5">Organization</th>
                <th className="p-5">Status</th>
                <th className="p-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-medium">
              {filtered.map((att) => (
                <tr key={att.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="p-5 font-mono font-bold text-udsm-blue flex items-center gap-2">
                    <Ticket className="h-4 w-4 text-udsm-gold" />
                    {att.ticketId}
                  </td>
                  <td className="p-5">
                    <p className="font-bold text-gray-900 dark:text-white">{att.fullName}</p>
                    <p className="text-[10px] text-gray-400">{att.email}</p>
                  </td>
                  <td className="p-5 font-bold text-gray-700 dark:text-gray-300">{att.eventTitle}</td>
                  <td className="p-5 text-gray-500">{att.organization || 'Independent'}</td>
                  <td className="p-5">
                    {att.checkedIn ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300">
                        <CheckCircle className="h-3 w-3" /> Checked In
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                        <Clock className="h-3 w-3" /> Not Arrived
                      </span>
                    )}
                  </td>
                  <td className="p-5 text-right">
                    {!att.checkedIn ? (
                      <Button
                        size="sm"
                        onClick={() => handleCheckIn(att.id)}
                        className="bg-forest-green hover:bg-forest-green/90 text-white font-black text-xs uppercase tracking-wider rounded-xl gap-1.5"
                      >
                        <CheckCircle className="h-3.5 w-3.5" /> Check-In
                      </Button>
                    ) : (
                      <span className="text-gray-400 font-bold text-xs">Verified</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EventAttendanceManager;
