import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Sun, Moon, ChevronRight } from 'lucide-react';
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
        : "text-white hover:text-udsm-gold opacity-100"
    )}
  >
    {children}
    <motion.div
      className={cn(
        "absolute -bottom-1 left-0 h-1 rounded-full transition-all duration-300",
        active ? "w-full bg-udsm-gold shadow-[0_0_10px_rgba(251,191,36,0.5)]" : "w-0 group-hover:w-full bg-udsm-gold"
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
    { name: 'Our Programs', id: 'programs', desc: 'Tech bootcamps & skills' },
    { name: 'Events & Workshops', id: 'events', desc: 'Networking & learning' },
    { name: 'Lab Gallery', id: 'gallery', desc: 'Moments & memories' },
    { name: 'Resources & Learning', id: 'resources', desc: 'Guides & tools' },
    { name: 'Startups', id: 'startups', desc: 'Success stories' },
    { name: 'Collaboration', id: 'collaboration', desc: 'Partnerships' },
    { name: 'Propose Project', path: '/propose', desc: 'Start your journey' },
    { name: 'Impact', id: 'impact', desc: 'Our progress' },
  ];

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    >
      <div className="transition-all duration-500 shadow-2xl relative w-full">
        {/* Unified Blue Glass Header - Full Width Square */}
        <nav className="bg-udsm-blue/95 backdrop-blur-xl border-b border-white/10 py-4 px-8 md:px-12">
          <div className="flex flex-col gap-4">
            {/* Top Row: Logos & Brand */}
            <div className="flex items-center justify-between">
              {/* UDSM Logo on the left */}
              <div className="hidden lg:flex items-center">
                <img src="/Images/udsm-logo.png" alt="UDSM" className="h-12 lg:h-14 w-auto object-contain drop-shadow-md" />
              </div>

              {/* Main Branding centered */}
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-4 cursor-pointer group" onClick={() => scrollToSection('home')}>
                  <img src="/Images/y4c_logo.png" alt="Y4C Logo" className="h-10 lg:h-12 w-auto object-contain drop-shadow-md group-hover:scale-110 transition-transform" />
                  <div className="flex flex-col">
                    <h1 className="text-xl md:text-3xl font-black uppercase tracking-widest leading-none text-white">
                      <span className="text-udsm-gold">Youth For Change</span>
                    </h1>
                  </div>
                </div>
              </div>

              {/* Mobile Toggle & Spacer for alignment */}
              <div className="flex items-center gap-3 lg:hidden">
                 <button onClick={toggleTheme} className="p-2 text-white">{theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}</button>
                 <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-white bg-white/10 rounded-xl border border-white/10">
                   {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                 </button>
              </div>

              <div className="hidden lg:block w-32" /> {/* Spacer to balance left side logo */}
            </div>

            {/* Bottom Row: Navigation & Actions */}
            <div className="hidden lg:flex items-center justify-center border-t border-white/10 pt-3 relative">
              <div className="flex items-center gap-10">
                <NavLink onClick={() => scrollToSection('home')} active={location.hash === '#home' || (location.pathname === '/' && !location.hash)}>Home</NavLink>
                <NavLink onClick={() => scrollToSection('about')} active={location.hash === '#about'}>About Us</NavLink>

                <div className="relative group">
                  <motion.button
                    onMouseEnter={() => setIsProgramsOpen(true)}
                    onMouseLeave={() => setIsProgramsOpen(false)}
                    className="flex items-center gap-1.5 transition-all duration-300 font-black text-sm relative group uppercase tracking-[0.15em] px-4 text-white hover:text-udsm-gold opacity-100"
                  >
                    Explore <ChevronDown className="h-4 w-4 group-hover:rotate-180 transition-transform" />
                    <motion.div className="absolute -bottom-1 left-0 w-0 h-1 bg-udsm-gold group-hover:w-full transition-all duration-300 rounded-full" />
                  </motion.button>
                  <AnimatePresence>
                    {isProgramsOpen && (
                      <motion.div
                        onMouseEnter={() => setIsProgramsOpen(true)}
                        onMouseLeave={() => setIsProgramsOpen(false)}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[480px] z-[100]"
                      >
                        <div className="bg-white dark:bg-udsm-blue/98 border border-gray-100 dark:border-white/20 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.4)] py-8 overflow-hidden">
                          <div className="px-8 mb-6 pb-4 border-b border-gray-100 dark:border-white/10 flex items-center justify-between">
                             <p className="text-[10px] font-black text-udsm-blue dark:text-udsm-gold uppercase tracking-[0.3em]">Lab Ecosystem</p>
                             <div className="flex gap-1">
                               <div className="w-1 h-1 rounded-full bg-udsm-gold" />
                               <div className="w-1 h-1 rounded-full bg-gray-200 dark:bg-white/40" />
                               <div className="w-1 h-1 rounded-full bg-gray-100 dark:bg-white/20" />
                             </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 px-4">
                            {programLinks.map((link) => (
                              <button
                                key={link.id || link.path}
                                onClick={() => {
                                  if (link.path) navigate(link.path);
                                  else scrollToSection(link.id);
                                  setIsProgramsOpen(false);
                                }}
                                className="w-full text-left px-5 py-4 hover:bg-gray-50 dark:hover:bg-white/10 transition-all group/item rounded-2xl flex flex-col gap-1"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-[11px] font-black text-gray-900 dark:text-white uppercase tracking-widest group-hover:text-udsm-blue dark:group-hover:text-udsm-gold">{link.name}</span>
                                  <ChevronRight className="w-3 h-3 text-udsm-blue dark:text-udsm-gold opacity-0 group-hover/item:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                </div>
                                <span className="text-[9px] font-bold text-gray-500 dark:text-white/50 uppercase tracking-tighter">{link.desc}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <NavLink onClick={() => navigate('/contact')} active={location.pathname === '/contact'}>Contact</NavLink>
              </div>

              {/* Action Area - Absolute Right */}
              <div className="absolute right-0 flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleTheme}
                  className="p-1.5 rounded-lg transition-all bg-white/10 text-white border border-white/10 backdrop-blur-md"
                >
                  {theme === 'light' ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
                </motion.button>
                {isAuthenticated ? (
                  <Button onClick={() => navigate('/dashboard')} className="bg-white text-udsm-blue hover:bg-gray-100 shadow-xl rounded-lg text-[9px] font-black uppercase tracking-widest px-4 h-9 transition-all active:scale-95">Dashboard</Button>
                ) : (
                  <Button onClick={onLoginClick} className="bg-udsm-gold hover:bg-amber-400 text-black shadow-xl rounded-lg text-[9px] font-black uppercase tracking-widest px-4 h-9 transition-all active:scale-95">Login</Button>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-udsm-blue shadow-2xl border-b border-white/10 overflow-hidden"
          >
             <div className="flex flex-col">
               {[
                 { name: 'Home', id: 'home' },
                 { name: 'About Us', id: 'about' },
                 ...programLinks,
                 { name: 'Contact', path: '/contact' }
               ].map((item, idx) => (
                 <motion.button
                   key={idx}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: idx * 0.03 }}
                   onClick={() => item.path ? navigate(item.path) : scrollToSection(item.id)}
                   className="w-full text-left px-8 py-5 text-white/90 hover:text-white hover:bg-white/5 transition-all font-bold uppercase tracking-[0.15em] text-[11px] border-b border-white/10 last:border-none"
                 >
                   {item.name}
                 </motion.button>
               ))}
               <div className="p-6 bg-udsm-blue/50">
                 <Button onClick={onLoginClick} className="w-full bg-udsm-gold hover:bg-amber-400 text-black font-black uppercase py-7 rounded-2xl shadow-xl transition-all active:scale-95">
                   Login to Portal
                 </Button>
               </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
