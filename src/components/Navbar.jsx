import React, { useState, useEffect, useRef } from 'react';
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
  const [mobileOccasionsOpen, setMobileOccasionsOpen] = useState(false);

  const desktopDropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(e.target)) {
        setOccasionsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile drawer when resizing up to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
        {/* Brand Logo with Haute Florist Tag visible on mobile & desktop */}
        <button 
          id="nav-logo"
          onClick={onNavigateHome}
          className="nav-logo-btn group focus:outline-none flex items-center"
        >
          <span className="font-serif text-2xl md:text-3xl font-normal tracking-[0.22em] text-[#F5F0E8] group-hover:text-[#C6A56B] transition-colors">
            BLOOM
          </span>
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#C6A56B] font-mono border-l border-[rgba(198,165,107,0.3)] pl-2 ml-2 inline-block">
            Haute Florist
          </span>
        </button>

        {/* Desktop Editorial Navigation Links */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-7 lg:gap-9">
          <button 
            id="nav-our-flowers"
            onClick={onNavigateCatalog}
            className="nav-link-btn"
          >
            Our Flowers
          </button>

          {/* Desktop Occasions Dropdown with zero-gap hover and click-outside handler */}
          <div 
            ref={desktopDropdownRef}
            className="relative"
            onMouseEnter={() => setOccasionsDropdownOpen(true)}
            onMouseLeave={() => setOccasionsDropdownOpen(false)}
          >
            <button
              id="nav-occasions-dropdown"
              onClick={() => setOccasionsDropdownOpen((prev) => !prev)}
              className="nav-link-btn flex items-center gap-1.5"
              aria-haspopup="true"
              aria-expanded={occasionsDropdownOpen}
            >
              <span>Occasions</span>
              <ChevronDown size={12} className={`transform transition-transform duration-200 ${occasionsDropdownOpen ? 'rotate-180 text-[#C6A56B]' : ''}`} />
            </button>

            {occasionsDropdownOpen && (
              <div 
                className="absolute top-full left-0 pt-2 w-56 z-50 animate-fadeIn"
              >
                <div className="rounded-2xl bg-[rgba(17,16,20,0.98)] border border-[rgba(198,165,107,0.3)] shadow-2xl backdrop-blur-2xl p-2">
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
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Skip Intro Luxury Pill (visible on mobile and desktop) */}
          <button
            id="nav-skip-intro-btn"
            onClick={onSkipIntro}
            aria-label="Skip intro to roses"
            className="nav-skip-pill inline-flex items-center gap-1 px-2.5 py-1 text-[10px] sm:px-3 sm:py-1.5 sm:text-xs"
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

      {/* Semantic Mobile Navigation Drawer with Dropdown and proper positioning */}
      {mobileMenuOpen && (
        <nav 
          id="mobile-navigation-menu"
          aria-label="Mobile Navigation"
          className="md:hidden bg-[#080809] border-b border-[rgba(198,165,107,0.2)] px-6 py-5 flex flex-col gap-3 max-h-[calc(100vh-70px)] overflow-y-auto animate-fadeIn shadow-2xl"
        >
          <button
            onClick={() => {
              onNavigateCatalog();
              setMobileMenuOpen(false);
            }}
            className="text-left text-xs uppercase tracking-widest text-[#F5F0E8] hover:text-[#C6A56B] py-2 transition-colors"
          >
            Our Flowers
          </button>
          
          {/* Mobile Occasions Dropdown Accordion */}
          <div className="flex flex-col rounded-2xl bg-[rgba(17,16,20,0.6)] border border-[rgba(198,165,107,0.2)] overflow-hidden">
            <button
              type="button"
              id="mobile-occasions-dropdown"
              onClick={() => setMobileOccasionsOpen(!mobileOccasionsOpen)}
              className="flex items-center justify-between w-full px-4 py-3 text-xs uppercase tracking-widest text-[#F5F0E8] hover:text-[#C6A56B] transition-colors"
              aria-haspopup="true"
              aria-expanded={mobileOccasionsOpen}
            >
              <span className="flex items-center gap-2">
                <Sparkles size={13} className="text-[#C6A56B]" />
                <span>Occasions</span>
              </span>
              <ChevronDown
                size={14}
                className={`text-[#C6A56B] transform transition-transform duration-300 ${
                  mobileOccasionsOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {mobileOccasionsOpen && (
              <div className="flex flex-col gap-1 px-3 pb-3 pt-1 border-t border-[rgba(198,165,107,0.15)] animate-fadeIn">
                <button
                  onClick={() => {
                    onNavigateOccasion('birthday');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs uppercase tracking-wider text-[#AAA4A0] hover:text-[#C6A56B] hover:bg-[rgba(198,165,107,0.1)] flex items-center justify-between transition-colors"
                >
                  <span>Birthday Blooms</span>
                  <span className="text-[10px] font-mono text-[#C6A56B]">6 Styles</span>
                </button>
                <button
                  onClick={() => {
                    onNavigateOccasion('anniversary');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs uppercase tracking-wider text-[#AAA4A0] hover:text-[#B51F3B] hover:bg-[rgba(181,31,59,0.15)] flex items-center justify-between transition-colors"
                >
                  <span>Anniversary Romance</span>
                  <span className="text-[10px] font-mono text-[#B51F3B]">6 Styles</span>
                </button>
                <button
                  onClick={() => {
                    onNavigateOccasion('wedding');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs uppercase tracking-wider text-[#AAA4A0] hover:text-[#E6D7C3] hover:bg-[rgba(230,215,195,0.12)] flex items-center justify-between transition-colors"
                >
                  <span>Wedding & Bridal</span>
                  <span className="text-[10px] font-mono text-[#E6D7C3]">6 Styles</span>
                </button>
                <button
                  onClick={() => {
                    onNavigateOccasion(null);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs uppercase tracking-wider text-[#C6A56B] hover:text-white flex items-center gap-2 transition-colors"
                >
                  <Sparkles size={11} className="text-[#C6A56B]" />
                  <span>Three-Rose Selector</span>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              onNavigateBuilder();
              setMobileMenuOpen(false);
            }}
            className="text-left text-xs uppercase tracking-widest text-[#F5F0E8] hover:text-[#C6A56B] py-2 transition-colors"
          >
            Custom Bouquet Builder
          </button>

          <button
            onClick={() => {
              onNavigateStory();
              setMobileMenuOpen(false);
            }}
            className="text-left text-xs uppercase tracking-widest text-[#F5F0E8] hover:text-[#C6A56B] py-2 transition-colors"
          >
            Our Story
          </button>

          <button
            onClick={() => {
              onOpenContact();
              setMobileMenuOpen(false);
            }}
            className="text-left text-xs uppercase tracking-widest text-[#F5F0E8] hover:text-[#C6A56B] py-2 transition-colors"
          >
            Contact
          </button>

          {/* Last Position Item: Prominent Luxury Action Pill */}
          <div className="pt-2 border-t border-[rgba(255,255,255,0.08)] mt-2">
            <button
              id="mobile-skip-intro-btn"
              onClick={() => {
                onSkipIntro();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-[rgba(198,165,107,0.4)] bg-[rgba(198,165,107,0.08)] text-[#C6A56B] hover:text-[#F5F0E8] hover:bg-[rgba(198,165,107,0.2)] text-xs uppercase tracking-widest flex items-center justify-between transition-all"
            >
              <span>Skip Intro to Roses</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
