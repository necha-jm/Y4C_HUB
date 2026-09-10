import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, TrendingUp, User } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const storiesData = {
  'edutech-solutions': {
    name: 'EduTech Solutions',
    founder: 'Sarah Johnson',
    story: 'Sarah Johnson, a former teacher, noticed a gap in personalized learning tools for students. With a passion for both education and technology, she joined our startup incubation program. EduTech Solutions was born out of her desire to create an AI-powered platform that adapts to each student\'s learning pace. After months of hard work, mentorship, and late nights, she successfully launched her platform and secured $500K in seed funding to expand her team and reach more schools.',
    achievement: 'Raised $500K in seed funding',
    impact: 'Helping over 10,000 students achieve better academic outcomes.',
    images: [
      'Sarah Johnson presenting her platform at a tech conference',
      'A screenshot of the EduTech Solutions dashboard',
      'A group of students using tablets in a classroom',
    ],
  },
  'greenfuture': {
    name: 'GreenFuture',
    founder: 'Michael Chen',
    story: 'Michael Chen, an environmental science graduate, was determined to tackle food security in urban areas. He developed an innovative hydroponic system that allows families to grow fresh produce in small spaces. Through our program, he refined his business model, built a scalable product, and established key partnerships with local communities. GreenFuture is now serving thousands of households, promoting sustainability and healthy eating.',
    achievement: 'Serving 10,000+ households',
    impact: 'Promoting urban farming and reducing carbon footprint.',
    images: [
      'Michael Chen standing next to his hydroponic system',
      'Fresh vegetables growing in a GreenFuture unit',
      'A family harvesting produce from their home unit',
    ],
  },
};

const StartupStory = () => {
  const { id } = useParams();
  const story = storiesData[id] || storiesData['edutech-solutions'];

  return (
    <>
      <Helmet>
        <title>{story.name} - Y4C Success Story</title>
        <meta name="description" content={`Read the success story of ${story.name}, a startup from the Y4C Innovation Lab.`} />
      </Helmet>
      <Header />
      <main className="pt-24 bg-white">
        <div className="container mx-auto px-4 py-16">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-udsm-blue font-semibold hover:underline mb-8">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>

            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-6xl font-bold text-udsm-blue mb-2">{story.name}</h1>
              <p className="text-xl text-gray-600">A Y4C Innovation Lab Success Story</p>
            </div>

            <div className="grid lg:grid-cols-5 gap-12">
              <div className="lg:col-span-3">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">The Journey</h2>
                <p className="text-lg text-gray-700 leading-relaxed">{story.story}</p>
                
                <div className="mt-10 space-y-6">
                   <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                      <User className="h-8 w-8 text-udsm-blue flex-shrink-0 mt-1" />
                      <div>
                         <h3 className="font-bold text-gray-800">Founder</h3>
                         <p className="text-gray-600">{story.founder}</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                      <Award className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                         <h3 className="font-bold text-gray-800">Key Achievement</h3>
                         <p className="text-gray-600">{story.achievement}</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
                      <TrendingUp className="h-8 w-8 text-purple-600 flex-shrink-0 mt-1" />
                      <div>
                         <h3 className="font-bold text-gray-800">Impact</h3>
                         <p className="text-gray-600">{story.impact}</p>
                      </div>
                   </div>
                </div>
              </div>
              <div className="lg:col-span-2 space-y-6">
                {story.images.map((img, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.15 }}
                    className="rounded-2xl overflow-hidden shadow-xl"
                  >
                    <img className="w-full h-64 object-cover" alt={img} src="/Images/y4c-graduation/IMG_0010.JPG" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default StartupStory;