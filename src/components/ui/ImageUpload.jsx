import React, { useState } from 'react';
import { Upload, X, CheckCircle, Loader2 } from 'lucide-react';
import apiClient from '@/core/apiClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

const ImageUpload = ({ onUploadSuccess, currentImage }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show local preview
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    // Upload to backend
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await apiClient.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onUploadSuccess(response.data);
      toast({ title: "Upload Success", description: "Image is ready to use." });
    } catch (error) {
      toast({ title: "Upload Failed", description: "Could not save image to server.", variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative w-full aspect-video rounded-3xl bg-gray-50 border-2 border-dashed border-gray-200 overflow-hidden group">
        {preview ? (
          <>
            <img src={preview} alt="Upload Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <label className="cursor-pointer bg-white text-black px-6 py-2 rounded-xl font-bold hover:scale-105 transition-transform">
                Change Image
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            </div>
          </>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-gray-100 transition-colors">
            <Upload className="h-10 w-10 text-gray-400 mb-2" />
            <p className="text-sm font-bold text-gray-500">Click to Select Image</p>
            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
          </label>
        )}

        {isUploading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin mb-2" />
            <p className="text-xs font-black uppercase text-blue-600">Uploading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
