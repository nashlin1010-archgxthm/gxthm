import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Upload, Heart } from 'lucide-react';
import { romanticAudio } from '../utils/audioPlayer';

interface NavbarProps {
  scrollProgress: number;
}

export const Navbar: React.FC<NavbarProps> = ({ scrollProgress }) => {
  const [audioState, setAudioState] = useState(romanticAudio.getStatus());
  const [showMusicSettings, setShowMusicSettings] = useState(false);
  const audioInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubscribe = romanticAudio.subscribe(() => {
      setAudioState(romanticAudio.getStatus());
    });
    return unsubscribe;
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      romanticAudio.setCustomAudio(file);
      setShowMusicSettings(false);
    }
  };

  return (
    <>
      {/* Top Navbar */}
      <nav
        id="main-navigation"
        className="fixed top-0 left-0 right-0 z-30 bg-[#140306]/85 backdrop-blur-md border-b border-[#e2a76f]/15 px-3 sm:px-6 py-2.5 transition-all"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Progress Indicator */}
          <div className="flex items-center gap-2">
            <span className="font-romantic text-base sm:text-lg font-semibold text-[#faf5ed] tracking-wide flex items-center gap-1.5">
              <span>Our Story</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            </span>
            <span className="text-[11px] text-[#e2a76f]/80 font-mono hidden xs:inline">
              {Math.round(scrollProgress)}%
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 text-xs tracking-wider uppercase font-medium text-[#e8ded1]/80">
            <button
              onClick={() => scrollTo('section-our-story')}
              className="hover:text-[#e2a76f] transition-colors cursor-pointer"
            >
              Our Story
            </button>
            <button
              onClick={() => scrollTo('section-memories')}
              className="hover:text-[#e2a76f] transition-colors cursor-pointer"
            >
              Memories
            </button>
            <button
              onClick={() => scrollTo('section-our-moments')}
              className="hover:text-[#e2a76f] transition-colors cursor-pointer"
            >
              Our Moments
            </button>
            <button
              onClick={() => scrollTo('section-future')}
              className="hover:text-[#e2a76f] transition-colors cursor-pointer"
            >
              Future
            </button>
            <button
              onClick={() => scrollTo('section-final-question')}
              className="text-[#e2a76f] hover:text-rose-300 font-semibold transition-colors cursor-pointer"
            >
              Final Question
            </button>
          </div>

          {/* Compact Nav Controls on Mobile / Desktop */}
          <div className="flex items-center gap-2">
            <button
              id="nav-play-pause-btn"
              onClick={() => romanticAudio.togglePlay()}
              className="p-1.5 rounded-full bg-[#3d0b16] text-[#faf5ed] hover:bg-[#52101b] border border-[#e2a76f]/30 transition-all text-xs flex items-center gap-1.5 px-2.5 cursor-pointer"
              title={audioState.isPlaying ? 'Pause music' : 'Play romantic music'}
            >
              {audioState.isPlaying ? (
                <Pause className="w-3.5 h-3.5 text-[#e2a76f]" />
              ) : (
                <Play className="w-3.5 h-3.5 text-[#e2a76f]" />
              )}
              <span className="hidden sm:inline text-[11px]">
                {audioState.isPlaying ? 'Music' : 'Play Music'}
              </span>
            </button>

            <button
              id="nav-mute-btn"
              onClick={() => romanticAudio.toggleMute()}
              className="p-1.5 rounded-full bg-[#2a080f] text-[#faf5ed]/80 hover:text-[#faf5ed] border border-[#e2a76f]/20 transition-all cursor-pointer"
              title={audioState.isMuted ? 'Unmute' : 'Mute'}
            >
              {audioState.isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-rose-400" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-[#e2a76f]" />
              )}
            </button>

            <button
              id="nav-custom-music-btn"
              onClick={() => setShowMusicSettings(!showMusicSettings)}
              className="p-1.5 rounded-full bg-[#2a080f] text-[#faf5ed]/80 hover:text-[#e2a76f] border border-[#e2a76f]/20 transition-all cursor-pointer"
              title="Replace or upload custom song"
            >
              <Music className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Scroll Progress Bar at the bottom edge */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#72202c] via-[#e2a76f] to-rose-400 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </nav>

      {/* Floating Music Panel Dropdown */}
      {showMusicSettings && (
        <div
          id="music-settings-popup"
          className="fixed top-14 right-4 z-40 w-72 rounded-xl p-4 glass-wine border border-[#e2a76f]/30 shadow-2xl text-xs text-[#faf5ed]"
        >
          <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
            <span className="font-semibold text-sm text-[#e2a76f] flex items-center gap-1.5">
              <Music className="w-4 h-4" /> Romantic Music
            </span>
            <button
              onClick={() => setShowMusicSettings(false)}
              className="text-stone-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <p className="text-stone-300 text-[11px] mb-3 leading-relaxed">
            {audioState.hasCustomTrack
              ? 'Currently playing your uploaded track.'
              : 'Playing romantic piano & ambient melody. You can also replace it with your own song for Gowtham.'}
          </p>

          <input
            ref={audioInputRef}
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={handleAudioUpload}
          />

          <div className="flex flex-col gap-2">
            <button
              onClick={() => audioInputRef.current?.click()}
              className="w-full py-2 px-3 rounded-lg bg-[#52101b] hover:bg-[#72202c] text-[#faf5ed] border border-[#e2a76f]/30 flex items-center justify-center gap-2 font-medium transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-[#e2a76f]" />
              <span>Upload Custom Song (MP3)</span>
            </button>

            {audioState.hasCustomTrack && (
              <button
                onClick={() => romanticAudio.removeCustomAudio()}
                className="w-full py-1.5 px-3 rounded-lg bg-black/40 hover:bg-black/70 text-rose-300 border border-rose-900/40 text-[11px] transition-colors cursor-pointer"
              >
                Reset to Romantic Piano Ambient
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
