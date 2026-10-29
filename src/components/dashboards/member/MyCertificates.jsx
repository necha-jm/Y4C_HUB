import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, ShieldCheck, Download, Printer, QrCode } from 'lucide-react';
import apiClient from '@/core/apiClient';
import { Button } from '@/components/ui/button';

const MyCertificates = ({ user }) => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const res = await apiClient.get('/certificates');
        setCertificates(res.data || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchCerts();
  }, []);

  return (
    <div className="space-y-8 relative z-10 max-w-5xl mx-auto">
      <div>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-4 tracking-tight">
          <div className="p-3 bg-udsm-gold rounded-2xl shadow-xl shadow-yellow-100 dark:shadow-none text-gray-900">
            <Award className="h-8 w-8" />
          </div>
          My Verifiable Credentials & Certificates
        </h2>
        <p className="text-gray-500 font-bold mt-2 uppercase text-[10px] tracking-widest ml-16">
          Official University of Dar es Salaam Y4C Innovation Lab Credentials
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {certificates.map((cert) => (
          <motion.div
            key={cert.id}
            whileHover={{ y: -4 }}
            className="bg-gradient-to-br from-slate-950 via-slate-900 to-udsm-blue/40 p-8 rounded-[2.5rem] border-4 border-double border-udsm-gold/40 text-white shadow-2xl relative flex flex-col justify-between space-y-6"
          >
            <div className="text-center space-y-1">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-udsm-gold">University of Dar es Salaam</span>
              <h3 className="text-xl font-black">Y4C INNOVATION LAB</h3>
              <p className="text-[9px] uppercase tracking-widest opacity-70">Official Digital Certificate</p>
            </div>

            <div className="text-center space-y-2 py-4 border-y border-white/10">
              <p className="text-xs italic opacity-80">This certifies that</p>
              <h4 className="text-xl font-black text-udsm-gold">{cert.recipientName}</h4>
              <p className="text-xs opacity-90 max-w-xs mx-auto">
                Has successfully completed all competencies in <strong>{cert.programTitle}</strong>.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 text-[9px] font-mono opacity-80 uppercase tracking-widest">
              <span>{cert.id}</span>
              <span className="text-udsm-gold font-bold">VERIFY: {cert.verificationCode}</span>
            </div>

            <Button onClick={() => window.print()} variant="outline" className="w-full h-11 rounded-xl bg-white/10 hover:bg-white/20 border-white/20 text-white font-black uppercase tracking-widest text-xs gap-2">
              <Printer className="h-4 w-4" /> Download / Print Credential
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyCertificates;
