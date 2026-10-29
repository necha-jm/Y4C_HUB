import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, CheckCircle, Award, PlayCircle, Clock, ChevronRight, Sparkles } from 'lucide-react';
import apiClient from '@/core/apiClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const InteractiveLearningPath = ({ user, onEarnCertificate }) => {
  const [modules, setModules] = useState([]);
  const [activeModule, setActiveModule] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const fetchModules = async () => {
    try {
      const res = await apiClient.get('/learning/modules');
      setModules(res.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const handleCompleteModule = async (moduleId) => {
    try {
      await apiClient.put(`/learning/complete/${moduleId}`);
      toast({
        title: "Module Completed! 🌟",
        description: "Great job! Your score has been updated to 95%."
      });
      fetchModules();
      setActiveModule(null);
      setSelectedAnswer(null);

      // Check if all modules are complete
      if (onEarnCertificate) {
        onEarnCertificate();
      }
    } catch (e) {
      toast({ title: "Failed to save progress", variant: "destructive" });
    }
  };

  const sampleQuiz = {
    question: "What is the primary goal of the 'Empathy' phase in Human-Centered Design?",
    options: [
      "To build a working database architecture",
      "To deeply understand user emotions, needs and pain points",
      "To calculate revenue margins and pricing models",
      "To pitch directly to venture capitalists"
    ],
    correctIndex: 1
  };

  return (
    <div className="space-y-8 relative z-10 max-w-5xl mx-auto">
      <div>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-4 tracking-tight">
          <div className="p-3 bg-udsm-blue rounded-2xl shadow-xl shadow-blue-100 dark:shadow-none text-white">
            <BookOpen className="h-8 w-8" />
          </div>
          Curriculum & Learning Journey
        </h2>
        <p className="text-gray-500 font-bold mt-2 uppercase text-[10px] tracking-widest ml-16">
          Master Human-Centered Design, Hardware Prototyping & Venture Building
        </p>
      </div>

      {/* Modules List */}
      <div className="space-y-6">
        {modules.map((mod) => (
          <motion.div
            key={mod.id}
            className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-md space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg",
                  mod.completed ? "bg-forest-green" : "bg-gradient-to-br " + mod.color
                )}>
                  {mod.completed ? <CheckCircle className="h-7 w-7" /> : <PlayCircle className="h-7 w-7" />}
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-udsm-gold">{mod.duration} • {mod.lessonsCount} Interactive Lessons</span>
                  <h3 className="text-xl font-black text-gray-900 dark:text-white mt-0.5">{mod.title}</h3>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {mod.completed ? (
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300 flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4" /> Passed ({mod.score}%)
                  </span>
                ) : (
                  <Button
                    onClick={() => setActiveModule(mod)}
                    className="h-11 rounded-xl bg-udsm-blue text-white font-black uppercase tracking-widest text-xs gap-2 px-6"
                  >
                    Start Quiz & Lessons <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Expanded Quiz Modal for Active Module */}
            <AnimatePresence>
              {activeModule?.id === mod.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-6 border-t border-gray-100 dark:border-gray-800 space-y-4"
                >
                  <div className="p-6 bg-slate-50 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-700 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-udsm-blue">Knowledge Check Quiz</span>
                      <span className="text-xs font-bold text-gray-400">100 Points</span>
                    </div>
                    <p className="font-bold text-sm text-gray-900 dark:text-white">{sampleQuiz.question}</p>

                    <div className="space-y-2">
                      {sampleQuiz.options.map((opt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedAnswer(idx)}
                          className={cn(
                            "w-full text-left p-3.5 rounded-xl border text-xs font-bold transition-all",
                            selectedAnswer === idx
                              ? "bg-udsm-blue text-white border-udsm-blue shadow-md"
                              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50"
                          )}
                        >
                          {String.fromCharCode(65 + idx)}. {opt}
                        </button>
                      ))}
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <Button variant="ghost" onClick={() => setActiveModule(null)} className="h-10 text-xs font-bold">
                        Cancel
                      </Button>
                      <Button
                        disabled={selectedAnswer === null}
                        onClick={() => handleCompleteModule(mod.id)}
                        className="h-10 bg-forest-green text-white font-black text-xs uppercase tracking-wider rounded-xl gap-1.5"
                      >
                        Submit & Complete Module
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveLearningPath;
