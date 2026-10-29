import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, ShieldCheck, Download, Plus, RefreshCw, Printer } from 'lucide-react';
import apiClient from '@/core/apiClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CertificateGenerator = () => {
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [previewCert, setPreviewCert] = useState(null);

  const [form, setForm] = useState({
    recipientName: '',
    programTitle: 'Human-Centered Design Practitioner',
    issueDate: 'October 2026'
  });

  const fetchCertificates = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get('/certificates');
      setCertificates(res.data || []);
    } catch (e) {
      toast({ title: "Fetch Failed", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleIssue = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.post('/certificates/issue', form);
      toast({ title: "Certificate Issued! 🎓", description: `Credential generated: ${res.data.id}` });
      setPreviewCert(res.data);
      setForm({ recipientName: '', programTitle: 'Human-Centered Design Practitioner', issueDate: 'October 2026' });
      fetchCertificates();
    } catch (e) {
      toast({ title: "Issue failed", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-8 relative z-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-4 tracking-tight">
            <div className="p-3 bg-udsm-gold rounded-2xl shadow-xl shadow-yellow-100 dark:shadow-none text-gray-900">
              <Award className="h-8 w-8" />
            </div>
            Digital Credential & Certificate Generator
          </h2>
          <p className="text-gray-500 font-bold mt-2 uppercase text-[10px] tracking-widest ml-16">
            Issue cryptographically verifiable graduation certificates for hub cohorts
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Issue Form */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-md space-y-6">
          <h3 className="font-black text-xl text-gray-900 dark:text-white">Issue New Credential</h3>
          <form onSubmit={handleIssue} className="space-y-5">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Student / Innovator Full Name</label>
              <Input required value={form.recipientName} onChange={e => setForm({...form, recipientName: e.target.value})} placeholder="e.g. Baraka Mwangi" className="h-12 rounded-xl bg-gray-50 dark:bg-gray-800 font-bold" />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Program Track</label>
              <select value={form.programTitle} onChange={e => setForm({...form, programTitle: e.target.value})} className="w-full h-12 rounded-xl bg-gray-50 dark:bg-gray-800 border px-4 font-bold text-xs">
                <option value="Human-Centered Design Practitioner">Human-Centered Design Practitioner</option>
                <option value="Fullstack Web & IoT Cohort Graduate">Fullstack Web & IoT Cohort Graduate</option>
                <option value="Startup Incubation Cohort 2 Graduate">Startup Incubation Cohort 2 Graduate</option>
                <option value="Youth Innovation Hackathon Winner">Youth Innovation Hackathon Winner</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Issue Date / Cohort</label>
              <Input required value={form.issueDate} onChange={e => setForm({...form, issueDate: e.target.value})} placeholder="e.g. November 2026" className="h-12 rounded-xl bg-gray-50 dark:bg-gray-800 font-bold" />
            </div>
            <Button type="submit" className="w-full h-12 rounded-xl bg-gradient-to-r from-udsm-blue to-forest-green text-white font-black uppercase tracking-widest text-xs">
              Generate & Verify Credential
            </Button>
          </form>
        </div>

        {/* Live Certificate Preview */}
        <div className="bg-gradient-to-br from-slate-900 to-udsm-blue/40 p-8 rounded-[2.5rem] border-4 border-double border-udsm-gold/40 text-white relative shadow-2xl flex flex-col justify-between">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-udsm-gold">University of Dar es Salaam</span>
            <h4 className="text-2xl font-black tracking-tight">Y4C INNOVATION LAB</h4>
            <p className="text-[9px] uppercase tracking-widest opacity-70">Certificate of Completion</p>
          </div>

          <div className="text-center my-6 space-y-2">
            <p className="text-xs italic opacity-80">This is proudly awarded to</p>
            <h2 className="text-2xl font-black text-udsm-gold underline decoration-white/20 underline-offset-8">
              {previewCert?.recipientName || form.recipientName || "Innovator Name"}
            </h2>
            <p className="text-xs max-w-sm mx-auto opacity-90 pt-2">
              For demonstrating exceptional competency and practical innovation in <strong>{previewCert?.programTitle || form.programTitle}</strong>.
            </p>
          </div>

          <div className="pt-4 border-t border-white/20 flex justify-between items-center text-[9px] uppercase tracking-widest opacity-80 font-mono">
            <span>ID: {previewCert?.id || 'Y4C-CERT-2026-001'}</span>
            <span>VERIFY: {previewCert?.verificationCode || 'Y4C-VERIFY-9921'}</span>
          </div>
        </div>
      </div>

      {/* Issued Certificates History */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-md">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <h3 className="font-black text-base text-gray-900 dark:text-white">Registry of Issued Credentials</h3>
        </div>
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-400 uppercase tracking-widest text-[9px] font-black">
            <tr>
              <th className="p-4">Certificate ID</th>
              <th className="p-4">Recipient</th>
              <th className="p-4">Program Track</th>
              <th className="p-4">Issue Date</th>
              <th className="p-4">Verification Code</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-medium">
            {certificates.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50">
                <td className="p-4 font-mono font-bold text-udsm-blue">{c.id}</td>
                <td className="p-4 font-bold text-gray-900 dark:text-white">{c.recipientName}</td>
                <td className="p-4 text-gray-600 dark:text-gray-300">{c.programTitle}</td>
                <td className="p-4 text-gray-400">{c.issueDate}</td>
                <td className="p-4 font-mono text-udsm-gold font-bold">{c.verificationCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CertificateGenerator;
