import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Globe,
  Mail,
  Phone,
  User,
  Send,
  Users,
  ArrowRight,
  MapPin,
  FileText,
  X
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Partners from '@/components/Partners';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import ImageUpload from '@/components/ui/ImageUpload';
import apiClient from '@/core/apiClient';

const countries = [
  { name: "Tanzania", flag: "🇹🇿" },
  { name: "Kenya", flag: "🇰🇪" },
  { name: "Uganda", flag: "🇺🇬" },
  { name: "Rwanda", flag: "🇷🇼" },
  { name: "Burundi", flag: "🇧🇮" },
  { name: "DR Congo", flag: "🇨🇩" },
  { name: "Ethiopia", flag: "🇪🇹" },
  { name: "Nigeria", flag: "🇳🇬" },
  { name: "South Africa", flag: "🇿🇦" },
  { name: "Egypt", flag: "🇪🇬" },
  { name: "Ghana", flag: "🇬🇭" },
  { name: "United States", flag: "🇺🇸" },
  { name: "United Kingdom", flag: "🇬🇧" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "France", flag: "🇫🇷" },
  { name: "China", flag: "🇨🇳" },
  { name: "India", flag: "🇮🇳" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "Norway", flag: "🇳🇴" },
  { name: "Sweden", flag: "🇸🇪" },
  { name: "Netherlands", flag: "🇳🇱" },
  { name: "Other", flag: "🌍" }
].sort((a, b) => a.name === "Tanzania" ? -1 : b.name === "Tanzania" ? 1 : a.name.localeCompare(b.name));

