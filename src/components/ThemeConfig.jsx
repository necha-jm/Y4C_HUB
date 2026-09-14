import React, { useEffect } from 'react';
import apiClient from '@/core/apiClient';

const ThemeConfig = () => {
  useEffect(() => {
    const applyBrandSettings = async () => {
      try {
        // 1. Fetch Active Project Configuration
        const projectRes = await apiClient.get('/public/active-project');
        const activeProject = projectRes.data;

        if (activeProject) {
          if (activeProject.primaryColor) {
            document.documentElement.style.setProperty('--brand-primary', activeProject.primaryColor);
            document.documentElement.style.setProperty('--udsm-blue', activeProject.primaryColor);
          }
          if (activeProject.secondaryColor) {
            document.documentElement.style.setProperty('--brand-secondary', activeProject.secondaryColor);
            document.documentElement.style.setProperty('--forest-green', activeProject.secondaryColor);
          }
          if (activeProject.accentColor) {
            document.documentElement.style.setProperty('--brand-accent', activeProject.accentColor);
            document.documentElement.style.setProperty('--udsm-gold', activeProject.accentColor);
          }
          return; // Project settings take precedence
        }

        // 2. Fallback to Legacy Site Content
        const response = await apiClient.get('/public/content');
        const content = {};
        response.data.forEach(item => content[item.key] = item.value);

        if (content.brand_primary) {
          document.documentElement.style.setProperty('--brand-primary', content.brand_primary);
          document.documentElement.style.setProperty('--udsm-blue', content.brand_primary);
        }
        if (content.brand_secondary) {
          document.documentElement.style.setProperty('--brand-secondary', content.brand_secondary);
          document.documentElement.style.setProperty('--forest-green', content.brand_secondary);
        }
        if (content.brand_accent) {
          document.documentElement.style.setProperty('--brand-accent', content.brand_accent);
          document.documentElement.style.setProperty('--udsm-gold', content.brand_accent);
        }
      } catch (e) {
        console.warn("Using default brand settings");
      }
    };

    applyBrandSettings();
  }, []);

  return null;
};

export default ThemeConfig;
