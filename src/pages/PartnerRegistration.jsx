import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Globe, Mail, Phone, User, Send, MapPin, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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

const PartnerRegistration = () => {
  const navigate = useNavigate();
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
        description: "Your partnership request has been sent to our coordinator. A confirmation email was sent to " + (formData.email || "your registered email") + ".",
      });
      navigate('/partners');
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Could not send your request. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 dark:bg-gray-950 pt-20 lg:pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-udsm-blue font-bold mb-8 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800"
          >
            <div className="bg-udsm-blue p-12 text-center text-white relative">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
               <Building2 className="h-16 w-16 mx-auto mb-6 text-udsm-gold drop-shadow-lg" />
               <h1 className="text-4xl font-black uppercase tracking-tight">Partner with <span className="text-udsm-gold">Y4C</span></h1>
               <p className="text-blue-100 mt-4 font-medium max-w-xl mx-auto italic">"Uniting institutions, industry leaders, and communities to accelerate youth-led innovation in Africa."</p>
            </div>

            <form onSubmit={handleSubmit} className="p-10 md:p-16 space-y-8">
              {/* Institutional Name & Partnership Category */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Institutional Name *</label>
                  <div className="relative">
                    <Input
                      required
                      value={formData.institutionName}
                      onChange={(e) => setFormData({...formData, institutionName: e.target.value})}
                      placeholder="e.g. University of Dar es Salaam / Tech Corp"
                      className="h-14 rounded-xl pl-12 bg-gray-50/50 border-none font-bold"
                    />
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Partnership Category *</label>
                  <select
                    className="w-full h-14 rounded-xl px-4 bg-gray-50/50 border-none font-bold outline-none focus:ring-2 focus:ring-udsm-blue dark:text-white"
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

              {/* Description */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Institutional Overview & Description *</label>
                <Textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Provide a brief overview of your organization, mission, and key operations..."
                  className="rounded-2xl bg-gray-50/50 border-none p-6 font-medium text-base min-h-[120px]"
                />
              </div>

              {/* Website & Physical Location */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Official Website URL</label>
                  <div className="relative">
                    <Input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                      placeholder="https://www.institution.org"
                      className="h-14 rounded-xl pl-12 bg-gray-50/50 border-none font-bold"
                    />
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Physical Location / Address *</label>
                  <div className="relative">
                    <Input
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="e.g. Dar es Salaam, Tanzania"
                      className="h-14 rounded-xl pl-12 bg-gray-50/50 border-none font-bold"
                    />
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Country & Contact Person */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Country *</label>
                  <div className="relative">
                    <select
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                      className="w-full h-14 rounded-xl pl-12 bg-gray-50/50 border-none font-bold outline-none focus:ring-2 focus:ring-udsm-blue appearance-none dark:text-white"
                    >
                      <option value="">Select Country</option>
                      {countries.map((c, idx) => (
                        <option key={idx} value={c.name}>
                          {c.flag} {c.name}
                        </option>
                      ))}
                    </select>
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Contact Representative *</label>
                  <div className="relative">
                    <Input
                      required
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                      placeholder="Full Name & Position"
                      className="h-14 rounded-xl pl-12 bg-gray-50/50 border-none font-bold"
                    />
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Work Email & Phone */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Official Work Email *</label>
                  <div className="relative">
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="partner@institution.org"
                      className="h-14 rounded-xl pl-12 bg-gray-50/50 border-none font-bold"
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number *</label>
                  <div className="relative">
                    <Input
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+255..."
                      className="h-14 rounded-xl pl-12 bg-gray-50/50 border-none font-bold"
                    />
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Collaboration Goal */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Collaboration Goal & Scope *</label>
                <Textarea
                  required
                  value={formData.collaborationGoal}
                  onChange={(e) => setFormData({...formData, collaborationGoal: e.target.value})}
                  placeholder="Describe how your organization would like to collaborate with Y4C Innovation Lab..."
                  className="rounded-2xl bg-gray-50/50 border-none p-6 font-medium text-base min-h-[140px]"
                />
              </div>

              {/* Institutional Logo */}
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 block">Institutional Logo (Optional)</label>
                <div className="bg-gray-50/50 p-6 rounded-3xl border-2 border-dashed border-gray-100">
                  <ImageUpload
                    onUploadSuccess={(url) => setFormData({...formData, logoUrl: url})}
                    currentImage={formData.logoUrl}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-16 bg-udsm-blue hover:bg-blue-700 text-white font-black text-xl rounded-2xl shadow-2xl shadow-blue-100 flex items-center justify-center gap-3 active:scale-95 transition-all"
              >
                {isSubmitting ? "PROCESSING..." : "SUBMIT PARTNERSHIP REQUEST"}
                <Send className="h-6 w-6" />
              </Button>
            </form>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PartnerRegistration;
