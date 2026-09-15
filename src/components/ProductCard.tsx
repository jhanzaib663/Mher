import React from 'react';
import { Heart, Star, Plus } from 'lucide-react';
import { Product } from '../types';
import { SneakerImage } from './SneakerImage';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
  onQuickAdd,
}) => {
  // Format review count (e.g., 2400 -> "2.4k")
  const formatReviews = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1).replace('.0', '')}k`;
    }
    return count.toString();
  };

  return (
    <div className="group relative bg-[#F7F7F7] sm:bg-white border border-[#EBEBEB] hover:border-[#D6D6D6] rounded-[14px] p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-200 hover:shadow-md">
      {/* Top Bar: Badges & Wishlist Button */}
      <div className="flex items-center justify-between gap-2 mb-1 z-10">
        <div className="flex items-center gap-1.5">
          {product.isSale && (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#C74747] text-white rounded">
              Sale
            </span>
          )}
          {product.isNew && !product.isSale && (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#101112] text-white rounded">
              New
            </span>
          )}
        </div>

        {/* Heart Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className="w-8 h-8 rounded-full bg-white sm:bg-[#F5F5F5] hover:bg-[#EAEAEA] flex items-center justify-center text-[#101112] transition-colors cursor-pointer shadow-2xs"
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-200 active:scale-125 ${
              isWishlisted
                ? 'fill-[#101112] text-[#101112]'
                : 'text-[#555] hover:text-[#101112]'
            }`}
          />
        </button>
      </div>

      {/* Sneaker Image Area (Clickable to open modal) */}
      <div
        onClick={() => onSelectProduct(product)}
        className="w-full h-36 sm:h-44 my-2 flex items-center justify-center cursor-pointer overflow-hidden relative"
      >
        <SneakerImage
          src={product.image}
          alt={product.name}
          category={product.category}
          className="w-full h-full object-contain transform transition-transform duration-300 group-hover:scale-108 group-hover:-rotate-3"
        />

        {/* Quick Add overlay button on hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickAdd(product);
          }}
          className="hidden sm:flex absolute bottom-2 right-2 w-8 h-8 rounded-full bg-[#101112] text-white hover:bg-[#C7F000] hover:text-black opacity-0 group-hover:opacity-100 transition-all duration-200 items-center justify-center shadow-md cursor-pointer"
          title="Quick add to bag"
          aria-label={`Quick add ${product.name} to bag`}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Product Details */}
      <div className="pt-2 border-t border-[#F0F0F0] flex flex-col justify-between flex-grow">
        <div>
          {/* Product Name */}
          <h3
            onClick={() => onSelectProduct(product)}
            className="text-[13px] sm:text-[14px] font-semibold text-[#101112] leading-tight truncate hover:underline cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Subtitle / Gender / Category */}
          <p className="text-[11px] sm:text-[12px] text-[#777777] mt-0.5">
            {product.gender === 'Unisex' ? 'Unisex Shoes' : `${product.gender}'s Shoes`}
          </p>
        </div>

        {/* Bottom Row: Price & Rating */}
        <div className="flex items-center justify-between mt-3 pt-1">
          {/* Price */}
          <div className="flex items-baseline gap-1.5">
            <span className="text-[13px] sm:text-[14px] font-bold text-[#101112]">
              ${product.price.toFixed(2)}
            </span>
            {product.oldPrice && (
              <span className="text-[11px] sm:text-[12px] text-[#999999] line-through">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Star Rating & Review Count */}
          <div className="flex items-center gap-1 text-[11px] sm:text-[12px] text-[#666666]">
            <Star className="w-3.5 h-3.5 fill-[#FBBF24] text-[#FBBF24]" />
            <span className="font-semibold text-[#101112]">{product.rating.toFixed(1)}</span>
            <span className="text-[#888888]">({formatReviews(product.reviewCount)})</span>
          </div>
        </div>

        {/* Mobile Quick Add Button */}
        <button
          onClick={() => onQuickAdd(product)}
          className="sm:hidden mt-3 w-full py-1.5 bg-[#101112] text-white text-[11px] font-bold rounded-md hover:bg-[#C7F000] hover:text-black transition-colors"
        >
          Add to Bag
        </button>
      </div>
    </div>
  );
};
