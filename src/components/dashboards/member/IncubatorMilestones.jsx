import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, CheckCircle2, Circle, AlertCircle, FileText, ArrowRight } from 'lucide-react';
import apiClient from '@/core/apiClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const IncubatorMilestones = ({ user }) => {
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchMilestone = async () => {
      try {
        const res = await apiClient.get('/incubation/milestones');
        if (res.data && res.data.length > 0) {
          setProject(res.data[0]); // Primary student venture
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchMilestone();
  }, []);

  const handleToggleMilestone = async (index) => {
    if (!project || !project.milestones) return;
    const updatedMilestones = [...project.milestones];
    updatedMilestones[index].done = !updatedMilestones[index].done;

    const doneCount = updatedMilestones.filter(m => m.done).length;
    const progress = Math.round((doneCount / updatedMilestones.length) * 100);

    try {
      await apiClient.put(`/incubation/milestones/${project.id}`, {
        ...project,
        milestones: updatedMilestones,
        progress
      });
      setProject({ ...project, milestones: updatedMilestones, progress });
      toast({ title: "Milestone Updated! 🎯", description: `Project progress is now ${progress}%.` });
    } catch (e) {
      toast({ title: "Update Failed", variant: "destructive" });
    }
  };

  if (!project) {
    return <div className="p-12 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">Loading Incubation Track...</div>;
  }

  return (
    <div className="space-y-8 relative z-10">
      <div>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-4 tracking-tight">
          <div className="p-3 bg-udsm-gold rounded-2xl shadow-xl shadow-yellow-100 dark:shadow-none text-gray-900">
            <Rocket className="h-8 w-8" />
          </div>
          My Startup Incubation Track
        </h2>
        <p className="text-gray-500 font-bold mt-2 uppercase text-[10px] tracking-widest ml-16">
          Track stage-gate deliverables, facilitator feedback, and demo day readiness
        </p>
      </div>

      {/* Project Status Hero */}
      <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-forest-green">Active Incubation Venture</span>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">{project.projectTitle}</h3>
            <p className="text-xs text-gray-500 font-bold mt-1">Current Gate: <span className="text-udsm-blue">{project.currentStage}</span></p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-udsm-blue">{project.progress}%</span>
            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Gate Completion</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-udsm-blue via-forest-green to-udsm-gold rounded-full transition-all duration-700"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* Milestones Checklist */}
      <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-md space-y-6">
        <h3 className="text-lg font-black text-gray-900 dark:text-white">Incubation Deliverables & Checkpoints</h3>
        <div className="space-y-4">
          {project.milestones?.map((m, idx) => (
            <div
              key={idx}
              onClick={() => handleToggleMilestone(idx)}
              className={cn(
                "p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4",
                m.done
                  ? "bg-green-50/40 dark:bg-green-950/20 border-green-200 dark:border-green-900/50"
                  : "bg-gray-50 dark:bg-gray-800/40 border-gray-100 dark:border-gray-700 hover:border-gray-300"
              )}
            >
              <div className="pt-0.5">
                {m.done ? (
                  <CheckCircle2 className="h-6 w-6 text-forest-green" />
                ) : (
                  <Circle className="h-6 w-6 text-gray-300 dark:text-gray-600" />
                )}
              </div>
              <div className="flex-1">
                <p className={cn("font-bold text-sm", m.done ? "text-gray-900 dark:text-white line-through opacity-80" : "text-gray-900 dark:text-white")}>
                  {m.name}
                </p>
                {m.feedback && (
                  <p className="text-xs text-forest-green mt-1 font-medium">
                    Mentor Feedback: "{m.feedback}"
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IncubatorMilestones;
