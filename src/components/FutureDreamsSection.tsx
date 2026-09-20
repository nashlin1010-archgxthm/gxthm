import React from 'react';
import { Home, Utensils, Music2, Moon, Compass, HeartHandshake, Sparkles, Heart } from 'lucide-react';

export const FutureDreamsSection: React.FC = () => {
  const futureDreams = [
    {
      title: "Our Home & Staying Together",
      snippet: "nama thaniya stay pananum tym spend pananum",
      symbol: <Home className="w-6 h-6 text-[#e2a76f]" />,
      detail: "Living together in our cozy space with endless comfort and peace."
    },
    {
      title: "Cooking Together",
      snippet: "cook pananum, senthu sadhiya saptutu",
      symbol: <Utensils className="w-6 h-6 text-[#e2a76f]" />,
      detail: "Cooking favorite meals, feeding each other, and laughing over kitchen messes."
    },
    {
      title: "Dancing Together",
      snippet: "dance pananum... chenda melam ku senthy dance aadutu",
      symbol: <Music2 className="w-6 h-6 text-[#e2a76f]" />,
      detail: "Letting go of everything, dancing to traditional beats and slow melodies."
    },
    {
      title: "Peaceful Nights & Pillow Fights",
      snippet: "pillow fight vaikanum... tight ah hug pani thoonganum",
      symbol: <Moon className="w-6 h-6 text-[#e2a76f]" />,
      detail: "Silly playful pillow fights and sleeping safely held tight in your arms."
    },
    {
      title: "End of Long Distance",
      snippet: "Long distance temporary than da purinjiko wrk ku anga vanthirve promise ah permenent ahh un kooda than iruka pore",
      symbol: <Compass className="w-6 h-6 text-[#e2a76f]" />,
      detail: "Counting down the days until distance is completely erased forever."
    },
    {
      title: "7 Lifetimes Promise",
      snippet: "Vare vare 7 jenmathukum en usura thareni sona...🤍",
      symbol: <HeartHandshake className="w-6 h-6 text-[#e2a76f]" />,
      detail: "The unbreakable promise to face whatever comes in life together."
    }
  ];

  return (
    <section id="section-future" className="my-16">
      <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#26070e] via-[#3d0b16] to-[#1a0408] border border-[#e2a76f]/30 shadow-2xl relative overflow-hidden">
        {/* Soft decorative background glows */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#72202c]/20 blur-[90px] pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-[#e2a76f]/10 blur-[90px] pointer-events-none" />

        <div className="text-center mb-10 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#52101b]/70 border border-[#e2a76f]/40 text-xs text-[#e2a76f] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Section 11 — The Dreams We Shared</span>
          </div>
          <h2 className="font-romantic text-3xl sm:text-5xl font-bold text-[#faf5ed] glow-gold tracking-wide">
            Our Future Together
          </h2>
          <p className="font-romantic text-base sm:text-lg text-[#f3e5d8] mt-2 italic max-w-xl mx-auto">
            The plans, the promises, and the life we pictured side by side.
          </p>
        </div>

        {/* Symbolic Dreams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
          {futureDreams.map((dream, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#180307]/75 border border-[#e2a76f]/20 hover:border-[#e2a76f]/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#52101b]/70 border border-[#e2a76f]/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {dream.symbol}
                </div>
                <h3 className="text-base font-semibold text-[#faf5ed] mb-2 tracking-wide flex items-center gap-1.5">
                  <span>{dream.title}</span>
                  <Heart className="w-3 h-3 text-rose-400 fill-rose-400/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-xs text-stone-300 font-light leading-relaxed mb-4">
                  {dream.detail}
                </p>
              </div>

              {/* Exact quote from story */}
              <div className="p-3 rounded-lg bg-[#2a060e]/90 border border-white/5">
                <p className="text-xs text-[#e2a76f] font-serif-romantic italic leading-relaxed">
                  &ldquo;{dream.snippet}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
