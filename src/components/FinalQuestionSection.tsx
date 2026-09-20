import React, { useState } from 'react';
import { Heart, MessageCircleHeart } from 'lucide-react';
import { STORY_CONTENT } from '../data/storyContent';

export const FinalQuestionSection: React.FC = () => {
  const [selectedResponse, setSelectedResponse] = useState<'yes' | 'talk' | null>(null);

  return (
    <section
      id="section-final-question"
      className="my-20 py-16 px-4 sm:px-8 rounded-3xl bg-gradient-to-b from-[#1a0307] via-[#240409] to-[#0f0204] border border-[#e2a76f]/30 shadow-[0_0_50px_rgba(0,0,0,0.8)] text-center relative overflow-hidden"
    >
      {/* Soft central glowing halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#72202c]/20 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-[#e2a76f]/50" />
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-[#e2a76f]/50" />
        </div>

        {/* The Exact Final Question */}
        <h2
          id="final-question-text"
          className="font-romantic text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#faf5ed] glow-gold tracking-wide leading-tight mb-8"
        >
          {STORY_CONTENT.finalQuestion}
        </h2>

        <p className="text-sm sm:text-base text-[#e8ded1]/80 font-light max-w-md mx-auto mb-10 leading-relaxed italic">
          Everything I had in my heart is written here. Whatever your heart decides, you will always be special to me.
        </p>

        {/* The Two Interactive Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <button
            id="response-yes-btn"
            onClick={() => setSelectedResponse('yes')}
            className={`w-full sm:w-auto px-8 py-4 rounded-full font-romantic text-xl font-bold tracking-wider transition-all duration-300 border flex items-center justify-center gap-2 cursor-pointer ${
              selectedResponse === 'yes'
                ? 'bg-[#72202c] border-[#e2a76f] text-white shadow-[0_0_30px_rgba(226,167,111,0.6)] scale-105'
                : 'bg-[#3d0812]/90 border-[#e2a76f]/40 text-[#faf5ed] hover:bg-[#52101b] hover:border-[#e2a76f] hover:shadow-[0_0_20px_rgba(114,32,44,0.5)]'
            }`}
          >
            <span>YES 🤍</span>
          </button>

          <button
            id="response-talk-btn"
            onClick={() => setSelectedResponse('talk')}
            className={`w-full sm:w-auto px-8 py-4 rounded-full font-romantic text-xl font-bold tracking-wider transition-all duration-300 border flex items-center justify-center gap-2 cursor-pointer ${
              selectedResponse === 'talk'
                ? 'bg-[#52101b] border-[#e2a76f] text-white shadow-[0_0_30px_rgba(226,167,111,0.6)] scale-105'
                : 'bg-[#220409]/90 border-white/20 text-[#faf5ed]/90 hover:bg-[#380710] hover:border-white/40'
            }`}
          >
            <span>LET&apos;S TALK 🥺</span>
          </button>
        </div>

        {/* Emotional Gentle Message Reveals (Non-pressuring) */}
        {selectedResponse === 'yes' && (
          <div
            id="reveal-yes-message"
            className="p-6 sm:p-8 rounded-2xl bg-[#52101b]/50 border border-[#e2a76f]/40 backdrop-blur-md shadow-2xl animate-fade-in"
          >
            <div className="w-12 h-12 rounded-full bg-[#72202c] mx-auto flex items-center justify-center mb-3 text-rose-200">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <p className="font-romantic text-xl sm:text-2xl text-[#faf5ed] italic leading-relaxed">
              &ldquo;{STORY_CONTENT.yesResponse}&rdquo;
            </p>
          </div>
        )}

        {selectedResponse === 'talk' && (
          <div
            id="reveal-talk-message"
            className="p-6 sm:p-8 rounded-2xl bg-[#3d0812]/50 border border-white/30 backdrop-blur-md shadow-2xl animate-fade-in"
          >
            <div className="w-12 h-12 rounded-full bg-[#52101b] mx-auto flex items-center justify-center mb-3 text-[#e2a76f]">
              <MessageCircleHeart className="w-6 h-6" />
            </div>
            <p className="font-romantic text-xl sm:text-2xl text-[#faf5ed] italic leading-relaxed">
              &ldquo;{STORY_CONTENT.talkResponse}&rdquo;
            </p>
          </div>
        )}

        {/* Closing note */}
        <div className="mt-14 pt-8 border-t border-white/10 text-xs text-[#e2a76f]/60 font-mono tracking-widest">
          ALWAYS & FOREVER • FOR GOWTHAM
        </div>
      </div>
    </section>
  );
};
