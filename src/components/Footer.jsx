import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, ExternalLink } from 'lucide-react';
import Logo from '@/components/ui/Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: Twitter, href: 'https://twitter.com/Y4Clab', label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: Instagram, href: 'https://instagram.com/y4c_hub', label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: Linkedin, href: 'https://www.linkedin.com', label: 'LinkedIn', color: 'hover:bg-blue-700' },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="relative bg-gray-950 text-white py-4 px-4 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-udsm-blue/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-udsm-gold/10 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-forest-green/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"
      />

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-2">
          <motion.div variants={itemVariants} className="space-y-2">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Logo iconClassName="h-12 w-12" textClassName="text-white text-lg" />
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-medium">
              Empowering youth to become tomorrow's innovators and leaders through education, mentorship, and opportunity.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                  className={`bg-white/5 border border-white/10 ${social.color.replace('hover:bg-udsm-blue', 'hover:bg-blue-600')} text-white w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg`}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <h4 className="text-base font-black uppercase tracking-widest text-udsm-gold">Quick Links</h4>
            <ul className="space-y-1">
              {['About Us', 'Programs', 'Events', 'Resources'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(' ', '')}`}
                    className="text-gray-400 hover:text-white transition-colors flex items-center group font-bold text-sm"
                  >
                    <span className="w-0 group-hover:w-4 h-[2px] bg-udsm-gold mr-0 group-hover:mr-2 transition-all duration-300" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <h4 className="text-base font-black uppercase tracking-widest text-udsm-gold">Support</h4>
            <ul className="space-y-1">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors flex items-center group font-bold text-sm">
                  <span className="w-0 group-hover:w-4 h-[2px] bg-udsm-blue mr-0 group-hover:mr-2 transition-all duration-300" />
                  Contact Us
                </Link>
              </li>
              {['FAQ', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center group font-bold text-sm">
                    <span className="w-0 group-hover:w-4 h-[2px] bg-udsm-blue mr-0 group-hover:mr-2 transition-all duration-300" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <h4 className="text-base font-black uppercase tracking-widest text-udsm-gold">Contact Info</h4>
            <div className="space-y-1.5 text-sm font-medium">
                <a
                  href="mailto:y4c@udsm.ac.tz"
                  className="flex items-center gap-3 text-gray-400 group cursor-pointer hover:text-white transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-udsm-blue/20 group-hover:border-udsm-blue/50 transition-all">
                    <ExternalLink className="h-4 w-4" />
                  </div>
                  <p>y4c@udsm.ac.tz</p>
                </a>
                <p className="text-gray-400 leading-relaxed pl-11">
                  Room B208, Block B, UDSM - CoICT Kijitonyama Campus
                </p>
            </div>
            <div className="pt-1">
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="border-t border-white/10 pt-2 flex justify-center items-center"
        >
          <p className="text-gray-500 text-xs text-center">
            © {currentYear} <span className="text-white font-bold">Youth For Change Innovation Lab</span>. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;