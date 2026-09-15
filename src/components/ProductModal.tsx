import React, { useState, useEffect } from 'react';
import { X, Star, Heart, ShoppingBag, ShieldCheck, Truck, RotateCcw, Check } from 'lucide-react';
import { Product } from '../types';
import { SneakerImage } from './SneakerImage';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, size: number, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  useEffect(() => {
    if (product && product.sizes.length > 0) {
      setSelectedSize(product.sizes[2] || product.sizes[0]);
      setQuantity(1);
      setAddedSuccess(false);
      setSizeError(false);
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    onAddToCart(product, selectedSize, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-2xl max-w-3xl w-full p-5 sm:p-8 shadow-2xl z-10 overflow-hidden border border-[#E5E5E5] animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 w-9 h-9 rounded-full bg-[#F1F1F1] hover:bg-[#E5E5E5] flex items-center justify-center text-[#101112] transition-colors cursor-pointer z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
          {/* Left: Product Image Showcase */}
          <div className="bg-[#F7F7F7] rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center relative min-h-[260px] sm:min-h-[340px] border border-[#EBEBEB]">
            {product.isSale && (
              <span className="absolute top-4 left-4 px-2.5 py-1 bg-[#C74747] text-white text-[10px] font-bold uppercase tracking-wider rounded">
                Sale
              </span>
            )}
            {product.isNew && !product.isSale && (
              <span className="absolute top-4 left-4 px-2.5 py-1 bg-[#101112] text-white text-[10px] font-bold uppercase tracking-wider rounded">
                New Arrival
              </span>
            )}

            <div className="w-full h-52 sm:h-64 flex items-center justify-center transform -rotate-6 hover:rotate-0 transition-transform duration-300">
              <SneakerImage
                src={product.image}
                alt={product.name}
                category={product.category}
                className="w-full h-full object-contain filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.12)]"
              />
            </div>

            {product.colorway && (
              <span className="text-[11px] font-semibold text-[#888888] mt-2">
                Color: {product.colorway}
              </span>
            )}
          </div>

          {/* Right: Product Info & Purchase Controls */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Brand & Category */}
              <div className="flex items-center justify-between text-xs text-[#777] mb-1.5">
                <span className="font-bold uppercase tracking-wider text-[#101112]">
                  {product.brand}
                </span>
                <span>{product.gender === 'Unisex' ? 'Unisex' : `${product.gender}'s`} • {product.category}</span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-black text-[#101112] leading-tight mb-2">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1 text-xs">
                  <Star className="w-4 h-4 fill-[#FBBF24] text-[#FBBF24]" />
                  <span className="font-bold text-[#101112]">{product.rating.toFixed(1)}</span>
                  <span className="text-[#888]">({product.reviewCount} customer reviews)</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2.5 mb-5 pb-4 border-b border-[#EBEBEB]">
                <span className="text-2xl font-black text-[#101112]">
                  ${product.price.toFixed(2)}
                </span>
                {product.oldPrice && (
                  <span className="text-sm text-[#999] line-through font-semibold">
                    ${product.oldPrice.toFixed(2)}
                  </span>
                )}
                {product.oldPrice && (
                  <span className="text-xs font-bold text-[#C74747] bg-red-50 px-2 py-0.5 rounded">
                    Save ${(product.oldPrice - product.price).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-[#666] leading-relaxed mb-5">
                {product.description || 'Crafted with premium materials and signature cushioning technology for maximum durability and comfort.'}
              </p>

              {/* Size Selector */}
              <div className="mb-5">
                <div className="flex items-center justify-between text-xs font-bold text-[#101112] mb-2">
                  <span>Select Size (US)</span>
                  {sizeError && (
                    <span className="text-[#C74747] text-[11px] font-medium">
                      Please choose a size
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => {
                          setSelectedSize(size);
                          setSizeError(false);
                        }}
                        className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#101112] text-white border-[#101112] shadow-xs'
                            : 'bg-white text-[#101112] border-[#E0E0E0] hover:border-[#101112]'
                        }`}
                      >
                        US {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Actions: Add to Bag & Wishlist */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAdd}
                  disabled={addedSuccess}
                  className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    addedSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#C7F000] hover:bg-[#b5db00] text-[#101112] active:scale-[0.98]'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag • ${(product.price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>

                {/* Wishlist toggle */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className="w-12 h-12 rounded-xl border border-[#E0E0E0] hover:border-[#101112] flex items-center justify-center text-[#101112] transition-colors cursor-pointer"
                  aria-label="Wishlist toggle"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isWishlisted ? 'fill-[#101112] text-[#101112]' : 'text-[#555]'
                    }`}
                  />
                </button>
              </div>

              {/* Guarantees strip */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-[#777] pt-2">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#101112]" />
                  <span>Free shipping over $100</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#101112]" />
                  <span>Verified 100% authentic</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
