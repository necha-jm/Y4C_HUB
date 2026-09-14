import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import apiClient from '@/core/apiClient';

const defaultImages = [
  "/Images/Photo05.png",
  "/Images/Photo02.jpg",
  "/Images/y4c-graduation/IMG_0011.JPG",
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const [heroContent, setHeroContent] = useState({
    title: 'YOUTH FOR CHILDREN INNOVATION LAB',
    subtitle: 'Nurturing ideas, sharing solutions, and building the future. A space where young minds transform communities through Open Innovation.',
    image: "/Images/Photo05.png"
  });

  const titleWords = heroContent.title.split(' ');

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        // Try Active Project first
        const projectRes = await apiClient.get('/public/active-project');
        if (projectRes.data) {
          const p = projectRes.data;
          setHeroContent({
            title: p.title || 'YOUTH FOR CHILDREN INNOVATION LAB',
            subtitle: p.subtitle || 'Nurturing ideas, sharing solutions, and building the future. A space where young minds transform communities through Open Innovation.',
            image: p.heroImageUrl || "/Images/Photo05.png"
          });
          return;
        }

        const response = await apiClient.get('/public/content');
        if (response.data && Array.isArray(response.data)) {
          const content = {};
          response.data.forEach(item => content[item.key] = item.value);

          setHeroContent(prev => ({
            title: content.hero_title || prev.title,
            subtitle: content.hero_subtitle || prev.subtitle,
            image: content.hero_image || prev.image
          }));
        }
      } catch (e) {
        console.error("Using default hero content");
      }
    };
    fetchHeroContent();
  }, []);

  const currentImages = heroContent.image ? [heroContent.image, ...defaultImages] : defaultImages;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % currentImages.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [currentImages.length]);

  const scrollToSection = id => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openGoogleForm = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSc_xLh20n8f9p9sZ1e1a1b1c1d1e1f1g1h1i1j1k1l1m1n1o/viewform?usp=sf_link', '_blank');
  };

  return (
    <section id="home" className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-gray-900 pt-[100px] md:pt-[140px]">
      {/* Background Image with AnimatePresence for smooth cross-fade */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={currentImages[index]}
              alt="Youth Innovation background"
              className="w-full h-full object-cover scale-105"
            />
            {/* Multi-layered Premium Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
            <div className="absolute inset-0 bg-udsm-blue/10 mix-blend-overlay" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Unique Texture Overlay */}
      <div className="absolute inset-0 z-10 opacity-[0.15] pointer-events-none"
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }} />

      {/* Dynamic Background Mesh (Premium feel) */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-[-10%] w-[800px] h-[800px] bg-udsm-blue/40 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.15, 0.05],
            x: [0, -60, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] right-[-10%] w-[900px] h-[900px] bg-udsm-gold/20 rounded-full blur-[180px]"
        />
      </div>

      {/* Centered Content */}
      <div className="container mx-auto px-4 relative z-20 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
              }
            }
          }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 }
            }}
          >
            <h1 className="text-lg md:text-2xl lg:text-3xl font-black text-white tracking-[0.2em] uppercase mb-1 drop-shadow-2xl flex flex-wrap justify-center gap-x-4 md:gap-x-6">
              {titleWords.slice(0, 3).map((word, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-udsm-gold tracking-tighter uppercase mb-4 drop-shadow-2xl flex flex-wrap justify-center gap-x-4 md:gap-x-8">
              {titleWords.slice(3).map((word, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1 }
                  }}
                  transition={{
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h2 className="text-lg md:text-2xl lg:text-3xl font-black text-white italic drop-shadow-xl tracking-tight">
              {"Empowering Dreams".split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.2, duration: 0.5 }}
                  className={cn("inline-block mr-4", word === 'Dreams' && "bg-gradient-to-r from-udsm-gold to-white bg-clip-text text-transparent")}
                >
                  {word}
                </motion.span>
              ))}
            </h2>
          </motion.div>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="text-xl md:text-2xl text-gray-200 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-md"
          >
            {heroContent.subtitle}
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10"
          >
            <Button
              onClick={() => scrollToSection('programs')}
              size="lg"
              className="w-full sm:w-auto bg-udsm-blue hover:bg-blue-700 text-white shadow-[0_10px_30px_rgba(8,100,175,0.2)] px-10 py-7 text-lg font-black rounded-2xl group transition-all uppercase tracking-widest"
            >
              Explore Programs
              <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => navigate('/propose')}
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2 border-udsm-gold text-udsm-gold hover:bg-udsm-gold hover:text-black px-10 py-7 text-lg font-black rounded-2xl transition-all shadow-lg backdrop-blur-md bg-udsm-gold/5 uppercase tracking-widest"
            >
              Propose a Project
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <p className="text-white/50 text-[10px] font-black uppercase tracking-[0.3em]">Scroll</p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-1 h-10 bg-gradient-to-b from-white/50 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
};

export default Hero;