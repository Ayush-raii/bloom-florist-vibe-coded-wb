import React, { useState } from 'react';
import { Sparkles, Heart, Gift, Crown, ArrowRight } from 'lucide-react';

export default function ThreeRosesSection({ onSelectOccasion, activeOccasion }) {
  const [hoveredRose, setHoveredRose] = useState(null);
  const [animatingRose, setAnimatingRose] = useState(null);

  const roses = [
    {
      id: 'birthday',
      title: 'BIRTHDAY',
      subtitle: 'Make their day unforgettable.',
      tagline: 'Surprise & Jubilation',
      accent: '#C6A56B',
      accentGlow: 'rgba(198, 165, 107, 0.45)',
      cardBg: 'linear-gradient(180deg, rgba(74, 7, 21, 0.4) 0%, rgba(17, 16, 20, 0.95) 100%)',
      image: '/occasions/birthday.jpg',
      icon: Gift,
      lightingClass: 'rose-warm-glow'
    },
    {
      id: 'anniversary',
      title: 'ANNIVERSARY',
      subtitle: 'Celebrate a love that grows.',
      tagline: 'Passion & Devotion',
      accent: '#B51F3B',
      accentGlow: 'rgba(181, 31, 59, 0.55)',
      cardBg: 'linear-gradient(180deg, rgba(181, 31, 59, 0.35) 0%, rgba(17, 16, 20, 0.95) 100%)',
      image: '/occasions/anniversary.jpg',
      icon: Heart,
      lightingClass: 'rose-crimson-glow'
    },
    {
      id: 'wedding',
      title: 'WEDDING',
      subtitle: 'For the beginning of forever.',
      tagline: 'Bridal & Heirloom',
      accent: '#E6D7C3',
      accentGlow: 'rgba(230, 215, 195, 0.45)',
      cardBg: 'linear-gradient(180deg, rgba(198, 165, 107, 0.25) 0%, rgba(17, 16, 20, 0.95) 100%)',
      image: '/occasions/wedding.jpg',
      icon: Crown,
      lightingClass: 'rose-champagne-glow'
    }
  ];

  const handleRoseClick = (roseId) => {
    setAnimatingRose(roseId);
    // Smooth cinematic zoom transition
    setTimeout(() => {
      onSelectOccasion(roseId);
      setAnimatingRose(null);
    }, 600);
  };

  return (
    <section 
      id="occasions-section"
      className="relative min-h-screen w-full bg-[#080809] flex flex-col justify-center items-center py-20 px-4 md:px-8 overflow-hidden"
    >
      {/* Background Ambient Aura */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div 
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full blur-[140px] transition-colors duration-700"
          style={{
            background: hoveredRose === 'birthday' ? '#C6A56B' : 
                        hoveredRose === 'anniversary' ? '#B51F3B' : 
                        hoveredRose === 'wedding' ? '#E6D7C3' : '#4A0715'
          }}
        />
        <div 
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full blur-[140px] transition-colors duration-700"
          style={{
            background: hoveredRose === 'anniversary' ? '#B51F3B' : '#111014'
          }}
        />
      </div>

      {/* Section Header */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-12 md:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(198,165,107,0.25)] bg-[rgba(17,16,20,0.6)] backdrop-blur-md mb-4">
          <Sparkles size={13} className="text-[#C6A56B]" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C6A56B] font-medium">
            CHOOSE YOUR OCCASION
          </span>
        </div>

        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#F5F0E8] font-normal tracking-tight mb-3">
          Three Petals, Three Stories
        </h2>
        
        <p className="font-sans text-sm md:text-base text-[#AAA4A0] max-w-lg mx-auto font-light">
          Select a rose below to unlock its hand-curated floral atelier collection.
        </p>
      </div>

      {/* Three Roses Interactive Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center">
        {roses.map((rose) => {
          const isHovered = hoveredRose === rose.id;
          const isSelected = animatingRose === rose.id;
          const isOtherFading = animatingRose && !isSelected;
          const Icon = rose.icon;

          return (
            <div
              key={rose.id}
              className={`relative flex flex-col items-center transition-all duration-700 ease-out ${
                isOtherFading ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100'
              } ${isSelected ? 'scale-110 z-30' : 'z-10'}`}
              onMouseEnter={() => setHoveredRose(rose.id)}
              onMouseLeave={() => setHoveredRose(null)}
            >
              {/* Interactive Rose Card Button */}
              <button
                type="button"
                id={`rose-btn-${rose.id}`}
                onClick={() => handleRoseClick(rose.id)}
                aria-label={`Select ${rose.title} bouquet collection: ${rose.subtitle}`}
                className="w-full group text-left relative rounded-3xl p-6 md:p-8 overflow-hidden transition-all duration-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C6A56B]"
                style={{
                  background: rose.cardBg,
                  border: isHovered 
                    ? `1px solid ${rose.accent}` 
                    : '1px solid rgba(245, 240, 232, 0.08)',
                  boxShadow: isHovered 
                    ? `0 20px 50px rgba(0, 0, 0, 0.8), 0 0 40px ${rose.accentGlow}` 
                    : '0 10px 30px rgba(0,0,0,0.4)',
                  transform: isHovered ? 'translateY(-8px)' : 'translateY(0)'
                }}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span 
                    className="text-[10px] uppercase tracking-[0.2em] font-mono px-3 py-1 rounded-full border"
                    style={{
                      borderColor: isHovered ? rose.accent : 'rgba(255,255,255,0.1)',
                      color: isHovered ? rose.accent : '#AAA4A0'
                    }}
                  >
                    {rose.tagline}
                  </span>

                  <div 
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300"
                    style={{
                      background: isHovered ? rose.accent : 'rgba(255,255,255,0.06)',
                      color: isHovered ? '#080809' : rose.accent
                    }}
                  >
                    <Icon size={16} />
                  </div>
                </div>

                {/* Central Rose Artwork */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-6 bg-black flex items-center justify-center">
                  <img
                    src={rose.image}
                    alt={`${rose.title} Rose`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Dramatic Radial Spotlight Gradient */}
                  <div 
                    className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at center, transparent 40%, rgba(8,8,9,0.7) 100%)`,
                      opacity: isHovered ? 0.3 : 0.6
                    }}
                  />

                  {/* Pulsing Light halo on Hover */}
                  <div 
                    className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                    style={{
                      boxShadow: `inset 0 0 35px ${rose.accentGlow}`,
                      opacity: isHovered ? 1 : 0
                    }}
                  />

                  {/* Center Action Cue */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none"
                    style={{ opacity: isHovered ? 1 : 0 }}
                  >
                    <span 
                      className="px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase text-black shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2"
                      style={{ background: rose.accent }}
                    >
                      Explore Collection <ArrowRight size={13} />
                    </span>
                  </div>
                </div>

                {/* Rose Titles & Subtitles */}
                <div className="text-center md:text-left">
                  <h3 
                    className="font-serif text-2xl md:text-3xl tracking-widest text-[#F5F0E8] uppercase mb-1 font-semibold transition-colors duration-300"
                    style={{ color: isHovered ? rose.accent : '#F5F0E8' }}
                  >
                    {rose.title}
                  </h3>

                  <p className="font-sans text-xs md:text-sm text-[#AAA4A0] font-light leading-relaxed mb-4">
                    {rose.subtitle}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-medium tracking-wider uppercase transition-colors duration-300"
                    style={{ color: rose.accent }}
                  >
                    <span>View Bouquets</span>
                    <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Subtle Scroll Cue at Bottom */}
      <div className="relative z-10 mt-12 text-center text-xs uppercase tracking-[0.2em] text-[#635E5B] flex items-center justify-center gap-2">
        <span>Click any rose to enter its boutique atelier</span>
      </div>
    </section>
  );
}
