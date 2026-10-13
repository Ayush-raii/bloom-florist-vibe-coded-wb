import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, ChevronDown, Sparkles, ArrowRight } from 'lucide-react';

export default function Navbar({
  cartCount,
  onOpenCart,
  onNavigateHome,
  onNavigateOccasion,
  onNavigateCatalog,
  onNavigateStory,
  onOpenContact,
  activeOccasion,
  onSkipIntro,
  onNavigateBuilder
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [occasionsDropdownOpen, setOccasionsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-[rgba(8,8,9,0.92)] backdrop-blur-xl border-b border-[rgba(198,165,107,0.2)] py-3 shadow-2xl' 
          : 'bg-gradient-to-b from-[rgba(8,8,9,0.85)] via-[rgba(8,8,9,0.5)] to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button 
          id="nav-logo"
          onClick={onNavigateHome}
          className="nav-logo-btn group focus:outline-none"
        >
          <span className="font-serif text-2xl md:text-3xl font-normal tracking-[0.22em] text-[#F5F0E8] group-hover:text-[#C6A56B] transition-colors">
            BLOOM
          </span>
          <span className="hidden sm:inline-block text-[10px] uppercase tracking-[0.2em] text-[#C6A56B] font-mono border-l border-[rgba(198,165,107,0.3)] pl-2.5">
            Haute Florist
          </span>
        </button>

        {/* Desktop Editorial Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9">
          <button 
            id="nav-our-flowers"
            onClick={onNavigateCatalog}
            className="nav-link-btn"
          >
            Our Flowers
          </button>

          {/* Occasions Dropdown */}
          <div className="relative">
            <button
              id="nav-occasions-dropdown"
              onClick={() => setOccasionsDropdownOpen(!occasionsDropdownOpen)}
              onMouseEnter={() => setOccasionsDropdownOpen(true)}
              className="nav-link-btn"
            >
              <span>Occasions</span>
              <ChevronDown size={12} className={`transform transition-transform duration-200 ${occasionsDropdownOpen ? 'rotate-180 text-[#C6A56B]' : ''}`} />
            </button>

            {occasionsDropdownOpen && (
              <div 
                onMouseLeave={() => setOccasionsDropdownOpen(false)}
                className="absolute top-full left-0 mt-3 w-56 rounded-2xl bg-[rgba(17,16,20,0.98)] border border-[rgba(198,165,107,0.3)] shadow-2xl backdrop-blur-2xl p-2 z-50 animate-fadeIn"
              >
                <button
                  onClick={() => {
                    onNavigateOccasion('birthday');
                    setOccasionsDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-xs hover:bg-[rgba(198,165,107,0.12)] hover:text-[#C6A56B] flex items-center justify-between transition-colors"
                >
                  <span className="font-serif text-sm">Birthday Blooms</span>
                  <span className="text-[10px] text-[#C6A56B] font-mono">6 Styles</span>
                </button>
                <button
                  onClick={() => {
                    onNavigateOccasion('anniversary');
                    setOccasionsDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-xs hover:bg-[rgba(181,31,59,0.15)] hover:text-[#B51F3B] flex items-center justify-between transition-colors"
                >
                  <span className="font-serif text-sm">Anniversary Romance</span>
                  <span className="text-[10px] text-[#B51F3B] font-mono">6 Styles</span>
                </button>
                <button
                  onClick={() => {
                    onNavigateOccasion('wedding');
                    setOccasionsDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-xs hover:bg-[rgba(230,215,195,0.12)] hover:text-[#E6D7C3] flex items-center justify-between transition-colors"
                >
                  <span className="font-serif text-sm">Wedding & Bridal</span>
                  <span className="text-[10px] text-[#E6D7C3] font-mono">6 Styles</span>
                </button>
                <div className="border-t border-[rgba(255,255,255,0.06)] mt-1.5 pt-1.5">
                  <button
                    onClick={() => {
                      onNavigateOccasion(null);
                      setOccasionsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-[11px] text-[#C6A56B] hover:text-white flex items-center gap-2"
                  >
                    <Sparkles size={11} className="text-[#C6A56B]" />
                    <span>Three-Rose Selector</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <button 
            id="nav-custom-builder"
            onClick={onNavigateBuilder}
            className="nav-link-btn"
          >
            Custom Bouquet
          </button>

          <button 
            id="nav-our-story"
            onClick={onNavigateStory}
            className="nav-link-btn"
          >
            Our Story
          </button>

          <button 
            id="nav-contact"
            onClick={onOpenContact}
            className="nav-link-btn"
          >
            Contact
          </button>
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          {/* Skip Intro Luxury Pill */}
          <button
            id="nav-skip-intro-btn"
            onClick={onSkipIntro}
            aria-label="Skip intro to roses"
            className="nav-skip-pill hidden sm:inline-flex"
          >
            <span>Skip Intro</span>
            <ArrowRight size={11} />
          </button>

          {/* Shopping Cart Button */}
          <button
            id="nav-cart-btn"
            onClick={onOpenCart}
            aria-label={`View Shopping Cart, ${cartCount} items`}
            className="nav-cart-pill"
          >
            <ShoppingBag size={16} className="text-[#C6A56B]" />
            <span className="cart-counter-badge font-mono">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="nav-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#AAA4A0] hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#080809] border-b border-[rgba(198,165,107,0.2)] px-6 py-6 flex flex-col gap-4 animate-fadeIn">
          <button
            onClick={() => {
              onNavigateCatalog();
              setMobileMenuOpen(false);
            }}
            className="text-left text-xs uppercase tracking-widest text-[#F5F0E8] py-2"
          >
            Our Flowers
          </button>
          
          <div className="flex flex-col gap-2 pl-3 border-l border-[rgba(198,165,107,0.3)]">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#C6A56B]">Occasions</span>
            <button
              onClick={() => {
                onNavigateOccasion('birthday');
                setMobileMenuOpen(false);
              }}
              className="text-left text-xs uppercase tracking-wider text-[#AAA4A0] py-1"
            >
              &bull; Birthday Blooms
            </button>
            <button
              onClick={() => {
                onNavigateOccasion('anniversary');
                setMobileMenuOpen(false);
              }}
              className="text-left text-xs uppercase tracking-wider text-[#AAA4A0] py-1"
            >
              &bull; Anniversary Romance
            </button>
            <button
              onClick={() => {
                onNavigateOccasion('wedding');
                setMobileMenuOpen(false);
              }}
              className="text-left text-xs uppercase tracking-wider text-[#AAA4A0] py-1"
            >
              &bull; Wedding & Bridal
            </button>
            <button
              onClick={() => {
                onNavigateOccasion(null);
                setMobileMenuOpen(false);
              }}
              className="text-left text-xs uppercase tracking-wider text-[#C6A56B] py-1"
            >
              &bull; Three-Rose Selector
            </button>
          </div>

          <button
            onClick={() => {
              onNavigateBuilder();
              setMobileMenuOpen(false);
            }}
            className="text-left text-xs uppercase tracking-widest text-[#F5F0E8] py-2"
          >
            Custom Bouquet Builder
          </button>

          <button
            onClick={() => {
              onNavigateStory();
              setMobileMenuOpen(false);
            }}
            className="text-left text-xs uppercase tracking-widest text-[#F5F0E8] py-2"
          >
            Our Story
          </button>

          <button
            onClick={() => {
              onOpenContact();
              setMobileMenuOpen(false);
            }}
            className="text-left text-xs uppercase tracking-widest text-[#F5F0E8] py-2"
          >
            Contact
          </button>

          <button
            onClick={() => {
              onSkipIntro();
              setMobileMenuOpen(false);
            }}
            className="text-left text-xs uppercase tracking-widest text-[#C6A56B] py-2 flex items-center gap-1.5"
          >
            <span>Skip Intro &rarr;</span>
          </button>
        </div>
      )}
    </header>
  );
}
