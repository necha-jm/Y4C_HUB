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
    <section id="resources" className="py-16 md:py-24 px-4 relative overflow-hidden bg-white dark:bg-gray-950">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-udsm-gold/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-udsm-blue dark:text-white tracking-tight">Resources & <span className="bg-gradient-to-r from-udsm-blue to-blue-600 bg-clip-text text-transparent">Learning</span></h2>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -6 }}
              className="bg-white dark:bg-gray-900/50 rounded-2xl p-5 shadow-lg hover:shadow-udsm-blue/10 transition-all group flex flex-col border border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`bg-gradient-to-br ${resource.color} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md`}>
                  <resource.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight leading-tight">{resource.title}</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow leading-normal font-medium">{resource.description}</p>
              <div className="mt-auto text-right">
                <Link to={`/resource/${resource.id}`} className="inline-flex items-center gap-1.5 text-udsm-blue dark:text-blue-400 font-bold text-xs uppercase tracking-widest hover:underline group">
                  Access Resources
                  <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
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