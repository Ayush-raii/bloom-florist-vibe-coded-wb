import React from 'react';
import { Flower2, HeartHandshake, Sparkles, Award } from 'lucide-react';

export default function BrandStory({ onExploreOccasions }) {
  const brandValues = [
    {
      icon: Flower2,
      title: 'Thoughtfully Arranged',
      desc: 'Every stem is sourced from ethical, high-altitude botanical sanctuaries and positioned by floral artisans with balanced architectural harmony.'
    },
    {
      icon: HeartHandshake,
      title: 'Made for Meaningful Moments',
      desc: 'Whether honoring anniversaries, celebrating another year around the sun, or sealing wedding vows, our arrangements whisper what words cannot.'
    },
    {
      icon: Sparkles,
      title: 'Beautifully Presented',
      desc: 'Wrapped in bespoke Italian star-flecked paper and secured with raw silk ribbon, delivered with white-glove care right to their hands.'
    }
  ];

  return (
    <section id="story-section" className="relative w-full bg-[#080809] py-28 px-4 md:px-8 border-t border-[rgba(198,165,107,0.15)] overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(74,7,21,0.35)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[rgba(198,165,107,0.3)] bg-[rgba(17,16,20,0.6)] backdrop-blur-md mb-4">
            <Award size={13} className="text-[#C6A56B]" />
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#C6A56B]">
              THE BLOOM PHILOSOPHY
            </span>
          </div>

          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#F5F0E8] font-normal tracking-tight mb-6 leading-tight">
            MORE THAN FLOWERS.<br />
            <span className="italic text-[#C6A56B]">A FEELING, DELIVERED.</span>
          </h2>

          <p className="font-serif italic text-lg md:text-2xl text-[#AAA4A0] leading-relaxed max-w-2xl mx-auto font-light">
            "At BLOOM, every bouquet is a little piece of emotion. From a birthday surprise to the beauty of a wedding day, we help turn meaningful moments into memories that last."
          </p>
        </div>

        {/* Brand Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {brandValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div 
                key={idx}
                className="glass-card p-8 rounded-3xl border border-[rgba(245,240,232,0.06)] hover:border-[rgba(198,165,107,0.3)] flex flex-col justify-between group transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[rgba(198,165,107,0.1)] border border-[rgba(198,165,107,0.25)] flex items-center justify-center text-[#C6A56B] mb-6 group-hover:scale-110 transition-transform">
                    <Icon size={22} />
                  </div>

                  <h3 className="font-serif text-2xl text-[#F5F0E8] mb-3 font-normal">
                    {val.title}
                  </h3>

                  <p className="text-xs text-[#AAA4A0] leading-relaxed font-light">
                    {val.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[rgba(255,255,255,0.05)] flex items-center justify-between text-[11px] font-mono text-[#635E5B]">
                  <span>EST. 2026</span>
                  <span className="text-[#C6A56B]">0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
