import React, { useRef, useState } from 'react';
import { Camera, Plus, Trash2, Maximize2, Heart } from 'lucide-react';
import { MemoryPhoto } from '../types';

interface PhotoUploaderProps {
  category: 'first-meet' | 'second-meet' | 'scrapbook' | 'reminder';
  label?: string;
  reminderKey?: string;
  photos: MemoryPhoto[];
  onAddPhotos: (newPhotos: MemoryPhoto[]) => void;
  onDeletePhoto: (id: string) => void;
  onOpenPhoto: (photo: MemoryPhoto) => void;
  placeholderText?: string;
  maxPhotos?: number;
  compact?: boolean;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  category,
  label,
  reminderKey,
  photos,
  onAddPhotos,
  onDeletePhoto,
  onOpenPhoto,
  placeholderText = "Add Our Memory 📷",
  maxPhotos,
  compact = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Filter photos relevant to this uploader instance
  const relevantPhotos = photos.filter((p) => {
    if (reminderKey) return p.reminderKey === reminderKey;
    if (label) return p.category === category && p.label === label;
    return p.category === category;
  });

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newPhotos: MemoryPhoto[] = [];
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          const photo: MemoryPhoto = {
            id: `photo_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
            category,
            label,
            reminderKey,
            imageUrl: result,
            caption: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
            timestamp: Date.now(),
          };
          onAddPhotos([photo]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const isFull = maxPhotos ? relevantPhotos.length >= maxPhotos : false;

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={!maxPhotos || maxPhotos > 1}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <div className={`grid gap-3.5 ${
        compact 
          ? 'grid-cols-2 sm:grid-cols-3' 
          : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
      }`}>
        {/* Existing uploaded photos */}
        {relevantPhotos.map((photo) => (
          <div
            key={photo.id}
            className="group relative rounded-xl overflow-hidden aspect-4/3 bg-[#24060c]/80 border border-[#e2a76f]/20 shadow-lg hover:border-[#e2a76f]/60 transition-all duration-300"
          >
            <img
              src={photo.imageUrl}
              alt={photo.caption || "Our Memory"}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 cursor-pointer"
              onClick={() => onOpenPhoto(photo)}
            />

            {/* Gradient overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#140306]/90 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-2.5 cursor-pointer"
              onClick={() => onOpenPhoto(photo)}
            >
              <div className="flex justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => onDeletePhoto(photo.id)}
                  className="p-1.5 rounded-full bg-red-950/80 text-rose-200 hover:bg-red-900 border border-rose-500/30 transition-colors"
                  title="Remove photo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onOpenPhoto(photo)}
                  className="p-1.5 rounded-full bg-black/60 text-white hover:bg-black/90 border border-white/20 transition-colors"
                  title="View full screen"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <p className="text-xs text-[#faf5ed] font-medium line-clamp-1">
                  {photo.caption || (label || 'Our memory')}
                </p>
                <span className="text-[10px] text-[#e2a76f] flex items-center gap-1 mt-0.5">
                  <Heart className="w-2.5 h-2.5 fill-current" /> Tap to view & slideshow
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Upload Placeholder Button */}
        {!isFull && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer rounded-xl border border-dashed transition-all duration-300 flex flex-col items-center justify-center text-center p-4 aspect-4/3 ${
              isDragging
                ? 'border-[#e2a76f] bg-[#52101b]/40 scale-[1.02]'
                : 'border-[#e2a76f]/30 bg-[#2a080f]/40 hover:bg-[#3d0b16]/60 hover:border-[#e2a76f]/60'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-[#52101b]/60 flex items-center justify-center text-[#e2a76f] mb-2 shadow-inner group-hover:scale-110 transition-transform">
              <Camera className="w-5 h-5" />
            </div>
            <span className="text-xs md:text-sm font-medium text-[#faf5ed]/90 tracking-wide">
              {placeholderText}
            </span>
            <span className="text-[11px] text-[#e2a76f]/70 mt-1 flex items-center gap-1">
              <Plus className="w-3 h-3" /> Select or drop image
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
