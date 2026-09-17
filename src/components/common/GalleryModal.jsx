import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GalleryModal = ({ images, isOpen, onClose, title, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);

  React.useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  if (!isOpen || !images || images.length === 0) return null;

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/50 hover:text-white transition-all hover:rotate-90 z-[110]"
        >
          <X className="h-10 w-10" />
        </button>

        <div className="relative w-full max-w-6xl aspect-video flex items-center justify-center group">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={images[currentIndex]}
              alt={`Gallery image ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
            />
          </AnimatePresence>

          {/* Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white backdrop-blur-md transition-all active:scale-95"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button
                onClick={next}
                className="absolute right-4 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white backdrop-blur-md transition-all active:scale-95"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </>
          )}

          {/* Info Overlay */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white z-[110]">
             <div>
                <h4 className="text-xl font-black uppercase tracking-widest">{title}</h4>
                <p className="text-sm font-bold text-white/50">Image {currentIndex + 1} of {images.length}</p>
             </div>
             <Button
               variant="outline"
               className="bg-white/5 border-white/10 text-white rounded-xl gap-2 hover:bg-white hover:text-black transition-all"
               onClick={() => window.open(images[currentIndex], '_blank')}
             >
               <Download className="h-4 w-4" /> Full Res
             </Button>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 overflow-x-auto no-scrollbar max-w-[80vw] px-4">
           {images.map((img, i) => (
             <button
               key={i}
               onClick={() => setCurrentIndex(i)}
               className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                 currentIndex === i ? 'border-udsm-gold scale-110 shadow-lg' : 'border-white/10 opacity-50 hover:opacity-100'
               }`}
             >
               <img src={img} className="w-full h-full object-cover" alt="thumb" />
             </button>
           ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GalleryModal;
