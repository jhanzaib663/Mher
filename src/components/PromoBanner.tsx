import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SneakerImage } from './SneakerImage';

interface PromoBannerProps {
  onShopNewArrivals: () => void;
  onShopSale: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({
  onShopNewArrivals,
  onShopSale,
}) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-14">
      {/* Banner 1: New Arrivals / Just Dropped */}
      <div className="relative bg-[#101112] text-white rounded-[14px] p-6 sm:p-8 overflow-hidden flex flex-col justify-between min-h-[260px] sm:min-h-[290px] group border border-neutral-800">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        {/* Top Text Content */}
        <div className="relative z-10 max-w-[280px] sm:max-w-[320px]">
          <span className="inline-block text-[11px] font-bold tracking-wider text-neutral-400 uppercase mb-2">
            NEW ARRIVALS
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase mb-2 leading-tight">
            Just Dropped
          </h3>
          <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed mb-6">
            Check out the latest sneakers from top brands.
          </p>

          <button
            onClick={onShopNewArrivals}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-neutral-200 text-[#101112] text-xs sm:text-[13px] font-bold rounded-lg transition-all group-hover:shadow-md cursor-pointer"
          >
            <span>Shop New Arrivals</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Sneaker Graphic Floating on Right */}
        <div className="absolute right-[-10px] sm:right-2 bottom-2 sm:bottom-4 w-[190px] sm:w-[240px] h-[150px] sm:h-[190px] flex items-center justify-center transform -rotate-[15deg] group-hover:rotate-[-10deg] group-hover:scale-105 transition-all duration-300 pointer-events-none">
          <SneakerImage
            src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80"
            alt="New Arrival Sneaker"
            className="w-full h-full object-contain filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.8)]"
          />
        </div>
      </div>

      {/* Banner 2: Summer Sale / 40% Off */}
      <div className="relative bg-[#101112] text-white rounded-[14px] p-6 sm:p-8 overflow-hidden flex flex-col justify-between min-h-[260px] sm:min-h-[290px] group border border-neutral-800">
        {/* Neon Lime Background Glow */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#C7F000]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Text Content */}
        <div className="relative z-10 max-w-[280px] sm:max-w-[320px]">
          <span className="inline-block text-[11px] font-bold tracking-wider text-[#C7F000] uppercase mb-2">
            SUMMER SALE
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase mb-1 leading-tight">
            Up to 40% Off
          </h3>
          <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed mb-6">
            On selected items. Limited time only!
          </p>

          <button
            onClick={onShopSale}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C7F000] hover:bg-[#b5db00] text-[#101112] text-xs sm:text-[13px] font-bold rounded-lg transition-all group-hover:shadow-md cursor-pointer"
          >
            <span>Shop the Sale</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Large Neon Lime "40% OFF" Graphic + Sneaker */}
        <div className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 flex items-center pointer-events-none select-none">
          {/* 40% OFF Display Graphic */}
          <div
            className="text-[70px] sm:text-[92px] font-black leading-none text-[#C7F000] tracking-tighter opacity-90 mr-[-35px] sm:mr-[-45px] z-10 transform -rotate-6"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            40<span className="text-[34px] sm:text-[44px] block -mt-3 sm:-mt-5 ml-1">% OFF</span>
          </div>

          {/* Sneaker Cutout */}
          <div className="w-[180px] sm:w-[230px] h-[150px] sm:h-[180px] transform -rotate-[16deg] group-hover:rotate-[-12deg] group-hover:scale-105 transition-all duration-300 z-20">
            <SneakerImage
              src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80"
              alt="Sale Sneaker"
              className="w-full h-full object-contain filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.8)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
