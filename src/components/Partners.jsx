import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import apiClient from '@/core/apiClient';

const defaultPartners = [
  { name: 'University of Dar es Salaam', logo: '/Images/udsm-logo.png' },
  { name: 'UNICEF', logo: '/Images/unicef.png' },
  { name: 'Y4C Innovation Lab', logo: '/Images/y4c_logo.png' },
  { name: 'UDSM CoICT', logo: '/Images/udsm-logo.png' },
  { name: 'UNICEF Tanzania', logo: '/Images/unicef.png' },
];

const Partners = () => {
  const [partnerList, setPartnerList] = useState(defaultPartners);

  useEffect(() => {
    const fetchPublishedPartners = async () => {
      try {
        const response = await apiClient.get('/public/partners/published');
        const published = response.data.map(p => ({
          name: p.institutionName,
          logo: p.logoUrl || '/Images/y4c_logo.png' // Fallback if no logo
        }));
        if (published.length > 0) {
          setPartnerList([...defaultPartners, ...published]);
        }
      } catch (e) {
        console.error("Could not fetch partners", e);
      }
    };
    fetchPublishedPartners();
  }, []);

  // Triple the list to ensure the marquee is always full during animation
  const scrollingPartners = [...partnerList, ...partnerList, ...partnerList];

  return (
    <div className="py-8 overflow-hidden">

      <div className="relative flex overflow-x-hidden group">
        <motion.div
          className="flex whitespace-nowrap gap-8 py-4"
          animate={{
            x: ['0%', '-33.33%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {scrollingPartners.map((partner, index) => (
            <div
              key={index}
              className="w-48 h-24 flex items-center justify-center p-4 flex-shrink-0 transition-all duration-500 group/logo"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-w-full max-h-full object-contain transition-all duration-500 opacity-90 group-hover/logo:opacity-100 scale-95 group-hover/logo:scale-110"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Partners;
