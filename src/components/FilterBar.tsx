import React from 'react';
import { SlidersHorizontal, RotateCcw, Check } from 'lucide-react';
import { FilterOptions } from '../types';

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: Partial<FilterOptions>) => void;
  onResetFilters: () => void;
  totalCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalCount,
}) => {
  const genderTabs = ['All', 'Men', 'Women', 'Kids'];
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
  ];

  const brandList = [
    'All Brands',
    'Nike',
    'Adidas',
    'Puma',
    'New Balance',
    'Converse',
    'Vans',
    'Reebok',
    'Jordan',
  ];

  const hasActiveFilters =
    filters.category !== 'All' ||
    filters.brand !== 'All' ||
    filters.gender !== 'All' ||
    filters.searchQuery !== '' ||
    filters.onlySale ||
    filters.sortBy !== 'featured';

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-xl p-3 sm:p-4 mb-6 transition-all">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        {/* Left: Gender Segmented Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
          {genderTabs.map((tab) => {
            const isSelected = filters.gender === tab;
            return (
              <button
                key={tab}
                onClick={() => onFilterChange({ gender: tab })}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-[13px] font-bold tracking-tight transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#101112] text-white shadow-xs'
                    : 'bg-[#F1F1F1] text-[#666666] hover:bg-[#E5E5E5] hover:text-[#101112]'
                }`}
              >
                {tab === 'All' ? 'All Genders' : tab}
              </button>
            );
          })}

          {/* Sale Filter Pill */}
          <button
            onClick={() => onFilterChange({ onlySale: !filters.onlySale })}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-[13px] font-bold tracking-tight transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
              filters.onlySale
                ? 'bg-[#C74747] text-white'
                : 'bg-[#F1F1F1] text-[#C74747] hover:bg-red-50'
            }`}
          >
            {filters.onlySale && <Check className="w-3 h-3 stroke-[3]" />}
            <span>Sale Only</span>
          </button>
        </div>

        {/* Right Controls: Brand Filter & Sort Dropdown */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-[13px]">
          {/* Brand Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-[#888888] hidden lg:inline font-medium">Brand:</span>
            <select
              value={filters.brand}
              onChange={(e) => onFilterChange({ brand: e.target.value })}
              className="px-2.5 py-1.5 bg-[#F1F1F1] hover:bg-[#EAEAEA] rounded-lg border border-transparent focus:border-[#CCCCCC] focus:outline-none font-semibold text-[#101112] cursor-pointer"
            >
              {brandList.map((brand) => (
                <option key={brand} value={brand === 'All Brands' ? 'All' : brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-[#888888] hidden lg:inline font-medium">Sort:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as FilterOptions['sortBy'] })}
              className="px-2.5 py-1.5 bg-[#F1F1F1] hover:bg-[#EAEAEA] rounded-lg border border-transparent focus:border-[#CCCCCC] focus:outline-none font-semibold text-[#101112] cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-[#666666] hover:text-[#101112] bg-[#F1F1F1] hover:bg-[#E5E5E5] rounded-lg transition-colors cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          {/* Result Count */}
          <div className="text-xs text-[#888888] font-medium ml-auto sm:ml-0">
            <span className="font-bold text-[#101112]">{totalCount}</span> styles
          </div>
        </div>
      </div>

      {/* Active filters pill list if active */}
      {hasActiveFilters && (
        <div className="mt-3 pt-2.5 border-t border-[#F0F0F0] flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[#888888]">Active filters:</span>
          {filters.category !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#101112] text-white rounded-md text-[11px] font-semibold">
              Category: {filters.category}
              <button
                onClick={() => onFilterChange({ category: 'All' })}
                className="hover:text-[#C7F000] ml-0.5"
              >
                ×
              </button>
            </span>
          )}
          {filters.brand !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#101112] text-white rounded-md text-[11px] font-semibold">
              Brand: {filters.brand}
              <button
                onClick={() => onFilterChange({ brand: 'All' })}
                className="hover:text-[#C7F000] ml-0.5"
              >
                ×
              </button>
            </span>
          )}
          {filters.gender !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#101112] text-white rounded-md text-[11px] font-semibold">
              Gender: {filters.gender}
              <button
                onClick={() => onFilterChange({ gender: 'All' })}
                className="hover:text-[#C7F000] ml-0.5"
              >
                ×
              </button>
            </span>
          )}
          {filters.searchQuery && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#101112] text-white rounded-md text-[11px] font-semibold">
              Search: "{filters.searchQuery}"
              <button
                onClick={() => onFilterChange({ searchQuery: '' })}
                className="hover:text-[#C7F000] ml-0.5"
              >
                ×
              </button>
            </span>
          )}
          {filters.onlySale && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#C74747] text-white rounded-md text-[11px] font-semibold">
              On Sale
              <button
                onClick={() => onFilterChange({ onlySale: false })}
                className="hover:text-black ml-0.5"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};
