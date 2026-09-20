import React from 'react';
import {
  Car,
  Bus,
  Utensils,
  Baby,
  Briefcase,
  Camera,
  Music,
  Sparkles,
  Heart,
} from 'lucide-react';
import { REMINDERS_DATA } from '../data/storyContent';
import { PhotoUploader } from './PhotoUploader';
import { MemoryPhoto } from '../types';

interface RemindersSectionProps {
  photos: MemoryPhoto[];
  onAddPhotos: (newPhotos: MemoryPhoto[]) => void;
  onDeletePhoto: (id: string) => void;
  onOpenPhoto: (photo: MemoryPhoto) => void;
}

export const RemindersSection: React.FC<RemindersSectionProps> = ({
  photos,
  onAddPhotos,
  onDeletePhoto,
  onOpenPhoto,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Car':
        return <Car className="w-5 h-5 text-[#e2a76f]" />;
      case 'Bus':
        return <Bus className="w-5 h-5 text-[#e2a76f]" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5 text-[#e2a76f]" />;
      case 'Smile':
        return <Baby className="w-5 h-5 text-[#e2a76f]" />;
      case 'Backpack':
        return <Briefcase className="w-5 h-5 text-[#e2a76f]" />;
      case 'Camera':
        return <Camera className="w-5 h-5 text-[#e2a76f]" />;
      case 'Music':
        return <Music className="w-5 h-5 text-[#e2a76f]" />;
      case 'Sparkles':
      default:
        return <Sparkles className="w-5 h-5 text-[#e2a76f]" />;
    }
  };

  return (
    <div id="section-reminders" className="my-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#52101b]/50 border border-[#e2a76f]/30 text-xs text-[#e2a76f] mb-3">
          <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
          <span>Every Little Thing In My Day</span>
        </div>
        <h3 className="font-romantic text-2xl sm:text-4xl font-bold text-[#faf5ed] glow-gold">
          Things That Remind Me of You
        </h3>
        <p className="text-sm text-stone-300 mt-2 max-w-xl mx-auto italic font-light">
          &ldquo;ella edathulaum nee nee nee nu matum than Gowtham iruke...&rdquo;
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {REMINDERS_DATA.map((item) => (
          <div
            key={item.id}
            id={`reminder-${item.id}`}
            className="rounded-xl p-5 glass-wine border border-[#e2a76f]/20 hover:border-[#e2a76f]/50 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#52101b] border border-[#e2a76f]/40 flex items-center justify-center shrink-0 shadow-md">
                  {getIcon(item.iconName)}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#faf5ed] tracking-wide">
                    {item.defaultLabel}
                  </h4>
                  <span className="text-[11px] text-[#e2a76f]/80 italic">
                    {item.subtitle}
                  </span>
                </div>
              </div>

              {/* Exact Snippet quote from her letter */}
              <div className="p-3 rounded-lg bg-[#140306]/70 border border-white/5 mb-4">
                <p className="text-sm text-[#faf5ed] font-serif-romantic italic leading-relaxed">
                  &ldquo;{item.exactSnippet}&rdquo;
                </p>
              </div>
            </div>

            {/* Custom Photo Uploader for this specific reminder */}
            <div>
              <PhotoUploader
                category="reminder"
                reminderKey={item.id}
                label={item.defaultLabel}
                photos={photos}
                onAddPhotos={onAddPhotos}
                onDeletePhoto={onDeletePhoto}
                onOpenPhoto={onOpenPhoto}
                placeholderText={`Add ${item.defaultLabel} Photo 📷`}
                compact={true}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
