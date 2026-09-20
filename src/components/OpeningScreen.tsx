import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { STORY_CONTENT } from '../data/storyContent';

interface OpeningScreenProps {
  onOpenStory: () => void;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({ onOpenStory }) => {
  return (
    <div
      id="opening-screen"
      className="fixed inset-0 z-40 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#180307] via-[#2a060e] to-[#120205] overflow-hidden text-center"
    >
      {/* Soft romantic ambient background orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 md:w-[500px] h-80 md:h-[500px] bg-[#72202c]/25 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-12 right-1/4 w-64 h-64 bg-[#e2a76f]/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Decorative top motif */}
      <div className="flex items-center gap-3 mb-6 text-[#e2a76f]/70">
        <span className="w-10 h-px bg-gradient-to-r from-transparent to-[#e2a76f]/60" />
        <Heart className="w-4 h-4 fill-[#e2a76f]/30 text-[#e2a76f] animate-pulse" />
        <span className="w-10 h-px bg-gradient-to-l from-transparent to-[#e2a76f]/60" />
      </div>

      {/* Main greeting */}
      <h1
        id="opening-greeting"
        className="font-romantic text-4xl sm:text-6xl md:text-7xl font-bold tracking-wider text-[#faf5ed] glow-gold mb-5"
      >
        {STORY_CONTENT.greeting}
      </h1>

      {/* Subtitle with exact wording */}
      <div className="max-w-xl mx-auto px-4 mb-10">
        <p
          id="opening-subtitle"
          className="font-romantic text-lg sm:text-2xl md:text-2xl italic text-[#f3e5d8]/90 leading-relaxed font-light"
        >
          &ldquo;{STORY_CONTENT.openingSubtitle}&rdquo;
        </p>
      </div>

      {/* Action button */}
      <button
        id="open-story-button"
        onClick={onOpenStory}
        className="group relative px-8 py-3.5 rounded-full bg-gradient-to-r from-[#52101b] via-[#72202c] to-[#52101b] text-[#faf5ed] font-medium text-base sm:text-lg tracking-wide border border-[#e2a76f]/40 shadow-[0_0_25px_rgba(114,32,44,0.6)] hover:shadow-[0_0_35px_rgba(226,167,111,0.5)] hover:border-[#e2a76f] active:scale-98 transition-all duration-300 flex items-center gap-2 cursor-pointer"
      >
        <span>{STORY_CONTENT.openingButton}</span>
        <Sparkles className="w-4 h-4 text-[#e2a76f] group-hover:rotate-12 transition-transform" />
      </button>

      {/* Subtle bottom note */}
      <p className="absolute bottom-8 text-xs text-[#e2a76f]/50 tracking-widest uppercase font-mono">
        A private letter for Gowtham 🤍
      </p>
    </div>
  );
};
