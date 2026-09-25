import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Send, Building2, User, Type, Info, Tag, Upload, Github, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import apiClient from '@/core/apiClient';

const ProjectApplication = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState(null);

  const [formData, setFormData] = useState({
    innovatorName: '',
    innovatorEmail: '',
    title: '',
    institution: '',
    description: '',
    category: 'Technology',
    githubUrl: '',
    portfolioUrl: '',
    proposalPdfUrl: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let pdfUrl = '';
      if (file) {
        const fileData = new FormData();
        fileData.append('file', file);
        const uploadRes = await apiClient.post('/upload', fileData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        pdfUrl = uploadRes.data;
      }

      await apiClient.post('/projects/apply', {
        ...formData,
        proposalPdfUrl: pdfUrl
      });

      toast({
        title: "Application Submitted! 🚀",
        description: "Your project request has been sent for review. You'll receive an email once it's accepted.",
      });

      setFormData({
        innovatorName: '',
        innovatorEmail: '',
        title: '',
        institution: '',
        description: '',
        category: 'Technology',
        githubUrl: '',
        portfolioUrl: '',
        proposalPdfUrl: ''
      });
      setFile(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col">
      <Header />

      <main className="flex-grow pt-20 lg:pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-udsm-blue dark:text-white tracking-tight mb-6">
              Propose Your <span className="bg-gradient-to-r from-udsm-blue to-forest-green bg-clip-text text-transparent">Innovation</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
              Submit your project to join the Y4C Innovation Lab hub. Once accepted, you'll gain full membership and access to our resources.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 space-y-8"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <User className="h-3 w-3" /> Full Name of Innovator
                </label>
                <Input
                  name="innovatorName"
                  value={formData.innovatorName}
                  onChange={handleInputChange}
                  placeholder="e.g. John Doe"
                  required
                  className="bg-gray-50/50 dark:bg-gray-800/50 h-14 rounded-xl border-gray-100 dark:border-gray-700 px-6 font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <Send className="h-3 w-3" /> Email Address
                </label>
                <Input
                  name="innovatorEmail"
                  type="email"
                  value={formData.innovatorEmail}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  required
                  className="bg-gray-50/50 dark:bg-gray-800/50 h-14 rounded-xl border-gray-100 dark:border-gray-700 px-6 font-bold"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <Type className="h-3 w-3" /> Project Title
                </label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Name of your innovation"
                  required
                  className="bg-gray-50/50 dark:bg-gray-800/50 h-14 rounded-xl border-gray-100 dark:border-gray-700 px-6 font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <Building2 className="h-3 w-3" /> Institution / University
                </label>
                <Input
                  name="institution"
                  value={formData.institution}
                  onChange={handleInputChange}
                  placeholder="e.g. UDSM - CoICT"
                  required
                  className="bg-gray-50/50 dark:bg-gray-800/50 h-14 rounded-xl border-gray-100 dark:border-gray-700 px-6 font-bold"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <Github className="h-3 w-3" /> GitHub Repository (Optional)
                </label>
                <Input
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleInputChange}
                  placeholder="https://github.com/your-repo"
                  className="bg-gray-50/50 dark:bg-gray-800/50 h-14 rounded-xl border-gray-100 dark:border-gray-700 px-6 font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <Globe className="h-3 w-3" /> Portfolio / Website Link (Optional)
                </label>
                <Input
                  name="portfolioUrl"
                  value={formData.portfolioUrl}
                  onChange={handleInputChange}
                  placeholder="https://yourportfolio.com"
                  className="bg-gray-50/50 dark:bg-gray-800/50 h-14 rounded-xl border-gray-100 dark:border-gray-700 px-6 font-bold"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <Tag className="h-3 w-3" /> Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50/50 dark:bg-gray-800/50 h-14 rounded-xl border-2 border-gray-100 dark:border-gray-700 px-6 font-bold focus:outline-none focus:border-udsm-blue"
                >
                  <option value="Technology">Technology</option>
                  <option value="Business">Business</option>
                  <option value="Social Impact">Social Impact</option>
                  <option value="Health">Health</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Education">Education</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <Upload className="h-3 w-3" /> Proposal PDF (Optional)
                </label>
                <div className="relative h-14">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-full h-full bg-gray-50/50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex items-center px-6 font-bold text-gray-500">
                    {file ? file.name : "Select PDF file..."}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <Info className="h-3 w-3" /> Project Description
              </label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Explain the problem your project solves and how it works..."
                rows={6}
                required
                className="bg-gray-50/50 dark:bg-gray-800/50 rounded-2xl border-gray-100 dark:border-gray-700 p-6 font-medium text-lg focus:border-udsm-blue"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              size="lg"
              className="w-full h-16 bg-gradient-to-r from-udsm-blue to-forest-green hover:from-forest-green hover:to-udsm-blue text-white text-xl font-black rounded-2xl shadow-xl shadow-udsm-blue/20 transition-all active:scale-[0.98]"
            >
              {isSubmitting ? "SUBMITTING..." : "SUBMIT APPLICATION"}
            </Button>
          </motion.form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectApplication;
