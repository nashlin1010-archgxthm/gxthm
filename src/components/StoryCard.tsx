import React from 'react';
import { Heart } from 'lucide-react';

interface StoryCardProps {
  id?: string;
  sectionNumber?: string;
  title?: string;
  dateBadge?: string;
  content: string;
  largeHighlight?: string;
  children?: React.ReactNode;
  variant?: 'wine' | 'dark' | 'cream';
}

export const StoryCard: React.FC<StoryCardProps> = ({
  id,
  sectionNumber,
  title,
  dateBadge,
  content,
  largeHighlight,
  children,
  variant = 'wine',
}) => {
  const getCardStyle = () => {
    switch (variant) {
      case 'dark':
        return 'glass-wine-dark border-[#e2a76f]/20 bg-[#170307]/90';
      case 'cream':
        return 'bg-[#22070e]/85 border-[#e2a76f]/30';
      case 'wine':
      default:
        return 'glass-wine';
    }
  };

  return (
    <article
      id={id}
      className={`relative w-full rounded-2xl p-6 sm:p-8 md:p-10 mb-12 transition-all duration-500 shadow-2xl ${getCardStyle()}`}
    >
      {/* Decorative top corner accent */}
      <div className="absolute top-0 right-8 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3d0812] border border-[#e2a76f]/30 text-[#e2a76f] text-xs font-mono shadow-md">
        <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
        {dateBadge ? <span>{dateBadge}</span> : sectionNumber && <span>{sectionNumber}</span>}
      </div>

      {/* Title */}
      {title && (
        <h2 className="font-romantic text-2xl sm:text-3xl md:text-4xl font-bold text-[#faf5ed] mb-4 glow-gold tracking-wide">
          {title}
        </h2>
      )}

      {/* Optional large glowing highlight (e.g. "MY WORLD 🌎") */}
      {largeHighlight && (
        <div className="my-6 py-4 px-6 rounded-xl bg-gradient-to-r from-[#52101b]/50 via-[#72202c]/40 to-[#52101b]/50 border border-[#e2a76f]/30 text-center">
          <span className="font-romantic text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#faf5ed] glow-rose tracking-wider inline-block animate-pulse-slow">
            {largeHighlight}
          </span>
        </div>
      )}

      {/* Main Exact Story Text: Rendered with high readability, preserved exactly */}
      <div className="text-[#f7f1e8] text-base sm:text-lg leading-relaxed sm:leading-loose font-normal tracking-wide whitespace-pre-line select-text">
        {content}
      </div>

      {/* Embedded components like photo galleries or memories */}
      {children && <div className="mt-8 pt-6 border-t border-[#e2a76f]/15">{children}</div>}
    </article>
  );
};
