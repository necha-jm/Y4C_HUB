import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Video, FileText, Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Resources = () => {
  const resources = [
    { id: 'learning-guides', icon: BookOpen, title: 'HCD Learning Guide', description: 'Comprehensive guides on technology, entrepreneurship, and personal development, featuring step-by-step tutorials and real-world examples to accelerate your learning.', color: 'from-udsm-blue to-blue-800' },
    { id: 'video-tutorials', icon: Video, title: 'HCD Video Tutorials', description: 'Step-by-step video tutorials covering various skills and technologies. Perfect for visual learners who want to see concepts in action.', color: 'from-udsm-gold to-orange-500' },
    { id: 'case-studies', icon: FileText, title: 'HCD Case Studies', description: 'Real-world success stories and case studies from our alumni. Learn from their journeys, challenges, and triumphs in the innovation ecosystem.', color: 'from-forest-green to-emerald-700' },
    { id: 'templates-tools', icon: Download, title: 'HCD Templates & Tools', description: 'Ready-to-use templates, tools, and frameworks for your projects. Accelerate your workflow with our curated collection of resources.', color: 'from-udsm-blue to-forest-green' }
  ];

  return (
    <section id="resources" className="py-32 px-4 relative overflow-hidden bg-white dark:bg-gray-950">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-udsm-gold/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-24 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-udsm-blue dark:text-white tracking-tight">Resources & <span className="bg-gradient-to-r from-udsm-blue to-blue-600 bg-clip-text text-transparent">Learning</span></h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">Access our extensive library of resources designed to accelerate your learning journey.</p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-gray-900/50 rounded-3xl p-8 shadow-xl hover:shadow-udsm-blue/10 transition-all group flex flex-col border border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center gap-6 mb-6">
                <div className={`bg-gradient-to-br ${resource.color} w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md`}>
                  <resource.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{resource.title}</h3>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 flex-grow leading-relaxed font-medium">{resource.description}</p>
              <div className="mt-auto text-right">
                <Link to={`/resource/${resource.id}`} className="inline-flex items-center gap-2 text-udsm-blue dark:text-blue-400 font-black text-sm uppercase tracking-widest hover:underline group">
                  Access Resources
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;