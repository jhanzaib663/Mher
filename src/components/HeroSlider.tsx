import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroSliderProps {
  onShopNow: () => void;
  onExploreBrands: () => void;
}

interface HeroSlide {
  id: number;
  word1: string;
  word2: string;
  word3: string;
  bgWordTop: string;
  bgWordBottom: string;
  tagline: string;
  sneakerUrl: string;
  sneakerAlt: string;
  modelBadge: string;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  onShopNow,
  onExploreBrands,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [imageError, setImageError] = useState(false);

  const slides: HeroSlide[] = [
    {
      id: 1,
      word1: 'OWN',
      word2: 'EVERY',
      word3: 'STEP',
      bgWordTop: 'NEVER',
      bgWordBottom: 'STOP',
      tagline: 'Explore the best collection of branded shoes and move with style and confidence.',
      // High-res angled dynamic athletic sneaker
      sneakerUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85',
      sneakerAlt: 'Nike Air Athletic performance sneaker in black, white, and dynamic styling',
      modelBadge: 'AIR MAX TECH',
    },
    {
      id: 2,
      word1: 'BREAK',
      word2: 'EVERY',
      word3: 'LIMIT',
      bgWordTop: 'FAST',
      bgWordBottom: 'AHEAD',
      tagline: 'Engineered with explosive energy return and ultra-light cushioning for peak performance.',
      sneakerUrl: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=85',
      sneakerAlt: 'High performance training sneaker with responsive grip',
      modelBadge: 'TURBO FOAM',
    },
    {
      id: 3,
      word1: 'RULE',
      word2: 'EVERY',
      word3: 'COURT',
      bgWordTop: 'RISE',
      bgWordBottom: 'ABOVE',
      tagline: 'Legendary basketball silhouettes tailored for street elegance and court domination.',
      sneakerUrl: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=85',
      sneakerAlt: 'Air Jordan high top basketball sneaker in iconic red and black',
      modelBadge: 'RETRO EDITION',
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setImageError(false);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setImageError(false);
  }, [slides.length]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 6500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const slide = slides[currentSlide];

  return (
    <section
      className="relative overflow-hidden bg-[#101112] text-white rounded-xl sm:rounded-2xl mx-auto my-4 sm:my-6"
      style={{ minHeight: '410px' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Featured Collection Carousel"
    >
      {/* Background Graphic Speed Lines & Lime Energy Splash */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Subtle angled speed grid lines */}
        <div 
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(45deg, #ffffff 1px, transparent 1px), linear-gradient(-45deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        />

        {/* Dynamic neon lime energy glow & brush stroke accents behind sneaker */}
        <div className="absolute right-[5%] sm:right-[15%] top-1/2 -translate-y-1/2 w-[340px] sm:w-[520px] h-[260px] sm:h-[380px] bg-[#C7F000]/15 rounded-full blur-3xl transform -rotate-12 pointer-events-none" />
        
        {/* Angular neon lime brush streak */}
        <div 
          className="absolute right-0 sm:right-[10%] top-[20%] w-[380px] h-[120px] bg-gradient-to-r from-transparent via-[#C7F000]/25 to-transparent blur-xl transform -rotate-[24deg]"
        />

        {/* Massive Outlined Typography: Top word */}
        <div
          className="absolute top-1 right-[10%] sm:right-[22%] text-[90px] sm:text-[140px] lg:text-[180px] font-black tracking-widest text-transparent uppercase opacity-[0.14] select-none pointer-events-none transition-all duration-700"
          style={{
            WebkitTextStroke: '1.5px #FFFFFF',
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {slide.bgWordTop}
        </div>

        {/* Massive Outlined Typography: Bottom word */}
        <div
          className="absolute bottom-[-20px] right-[5%] sm:right-[15%] text-[90px] sm:text-[140px] lg:text-[180px] font-black tracking-widest text-transparent uppercase opacity-[0.14] select-none pointer-events-none transition-all duration-700"
          style={{
            WebkitTextStroke: '1.5px #FFFFFF',
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {slide.bgWordBottom}
        </div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-8 sm:py-12 flex flex-col lg:flex-row items-center justify-between min-h-[410px] lg:h-[430px]">
        {/* Left Content Area */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center text-left mb-8 lg:mb-0">
          {/* Main 3-Line Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-black uppercase tracking-tight leading-[1.02] mb-4">
            <span className="block text-white transition-opacity duration-300">
              {slide.word1}
            </span>
            <span className="block text-white transition-opacity duration-300">
              {slide.word2}
            </span>
            <span className="block text-[#C7F000] drop-shadow-sm transition-all duration-300">
              {slide.word3}
            </span>
          </h1>

          {/* Description */}
          <p className="text-[#A0A0A0] text-sm sm:text-base max-w-[420px] font-normal leading-relaxed mb-6 sm:mb-8">
            {slide.tagline}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={onShopNow}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#C7F000] hover:bg-[#b5db00] active:scale-[0.98] text-[#101112] text-sm font-bold rounded-lg transition-all shadow-md group cursor-pointer"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onExploreBrands}
              className="inline-flex items-center justify-center px-6 py-3.5 bg-transparent hover:bg-white/10 active:scale-[0.98] text-white text-sm font-semibold rounded-lg border border-white/30 hover:border-white/60 transition-all cursor-pointer"
            >
              Explore Brands
            </button>
          </div>
        </div>

        {/* Right Sneaker Presentation Area */}
        <div className="w-full lg:w-1/2 flex items-center justify-center relative min-h-[220px] sm:min-h-[280px] lg:min-h-full">
          <div className="relative w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[540px] flex items-center justify-center">
            {/* Sneaker floating cutout with responsive angle */}
            {!imageError ? (
              <img
                key={slide.sneakerUrl}
                src={slide.sneakerUrl}
                alt={slide.sneakerAlt}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-[220px] sm:h-[300px] lg:h-[360px] object-contain transform -rotate-[18deg] hover:rotate-[-14deg] transition-all duration-500 filter drop-shadow-[0_25px_30px_rgba(0,0,0,0.85)] z-20 cursor-pointer"
                onClick={onShopNow}
              />
            ) : (
              /* High-fidelity Vector Sneaker illustration if image link fails */
              <div 
                onClick={onShopNow}
                className="w-[340px] sm:w-[420px] h-[220px] sm:h-[280px] transform -rotate-[18deg] flex items-center justify-center relative cursor-pointer"
              >
                <svg
                  viewBox="0 0 300 180"
                  className="w-full h-full filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.9)]"
                  fill="none"
                >
                  <path
                    d="M30 140C40 140 60 142 90 142C140 142 180 138 220 138C260 138 285 125 292 98C295 86 284 70 268 64C248 56 226 52 205 52C190 52 175 40 160 30C144 20 124 16 106 24C98 27 84 38 76 56C70 70 58 90 45 106C36 116 27 132 30 140Z"
                    fill="#F3F3F3"
                  />
                  <path
                    d="M45 106C70 106 120 100 160 94C200 88 245 78 275 66"
                    stroke="#101112"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  {/* Neon Lime accent air bubble unit */}
                  <rect x="235" y="115" width="36" height="14" rx="7" fill="#C7F000" />
                  <path
                    d="M20 140H295"
                    stroke="#101112"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                  {/* Athletic Swoosh */}
                  <path
                    d="M110 85C140 85 185 70 215 50C190 68 150 78 120 78C112 78 105 82 110 85Z"
                    fill="#101112"
                  />
                </svg>
              </div>
            )}

            {/* Subtle shadow ground under the shoe */}
            <div className="absolute -bottom-2 w-[70%] h-5 bg-black/80 rounded-[100%] blur-md -z-10" />
          </div>
        </div>
      </div>

      {/* Bottom Controls: Prev/Next & 01 — 02 03 Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 right-6 sm:right-10 lg:right-14 z-30 flex items-center gap-4">
        {/* Previous / Next Arrows */}
        <div className="flex items-center gap-1.5 mr-2">
          <button
            onClick={prevSlide}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Numerical Carousel Indicators */}
        <div className="flex items-center space-x-3 text-xs sm:text-sm font-semibold tracking-wider select-none">
          {slides.map((s, index) => {
            const isActive = currentSlide === index;
            return (
              <button
                key={s.id}
                onClick={() => {
                  setCurrentSlide(index);
                  setImageError(false);
                }}
                className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isActive
                    ? 'text-white font-bold'
                    : 'text-[#666666] hover:text-[#AAAAAA]'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                <span>{`0${index + 1}`}</span>
                {isActive && <span className="w-3 h-[2px] bg-[#C7F000] inline-block" />}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
