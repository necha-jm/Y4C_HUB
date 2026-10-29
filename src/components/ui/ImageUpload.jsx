import React, { useState } from 'react';
import { Upload, X, CheckCircle, Loader2 } from 'lucide-react';
import apiClient from '@/core/apiClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

const ImageUpload = ({ onUploadSuccess, currentImage, multiple = false }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previews, setPreviews] = useState(currentImage ? (Array.isArray(currentImage) ? currentImage : [currentImage]) : []);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Show local previews
    const newPreviews = [];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        if (newPreviews.length === files.length) {
          setPreviews(multiple ? [...previews, ...newPreviews] : newPreviews);
        }
      };
      reader.readAsDataURL(file);
    });

    // Upload to backend
    setIsUploading(true);

    try {
      const uploadPromises = files.map(file => {
        const formData = new FormData();
        formData.append('file', file);
        return apiClient.post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      });

      const responses = await Promise.all(uploadPromises);
      const urls = responses.map(res => res.data);

      if (multiple) {
        const currentUrls = Array.isArray(currentImage) ? currentImage : (currentImage ? [currentImage] : []);
        onUploadSuccess([...currentUrls, ...urls]);
      } else {
        onUploadSuccess(urls[0]);
      }

      toast({ title: "Upload Success", description: `${files.length} image(s) ready to use.` });
    } catch (error) {
      toast({ title: "Upload Failed", description: "Could not save images to server.", variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);

    if (multiple) {
      const currentUrls = Array.isArray(currentImage) ? currentImage : [currentImage];
      onUploadSuccess(currentUrls.filter((_, i) => i !== index));
    } else {
      onUploadSuccess('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {previews.map((src, idx) => (
          <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 group shadow-sm bg-gray-100 dark:bg-gray-800">
            <img src={src} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
            <button
              onClick={(e) => { e.preventDefault(); removeImage(idx); }}
              className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-xl shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}

        {(multiple || previews.length === 0) && (
          <label className="flex flex-col items-center justify-center aspect-square rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:border-udsm-blue dark:hover:border-udsm-blue transition-all bg-white/50 dark:bg-gray-900/40 group">
            <Upload className="h-7 w-7 text-gray-400 group-hover:text-udsm-blue transition-colors mb-2" />
            <p className="text-[10px] font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 group-hover:text-udsm-blue transition-colors">Add Image</p>
            <input type="file" className="hidden" accept="image/*" multiple={multiple} onChange={handleFileChange} />
          </label>
        )}
      </div>

      {isUploading && (
        <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/40 rounded-2xl">
          <Loader2 className="h-5 w-5 text-udsm-blue animate-spin" />
          <p className="text-xs font-black uppercase text-udsm-blue tracking-widest">Processing Uploads...</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
