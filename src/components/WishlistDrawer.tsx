import React, { useEffect } from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { SneakerImage } from './SneakerImage';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onMoveToCart,
}) => {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#E5E5E5] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#101112] fill-[#101112]" />
              <h2 className="text-base font-bold text-[#101112]">Saved Wishlist</h2>
              <span className="text-xs bg-[#F1F1F1] text-[#777] font-bold px-2 py-0.5 rounded-full">
                {wishlistProducts.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-[#F1F1F1] flex items-center justify-center text-[#777] hover:text-[#101112] transition-colors cursor-pointer"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {wishlistProducts.length > 0 ? (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3.5 bg-[#F7F7F7] rounded-xl border border-[#EBEBEB] relative"
                >
                  <div className="w-20 h-20 bg-white rounded-lg p-1 flex-shrink-0 flex items-center justify-center border border-[#E5E5E5]">
                    <SneakerImage
                      src={product.image}
                      alt={product.name}
                      category={product.category}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#101112] truncate">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-[#777] mt-0.5">
                        {product.brand} • {product.gender}
                      </p>
                      <p className="text-xs font-bold text-[#101112] mt-1">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-2 pt-1 border-t border-[#E5E5E5]/60">
                      <button
                        onClick={() => onMoveToCart(product)}
                        className="flex-1 py-1 px-2.5 bg-[#101112] text-white hover:bg-[#C7F000] hover:text-black rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>

                      <button
                        onClick={() => onRemoveFromWishlist(product)}
                        className="p-1 text-[#999] hover:text-[#C74747] transition-colors cursor-pointer"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 bg-[#F1F1F1] rounded-full flex items-center justify-center text-[#999] mb-3">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-[#101112] mb-1">
                  Your wishlist is empty
                </h3>
                <p className="text-xs text-[#777] max-w-xs mb-6">
                  Save sneakers you love by clicking the heart icon on any card.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-[#101112] text-white hover:bg-[#C7F000] hover:text-black text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
