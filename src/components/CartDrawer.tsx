import React, { useEffect, useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Tag, Phone } from 'lucide-react';
import { CartItem } from '../types';
import { SneakerImage } from './SneakerImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, size: number, newQty: number) => void;
  onRemoveItem: (productId: string, size: number) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
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

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'SOLEX20') {
      setDiscountPercent(20);
      setPromoSuccess('20% Discount applied!');
      setPromoError('');
    } else if (clean === 'FREESHIP') {
      setDiscountPercent(10);
      setPromoSuccess('Promo applied: 10% Off!');
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "SOLEX20"');
      setPromoSuccess('');
    }
  };

  const rawSubtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discountAmount = (rawSubtotal * discountPercent) / 100;
  const shipping = rawSubtotal >= 100 || rawSubtotal === 0 ? 0 : 12;
  const grandTotal = Math.max(0, rawSubtotal - discountAmount + shipping);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#E5E5E5] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#101112]" />
              <h2 className="text-base font-bold text-[#101112]">Shopping Bag</h2>
              <span className="text-xs bg-[#F1F1F1] text-[#777] font-bold px-2 py-0.5 rounded-full">
                {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-[#F1F1F1] flex items-center justify-center text-[#777] hover:text-[#101112] transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4 p-3 bg-[#F7F7F7] rounded-xl border border-[#EBEBEB] relative"
                >
                  {/* Sneaker Image */}
                  <div className="w-20 h-20 bg-white rounded-lg p-1 flex-shrink-0 flex items-center justify-center border border-[#E5E5E5]">
                    <SneakerImage
                      src={item.product.image}
                      alt={item.product.name}
                      category={item.product.category}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="pr-6">
                      <h4 className="text-xs sm:text-sm font-bold text-[#101112] truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-[#777] mt-0.5">
                        Size: <span className="font-semibold text-[#101112]">US {item.size}</span> •{' '}
                        {item.product.category}
                      </p>
                      <p className="text-xs font-bold text-[#101112] mt-1">
                        ${item.product.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Selector & Remove */}
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#E5E5E5]/60">
                      <div className="flex items-center border border-[#D5D5D5] rounded-md bg-white">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.size, item.quantity - 1)
                          }
                          className="w-6 h-6 flex items-center justify-center text-[#666] hover:text-black hover:bg-[#F0F0F0] rounded-l-md transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-[#101112]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.size, item.quantity + 1)
                          }
                          className="w-6 h-6 flex items-center justify-center text-[#666] hover:text-black hover:bg-[#F0F0F0] rounded-r-md transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id, item.size)}
                        className="text-[#999] hover:text-[#C74747] p-1 transition-colors cursor-pointer"
                        aria-label="Remove item"
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
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-[#101112] mb-1">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-[#777] max-w-xs mb-6">
                  Explore our collection of top-tier branded sneakers and find your perfect pair.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-[#101112] text-white hover:bg-[#C7F000] hover:text-black text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>

          {/* Footer Subtotal & Checkout Actions */}
          {cartItems.length > 0 && (
            <div className="border-t border-[#E5E5E5] px-6 py-4 bg-[#FAFAFA] space-y-3">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-[#888] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code (try SOLEX20)"
                    className="w-full pl-8 pr-2 py-1.5 bg-white border border-[#D5D5D5] rounded-md text-xs uppercase placeholder:normal-case focus:outline-none focus:border-[#101112]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#101112] text-white text-xs font-bold rounded-md hover:bg-black transition-colors"
                >
                  Apply
                </button>
              </form>

              {promoSuccess && (
                <p className="text-[11px] text-emerald-600 font-semibold">{promoSuccess}</p>
              )}
              {promoError && (
                <p className="text-[11px] text-[#C74747] font-semibold">{promoError}</p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#666]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#101112]">${rawSubtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-[#101112]">
                    {shipping === 0 ? (
                      <span className="text-emerald-600 font-bold uppercase text-[11px]">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#E5E5E5] flex justify-between text-sm font-black text-[#101112]">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Free shipping threshold progress */}
              {rawSubtotal < 100 && (
                <div className="p-2 bg-[#F1F1F1] rounded-md text-[11px] text-[#666] text-center">
                  Add <span className="font-bold text-[#101112]">${(100 - rawSubtotal).toFixed(2)}</span> more to unlock <span className="font-bold text-black">FREE Shipping</span>!
                </div>
              )}

              {/* Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3 bg-[#C7F000] hover:bg-[#b5db00] text-[#101112] text-xs sm:text-sm font-extrabold rounded-lg flex items-center justify-center gap-2 transition-transform active:scale-[0.99] shadow-sm cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="space-y-1 text-center">
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#888]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#101112]" />
                  <span>100% Authentic Guarantee & Free 30-Day Returns</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#777]">
                  <Phone className="w-3 h-3 text-[#101112]" />
                  <span>Need help? Call </span>
                  <a
                    href="tel:+923244294513"
                    className="font-bold text-[#101112] underline hover:text-black transition-colors"
                  >
                    +923244294513
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
