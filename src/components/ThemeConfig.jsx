import React, { useEffect } from 'react';
import apiClient from '@/core/apiClient';

const ThemeConfig = () => {
  useEffect(() => {
    const applyBrandColors = async () => {
      try {
        const response = await apiClient.get('/public/content');
        const content = {};
        response.data.forEach(item => content[item.key] = item.value);

        if (content.brand_primary) {
          document.documentElement.style.setProperty('--brand-primary', content.brand_primary);
        }
        if (content.brand_secondary) {
          document.documentElement.style.setProperty('--brand-secondary', content.brand_secondary);
        }
        if (content.brand_accent) {
          document.documentElement.style.setProperty('--brand-accent', content.brand_accent);
        }
      } catch (e) {
        console.warn("Using default brand colors");
      }
    };

    applyBrandColors();
  }, []);

  return null;
};

export default ThemeConfig;
