import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Download, BookOpen, Video } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import Breadcrumbs from '@/components/Breadcrumbs';

const resourcesData = {
  'learning-guides': {
    title: 'Comprehensive Learning Guides',
    icon: BookOpen,
    description: 'Our learning guides provide in-depth knowledge on a wide range of topics, from beginner-level introductions to advanced concepts. Each guide is crafted by industry experts to be practical and easy to follow.',
    features: [
      'Step-by-step tutorials',
      'Code snippets and examples',
      'Quizzes and assessments',
      'Downloadable PDF versions',
    ],
    images: [
      'A person reading a guide on a tablet',
      'Close-up of a well-designed e-book page',
    ],
  },
  'video-tutorials': {
    title: 'Engaging Video Tutorials',
    icon: Video,
    description: 'Learn by watching with our extensive library of video tutorials. Our instructors break down complex topics into easy-to-understand videos, complete with practical demonstrations.',
    features: [
      'High-quality video and audio',
      'Source code included',
      'Organized into playlists and courses',
      'Mobile-friendly viewing',
    ],
    images: [
      'A screen showing a video player with a coding tutorial',
      'A person with headphones watching an educational video on a laptop',
    ],
  },
};

const ResourcesDetail = () => {
  const { id } = useParams();
  const resource = resourcesData[id] || resourcesData['learning-guides'];

  return (
    <>
      <Helmet>
        <title>{resource.title} - Y4C Innovation Lab</title>
        <meta name="description" content={`Explore the ${resource.title} available at Y4C Innovation Lab.`} />
      </Helmet>
      <Header />
      <main className="bg-white pt-20 lg:pt-24">
        <Breadcrumbs />
        <div className="container mx-auto px-4 pb-16">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-gradient-to-r from-udsm-blue to-udsm-gold w-16 h-16 rounded-xl flex items-center justify-center">
                <resource.icon className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-udsm-blue">{resource.title}</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mb-12">{resource.description}</p>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                {resource.images.map((img, index) => {
                  const imgSrc = (typeof img === 'string' && (img.startsWith('http') || img.startsWith('/')))
                    ? img
                    : `/Images/Photo0${(index % 4) + 1}.jpg`;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.15 }}
                      className="rounded-2xl overflow-hidden shadow-xl"
                    >
                      <img
                        className="w-full h-64 object-cover"
                        alt={typeof img === 'string' ? img : "Resource detail"}
                        src={imgSrc}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `/Images/Photo0${(index % 4) + 1}.jpg`;
                        }}
                      />
                    </motion.div>
                  );
                })}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Key Features</h2>
                <ul className="space-y-3">
                  {resource.features.map((feature, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-3 text-lg"
                    >
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-udsm-blue to-udsm-gold"></div>
                      <span className="text-gray-700">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                <Button size="lg" className="mt-10 bg-gradient-to-r from-udsm-blue to-udsm-gold">
                  <Download className="mr-2 h-5 w-5" />
                  Access Now
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ResourcesDetail;