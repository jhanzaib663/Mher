import React from 'react';
import { RotateCcw, SearchX } from 'lucide-react';
import { Product, FilterOptions } from '../types';
import { ProductCard } from './ProductCard';
import { FilterBar } from './FilterBar';

interface ProductGridProps {
  products: Product[];
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  filters: FilterOptions;
  onFilterChange: (filters: Partial<FilterOptions>) => void;
  onResetFilters: () => void;
  onViewAll?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onSelectProduct,
  onQuickAdd,
  filters,
  onFilterChange,
  onResetFilters,
  onViewAll,
}) => {
  return (
    <section id="featured-products" className="mb-10 sm:mb-14 scroll-mt-20">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#101112]">
          FEATURED PRODUCTS
        </h2>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-xs sm:text-sm font-semibold text-[#666666] hover:text-[#101112] transition-colors cursor-pointer"
          >
            View all
          </button>
        )}
      </div>

      {/* Filter and Sorting Bar */}
      <FilterBar
        filters={filters}
        onFilterChange={onFilterChange}
        onResetFilters={onResetFilters}
        totalCount={products.length}
      />

      {/* Products Grid or Polished Empty State */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlistIds.has(product.id)}
              onToggleWishlist={onToggleWishlist}
              onSelectProduct={onSelectProduct}
              onQuickAdd={onQuickAdd}
            />
          ))}
        </div>
      ) : (
        /* Empty State with Reset Filters */
        <div className="bg-white border border-[#E5E5E5] rounded-2xl p-8 sm:p-12 text-center flex flex-col items-center justify-center my-6">
          <div className="w-14 h-14 bg-[#F1F1F1] rounded-full flex items-center justify-center text-[#777777] mb-3">
            <SearchX className="w-7 h-7" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#101112] mb-1">
            No matching sneakers found
          </h3>
          <p className="text-xs sm:text-sm text-[#777777] max-w-sm mb-6">
            We couldn't find any shoes matching your current filter criteria. Try resetting or adjusting your search terms.
          </p>
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#101112] text-white hover:bg-[#C7F000] hover:text-black text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </section>
  );
};
