import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Calendar, ArrowUp } from 'lucide-react';
import { STORY_CONTENT } from './data/storyContent';
import { MemoryPhoto } from './types';
import {
  getAllPhotos,
  savePhoto,
  deletePhoto as deleteFromDB,
  updatePhotoCaption as updateCaptionInDB,
} from './utils/imageStorage';
import { romanticAudio } from './utils/audioPlayer';
import { AmbientEffects } from './components/AmbientEffects';
import { OpeningScreen } from './components/OpeningScreen';
import { Navbar } from './components/Navbar';
import { StoryCard } from './components/StoryCard';
import { PhotoUploader } from './components/PhotoUploader';
import { ScrapbookSection } from './components/ScrapbookSection';
import { RemindersSection } from './components/RemindersSection';
import { FutureDreamsSection } from './components/FutureDreamsSection';
import { FinalQuestionSection } from './components/FinalQuestionSection';
import { LightboxModal } from './components/LightboxModal';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [photos, setPhotos] = useState<MemoryPhoto[]>([]);
  const [lightboxPhoto, setLightboxPhoto] = useState<MemoryPhoto | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Load saved photos from IndexedDB on startup
  useEffect(() => {
    getAllPhotos().then((stored) => {
      setPhotos(stored);
    });
  }, []);

  // Track scroll percentage for progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenStory = () => {
    setHasEntered(true);
    // Start romantic background music on visitor interaction
    romanticAudio.start();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddPhotos = async (newPhotos: MemoryPhoto[]) => {
    for (const photo of newPhotos) {
      await savePhoto(photo);
    }
    const updated = await getAllPhotos();
    setPhotos(updated);
  };

  const handleDeletePhoto = async (id: string) => {
    await deleteFromDB(id);
    const updated = await getAllPhotos();
    setPhotos(updated);
  };

  const handleUpdateCaption = async (id: string, caption: string) => {
    await updateCaptionInDB(id, caption);
    const updated = await getAllPhotos();
    setPhotos(updated);
  };

  const activePhotoIndex = lightboxPhoto
    ? photos.findIndex((p) => p.id === lightboxPhoto.id)
    : -1;

  const handleLightboxNavigate = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < photos.length) {
      setLightboxPhoto(photos[newIndex]);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#120306] text-[#faf7f2] font-sans selection:bg-[#72202c] selection:text-[#fffbf5]">
      {/* Visual background atmospheric effects */}
      <AmbientEffects />

      {/* Opening Screen Gate */}
      {!hasEntered && <OpeningScreen onOpenStory={handleOpenStory} />}

      {/* Main Content (Shown after clicking 'Our Story 🤍') */}
      {hasEntered && (
        <div className="relative z-10">
          <Navbar scrollProgress={scrollProgress} />

          {/* Top Hero Heading */}
          <header id="section-our-story" className="pt-24 pb-12 px-4 sm:px-6 text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#52101b]/60 border border-[#e2a76f]/30 text-xs sm:text-sm text-[#e2a76f] mb-4 shadow-lg animate-pulse-slow">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>Dedicated completely to Gowtham 🤍</span>
            </div>

            <h1 className="font-romantic text-4xl sm:text-6xl md:text-7xl font-bold text-[#faf5ed] glow-gold tracking-wide mb-3">
              {STORY_CONTENT.greeting}
            </h1>

            <p className="font-romantic text-lg sm:text-2xl italic text-[#f3e5d8]/90 max-w-2xl mx-auto leading-relaxed font-light">
              &ldquo;{STORY_CONTENT.openingSubtitle}&rdquo;
            </p>

            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#e2a76f]/50 to-transparent mx-auto mt-8" />
          </header>

          {/* Main Story Flow */}
          <main className="max-w-3xl mx-auto px-4 sm:px-6 pb-24">
            
            {/* Section 2: How We Started */}
            <StoryCard
              id="section-how-we-started"
              dateBadge="21 September 2024"
              sectionNumber="Section 2"
              title="How We Started"
              content={STORY_CONTENT.howWeStarted}
            />

            {/* Section 3: The Beginning of Love */}
            <div className="flex justify-center my-6">
              <div className="flex items-center gap-2 text-[#e2a76f]/40">
                <span className="w-8 h-px bg-current" />
                <Heart className="w-4 h-4 fill-[#e2a76f]/20 text-[#e2a76f]" />
                <span className="w-8 h-px bg-current" />
              </div>
            </div>

            <StoryCard
              id="section-beginning-of-love"
              sectionNumber="Section 3"
              title="The Beginning of Love"
              content={STORY_CONTENT.beginningOfLove}
            />

            {/* Section 4: Everything You Became to Me */}
            <StoryCard
              id="section-everything-you-became"
              sectionNumber="Section 4"
              title="Everything You Became to Me"
              largeHighlight="MY WORLD 🌎"
              content={STORY_CONTENT.everythingYouBecame}
            />

            {/* Section 5: Our Love Anniversary */}
            <StoryCard
              id="section-anniversary"
              sectionNumber="Section 5"
              dateBadge="May 7 🤍"
              title="Our Love Anniversary"
              content={STORY_CONTENT.anniversary}
            />

            {/* Section 6: Our First Unexpected Meet */}
            <StoryCard
              id="section-first-meet"
              dateBadge="15/06/2026 — Monday"
              title="Our First Unexpected Meet 🫠🫀"
              content={STORY_CONTENT.firstMeet}
            >
              <div className="mt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#e2a76f] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> First Meet Memories
                  </span>
                  <span className="text-[11px] text-stone-400">
                    Park • Auto • Hand-Holding • First Kiss
                  </span>
                </div>

                <PhotoUploader
                  category="first-meet"
                  photos={photos}
                  onAddPhotos={handleAddPhotos}
                  onDeletePhoto={handleDeletePhoto}
                  onOpenPhoto={(photo) => setLightboxPhoto(photo)}
                  placeholderText="Add First Meeting Photo 📷"
                />
              </div>
            </StoryCard>

            {/* Section 7: Our Second Meet */}
            <StoryCard
              id="section-second-meet"
              dateBadge="18/06/2026 — Thursday"
              title="Our Second Meet 🤍"
              content={STORY_CONTENT.secondMeet}
            >
              <div className="mt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#e2a76f] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Second Meet Gallery
                  </span>
                  <span className="text-[11px] text-stone-400">
                    Bus Stop Snap • Mall • Park • Route
                  </span>
                </div>

                <PhotoUploader
                  category="second-meet"
                  photos={photos}
                  onAddPhotos={handleAddPhotos}
                  onDeletePhoto={handleDeletePhoto}
                  onOpenPhoto={(photo) => setLightboxPhoto(photo)}
                  placeholderText="Add Second Meet Photo 📷"
                />
              </div>
            </StoryCard>

            {/* Section 8: Our Little Memories (Scrapbook) */}
            <div id="section-memories">
              <ScrapbookSection
                photos={photos}
                onAddPhotos={handleAddPhotos}
                onDeletePhoto={handleDeletePhoto}
                onOpenPhoto={(photo) => setLightboxPhoto(photo)}
              />
            </div>

            {/* Section 9: The Difficult Days */}
            <StoryCard
              id="section-difficult-days"
              sectionNumber="Section 9"
              variant="dark"
              title="The Difficult Days"
              content={STORY_CONTENT.difficultDays}
            />

            {/* Section 10: Things That Remind Me of You */}
            <RemindersSection
              photos={photos}
              onAddPhotos={handleAddPhotos}
              onDeletePhoto={handleDeletePhoto}
              onOpenPhoto={(photo) => setLightboxPhoto(photo)}
            />

            {/* Section 11: Our Future */}
            <FutureDreamsSection />

            {/* Section 12: Final Question */}
            <FinalQuestionSection />
          </main>

          {/* Floating Scroll-to-Top Button */}
          {showScrollTop && (
            <button
              id="scroll-to-top-btn"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-6 right-6 z-30 p-3 rounded-full bg-[#52101b]/90 hover:bg-[#72202c] text-[#faf5ed] border border-[#e2a76f]/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4 text-[#e2a76f]" />
            </button>
          )}

          {/* Full Screen Lightbox & Slideshow Modal */}
          {lightboxPhoto && activePhotoIndex !== -1 && (
            <LightboxModal
              photos={photos}
              currentIndex={activePhotoIndex}
              isOpen={!!lightboxPhoto}
              onClose={() => setLightboxPhoto(null)}
              onDelete={handleDeletePhoto}
              onUpdateCaption={handleUpdateCaption}
              onNavigate={handleLightboxNavigate}
            />
          )}
        </div>
      )}
    </div>
  );
}
