import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layout, Save, RefreshCw, Type, FileText } from 'lucide-react';
import apiClient from '@/core/apiClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ImageUpload from '@/components/ui/ImageUpload';

const LandingPageEditor = () => {
  const [content, setContent] = useState({
    hero_title: 'Youth For Children Innovation Lab',
    hero_subtitle: 'Nurturing ideas, sharing solutions, and building the future.',
    hero_image: '/Images/Photo05.png',
    brand_primary: '#2563eb',
    brand_secondary: '#9333ea',
    brand_accent: '#db2777'
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await apiClient.get('/facilitator/content');
      if (response.data && Array.isArray(response.data)) {
        const contentMap = {};
        response.data.forEach(item => {
          contentMap[item.key] = item.value;
        });
        if (Object.keys(contentMap).length > 0) {
          setContent(prev => ({ ...prev, ...contentMap }));
        }
      }
    } catch (error) {
      console.error('Failed to fetch CMS content', error);
    }
  };

  const handleUpdate = async (key, value) => {
    try {
      await apiClient.put(`/facilitator/content/${key}`, value, {
        headers: { 'Content-Type': 'text/plain' }
      });
      toast({ title: "Updated", description: `${key} saved successfully.` });
    } catch (error) {
      toast({ title: "Error", description: "Failed to save change.", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Layout className="h-6 w-6 text-pink-500" />
          Landing Page Editor
        </h2>
        <Button onClick={fetchContent} variant="outline" size="sm" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Reload
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Hero Section Editing */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-pink-50 space-y-6">
          <h3 className="text-sm font-black text-pink-500 uppercase tracking-widest border-b pb-4">Hero Section</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Hero Title</label>
              <div className="flex gap-2">
                <Input
                  value={content.hero_title}
                  onChange={(e) => setContent({...content, hero_title: e.target.value})}
                  className="rounded-xl"
                />
                <Button onClick={() => handleUpdate('hero_title', content.hero_title)} size="icon" className="bg-pink-600 rounded-xl flex-shrink-0">
                  <Save className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Hero Subtitle</label>
              <div className="flex gap-2">
                <textarea
                  value={content.hero_subtitle}
                  onChange={(e) => setContent({...content, hero_subtitle: e.target.value})}
                  className="w-full rounded-xl bg-gray-50 border border-gray-100 p-4 text-sm outline-none focus:ring-2 focus:ring-pink-500"
                  rows={3}
                />
                <Button onClick={() => handleUpdate('hero_subtitle', content.hero_subtitle)} size="icon" className="bg-pink-600 rounded-xl self-end mb-1">
                  <Save className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Main Hero Image</label>
              <ImageUpload
                currentImage={content.hero_image}
                onUploadSuccess={(url) => {
                  setContent({...content, hero_image: url});
                  handleUpdate('hero_image', url);
                }}
              />
            </div>
          </div>
        </div>

        {/* Brand Colors Editing */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-blue-50 space-y-6">
          <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest border-b pb-4">Brand Identity</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Primary Color</label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={content.brand_primary}
                  onChange={(e) => setContent({...content, brand_primary: e.target.value})}
                  className="w-12 h-12 rounded-xl cursor-pointer border-none"
                />
                <Button onClick={() => handleUpdate('brand_primary', content.brand_primary)} size="icon" className="bg-blue-600 rounded-xl flex-shrink-0">
                  <Save className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Secondary Color</label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={content.brand_secondary}
                  onChange={(e) => setContent({...content, brand_secondary: e.target.value})}
                  className="w-12 h-12 rounded-xl cursor-pointer border-none"
                />
                <Button onClick={() => handleUpdate('brand_secondary', content.brand_secondary)} size="icon" className="bg-purple-600 rounded-xl flex-shrink-0">
                  <Save className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Accent Color</label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={content.brand_accent}
                  onChange={(e) => setContent({...content, brand_accent: e.target.value})}
                  className="w-12 h-12 rounded-xl cursor-pointer border-none"
                />
                <Button onClick={() => handleUpdate('brand_accent', content.brand_accent)} size="icon" className="bg-pink-600 rounded-xl flex-shrink-0">
                  <Save className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 font-medium italic">* Colors are applied across the entire site including buttons, gradients, and icons.</p>
        </div>

        {/* Live Preview Sync */}
        <div className="space-y-6">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Real-time Preview</h3>
          <div className="bg-gray-900 rounded-[3rem] p-10 overflow-hidden relative group shadow-2xl">
            <div className="relative z-10 space-y-4">
              <h4 className="text-4xl font-black text-white leading-tight">
                {(content.hero_title || '').split(' ').map((word, i) => (
                  <span key={i} className={i < 2 ? "text-pink-500" : ""}>{word} </span>
                ))}
              </h4>
              <p className="text-gray-400 text-sm">{content.hero_subtitle}</p>
              <Button className="bg-pink-600 rounded-xl px-8">Explore</Button>
            </div>
            <img
              src={content.hero_image}
              className="absolute top-0 right-0 w-1/2 h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity"
              alt="Hero Preview"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageEditor;