const PartnersPage = () => {
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    institutionName: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: '',
    partnerType: 'CORPORATE',
    website: '',
    location: '',
    description: '',
    collaborationGoal: '',
    logoUrl: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiClient.post('/public/partners/register', formData);
      toast({
        title: "Partnership Request Submitted! 🤝",
        description: "Thank you! Your application has been received. A confirmation email was sent to " + (formData.email || "your registered email") + ".",
      });
      setFormData({
        institutionName: '',
        contactPerson: '',
        email: '',
        phone: '',
        country: '',
        partnerType: 'CORPORATE',
        website: '',
        location: '',
        description: '',
        collaborationGoal: '',
        logoUrl: ''
      });
      setShowApplicationModal(false);
    } catch (error) {
      console.error('Partnership registration error:', error);
      toast({
        title: "Submission Failed",
        description: "Could not send your request. Please try again or check server connection.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Our Partners & Application - Y4C Innovation Lab</title>
        <meta
          name="description"
          content="Explore our global & local partner network or apply for partnership to collaborate with Youth For Children Innovation Lab."
        />
      </Helmet>
      <Header />
      <main className="min-h-screen bg-slate-50 dark:bg-gray-950 pt-20 lg:pt-24">
        <Breadcrumbs />

        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-udsm-blue via-indigo-900 to-udsm-blue text-white py-16 md:py-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="max-w-7xl mx-auto relative z-10 text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 text-udsm-gold font-bold text-xs uppercase tracking-widest"
            >
              <Users className="w-4 h-4" />
              Global & Local Ecosystem
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight"
            >
              Our Partners & <span className="text-udsm-gold">Collaborators</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto font-medium leading-relaxed"
            >
              Connecting academic excellence, international development organizations, and industry leaders to empower youth innovation across Tanzania and Africa.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="pt-4"
            >
              <Button
                onClick={() => setShowApplicationModal(true)}
                size="lg"
                className="bg-udsm-gold hover:bg-amber-400 text-black font-black uppercase tracking-widest text-xs px-8 py-4 rounded-2xl shadow-xl transition-all flex items-center gap-2 mx-auto hover:scale-105"
              >
                Apply for Partnership
                <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Partners Showcase Section */}
        <Partners onApplyClick={() => setShowApplicationModal(true)} />
      </main>
      <Footer />

      {/* Partner Application Form Modal */}
      <AnimatePresence>
        {showApplicationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowApplicationModal(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl max-w-3xl w-full relative overflow-hidden border border-gray-100 dark:border-gray-800 my-auto"
            >
              {/* Modal Banner */}
              <div className="bg-gradient-to-r from-udsm-blue to-indigo-900 p-8 md:p-10 text-white relative">
                <button
                  type="button"
                  onClick={() => setShowApplicationModal(false)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                  aria-label="Close form"
                >
                  <X className="w-6 h-6" />
                </button>

                <Building2 className="h-12 w-12 text-udsm-gold mb-3" />
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Partner Application Form</h2>
                <p className="text-blue-100 text-xs md:text-sm font-medium mt-1">
                  Submit your organization's details to register as a partner with Y4C Innovation Lab.
                </p>
              </div>

              {/* Form Content with All Institutional Fields */}
              <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
                {/* 1. Institutional Name & Partnership Category */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">Institutional Name *</label>
                    <div className="relative">
                      <Input
                        required
                        value={formData.institutionName}
                        onChange={(e) => setFormData({...formData, institutionName: e.target.value})}
                        placeholder="e.g. University of Dar es Salaam / Tech Corp"
                        className="h-12 rounded-xl pl-10 bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 font-bold text-sm"
                      />
                      <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">Partnership Category *</label>
                    <select
                      className="w-full h-12 rounded-xl px-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 font-bold text-sm outline-none focus:ring-2 focus:ring-udsm-blue dark:text-white"
                      value={formData.partnerType}
                      onChange={(e) => setFormData({...formData, partnerType: e.target.value})}
                    >
                      <option value="ACADEMIC">Academic Institution / University</option>
                      <option value="DEVELOPMENT">Development Partner / NGO</option>
                      <option value="HEALTH">Health & Community Partner</option>
                      <option value="CORPORATE">Corporate / Industry Leader</option>
                      <option value="INTERNATIONAL">International Innovation Network</option>
                      <option value="COMMUNITY">Community Organization</option>
                    </select>
                  </div>
                </div>

                {/* 2. Institutional Overview & Description */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">Institutional Overview & Description *</label>
                  <Textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Provide a brief overview of your organization, mission, and key operations..."
                    className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 p-4 font-medium text-sm min-h-[100px]"
                  />
                </div>

                {/* 3. Official Website & Physical Location / Address */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">Official Website URL</label>
                    <div className="relative">
                      <Input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({...formData, website: e.target.value})}
                        placeholder="https://www.institution.org"
                        className="h-12 rounded-xl pl-10 bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 font-bold text-sm"
                      />
                      <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">Physical Location / Address *</label>
                    <div className="relative">
                      <Input
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        placeholder="e.g. Dar es Salaam, Tanzania"
                        className="h-12 rounded-xl pl-10 bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 font-bold text-sm"
                      />
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* 4. Country & Primary Contact Representative */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">Country *</label>
                    <div className="relative">
                      <select
                        required
                        value={formData.country}
                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                        className="w-full h-12 rounded-xl pl-10 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 font-bold text-sm outline-none focus:ring-2 focus:ring-udsm-blue appearance-none dark:text-white"
                      >
                        <option value="">Select Country</option>
                        {countries.map((c, idx) => (
                          <option key={idx} value={c.name}>
                            {c.flag} {c.name}
                          </option>
                        ))}
                      </select>
                      <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">Contact Representative *</label>
                    <div className="relative">
                      <Input
                        required
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                        placeholder="Full Name & Position"
                        className="h-12 rounded-xl pl-10 bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 font-bold text-sm"
                      />
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* 5. Work Email & Phone Number */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">Official Work Email *</label>
                    <div className="relative">
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="partner@institution.org"
                        className="h-12 rounded-xl pl-10 bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 font-bold text-sm"
                      />
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">Phone Number *</label>
                    <div className="relative">
                      <Input
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+255..."
                        className="h-12 rounded-xl pl-10 bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 font-bold text-sm"
                      />
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* 6. Collaboration Goal & Objectives */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">Collaboration Goal & Scope *</label>
                  <Textarea
                    required
                    value={formData.collaborationGoal}
                    onChange={(e) => setFormData({...formData, collaborationGoal: e.target.value})}
                    placeholder="Describe how your organization would like to collaborate with Y4C Innovation Lab (e.g. mentorship, seed funding, research, student placements)..."
                    className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 p-4 font-medium text-sm min-h-[120px]"
                  />
                </div>

                {/* 7. Institutional Logo Upload */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1 block">Institutional Logo (Optional)</label>
                  <div className="bg-gray-50 dark:bg-gray-800/30 p-4 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                    <ImageUpload
                      onUploadSuccess={(url) => setFormData({...formData, logoUrl: url})}
                      currentImage={formData.logoUrl}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowApplicationModal(false)}
                    className="flex-1 h-14 rounded-xl border-gray-200 dark:border-gray-700 font-bold text-gray-600 dark:text-gray-300"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-2 h-14 bg-udsm-blue hover:bg-blue-700 text-white font-black text-base rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all uppercase tracking-widest"
                  >
                    {isSubmitting ? "PROCESSING..." : "SUBMIT APPLICATION"}
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PartnersPage;
