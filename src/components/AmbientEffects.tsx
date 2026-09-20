import React, { useMemo } from 'react';

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export const AmbientEffects: React.FC = () => {
  // Generate stable particles
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 14 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.4 + 0.15,
    }));
  }, []);

  const floatingHearts = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: Math.random() * 92 + 4,
      size: Math.random() * 16 + 12,
      duration: Math.random() * 18 + 14,
      delay: Math.random() * 10,
      rotate: Math.random() * 40 - 20,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep radial background lighting */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#52101b]/20 blur-[130px]" />
      <div className="absolute top-[35%] right-0 w-[500px] h-[500px] rounded-full bg-[#72202c]/15 blur-[120px]" />
      <div className="absolute bottom-10 left-0 w-[600px] h-[600px] rounded-full bg-[#3d0812]/30 blur-[140px]" />

      {/* Floating stars/glowing dust */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-[#e2a76f] animate-pulse"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            boxShadow: '0 0 8px rgba(226, 167, 111, 0.6)',
          }}
        />
      ))}

      {/* Floating subtle rose hearts */}
      {floatingHearts.map((h) => (
        <div
          key={h.id}
          className="absolute opacity-20 text-[#e5989b]"
          style={{
            left: `${h.left}%`,
            bottom: '-40px',
            fontSize: `${h.size}px`,
            animation: `floatUp ${h.duration}s linear infinite`,
            animationDelay: `${h.delay}s`,
            transform: `rotate(${h.rotate}deg)`,
          }}
        >
          🤍
        </div>
      ))}

      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(0.8) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 0.25;
          }
          85% {
            opacity: 0.25;
          }
          100% {
            transform: translateY(-110vh) scale(1.1) rotate(20deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
