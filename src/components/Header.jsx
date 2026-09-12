
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/ui/Logo';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

const NavLink = ({ children, onClick, active }) => (
  <motion.button
    whileHover={{ scale: 1.15, y: -1 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={cn(
      "transition-all duration-300 font-black text-sm lg:text-base relative group uppercase tracking-[0.15em] px-4",
      active
        ? "text-udsm-gold drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] scale-110"
        : "text-amber-600 dark:text-udsm-gold hover:text-udsm-blue opacity-100"
    )}
  >
    {children}
    <motion.div
      className={cn(
        "absolute -bottom-1 left-0 h-1 rounded-full transition-all duration-300",
        active ? "w-full bg-udsm-gold shadow-[0_0_10px_rgba(251,191,36,0.5)]" : "w-0 group-hover:w-full bg-udsm-blue"
      )}
    />
  </motion.button>
);

const Header = ({ onLoginClick, isAuthenticated }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
    setIsProgramsOpen(false);
  };

  const programLinks = [
    { name: 'Our Programs', id: 'programs' },
    { name: 'Events & Workshops', id: 'events' },
    { name: 'Resources & Learning', id: 'resources' },
    { name: 'Startups & Success Stories', id: 'startups' },
    { name: 'Collaboration', id: 'collaboration' },
    { name: 'Propose a Project', path: '/propose' },
    { name: 'Impact Dashboard', id: 'impact' },
  ];

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 shadow-2xl"
    >
      {/* Blue Top Bar */}
      <div className="bg-udsm-blue text-white py-3 px-8 border-b border-white/10 hidden md:block rounded-b-[1.5rem] shadow-lg relative z-20">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          <div className="flex items-center w-32">
             <img src="/Images/udsm-logo.png" alt="UDSM Logo" className="h-10 lg:h-12 w-auto object-contain drop-shadow-lg" />
          </div>

          <div className="text-center flex-grow">
            <h1 className="text-sm lg:text-xl font-black uppercase tracking-[0.2em] leading-none mb-0.5 drop-shadow-2xl">
              <span className="bg-gradient-to-r from-white via-udsm-gold to-forest-green bg-clip-text text-transparent">Youth For Children</span>
              <span className="text-white ml-2">Innovation Lab</span>
            </h1>
            <div className="flex flex-col opacity-95 leading-none space-y-0.5">
              <span className="text-[7px] lg:text-[9px] font-bold uppercase tracking-[0.3em] text-udsm-gold">College of Information and Communication Technologies</span>
              <span className="text-[7px] lg:text-[9px] font-bold uppercase tracking-[0.3em] text-white">University of Dar es Salaam</span>
            </div>
          </div>

          <div className="flex items-center justify-end w-32">
             <img src="/Images/y4c_logo.png" alt="Y4C Logo" className="h-10 lg:h-12 w-auto object-contain drop-shadow-lg" />
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-white/98 dark:bg-gray-950/98 backdrop-blur-xl py-3 border-b border-gray-100 dark:border-gray-800 shadow-lg relative mt-[-0.8rem] pt-[1.2rem] rounded-b-[1.5rem] z-10">
        <div className="w-full px-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Mobile Logo */}
            <div className="flex items-center gap-4 cursor-pointer lg:hidden" onClick={() => scrollToSection('home')}>
              <img src="/Images/udsm-logo.png" alt="UDSM" className="h-10 w-auto" />
              <Logo showText={true} iconClassName="h-8 w-8" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-between w-full">
              <div className="w-32 opacity-0 pointer-events-none"></div> {/* Left spacer to balance */}

              <div className="flex items-center gap-8">
                <NavLink onClick={() => scrollToSection('home')} active={location.hash === '#home' || (location.pathname === '/' && !location.hash)}>Home</NavLink>
                <NavLink onClick={() => scrollToSection('about')} active={location.hash === '#about'}>About Us</NavLink>

                <div className="relative group">
                  <motion.button
                    whileHover={{ scale: 1.15, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1.5 transition-all duration-300 font-black text-sm lg:text-base relative group uppercase tracking-[0.15em] px-4 text-amber-600 dark:text-udsm-gold hover:text-udsm-blue opacity-100"
                    onMouseEnter={() => setIsProgramsOpen(true)}
                    onMouseLeave={() => setIsProgramsOpen(false)}
                  >
                    Programs
                    <ChevronDown className="h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
                    <motion.div className="absolute -bottom-1 left-0 w-0 h-1 bg-udsm-blue dark:bg-udsm-gold group-hover:w-full transition-all duration-300 rounded-full" />
                  </motion.button>

                  <AnimatePresence>
                    {isProgramsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-72 bg-white/95 dark:bg-gray-950/95 backdrop-blur-2xl rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] py-4 border border-gray-100 dark:border-gray-800 z-[100]"
                        onMouseEnter={() => setIsProgramsOpen(true)}
                        onMouseLeave={() => setIsProgramsOpen(false)}
                      >
                        {/* Decorative corner */}
                        <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-4 h-4 bg-white/95 dark:bg-gray-950/95 rotate-45 border-l border-t border-gray-100 dark:border-gray-800" />

                        {programLinks.map((link) => (
                          <button
                            key={link.id || link.path}
                            onClick={() => {
                              if (link.path) navigate(link.path);
                              else scrollToSection(link.id);
                              setIsProgramsOpen(false);
                            }}
                            className="w-full text-left px-8 py-3 text-xs font-black text-gray-700 dark:text-gray-300 hover:bg-udsm-blue/10 dark:hover:bg-udsm-gold/10 hover:text-udsm-blue dark:hover:text-udsm-gold transition-all uppercase tracking-widest flex items-center justify-between group/item"
                          >
                            {link.name}
                            <div className="w-1.5 h-1.5 rounded-full bg-forest-green opacity-0 group-hover/item:opacity-100 transition-opacity" />
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <NavLink onClick={() => scrollToSection('contact')} active={location.hash === '#contact'}>Contact</NavLink>
              </div>

              <div className="flex items-center gap-4 ml-6 pl-6 border-l border-gray-200 dark:border-gray-800">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleTheme}
                  className="p-2.5 rounded-xl transition-all bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-yellow-400 border border-gray-100 dark:border-gray-800"
                >
                  {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </motion.button>

                {isAuthenticated ? (
                  <Button
                    onClick={() => navigate('/dashboard')}
                    className="bg-udsm-gold hover:bg-amber-400 text-black shadow-lg rounded-xl text-xs font-black uppercase tracking-widest px-8 h-12 transition-all active:scale-95"
                  >
                    Dashboard
                  </Button>
                ) : (
                  <Button
                    onClick={onLoginClick}
                    className="bg-udsm-gold hover:bg-amber-400 text-black shadow-lg rounded-xl text-xs font-black uppercase tracking-widest px-8 h-12 transition-all active:scale-95"
                  >
                    Login
                  </Button>
                )}
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-4 lg:hidden">
              <button onClick={toggleTheme} className="p-2 text-gray-500 dark:text-yellow-400">
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-700 dark:text-gray-300">
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-4 pb-4 space-y-3 bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-xl border border-gray-100 dark:border-gray-800"
          >
            {[
              { name: 'Home', id: 'home' },
              { name: 'About Us', id: 'about' },
              ...programLinks,
              { name: 'Contact & Support', id: 'contact' }
            ].map((item, idx) => (
              <motion.button
                key={item.id || item.path}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => item.path ? navigate(item.path) : scrollToSection(item.id)}
                className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-udsm-blue py-2 border-l-2 border-transparent hover:border-udsm-blue pl-2 transition-all font-bold"
              >
                {item.name}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {isAuthenticated ? (
                <Button onClick={() => { navigate('/dashboard'); setIsMobileMenuOpen(false); }} className="w-full bg-udsm-blue text-white shadow-lg mt-4 font-bold uppercase tracking-widest py-6">
                  Dashboard
                </Button>
              ) : (
                <Button onClick={onLoginClick} className="w-full bg-udsm-blue text-white shadow-lg mt-4 font-bold uppercase tracking-widest py-6">
                  Login
                </Button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
