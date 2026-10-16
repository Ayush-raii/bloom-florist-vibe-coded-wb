import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ArrowDown, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 100;

export default function ScrollFrameHero({ onExploreOccasions, onSelectOccasion }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const introOverlayRef = useRef(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  // Store preloaded HTMLImageElements in a ref to avoid re-render overhead
  const framesRef = useRef([]);

  // Generate natural numeric file path: /frames/frame_001.jpg ... /frames/frame_100.jpg
  const getFrameUrl = useCallback((index) => {
    const padIndex = String(index + 1).padStart(3, '0');
    return `/frames/frame_${padIndex}.jpg`;
  }, []);

  // Preload all 100 images
  useEffect(() => {
    let loadedCount = 0;
    const images = new Array(TOTAL_FRAMES);

    const onImageLoaded = () => {
      loadedCount++;
      const progress = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));
      setLoadProgress(progress);

      if (loadedCount === TOTAL_FRAMES) {
        framesRef.current = images;
        setIsLoaded(true);
      }
    };

    const onImageError = (index) => {
      console.warn(`Frame ${index + 1} failed to load, preparing fallback`);
      loadedCount++;
      const progress = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));
      setLoadProgress(progress);
      if (loadedCount === TOTAL_FRAMES) {
        framesRef.current = images;
        setIsLoaded(true);
      }
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        images[i] = img;
        onImageLoaded();
      };
      img.onerror = () => {
        // Fallback: assign previous frame or empty
        images[i] = images[Math.max(0, i - 1)] || img;
        onImageError(i);
      };
    }

    return () => {
      // Cleanup image handlers
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        if (images[i]) {
          images[i].onload = null;
          images[i].onerror = null;
        }
      }
    };
  }, [getFrameUrl]);

  // Canvas drawing function with proper aspect ratio and High-DPI handling
  const drawFrame = useCallback((frameIdx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = framesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Deep luxury dark background
    ctx.fillStyle = '#080809';
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    // Calculate aspect ratio for canvas drawing
    const imgWidth = img.naturalWidth || 1280;
    const imgHeight = img.naturalHeight || 720;
    // Full-screen edge-to-edge cover: fills entire phone & desktop viewport seamlessly
    const scale = Math.max(displayWidth / imgWidth, displayHeight / imgHeight);
    const drawW = imgWidth * scale;
    const drawH = imgHeight * scale;
    const drawX = (displayWidth - drawW) / 2;
    const drawY = (displayHeight - drawH) / 2;

    // High quality smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();
  }, []);

  // Initial draw once loaded
  useEffect(() => {
    if (isLoaded) {
      drawFrame(0);
    }
  }, [isLoaded, drawFrame]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      if (isLoaded && framesRef.current[currentFrameIndex]) {
        drawFrame(currentFrameIndex);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded, currentFrameIndex, drawFrame]);

  // GSAP ScrollTrigger setup for Scrubbed Frame Animation
  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    const frameTracker = { frame: 0 };

    const ctx = gsap.context(() => {
      // Scroll animation pin timeline
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=320%', // 320vh scroll distance for silky smooth scrubbing
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          // Interpolate exact frame index 0 to 99
          const targetIndex = Math.min(
            TOTAL_FRAMES - 1,
            Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
          );

          if (targetIndex !== frameTracker.frame) {
            frameTracker.frame = targetIndex;
            setCurrentFrameIndex(targetIndex);
            drawFrame(targetIndex);
          }

          // Fade out the opening text overlay as scrolling progresses
          if (introOverlayRef.current) {
            if (progress > 0.02) {
              const opacity = Math.max(0, 1 - progress * 8);
              introOverlayRef.current.style.opacity = opacity;
              introOverlayRef.current.style.pointerEvents = opacity <= 0.05 ? 'none' : 'auto';
            } else {
              introOverlayRef.current.style.opacity = 1;
              introOverlayRef.current.style.pointerEvents = 'auto';
            }
          }
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [isLoaded, drawFrame]);

  // Enter the Experience button smooth scroll
  const handleEnterExperience = () => {
    if (!containerRef.current) return;
    const pinDistance = window.innerHeight * 0.8;
    window.scrollBy({
      top: pinDistance,
      behavior: 'smooth'
    });
  };

  // Skip Intro button jumps directly to Three Roses occasion section
  const handleSkipIntro = () => {
    onExploreOccasions?.();
  };

  return (
    <div className="relative w-full bg-[#080809]" id="experience-hero">
      {/* Loading Screen Overlay */}
      {!isLoaded && (
        <div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080809] text-[#F5F0E8] transition-opacity duration-700"
          style={{ zIndex: 9999 }}
        >
          <div className="flex flex-col items-center max-w-md px-6 text-center">
            {/* Elegant Floral Monogram */}
            <div className="w-16 h-16 mb-6 rounded-full border border-[rgba(198,165,107,0.3)] flex items-center justify-center relative animate-pulse">
              <span className="font-serif text-2xl text-[#C6A56B] italic font-normal">B</span>
              <div 
                className="absolute inset-0 rounded-full border-2 border-[#C6A56B] border-t-transparent animate-spin" 
                style={{ animationDuration: '2s' }}
              />
            </div>

            <h2 className="font-serif text-3xl md:text-4xl tracking-widest uppercase mb-2 text-[#F5F0E8]">
              BLOOM
            </h2>
            <p className="font-sans text-xs tracking-[0.25em] uppercase text-[#C6A56B] mb-8">
              Haute Florist &middot; Parisienne Story
            </p>

            {/* Real Progress Bar */}
            <div className="w-64 h-1 bg-[rgba(255,255,255,0.08)] rounded-full overflow-hidden mb-4 relative">
              <div 
                className="h-full bg-gradient-to-r from-[#B51F3B] via-[#C6A56B] to-[#F5F0E8] transition-all duration-300 ease-out"
                style={{ width: `${loadProgress}%` }}
              />
            </div>

            <div className="flex items-center justify-between w-64 text-xs font-mono text-[#AAA4A0]">
              <span>PREPARING 100 FRAMES</span>
              <span className="text-[#C6A56B] font-semibold">{loadProgress}%</span>
            </div>
            
            <p className="mt-8 text-xs text-[#AAA4A0] italic">
              "Flowers that say what words cannot"
            </p>
          </div>
        </div>
      )}

      {/* Pinned Scroll Container */}
      <div 
        ref={containerRef} 
        className="relative w-full h-screen h-[100dvh] overflow-hidden bg-[#080809]"
      >
        {/* Full-screen HTML Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block object-cover"
          style={{ width: '100%', height: '100%', touchAction: 'pan-y' }}
        />

        {/* Refined Opening Overlay on Frame 1 */}
        <div
          ref={introOverlayRef}
          className="absolute inset-0 z-20 flex flex-col justify-end items-center pb-12 pt-28 px-4 md:px-8 pointer-events-auto transition-opacity duration-500 bg-gradient-to-t from-[rgba(8,8,9,0.92)] via-[rgba(8,8,9,0.4)] to-transparent"
        >
          {/* Central Luxury Callout Card */}
          <div className="max-w-2xl w-full mx-auto text-center p-6 md:p-8 rounded-3xl bg-[rgba(17,16,20,0.72)] backdrop-blur-xl border border-[rgba(198,165,107,0.22)] shadow-2xl mb-6">
            <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#C6A56B] font-mono mb-2 font-medium">
              A WORLD OF FLOWERS, MADE FOR YOUR MOMENTS
            </p>

            <h1 className="font-serif text-4xl md:text-6xl tracking-wide text-[#F5F0E8] mb-2 font-normal">
              BLOOM
            </h1>

            <p className="font-serif italic text-base md:text-xl text-[#AAA4A0] max-w-lg mx-auto mb-6 font-light">
              Flowers that say what words cannot.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                id="enter-experience-btn"
                onClick={handleEnterExperience}
                className="btn-gold px-7 py-3 text-xs tracking-[0.16em]"
              >
                ENTER THE EXPERIENCE
              </button>

              <button
                id="skip-intro-btn"
                onClick={handleSkipIntro}
                className="btn-outline px-6 py-3 text-xs tracking-[0.14em]"
              >
                SKIP INTRO
              </button>
            </div>
          </div>

          {/* Bottom Cue */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#C6A56B] animate-bounce">
              <span>SCROLL TO DISCOVER</span>
              <ChevronDown size={14} />
            </div>
            <p className="text-[10px] tracking-wider text-[#AAA4A0] uppercase mt-1 font-mono">
              Scroll down to step into the boutique
            </p>
          </div>
        </div>

        {/* Minimal Scroll Indicator Floating in Corner */}
        {isLoaded && (
          <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-10 flex items-center gap-2 md:gap-3 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full bg-[rgba(17,16,20,0.7)] backdrop-blur-md border border-[rgba(255,255,255,0.08)] text-[10px] md:text-[11px] font-mono text-[#AAA4A0]">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#B51F3B] animate-pulse" />
            <span>FRAME {String(currentFrameIndex + 1).padStart(3, '0')} / 100</span>
          </div>
        )}
      </div>
    </div>
  );
}
