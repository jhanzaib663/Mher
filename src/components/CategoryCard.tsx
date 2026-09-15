import React from 'react';
import { CategoryItem, Product } from '../types';
import { SneakerImage } from './SneakerImage';

interface CategoryCardProps {
  category: CategoryItem;
  isSelected: boolean;
  onSelect: (category: Product['category']) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isSelected,
  onSelect,
}) => {
  return (
    <button
      onClick={() => onSelect(category.slug)}
      className={`group flex flex-col items-center justify-between p-3.5 sm:p-4 rounded-[12px] transition-all text-center cursor-pointer border ${
        isSelected
          ? 'bg-[#101112] text-white border-[#101112] shadow-sm'
          : 'bg-[#F1F1F1] hover:bg-[#EAEAEA] text-[#101112] border-transparent'
      }`}
    >
      {/* Category Sneaker Image Area */}
      <div className="w-full h-20 sm:h-24 flex items-center justify-center mb-2 overflow-hidden">
        <SneakerImage
          src={category.image}
          alt={category.name}
          category={category.name}
          className="w-full h-full object-contain transform transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Label */}
      <span className="text-[13px] sm:text-[14px] font-semibold tracking-tight whitespace-nowrap">
        {category.name}
      </span>
    </button>
  );
};
