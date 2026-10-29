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
      {
        url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
        alt: 'Sarah Johnson presenting her platform at a tech conference'
      },
      {
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
        alt: 'A screenshot of the EduTech Solutions dashboard'
      },
      {
        url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
        alt: 'A group of students using tablets in a classroom'
      }
    ]
  },
  'hcd-solutions': {
    name: 'HCD Solutions',
    founder: 'Sarah Johnson',
    story: 'HCD Solutions empowers public and private institutions with Human-Centered Design frameworks. Born at the Y4C Innovation Lab, the platform brings iterative feedback, usability metrics, and AI-driven user research into unified workflows.',
    achievement: 'Raised $500K in seed funding',
    impact: 'Empowering over 10,000 students and 50+ institutional partners.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
        alt: 'Sarah Johnson presenting HCD Solutions at an innovation summit'
      },
      {
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
        alt: 'HCD Analytics and Usability Dashboard'
      },
      {
        url: '/Images/Photo01.jpg',
        alt: 'Youth innovators collaborating during HCD workshop'
      }
    ]
  },
  'lishe-app': {
    name: 'Lishe App',
    founder: 'Michael Chen',
    story: 'Lishe App combines smart IoT hydroponics and community distribution to transform urban agriculture. Designed in the Y4C Hub, the app enables families and local farmers to monitor crop growth, automate watering, and connect directly with consumers.',
    achievement: 'Serving 10,000+ households',
    impact: 'Promoting urban farming and boosting community nutritional access.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800',
        alt: 'Michael Chen inspecting a hydroponic vertical garden'
      },
      {
        url: '/Images/Photo02.jpg',
        alt: 'Fresh produce harvested from Lishe App smart farms'
      },
      {
        url: '/Images/Photo03.jpg',
        alt: 'Community members using the Lishe mobile platform'
      }
    ]
  },
  'greenfuture': {
    name: 'GreenFuture',
    founder: 'Michael Chen',
    story: 'Michael Chen, an environmental science graduate, was determined to tackle food security in urban areas. He developed an innovative hydroponic system that allows families to grow fresh produce in small spaces. Through our program, he refined his business model, built a scalable product, and established key partnerships with local communities.',
    achievement: 'Serving 10,000+ households',
    impact: 'Promoting urban farming and reducing carbon footprint.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800',
        alt: 'Michael Chen standing next to his hydroponic system'
      },
      {
        url: '/Images/Photo02.jpg',
        alt: 'Fresh vegetables growing in a GreenFuture unit'
      },
      {
        url: '/Images/Photo03.jpg',
        alt: 'A family harvesting produce from their home unit'
      }
    ]
  },
  'swash-advocacy': {
    name: 'SWASH Advocacy',
    founder: 'Amara Okafor',
    story: 'SWASH Advocacy leverages digital tools to improve school water, sanitation, and hygiene across Tanzania. Developed through the Y4C Incubator, the platform enables real-time facility monitoring, hygiene tracking, and youth-led awareness campaigns.',
    achievement: 'Winner of National Innovation Award',
    impact: 'Impacting 25,000+ school children across 120 partner schools.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
        alt: 'Amara Okafor demonstrating SWASH tracking software'
      },
      {
        url: '/Images/Photo04.jpg',
        alt: 'School children participating in SWASH hygiene program'
      },
      {
        url: '/Images/Photo05.png',
        alt: 'National Innovation Award Presentation'
      }
    ]
  }
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
      <main className="pt-20 lg:pt-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 py-16">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-udsm-blue dark:text-blue-400 font-bold hover:underline mb-8 uppercase tracking-widest text-xs">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>

            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-6xl font-black text-udsm-blue dark:text-white mb-2">{story.name}</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">A Y4C Innovation Lab Success Story</p>
            </div>

            <div className="grid lg:grid-cols-5 gap-12 max-w-7xl mx-auto">
              <div className="lg:col-span-3 space-y-6">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">The Journey</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-medium">{story.story}</p>
                
                <div className="mt-10 space-y-6">
                   <div className="flex items-start gap-4 p-5 bg-blue-50/80 dark:bg-blue-950/40 rounded-2xl border border-blue-100 dark:border-blue-900/50">
                      <User className="h-8 w-8 text-udsm-blue flex-shrink-0 mt-1" />
                      <div>
                         <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-wider text-xs">Founder</h3>
                         <p className="text-gray-700 dark:text-gray-300 font-bold text-base">{story.founder}</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-4 p-5 bg-green-50/80 dark:bg-green-950/40 rounded-2xl border border-green-100 dark:border-green-900/50">
                      <Award className="h-8 w-8 text-forest-green flex-shrink-0 mt-1" />
                      <div>
                         <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-wider text-xs">Key Achievement</h3>
                         <p className="text-gray-700 dark:text-gray-300 font-bold text-base">{story.achievement}</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-4 p-5 bg-purple-50/80 dark:bg-purple-950/40 rounded-2xl border border-purple-100 dark:border-purple-900/50">
                      <TrendingUp className="h-8 w-8 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                      <div>
                         <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-wider text-xs">Impact</h3>
                         <p className="text-gray-700 dark:text-gray-300 font-bold text-base">{story.impact}</p>
                      </div>
                   </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-6">
                {story.images.map((imgObj, index) => {
                  const imageUrl = typeof imgObj === 'string' ? imgObj : imgObj.url;
                  const altText = typeof imgObj === 'string' ? imgObj : imgObj.alt;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.15 }}
                      className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 group"
                    >
                      <div className="relative overflow-hidden h-64 bg-gray-200 dark:bg-gray-800">
                        <img
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          alt={altText}
                          src={imageUrl}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `/Images/Photo0${(index % 4) + 1}.jpg`;
                          }}
                        />
                      </div>
                      <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                        <p className="text-xs font-bold text-gray-600 dark:text-gray-400 leading-snug">{altText}</p>
                      </div>
                    </motion.div>
                  );
                })}
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
