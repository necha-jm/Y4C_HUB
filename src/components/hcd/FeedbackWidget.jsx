import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, AlertCircle, ThumbsUp, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import apiClient from '@/core/apiClient';
import { AuthService } from '@/core/services/AuthService';

const FeedbackWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStatus] = useState('category'); // category, details, evaluation
  const [feedback, setFeedback] = useState({
    category: '',
    title: '',
    description: '',
    rating: 5,
    pageModule: window.location.pathname
  });

  const categories = [
    { id: 'BUG', label: 'Bug', icon: AlertCircle },
    { id: 'USABILITY', label: 'Usability Issue', icon: Star },
    { id: 'FEATURE_REQUEST', label: 'Feature Request', icon: ThumbsUp },
    { id: 'SUGGESTION', label: 'Suggestion', icon: MessageSquare },
  ];

  const handleSubmit = async () => {
    const user = AuthService.getCurrentUser();
    if (!user) {
      toast({ title: "Login Required", description: "Please login to submit feedback.", variant: "destructive" });
      return;
    }

    try {
      await apiClient.post('/hcd/user/feedback', { ...feedback, userId: user.id });
      toast({ title: "Feedback Sent", description: "Thank you for helping us improve!" });
      setIsOpen(false);
      resetForm();
    } catch (e) {
      toast({ title: "Error", description: "Could not submit feedback.", variant: "destructive" });
    }
  };

  const resetForm = () => {
    setStatus('category');
    setFeedback({
      category: '',
      title: '',
      description: '',
      rating: 5,
      pageModule: window.location.pathname
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] shadow-2xl w-[400px] mb-4 overflow-hidden flex flex-col"
          >
            <div className="p-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black italic uppercase tracking-tighter">HCD Lab Feedback</h3>
                <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Help us improve your experience</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {step === 'category' && (
                <div className="grid grid-cols-2 gap-4">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => { setFeedback({...feedback, category: cat.id}); setStatus('details'); }}
                      className="p-4 rounded-2xl border-2 border-gray-50 dark:border-gray-900 hover:border-blue-500 hover:bg-blue-50/50 transition-all flex flex-col items-center gap-2 group text-center"
                    >
                      <cat.icon className="h-6 w-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      <span className="text-xs font-black uppercase text-gray-600 dark:text-gray-400 group-hover:text-blue-600">{cat.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {step === 'details' && (
                <div className="space-y-4">
                  <Input
                    placeholder="Short summary..."
                    value={feedback.title}
                    onChange={(e) => setFeedback({...feedback, title: e.target.value})}
                    className="rounded-xl"
                  />
                  <Textarea
                    placeholder="Describe the problem or suggestion in detail..."
                    value={feedback.description}
                    onChange={(e) => setFeedback({...feedback, description: e.target.value})}
                    className="rounded-2xl min-h-[120px]"
                  />
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Rating</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button key={star} onClick={() => setFeedback({...feedback, rating: star})}>
                          <Star className={`h-5 w-5 ${feedback.rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button onClick={handleSubmit} className="w-full h-12 bg-blue-600 rounded-xl font-bold gap-2">
                    <Send className="h-4 w-4" />
                    Submit Feedback
                  </Button>
                  <button onClick={() => setStatus('category')} className="w-full text-xs font-bold text-gray-400 uppercase hover:text-blue-600 transition-colors mt-2">Back</button>
                </div>
              )}
            </div>

            <div className="px-8 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 text-[10px] text-gray-400 flex items-center gap-2">
              <AlertCircle className="h-3 w-3" />
              Reporting issue on: <span className="font-black text-blue-500">{window.location.pathname}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
        <MessageSquare className="h-8 w-8" />
      </motion.button>
    </div>
  );
};

export default FeedbackWidget;
