import React, { useState } from 'react';
import { ArrowUp, Mail, Check, Sparkles } from 'lucide-react';

export default function Footer({
  onNavigateHome,
  onNavigateOccasion,
  onNavigateCatalog,
  onNavigateStory,
  onOpenContact,
  onOpenLegal
}) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#080809] border-t border-[rgba(198,165,107,0.18)] pt-20 pb-12 px-4 md:px-8 text-[#AAA4A0]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Col 1: Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <button 
              onClick={onNavigateHome}
              className="text-left group focus:outline-none"
            >
              <span className="font-serif text-3xl font-normal tracking-[0.2em] text-[#F5F0E8] group-hover:text-[#C6A56B] transition-colors">
                BLOOM
              </span>
              <span className="block text-[10px] uppercase font-mono tracking-widest text-[#C6A56B] mt-0.5">
                Haute Florist Atelier
              </span>
            </button>

            <p className="font-serif italic text-base text-[#AAA4A0] max-w-sm font-light leading-relaxed">
              Flowers that say what words cannot. A world of flowers, made for your moments.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <span className="text-[11px] uppercase font-mono tracking-wider text-[#C6A56B] block mb-2">
                Join the Private Collector's Circle
              </span>
              {newsletterSubscribed ? (
                <div className="flex items-center gap-2 text-xs text-[#4ADE80] p-2.5 rounded-xl bg-[rgba(45,106,79,0.2)] border border-[#2D6A4F]">
                  <Check size={14} />
                  <span>Welcome to the BLOOM Circle.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full bg-[rgba(17,16,20,0.8)] border border-[rgba(255,255,255,0.1)] rounded-xl px-3.5 py-2.5 text-xs text-[#F5F0E8] placeholder-[#635E5B] focus:outline-none focus:border-[#C6A56B]"
                  />
                  <button
                    type="submit"
                    className="btn-gold px-4 py-2.5 text-xs uppercase tracking-wider flex-shrink-0"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 2: Occasions */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider text-[#C6A56B] mb-4">
              Occasions
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigateOccasion('birthday')}
                  className="hover:text-[#F5F0E8] transition-colors text-left"
                >
                  Birthday Blooms
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateOccasion('anniversary')}
                  className="hover:text-[#F5F0E8] transition-colors text-left"
                >
                  Anniversary Romance
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateOccasion('wedding')}
                  className="hover:text-[#F5F0E8] transition-colors text-left"
                >
                  Wedding & Bridal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateOccasion(null)}
                  className="hover:text-[#C6A56B] transition-colors text-left flex items-center gap-1"
                >
                  <Sparkles size={11} className="text-[#C6A56B]" />
                  <span>Three-Rose Selector</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Atelier Experience */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider text-[#C6A56B] mb-4">
              Atelier
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={onNavigateCatalog}
                  className="hover:text-[#F5F0E8] transition-colors text-left"
                >
                  Our Flowers
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateStory}
                  className="hover:text-[#F5F0E8] transition-colors text-left"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-[#F5F0E8] transition-colors text-left"
                >
                  Contact Concierge
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('experience-hero');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#F5F0E8] transition-colors text-left"
                >
                  100-Frame Odyssey
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Connect */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider text-[#C6A56B] mb-4">
              Legal & Social
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-[#F5F0E8] transition-colors text-left"
                >
                  Demo Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-[#F5F0E8] transition-colors text-left"
                >
                  Demo Terms & Conditions
                </button>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              <a 
                href="#instagram"
                aria-label="Instagram"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-full border border-[rgba(255,255,255,0.1)] flex items-center justify-center hover:border-[#C6A56B] hover:text-[#C6A56B] transition-colors text-[#AAA4A0]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a 
                href="#facebook"
                aria-label="Facebook"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-full border border-[rgba(255,255,255,0.1)] flex items-center justify-center hover:border-[#C6A56B] hover:text-[#C6A56B] transition-colors text-[#AAA4A0]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a 
                href="#twitter"
                aria-label="Twitter / X"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-full border border-[rgba(255,255,255,0.1)] flex items-center justify-center hover:border-[#C6A56B] hover:text-[#C6A56B] transition-colors text-[#AAA4A0]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#635E5B] gap-4">
          <p>
            &copy; {currentYear} BLOOM Florist. All rights reserved. Crafted for Website Design Competition.
          </p>

          <button
            onClick={scrollToTop}
            id="back-to-top-btn"
            className="inline-flex items-center gap-1.5 text-xs text-[#AAA4A0] hover:text-[#C6A56B] transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}
