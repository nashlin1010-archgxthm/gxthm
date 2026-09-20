import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, Trash2, Edit3, Check, Calendar, Heart } from 'lucide-react';
import { MemoryPhoto } from '../types';

interface LightboxModalProps {
  photos: MemoryPhoto[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
  onUpdateCaption: (id: string, newCaption: string) => void;
  onNavigate: (newIndex: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onDelete,
  onUpdateCaption,
  onNavigate,
}) => {
  const [isEditingCaption, setIsEditingCaption] = useState(false);
  const [captionDraft, setCaptionDraft] = useState('');
  const [isSlideshowPlaying, setIsSlideshowPlaying] = useState(false);

  const currentPhoto = photos[currentIndex];

  useEffect(() => {
    if (currentPhoto) {
      setCaptionDraft(currentPhoto.caption || '');
      setIsEditingCaption(false);
    }
  }, [currentIndex, currentPhoto]);

  // Slideshow timer
  useEffect(() => {
    if (!isSlideshowPlaying || !isOpen || photos.length <= 1) return;

    const timer = setInterval(() => {
      onNavigate((currentIndex + 1) % photos.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isSlideshowPlaying, isOpen, currentIndex, photos.length, onNavigate]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + photos.length) % photos.length);
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % photos.length);
    },
    [isOpen, currentIndex, photos.length, onClose, onNavigate]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen || !currentPhoto) return null;

  const saveCaption = () => {
    onUpdateCaption(currentPhoto.id, captionDraft);
    setIsEditingCaption(false);
  };

  const formattedDate = new Date(currentPhoto.timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      id="lightbox-modal"
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between items-center p-4 select-none"
    >
      {/* Top action bar */}
      <div className="w-full max-w-5xl flex items-center justify-between z-10 py-2 text-white/80">
        <div className="flex items-center gap-2 text-sm">
          <Heart className="w-4 h-4 text-[#e2a76f] fill-[#e2a76f]/40" />
          <span className="text-[#faf5ed]/90 font-medium">
            Memory {currentIndex + 1} of {photos.length}
          </span>
          {currentPhoto.label && (
            <span className="px-2.5 py-0.5 rounded-full text-xs bg-[#52101b]/80 text-[#e2a76f] border border-[#e2a76f]/20">
              {currentPhoto.label}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {photos.length > 1 && (
            <button
              id="slideshow-toggle-btn"
              onClick={() => setIsSlideshowPlaying(!isSlideshowPlaying)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                isSlideshowPlaying
                  ? 'bg-[#72202c] border-[#e2a76f] text-[#faf5ed]'
                  : 'bg-[#2a080f]/80 border-white/20 text-white/80 hover:text-white'
              }`}
            >
              {isSlideshowPlaying ? 'Pause Slideshow ⏸' : 'Play Slideshow ▶'}
            </button>
          )}

          <button
            id="delete-memory-btn"
            onClick={() => {
              if (window.confirm('Are you sure you want to remove this memory photo?')) {
                onDelete(currentPhoto.id);
                if (photos.length <= 1) {
                  onClose();
                } else {
                  onNavigate(Math.max(0, currentIndex - 1));
                }
              }
            }}
            className="p-2 rounded-full bg-white/10 hover:bg-red-900/60 text-white/80 hover:text-red-300 transition-colors"
            title="Delete this photo"
          >
            <Trash2 className="w-5 h-5" />
          </button>

          <button
            id="close-lightbox-btn"
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Close viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image container with Prev / Next buttons */}
      <div className="relative flex-1 w-full max-w-5xl flex items-center justify-center my-auto overflow-hidden">
        {photos.length > 1 && (
          <button
            id="lightbox-prev-btn"
            onClick={() => onNavigate((currentIndex - 1 + photos.length) % photos.length)}
            className="absolute left-2 md:left-4 z-20 p-3 rounded-full bg-black/50 hover:bg-[#52101b] text-white/90 border border-white/20 transition-all hover:scale-105 active:scale-95"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <img
          id="lightbox-active-img"
          src={currentPhoto.imageUrl}
          alt={currentPhoto.caption || 'Our relationship memory'}
          className="max-h-[72vh] max-w-full object-contain rounded-lg shadow-2xl transition-all duration-300 select-none border border-white/10"
        />

        {photos.length > 1 && (
          <button
            id="lightbox-next-btn"
            onClick={() => onNavigate((currentIndex + 1) % photos.length)}
            className="absolute right-2 md:right-4 z-20 p-3 rounded-full bg-black/50 hover:bg-[#52101b] text-white/90 border border-white/20 transition-all hover:scale-105 active:scale-95"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom caption and info */}
      <div className="w-full max-w-2xl text-center pb-3">
        {isEditingCaption ? (
          <div className="flex items-center gap-2 justify-center">
            <input
              id="edit-caption-input"
              type="text"
              value={captionDraft}
              onChange={(e) => setCaptionDraft(e.target.value)}
              placeholder="Write a caption for this memory..."
              className="bg-black/60 border border-[#e2a76f]/50 text-white rounded-lg px-3 py-1.5 text-sm w-full max-w-md focus:outline-none focus:ring-2 focus:ring-[#e2a76f]"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') saveCaption();
              }}
            />
            <button
              id="save-caption-btn"
              onClick={saveCaption}
              className="p-2 rounded-lg bg-[#52101b] text-[#faf5ed] hover:bg-[#72202c]"
            >
              <Check className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="inline-flex items-center justify-center gap-2 group cursor-pointer" onClick={() => setIsEditingCaption(true)}>
            <p className="text-sm md:text-base text-[#faf5ed] font-light italic">
              {currentPhoto.caption ? `"${currentPhoto.caption}"` : 'Click to add a caption for this photo'}
            </p>
            <Edit3 className="w-3.5 h-3.5 text-[#e2a76f]/60 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}

        <div className="flex items-center justify-center gap-1.5 mt-2 text-xs text-stone-400">
          <Calendar className="w-3.5 h-3.5 text-[#e2a76f]/60" />
          <span>Added on {formattedDate}</span>
        </div>
      </div>
    </div>
  );
};
