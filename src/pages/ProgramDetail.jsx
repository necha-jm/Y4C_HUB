import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Users, Calendar, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import { toast } from '@/components/ui/use-toast';
import { usePrograms } from '@/core/hooks/usePrograms';
import { useSubmitApplication } from '@/core/hooks/useApplications';

const ApplicationForm = ({ programTitle, onClose, onSubmit, isSubmitting }) => {
  const formRef = React.useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data);
  };

  const handleClear = () => {
    formRef.current.reset();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X />
        </button>
        <h2 className="text-2xl font-bold text-udsm-blue mb-2">Apply for {programTitle}</h2>
        <p className="text-gray-600 mb-6">Please fill out your details below.</p>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <Input name="fullName" placeholder="Full Name" required />
          <Input name="email" type="email" placeholder="Email Address" required />
          <Input name="phone" type="tel" placeholder="Phone Number" required />
          <Input name="organization" placeholder="Organization/Institution" />
          <Textarea name="motivation" placeholder="Why are you interested in this program?" required />
          <div className="flex gap-4 justify-end pt-4">
            <Button type="button" variant="outline" onClick={handleClear}>Clear</Button>
            <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-udsm-blue to-udsm-gold">
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

const ProgramDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeProgramId, setActiveProgramId] = useState(id || 'tech-skills');
  const [showForm, setShowForm] = useState(false);

  const { data: programs = [], isLoading } = usePrograms();
  const submitMutation = useSubmitApplication();

  useEffect(() => {
    if (id) {
      setActiveProgramId(id);
    }
  }, [id]);

  const program = programs.find(p => p.id === activeProgramId);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading programs...</div>;
  }

  if (!program && programs.length > 0) {
      // If program not found but we have programs, default to first or show error
      const firstProgram = programs[0];
      if (firstProgram) setActiveProgramId(firstProgram.id);
  }

  if (!program) return null;

  const handleProgramClick = (programId) => {
    setActiveProgramId(programId);
    navigate(`/program/${programId}`, { replace: true });
  };

  const handleFormSubmit = async (data) => {
    try {
      await submitMutation.mutateAsync({
        ...data,
        programId: program.id,
        programTitle: program.title
      });

      toast({
        title: 'Application Submitted!',
        description: "Thank you for applying. Your information has been received.",
      });
      setShowForm(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: "Failed to submit application. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>{program.title} - Y4C Innovation Lab</title>
        <meta name="description" content={`Learn more about the ${program.title} program at Y4C Innovation Lab.`} />
      </Helmet>
      <Header />
      <main className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <Breadcrumbs />
        <div className="container mx-auto px-4 pb-16">
          <div className="flex flex-col lg:flex-row gap-12">
            <aside className="lg:w-1/5">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Programs</h2>
              <ul className="space-y-2">
                {programs.map(p => (
                  <li key={p.id}>
                    <button
                      onClick={() => handleProgramClick(p.id)}
                      className={cn(
                        "w-full text-left p-3 rounded-lg transition-colors",
                        activeProgramId === p.id
                          ? "bg-udsm-blue text-white font-semibold"
                          : "hover:bg-blue-100"
                      )}
                    >
                      {p.title}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>
            <motion.div key={activeProgramId} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lg:w-4/5">
              <h1 className="text-4xl lg:text-6xl font-bold text-udsm-blue mb-4">{program.title}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mb-12">{program.description}</p>

              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Program Activities</h2>
                  <ul className="space-y-4">
                    {program.activities?.map((activity, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-800">{activity.name}</p>
                          <p className="text-gray-600">{activity.description}</p>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                  <div className="mt-10 flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-gray-700"><Users className="h-5 w-5 text-udsm-blue" /> <span>50+ Participants per cohort</span></div>
                      <div className="flex items-center gap-2 text-gray-700"><Calendar className="h-5 w-5 text-udsm-blue" /> <span>12-week intensive program</span></div>
                  </div>
                   <Button size="lg" className="mt-8 bg-gradient-to-r from-udsm-blue to-udsm-gold" onClick={() => setShowForm(true)}>Apply Now</Button>
                </div>
                <div className="space-y-6">
                  {program.images?.map((img, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.15 }}
                      className="rounded-2xl overflow-hidden shadow-xl"
                    >
                      <img className="w-full h-64 object-cover" alt={img} src="/Images/y4c-graduation/IMG_0016.JPG" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
      <AnimatePresence>
        {showForm && (
          <ApplicationForm
            programTitle={program.title}
            onClose={() => setShowForm(false)}
            onSubmit={handleFormSubmit}
            isSubmitting={submitMutation.isPending}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProgramDetail;