import React, { useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { Product } from '../types';

interface BrandStripProps {
  onSelectBrand: (brand: Product['brand']) => void;
  selectedBrand?: string;
  onViewAll: () => void;
}

export const BrandStrip: React.FC<BrandStripProps> = ({
  onSelectBrand,
  selectedBrand,
  onViewAll,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 220, behavior: 'smooth' });
    }
  };

  const brands: {
    name: string;
    slug: Product['brand'];
    svg: React.ReactNode;
  }[] = [
    {
      name: 'Nike',
      slug: 'Nike',
      svg: (
        <svg viewBox="0 0 100 40" className="h-6 w-auto fill-current" aria-label="Nike">
          <path d="M15 32 C35 32 65 22 95 6 C98 5 95 9 86 14 C70 23 48 30 25 33 C18 34 11 34 15 32 Z" />
          <text x="32" y="23" fontFamily="sans-serif" fontWeight="900" fontStyle="italic" fontSize="18" fill="currentColor">
            NIKE
          </text>
        </svg>
      ),
    },
    {
      name: 'Adidas',
      slug: 'Adidas',
      svg: (
        <svg viewBox="0 0 100 40" className="h-6 w-auto fill-current" aria-label="Adidas">
          <g transform="translate(10, 5)">
            <rect x="2" y="14" width="4" height="10" transform="skewX(-25)" />
            <rect x="9" y="8" width="4.5" height="16" transform="skewX(-25)" />
            <rect x="17" y="2" width="5" height="22" transform="skewX(-25)" />
            <text x="28" y="20" fontFamily="sans-serif" fontWeight="800" fontSize="15" fill="currentColor">
              adidas
            </text>
          </g>
        </svg>
      ),
    },
    {
      name: 'Puma',
      slug: 'Puma',
      svg: (
        <svg viewBox="0 0 100 40" className="h-6 w-auto fill-current" aria-label="Puma">
          <g transform="translate(5, 6)">
            <text x="2" y="22" fontFamily="sans-serif" fontWeight="900" fontSize="20" letterSpacing="0.05em" fill="currentColor">
              PUMA
            </text>
            <path d="M72 12 C75 10 80 8 83 11 C82 14 78 15 76 16 C80 18 85 18 84 21 C81 21 78 20 75 19 C74 21 72 23 68 23 C70 20 70 17 69 14 Z" />
          </g>
        </svg>
      ),
    },
    {
      name: 'New Balance',
      slug: 'New Balance',
      svg: (
        <svg viewBox="0 0 110 40" className="h-6 w-auto fill-current" aria-label="New Balance">
          <g transform="translate(5, 5)">
            <text x="2" y="16" fontFamily="sans-serif" fontWeight="900" fontStyle="italic" fontSize="15" fill="currentColor">
              NB
            </text>
            <text x="28" y="14" fontFamily="sans-serif" fontWeight="700" fontSize="11" letterSpacing="-0.02em" fill="currentColor">
              new balance
            </text>
          </g>
        </svg>
      ),
    },
    {
      name: 'Converse',
      slug: 'Converse',
      svg: (
        <svg viewBox="0 0 110 40" className="h-6 w-auto fill-current" aria-label="Converse">
          <g transform="translate(5, 6)">
            <path d="M12 7 L14 12 L19 12 L15 15 L16 20 L12 17 L8 20 L9 15 L5 12 L10 12 Z" fill="currentColor" />
            <path d="M22 8 L27 14 L22 20" stroke="currentColor" strokeWidth="2.5" fill="none" />
            <text x="32" y="17" fontFamily="sans-serif" fontWeight="800" fontSize="12" letterSpacing="0.08em" fill="currentColor">
              CONVERSE
            </text>
          </g>
        </svg>
      ),
    },
    {
      name: 'Vans',
      slug: 'Vans',
      svg: (
        <svg viewBox="0 0 110 40" className="h-6 w-auto fill-current" aria-label="Vans">
          <g transform="translate(5, 4)">
            <text x="2" y="16" fontFamily="sans-serif" fontWeight="900" fontSize="16" letterSpacing="0.02em" fill="currentColor">
              VANS
            </text>
            <text x="3" y="24" fontFamily="sans-serif" fontWeight="700" fontSize="7" letterSpacing="0.05em" fill="currentColor">
              "OFF THE WALL"
            </text>
          </g>
        </svg>
      ),
    },
    {
      name: 'Reebok',
      slug: 'Reebok',
      svg: (
        <svg viewBox="0 0 110 40" className="h-6 w-auto fill-current" aria-label="Reebok">
          <g transform="translate(5, 6)">
            <text x="2" y="16" fontFamily="sans-serif" fontWeight="800" fontSize="16" letterSpacing="-0.02em" fill="currentColor">
              Reebok
            </text>
            <path d="M68 6 L80 14 L68 22 M76 6 L88 14 L76 22" stroke="currentColor" strokeWidth="2" fill="none" />
          </g>
        </svg>
      ),
    },
  ];

  return (
    <section className="mb-8 sm:mb-12">
      {/* Header & View all */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#101112]">
          TOP BRANDS
        </h2>
        <button
          onClick={onViewAll}
          className="text-xs sm:text-sm font-semibold text-[#666666] hover:text-[#101112] transition-colors cursor-pointer"
        >
          View all
        </button>
      </div>

      {/* Brand Logos Row */}
      <div className="relative border-b border-[#E5E5E5] pb-5">
        <div
          ref={scrollRef}
          className="flex items-center justify-between gap-6 sm:gap-8 overflow-x-auto no-scrollbar scroll-smooth py-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {brands.map((brand) => {
            const isSelected = selectedBrand === brand.slug;
            return (
              <button
                key={brand.slug}
                onClick={() => onSelectBrand(brand.slug)}
                className={`flex-shrink-0 flex items-center justify-center px-4 py-2 rounded-lg transition-all cursor-pointer group ${
                  isSelected
                    ? 'bg-[#101112] text-white'
                    : 'text-[#101112] hover:bg-[#F1F1F1]'
                }`}
                aria-label={`Filter by ${brand.name}`}
              >
                <div className="flex items-center justify-center h-8 transition-transform group-hover:scale-105">
                  {brand.svg}
                </div>
              </button>
            );
          })}
        </div>

        {/* Scroll right arrow on desktop */}
        <button
          onClick={scrollRight}
          className="hidden lg:flex absolute right-0 top-1/2 -translate-y-[60%] w-7 h-7 rounded-full bg-white border border-[#E5E5E5] shadow-xs items-center justify-center text-[#777] hover:text-[#101112] hover:bg-[#F7F7F7] transition-all cursor-pointer"
          aria-label="Scroll brands"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
