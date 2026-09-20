import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Maximize2, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import apiClient from '@/core/apiClient';
import GalleryModal from './common/GalleryModal';

const LabGallerySection = () => {
  const [images, setImages] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await apiClient.get('/member/gallery');
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching lab gallery", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGallery();
  }, []);

  if (!isLoading && images.length === 0) return null;

  const visibleImages = images.slice(0, visibleCount);

  return (
    <section id="gallery" className="py-32 px-4 bg-white dark:bg-gray-950 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-udsm-blue dark:text-white tracking-tight">
              Lab <span className="bg-gradient-to-r from-udsm-blue via-forest-green to-udsm-gold bg-clip-text text-transparent italic">Moments</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
              Peek into the daily life of our innovators. From brainstorming sessions to late-night coding, this is where the magic happens.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {visibleImages.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="aspect-square rounded-3xl overflow-hidden relative group cursor-pointer shadow-xl border border-gray-100 dark:border-gray-800"
              onClick={() => setSelectedGallery({
                images: images.map(img => img.imageUrl),
                currentIndex: index,
                title: "Lab Community Gallery"
              })}
            >
              <img
                src={item.imageUrl}
                alt={item.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                <p className="text-white text-xs font-bold italic line-clamp-2 mb-4">"{item.caption}"</p>
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                        <User className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-[8px] font-black text-white uppercase tracking-widest">{item.uploaderName}</span>
                   </div>
                   <Maximize2 className="h-4 w-4 text-udsm-gold" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {images.length > visibleCount && (
          <div className="flex justify-center mt-16">
            <Button
              onClick={() => setVisibleCount(prev => prev + 8)}
              variant="outline"
              className="rounded-full px-12 py-7 font-black uppercase tracking-[0.2em] text-xs gap-3 border-gray-200 dark:border-gray-800 hover:border-udsm-blue group transition-all"
            >
              Explore More Moments
              <ChevronDown className="h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>

      <GalleryModal
        isOpen={!!selectedGallery}
        images={selectedGallery?.images}
        title={selectedGallery?.title}
        onClose={() => setSelectedGallery(null)}
        initialIndex={selectedGallery?.currentIndex}
      />
    </section>
  );
};

export default LabGallerySection;
