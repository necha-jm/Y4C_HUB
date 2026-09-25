import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import apiClient from '@/core/apiClient';

const TeamMember = ({
  name,
  title,
  profilePicture,
  children,
  lineClass
}) => <div className="relative flex flex-col items-center group">
    <div className="relative z-10 flex flex-col items-center">
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="w-32 h-32 rounded-3xl bg-gradient-to-br from-udsm-blue/10 to-udsm-gold/10 dark:from-udsm-blue/20 dark:to-udsm-gold/20 shadow-xl flex items-center justify-center mb-4 p-1 border-2 border-white dark:border-gray-800 overflow-hidden"
      >
        <img
          className="w-full h-full rounded-2xl object-cover shadow-inner"
          alt={`Photo of ${name}`}
          src={profilePicture || "/Images/y4c-graduation/IMG_0008.JPG"}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/Images/y4c-graduation/IMG_0008.JPG";
          }}
        />
      </motion.div>
      <p className="font-black text-gray-900 dark:text-white text-lg tracking-tight group-hover:text-udsm-blue transition-colors">{name}</p>
      <p className="text-xs font-bold text-udsm-blue dark:text-blue-400 uppercase tracking-widest mt-1">{title}</p>
    </div>
    {children && <div className="relative mt-8 flex justify-center gap-8 md:gap-16">
        <div className={`absolute top-[-2rem] h-8 w-px ${lineClass}`}></div>
        {children}
      </div>}
  </div>;

const Line = ({
  className
}) => <div className={`absolute h-px w-full top-1/2 ${className}`}></div>;

const OurTeam = () => {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await apiClient.get('/public/experts');
        setExperts(response.data);
      } catch (error) {
        console.error("Failed to fetch experts", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExperts();
  }, []);

  const buildTree = (parentId = null, level = 0) => {
    const children = experts.filter(e => e.parentId === parentId);
    if (children.length === 0) return null;

    const colors = ['bg-purple-400', 'bg-pink-400', 'bg-orange-400', 'bg-teal-400', 'bg-blue-400'];
    const lineColor = colors[level % colors.length];

    return (
      <div className={level > 0 ? "relative w-full flex flex-wrap justify-center gap-8 md:gap-16" : ""}>
        {level > 1 && <Line className={lineColor} />}
        {children.map(child => (
          <TeamMember
            key={child.id}
            name={child.name}
            title={child.title}
            profilePicture={child.profilePicture}
            lineClass={lineColor}
          >
            {buildTree(child.id, level + 1)}
          </TeamMember>
        ))}
      </div>
    );
  };

  return <>
      <Helmet>
        <title>Our Team - Y4C Innovation Lab</title>
        <meta name="description" content="Meet the passionate team behind the Y4C Innovation Lab." />
      </Helmet>
      <Header />
      <main className="bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm min-h-screen pt-20 lg:pt-24 pb-20">
        <Breadcrumbs />
        <div className="container mx-auto px-4 py-20 text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl lg:text-7xl font-black text-udsm-blue dark:text-white mb-6 tracking-tighter">
            Our <span className="bg-gradient-to-r from-udsm-blue via-forest-green to-udsm-gold bg-clip-text text-transparent italic">Experts</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-20 font-medium">
            Meet the visionaries, educators, and mentors driving innovation forward at Y4C Lab.
          </motion.p>

          <div className="space-y-16">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-udsm-blue"></div>
              </div>
            ) : experts.length > 0 ? (
              buildTree(null, 0)
            ) : (
              <p className="text-gray-400 font-bold italic">Our experts will be listed here soon.</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>;
};
export default OurTeam;