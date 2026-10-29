import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github, CheckCircle, ExternalLink, RefreshCw, Layers, User,
  Building2, Tag, FileText, Mail, Globe, CheckCircle2, XCircle,
  Clock, ShieldCheck, Sparkles, Filter, ChevronRight
} from 'lucide-react';
import apiClient from '@/core/apiClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ProjectReview = ({ role = 'coordinator' }) => {
  const [allProjects, setAllProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'approved' | 'all'
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const endpoint = role === 'coordinator' ? '/coordinator/projects' : '/facilitator/projects';
      const response = await apiClient.get(endpoint);
      if (response.data && Array.isArray(response.data)) {
        setAllProjects(response.data);
      }
    } catch (error) {
      toast({ title: "Sync Failed", description: "Could not fetch project submissions.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [role]);

  const handleApprove = async (projectId, projectTitle) => {
    try {
      const endpoint = role === 'coordinator'
        ? `/coordinator/projects/${projectId}/approve`
        : `/facilitator/projects/${projectId}/approve`;

      await apiClient.put(endpoint);
      toast({
        title: "Project Approved! 🎉",
        description: `"${projectTitle}" has been admitted to the Hub venture pipeline.`
      });
      fetchProjects();
    } catch (error) {
      toast({ title: "Error", description: "Failed to approve project", variant: "destructive" });
    }
  };

  const handleReject = async (projectId, projectTitle) => {
    try {
      const endpoint = role === 'coordinator'
        ? `/coordinator/projects/${projectId}/reject`
        : `/facilitator/projects/${projectId}/reject`;

      await apiClient.put(endpoint);
      toast({
        title: "Revision Requested",
        description: `Feedback returned to project lead for "${projectTitle}".`
      });
      fetchProjects();
    } catch (error) {
      toast({ title: "Error", description: "Failed to update project", variant: "destructive" });
    }
  };

  const pendingProjects = allProjects.filter(p => p.status === 'PENDING');
  const approvedProjects = allProjects.filter(p => p.status === 'APPROVED');

  const displayedProjects = activeTab === 'pending'
    ? pendingProjects
    : activeTab === 'approved'
      ? approvedProjects
      : allProjects;

  return (
    <div className="space-y-8 relative z-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-gray-100 dark:border-gray-800">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-4 tracking-tight">
            <div className="p-3 bg-udsm-blue rounded-2xl shadow-xl shadow-blue-500/20 text-white">
              <Layers className="h-7 w-7" />
            </div>
            Project Review <span className="text-udsm-blue dark:text-udsm-gold">Queue</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-bold mt-2 uppercase text-[10px] tracking-widest ml-16">
            Validating student innovation, campus hardware & software submissions
          </p>
        </div>

        {/* Tab & Filter Controls */}
        <div className="flex items-center gap-3">
          <div className="bg-gray-100 dark:bg-gray-800 p-1.5 rounded-2xl flex items-center gap-1 border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('pending')}
              className={cn(
                "px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2",
                activeTab === 'pending'
                  ? "bg-white dark:bg-gray-900 text-udsm-blue dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              )}
            >
              <span>Pending Review</span>
              <span className="w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400">
                {pendingProjects.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('approved')}
              className={cn(
                "px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2",
                activeTab === 'approved'
                  ? "bg-white dark:bg-gray-900 text-forest-green dark:text-green-400 shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              )}
            >
              <span>Approved ({approvedProjects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('all')}
              className={cn(
                "px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all",
                activeTab === 'all'
                  ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              )}
            >
              All ({allProjects.length})
            </button>
          </div>

          <Button
            onClick={fetchProjects}
            variant="outline"
            className="rounded-2xl h-11 w-11 p-0 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
            title="Sync Queue"
          >
            <RefreshCw className={cn("h-4 w-4 text-udsm-blue", isLoading && "animate-spin")} />
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      {displayedProjects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-900 p-16 sm:p-24 rounded-[3rem] border border-gray-100 dark:border-gray-800 text-center shadow-xl space-y-4"
        >
          <div className="w-20 h-20 bg-green-50 dark:bg-green-950/50 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-green-200 dark:border-green-800/40 text-forest-green dark:text-green-400 shadow-sm">
            <CheckCircle className="h-10 w-10" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            {activeTab === 'pending' ? "Zero Pending Reviews" : "No Projects Found"}
          </h3>
          <p className="text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest text-xs max-w-md mx-auto">
            {activeTab === 'pending'
              ? "All submitted innovation proposals have been audited and assigned to incubator cohorts."
              : "No projects match this category."}
          </p>

          {activeTab === 'pending' && approvedProjects.length > 0 && (
            <div className="pt-4">
              <Button
                variant="outline"
                onClick={() => setActiveTab('approved')}
                className="rounded-xl border-gray-200 dark:border-gray-700 font-bold text-xs uppercase tracking-wider"
              >
                View Approved Projects ({approvedProjects.length})
              </Button>
            </div>
          )}
        </motion.div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-8">
          {displayedProjects.map((project, index) => {
            const isApproved = project.status === 'APPROVED';
            const isPending = project.status === 'PENDING';

            return (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-900 p-8 sm:p-10 rounded-[3rem] shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col hover:border-udsm-blue/40 dark:hover:border-udsm-blue/40 transition-all group relative overflow-hidden"
              >
                {/* Background Accent Glow */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-udsm-blue/5 dark:bg-udsm-blue/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                <div className="flex-grow space-y-6 relative z-10">
                  {/* Category, Status & Date */}
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-3">
                      <span className="inline-block bg-udsm-blue/10 dark:bg-udsm-blue/20 text-udsm-blue dark:text-blue-300 border border-udsm-blue/20 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                        {project.category || 'Open Innovation'}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white leading-tight tracking-tight group-hover:text-udsm-blue transition-colors">
                        {project.title}
                      </h3>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      {isPending ? (
                        <div className="flex items-center gap-1.5 bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 px-3 py-1.5 rounded-xl border border-orange-200 dark:border-orange-800/40">
                          <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Pending Review</span>
                        </div>
                      ) : isApproved ? (
                        <div className="flex items-center gap-1.5 bg-green-50 dark:bg-green-950/40 text-forest-green dark:text-green-400 px-3 py-1.5 rounded-xl border border-green-200 dark:border-green-800/40">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Admitted</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800 text-gray-500 px-3 py-1.5 rounded-xl">
                          <span className="text-[10px] font-black uppercase tracking-widest">{project.status}</span>
                        </div>
                      )}

                      {project.submittedAt && (
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">
                          {new Date(project.submittedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Innovator & Institution Grid */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 sm:p-5 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-700/60">
                      <p className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                        <User className="h-3 w-3 text-udsm-blue" /> Project Lead
                      </p>
                      <p className="font-black text-gray-900 dark:text-white text-base truncate">
                        {project.innovatorName || 'Student Innovator'}
                      </p>
                      {project.innovatorEmail && (
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium truncate flex items-center gap-1.5 mt-1">
                          <Mail className="h-3 w-3" /> {project.innovatorEmail}
                        </p>
                      )}
                    </div>

                    <div className="p-4 sm:p-5 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-700/60">
                      <p className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                        <Building2 className="h-3 w-3 text-udsm-gold" /> Institution
                      </p>
                      <p className="font-black text-gray-900 dark:text-white text-base truncate">
                        {project.institution || 'University of Dar es Salaam'}
                      </p>
                    </div>
                  </div>

                  {/* Proposal Abstract */}
                  <div className="space-y-2 bg-gray-50/70 dark:bg-gray-800/40 p-5 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                    <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      <FileText className="h-3.5 w-3.5" /> Proposal Abstract & Problem Statement
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm leading-relaxed font-medium italic">
                      "{project.description}"
                    </p>
                  </div>

                  {/* Artifact Links (PDF, Github, Live Demo) */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    {project.proposalPdfUrl && (
                      <a
                        href={project.proposalPdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-950/40 text-udsm-blue dark:text-blue-300 border border-blue-200 dark:border-blue-900/40 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-udsm-blue hover:text-white transition-all shadow-sm"
                      >
                        <FileText className="h-3.5 w-3.5" /> View Proposal PDF
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-800 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-black transition-all border border-gray-700 shadow-sm"
                      >
                        <Github className="h-3.5 w-3.5" /> Source Code
                      </a>
                    )}
                    {project.portfolioUrl && (
                      <a
                        href={project.portfolioUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-yellow-50 dark:bg-yellow-950/40 text-yellow-800 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-900/40 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-udsm-gold hover:text-gray-950 transition-all shadow-sm"
                      >
                        <Globe className="h-3.5 w-3.5" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>

                {/* Bottom Review Action Buttons */}
                <div className="pt-6 mt-6 border-t border-gray-100 dark:border-gray-800 flex items-center gap-3 relative z-10">
                  {isPending ? (
                    <>
                      <Button
                        onClick={() => handleApprove(project.id, project.title)}
                        className="flex-1 bg-udsm-blue hover:bg-blue-700 text-white gap-2.5 h-14 rounded-2xl shadow-lg shadow-blue-500/20 font-black tracking-wider uppercase text-xs transition-all active:scale-95"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Approve & Admit to Hub
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => handleReject(project.id, project.title)}
                        className="rounded-2xl border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 h-14 px-5 font-black uppercase text-xs tracking-wider"
                      >
                        <XCircle className="h-4 w-4 mr-1.5" />
                        Decline
                      </Button>
                    </>
                  ) : isApproved ? (
                    <div className="w-full flex items-center justify-between p-3.5 bg-green-50/60 dark:bg-green-950/30 rounded-2xl border border-green-200 dark:border-green-800/40">
                      <div className="flex items-center gap-2 text-forest-green dark:text-green-400 font-bold text-xs uppercase tracking-wider">
                        <CheckCircle2 className="h-4 w-4" />
                        Admitted to Active Venture Portfolio
                      </div>
                      <span className="text-[10px] font-black uppercase text-gray-400">Audited</span>
                    </div>
                  ) : (
                    <div className="w-full text-center text-xs text-gray-400 py-2 font-bold uppercase tracking-wider">
                      Status: {project.status}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProjectReview;
