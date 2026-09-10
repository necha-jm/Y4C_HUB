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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-gray-900 flex items-center gap-3 tracking-tight">
            <Layers className="h-8 w-8 text-udsm-blue" />
            Project Applications
          </h2>
          <p className="text-gray-500 font-medium mt-1">Review new project proposals and hub membership requests.</p>
        </div>
        <Button onClick={fetchProjects} variant="outline" size="lg" className="gap-2 rounded-2xl border-2 hover:bg-gray-50">
          <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh Queue
        </Button>
      </div>

      {projects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-20 rounded-[3rem] border-2 border-dashed border-gray-100 text-center"
        >
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-gray-300" />
          </div>
          <p className="text-xl font-bold text-gray-400">All caught up! No pending applications.</p>
        </motion.div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col hover:shadow-2xl transition-all group"
            >
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="bg-udsm-blue/10 text-udsm-blue px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 inline-block">
                      {project.category || 'Innovation'}
                    </span>
                    <h3 className="text-2xl font-black text-gray-900 leading-tight">{project.title}</h3>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Awaiting Review</span>
                    <span className="text-[10px] text-gray-400 font-bold">{new Date(project.submittedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                      <User className="h-3 w-3" /> Innovator
                    </p>
                    <p className="font-bold text-gray-900 truncate">{project.innovatorName || 'Unknown'}</p>
                    <p className="text-[10px] text-gray-500 truncate flex items-center gap-1 mt-0.5">
                      <Mail className="h-2.5 w-2.5" /> {project.innovatorEmail}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                      <Building2 className="h-3 w-3" /> Institution
                    </p>
                    <p className="font-bold text-gray-900 truncate">{project.institution || 'Not specified'}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                      <FileText className="h-3 w-3" /> Description
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 font-medium italic">
                      "{project.description}"
                    </p>
                </div>

                <div className="flex flex-wrap gap-4 mb-8 pt-6 border-t border-gray-50">
                   {project.proposalPdfUrl && (
                     <a
                      href={project.proposalPdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-udsm-blue rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors"
                     >
                       <FileText className="h-4 w-4" /> View Proposal PDF
                     </a>
                   )}
                   {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-colors"
                    >
                      <Github className="h-4 w-4" /> Source Code
                    </a>
                  )}
                  {project.portfolioUrl && (
                    <a
                      href={project.portfolioUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-udsm-gold/10 text-udsm-gold rounded-xl text-xs font-bold hover:bg-udsm-gold/20 transition-colors"
                    >
                      <Globe className="h-4 w-4" /> Portfolio
                    </a>
                  )}
                </div>
              </div>

              <div className="pt-6 flex gap-4">
                <Button
                  onClick={() => handleApprove(project.id)}
                  className="flex-grow bg-gradient-to-r from-forest-green to-emerald-600 hover:scale-[1.02] text-white gap-2 h-14 rounded-2xl shadow-lg shadow-forest-green/20 font-black tracking-widest uppercase transition-all"
                >
                  <CheckCircle className="h-5 w-5" />
                  Accept & Admit Member
                </Button>
                <Button variant="outline" className="h-14 w-14 rounded-2xl p-0 border-2 hover:bg-gray-50">
                  <ExternalLink className="h-6 w-6 text-gray-400" />
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

