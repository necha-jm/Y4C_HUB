import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Send, Github } from 'lucide-react';
import apiClient from '@/core/apiClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ProjectSubmission = ({ user }) => {
  const [project, setProject] = useState({
    title: '',
    description: '',
    programId: '',
    githubUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await apiClient.post('/projects', { ...project, userId: user.id }); // Note: API needs to be implemented or matched
      toast({ title: "Success", description: "Project submitted for review!" });
      setProject({ title: '', description: '', programId: '', githubUrl: '' });
    } catch (error) {
      toast({ title: "Error", description: "Failed to submit project", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-950 rounded-[3rem] p-10 shadow-2xl border border-gray-50 dark:border-gray-900 mt-12">
      <h2 className="text-3xl font-black mb-10 text-gray-900 dark:text-white flex items-center gap-4">
        <div className="p-3 bg-udsm-blue/10 rounded-2xl">
          <Layers className="h-8 w-8 text-udsm-blue" />
        </div>
        Submit Your Project
      </h2>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">Project Title</label>
            <Input required value={project.title} onChange={(e) => setProject({...project, title: e.target.value})} placeholder="e.g., Smart Irrigation System" className="h-14 rounded-2xl border-gray-100 bg-gray-50/50 font-bold px-6" />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">Program</label>
            <select
              required
              className="w-full h-14 rounded-2xl bg-gray-50/50 border-gray-100 px-6 font-bold outline-none focus:ring-2 focus:ring-udsm-blue transition-all"
              value={project.programId}
              onChange={(e) => setProject({...project, programId: e.target.value})}
            >
              <option value="">Select Program</option>
              <option value="tech-skills">Tech Skills</option>
              <option value="startup-incubation">Startup Incubation</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">Github Repository (Optional)</label>
            <div className="relative">
              <Input value={project.githubUrl} onChange={(e) => setProject({...project, githubUrl: e.target.value})} placeholder="https://github.com/..." className="h-14 rounded-2xl border-gray-100 bg-gray-50/50 font-bold pl-14" />
              <Github className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
        <div className="space-y-6 flex flex-col">
          <div className="flex-grow">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">Project Description</label>
            <textarea
              required
              value={project.description}
              onChange={(e) => setProject({...project, description: e.target.value})}
              className="w-full h-full min-h-[150px] rounded-3xl bg-gray-50/50 border-gray-100 p-8 outline-none focus:ring-2 focus:ring-udsm-blue font-medium transition-all"
              placeholder="Tell the facilitators about your project architecture and goals..."
            />
          </div>
          <Button disabled={isSubmitting} className="w-full h-16 bg-udsm-blue hover:bg-blue-700 rounded-2xl text-xl font-black gap-3 shadow-xl shadow-blue-100 mt-4 uppercase tracking-widest">
             {isSubmitting ? 'Submitting...' : 'Submit Project'}
             <Send className="h-6 w-6" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProjectSubmission;
