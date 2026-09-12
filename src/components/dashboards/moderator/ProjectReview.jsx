import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, CheckCircle, ExternalLink, RefreshCw, Layers, User, Building2, Tag, FileText, Mail, Globe } from 'lucide-react';
import apiClient from '@/core/apiClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

const ProjectReview = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      // Use standard endpoint that handles both moderator and facilitator contexts if possible
      // but here we know the component is used in ModeratorDashboard.
      // We'll try to detect the role or just use a generic endpoint if available.
      const user = JSON.parse(localStorage.getItem('y4c_user'));
      const role = user?.role?.toLowerCase();
      const endpoint = role === 'coordinator' ? '/coordinator/projects/pending' : '/facilitator/projects/pending';

      const response = await apiClient.get(endpoint);
      if (response.data && Array.isArray(response.data)) {
        setProjects(response.data);
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to load projects", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleApprove = async (projectId) => {
    try {
      const user = JSON.parse(localStorage.getItem('y4c_user'));
      const role = user?.role?.toLowerCase();
      const endpoint = role === 'coordinator' ? `/coordinator/projects/${projectId}/approve` : `/facilitator/projects/${projectId}/approve`;

      await apiClient.put(endpoint);
      toast({
        title: "Project Approved! ✅",
        description: "Innovator has been notified and assigned as a Hub Member."
      });
      fetchProjects();
    } catch (error) {
      toast({ title: "Error", description: "Failed to approve project", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-10 relative z-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 flex items-center gap-4 tracking-tight">
            <div className="p-3 bg-udsm-blue rounded-2xl shadow-xl shadow-blue-100 rotate-3 group-hover:rotate-6 transition-transform">
              <Layers className="h-8 w-8 text-white" />
            </div>
            Project Review <span className="text-udsm-blue">Queue</span>
          </h2>
          <p className="text-gray-500 font-bold mt-2 uppercase text-[10px] tracking-widest ml-16">Validating innovation & membership requests</p>
        </div>
        <Button onClick={fetchProjects} variant="outline" size="lg" className="gap-3 rounded-2xl border-2 hover:bg-white h-16 px-8 shadow-sm transition-all hover:shadow-md active:scale-95">
          <RefreshCw className={`h-5 w-5 text-udsm-blue ${isLoading ? 'animate-spin' : ''}`} />
          <span className="font-black uppercase tracking-widest text-xs">Sync Queue</span>
        </Button>
      </div>

      {projects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-md p-24 rounded-[4rem] border border-gray-100 text-center shadow-2xl shadow-blue-50/50"
        >
          <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-gray-100">
            <CheckCircle className="h-12 w-12 text-green-400" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-2">Zero Pending Reviews</h3>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">All applications have been processed</p>
        </motion.div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              className="bg-white/90 backdrop-blur-sm p-10 rounded-[3.5rem] shadow-xl border border-gray-100 flex flex-col hover:shadow-2xl transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-udsm-gold/5 rounded-full blur-3xl -mr-16 -mt-16" />

              <div className="flex-grow relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className="space-y-3">
                    <span className="bg-udsm-blue text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-100">
                      {project.category || 'Open Innovation'}
                    </span>
                    <h3 className="text-3xl font-black text-gray-900 leading-[1.1] tracking-tight group-hover:text-udsm-blue transition-colors">{project.title}</h3>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-1.5 bg-orange-50 text-orange-600 px-3 py-1.5 rounded-xl border border-orange-100">
                       <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                       <span className="text-[9px] font-black uppercase tracking-widest">Awaiting Decision</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-tighter mt-1">{new Date(project.submittedAt).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-10">
                  <div className="p-6 bg-slate-50 rounded-3xl border border-gray-100/50 group-hover:bg-white group-hover:shadow-inner transition-all">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <User className="h-3 w-3 text-udsm-blue" /> Project Lead
                    </p>
                    <p className="font-black text-gray-900 text-lg tracking-tight truncate">{project.innovatorName || 'Anonymous'}</p>
                    <p className="text-[10px] text-gray-500 font-bold truncate flex items-center gap-1.5 mt-1">
                      <Mail className="h-3 w-3" /> {project.innovatorEmail}
                    </p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-3xl border border-gray-100/50 group-hover:bg-white group-hover:shadow-inner transition-all">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Building2 className="h-3 w-3 text-udsm-gold" /> Institution
                    </p>
                    <p className="font-black text-gray-900 text-lg tracking-tight truncate">{project.institution || 'Not specified'}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-10 bg-gray-50/50 p-6 rounded-3xl border border-dashed border-gray-200">
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <FileText className="h-3 w-3" /> Proposal Abstract
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed font-bold italic line-clamp-4">
                      "{project.description}"
                    </p>
                </div>

                <div className="flex flex-wrap gap-4 mb-10 pt-8 border-t border-gray-100">
                   {project.proposalPdfUrl && (
                     <a
                      href={project.proposalPdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 bg-blue-50 text-udsm-blue rounded-xl text-xs font-black uppercase tracking-widest hover:bg-udsm-blue hover:text-white transition-all shadow-sm"
                     >
                       <FileText className="h-4 w-4" /> View PDF
                     </a>
                   )}
                   {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg"
                    >
                      <Github className="h-4 w-4" /> Source
                    </a>
                  )}
                  {project.portfolioUrl && (
                    <a
                      href={project.portfolioUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 bg-udsm-gold text-black rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-yellow-100"
                    >
                      <Globe className="h-4 w-4" /> Live Demo
                    </a>
                  )}
                </div>
              </div>

              <div className="pt-2 flex gap-4 relative z-10">
                <Button
                  onClick={() => handleApprove(project.id)}
                  className="flex-grow bg-udsm-blue hover:bg-blue-700 hover:scale-[1.02] text-white gap-3 h-16 rounded-[1.5rem] shadow-xl shadow-blue-100 font-black tracking-[0.2em] uppercase transition-all active:scale-95"
                >
                  <CheckCircle className="h-6 w-6" />
                  Approve & Admit
                </Button>
                <Button variant="outline" className="h-16 w-16 rounded-[1.5rem] p-0 border-2 hover:bg-gray-50 group-hover:border-udsm-gold transition-colors">
                  <ExternalLink className="h-7 w-7 text-gray-400 group-hover:text-udsm-gold" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectReview;

