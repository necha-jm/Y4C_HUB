import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, CheckCircle2, ChevronRight, Award, Plus, RefreshCw, BarChart2, ShieldCheck } from 'lucide-react';
import apiClient from '@/core/apiClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const stages = ['Ideation & Empathy', 'Prototyping / MVP', 'Validation & Testing', 'Pitch / Demo Day'];

const IncubationPipelineManager = () => {
  const [milestones, setMilestones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMilestones = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get('/incubation/milestones');
      setMilestones(res.data || []);
    } catch (e) {
      toast({ title: "Fetch Failed", description: "Could not load pipeline.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMilestones();
  }, []);

  const handleAdvanceStage = async (project, nextStageIndex) => {
    const nextStage = stages[nextStageIndex];
    if (!nextStage) return;

    try {
      const updatedProgress = Math.min(100, project.progress + 25);
      await apiClient.put(`/incubation/milestones/${project.id}`, {
        currentStage: nextStage,
        progress: updatedProgress
      });
      toast({
        title: "Stage Gate Advanced! 🚀",
        description: `${project.projectTitle} has been moved to ${nextStage}.`
      });
      fetchMilestones();
    } catch (e) {
      toast({ title: "Update Failed", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-8 relative z-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-4 tracking-tight">
            <div className="p-3 bg-udsm-gold rounded-2xl shadow-xl shadow-yellow-100 dark:shadow-none text-gray-900">
              <Rocket className="h-8 w-8" />
            </div>
            Incubation Stage-Gate Pipeline
          </h2>
          <p className="text-gray-500 font-bold mt-2 uppercase text-[10px] tracking-widest ml-16">
            Managing student startups across HCD Ideation, MVP Prototyping, and Demo Day Pitching
          </p>
        </div>
        <Button onClick={fetchMilestones} variant="outline" className="gap-2 h-14 rounded-2xl border-2 px-6">
          <RefreshCw className={cn("h-4 w-4 text-udsm-blue", isLoading && "animate-spin")} />
          <span className="font-black uppercase tracking-widest text-xs">Refresh Pipeline</span>
        </Button>
      </div>

      {/* Stage-Gate Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stages.map((stageName, idx) => {
          const projectsInStage = milestones.filter(m =>
            (m.currentStage || '').toLowerCase().includes(stageName.toLowerCase().split(' ')[0])
          );

          return (
            <div key={stageName} className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-6 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-udsm-gold">Stage 0{idx + 1}</span>
                  <h3 className="font-black text-sm text-gray-900 dark:text-white mt-0.5">{stageName}</h3>
                </div>
                <span className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-black text-gray-500">
                  {projectsInStage.length}
                </span>
              </div>

              <div className="space-y-4 flex-1">
                {projectsInStage.map((p) => (
                  <motion.div
                    key={p.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 space-y-3"
                  >
                    <div>
                      <h4 className="font-black text-sm text-gray-900 dark:text-white leading-tight">{p.projectTitle}</h4>
                      <p className="text-[10px] font-bold text-gray-400 mt-1">Lead: {p.innovatorName}</p>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-[9px] font-bold text-gray-400 mb-1">
                        <span>Milestones Completed</span>
                        <span className="text-udsm-blue font-black">{p.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-udsm-blue to-forest-green rounded-full transition-all duration-500"
                          style={{ width: `${p.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Milestone Checklist */}
                    {p.milestones && (
                      <div className="space-y-1.5 pt-2 border-t border-gray-200 dark:border-gray-700/50 text-[10px]">
                        {p.milestones.slice(0, 3).map((m, mIdx) => (
                          <div key={mIdx} className="flex items-center gap-2">
                            <CheckCircle2 className={cn("h-3 w-3", m.done ? "text-forest-green" : "text-gray-300")} />
                            <span className={cn(m.done ? "text-gray-700 dark:text-gray-200 font-bold" : "text-gray-400")}>{m.name}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {idx < stages.length - 1 && (
                      <Button
                        size="sm"
                        onClick={() => handleAdvanceStage(p, idx + 1)}
                        className="w-full mt-2 h-9 bg-udsm-blue text-white font-black text-[10px] uppercase tracking-wider rounded-xl gap-1 hover:bg-udsm-blue/90"
                      >
                        Advance Gate <ChevronRight className="h-3 w-3" />
                      </Button>
                    )}
                  </motion.div>
                ))}

                {projectsInStage.length === 0 && (
                  <div className="text-center py-10 text-gray-300 dark:text-gray-700 text-xs font-bold uppercase tracking-widest">
                    No startups at this gate
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IncubationPipelineManager;
