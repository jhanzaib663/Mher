import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, CreditCard, ShieldCheck, Lock, ArrowLeft, Phone } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onCompleteOrder: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onCompleteOrder,
}) => {
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [orderId, setOrderId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    fullName: 'Alex Vance',
    email: 'alex.vance@example.com',
    address: '742 Evergreen Terrace',
    city: 'Springfield',
    postalCode: '97477',
    cardNumber: '•••• •••• •••• 4242',
    expiry: '12/28',
    cvv: '993',
  });

  const rawSubtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = rawSubtotal >= 100 ? 0 : 12;
  const grandTotal = rawSubtotal + shipping;

  useEffect(() => {
    if (isOpen) {
      setStep('details');
      setIsProcessing(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderId(`SLX-${Math.floor(100000 + Math.random() * 900000)}`);
      setStep('success');
      onCompleteOrder();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl z-10 border border-[#E5E5E5] animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 w-8 h-8 rounded-full bg-[#F1F1F1] hover:bg-[#E5E5E5] flex items-center justify-center text-[#777] hover:text-[#101112] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {step === 'details' ? (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Lock className="w-4 h-4 text-[#101112]" />
              <h2 className="text-lg sm:text-xl font-bold text-[#101112]">
                Secure Demo Checkout
              </h2>
            </div>
            <p className="text-xs text-[#777] mb-6">
              Complete your order preview. No real funds will be charged.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Shipping Address */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#101112]">
                  Shipping Address
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="p-2.5 bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg text-xs focus:bg-white focus:outline-none focus:border-[#101112]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="p-2.5 bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg text-xs focus:bg-white focus:outline-none focus:border-[#101112]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="sm:col-span-2 p-2.5 bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg text-xs focus:bg-white focus:outline-none focus:border-[#101112]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="p-2.5 bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg text-xs focus:bg-white focus:outline-none focus:border-[#101112]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="p-2.5 bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg text-xs focus:bg-white focus:outline-none focus:border-[#101112]"
                  />
                </div>
              </div>

              {/* Payment Demo */}
              <div className="space-y-2 pt-2 border-t border-[#F0F0F0]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#101112]">
                  Payment Method (Sandbox)
                </h3>
                <div className="p-3 bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#101112]" />
                    <span className="text-xs font-semibold text-[#101112]">
                      Card Ending in 4242
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">
                    Demo Valid
                  </span>
                </div>
              </div>

              {/* Order Summary Line */}
              <div className="pt-2 border-t border-[#F0F0F0] flex justify-between items-baseline text-sm">
                <span className="text-xs text-[#777]">Order Total ({cartItems.length} items)</span>
                <span className="text-base font-black text-[#101112]">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 bg-[#C7F000] hover:bg-[#b5db00] text-[#101112] text-sm font-black rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-75"
              >
                {isProcessing ? 'Authorizing Demo Order...' : `Pay $${grandTotal.toFixed(2)}`}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#777] pt-1">
                <Phone className="w-3 h-3 text-[#101112]" />
                <span>Need ordering help? Call </span>
                <a
                  href="tel:+923244294513"
                  className="font-bold text-[#101112] hover:text-black underline transition-colors"
                >
                  +923244294513
                </a>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Step */
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-4 animate-in zoom-in">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h2 className="text-xl font-black text-[#101112] mb-1">
              Order Confirmed!
            </h2>
            <p className="text-xs text-emerald-700 font-bold mb-3">
              Order Reference: {orderId}
            </p>
            <p className="text-xs text-[#666] max-w-sm mx-auto mb-6 leading-relaxed">
              Thank you for shopping at SOLEX! A confirmation email has been dispatched to {formData.email}. Your premium footwear is being prepared for express dispatch.
            </p>

            <div className="bg-[#F9F9F9] rounded-xl p-4 mb-4 border border-[#E5E5E5] text-left text-xs space-y-2">
              <div className="flex justify-between text-[#777]">
                <span>Recipient:</span>
                <span className="font-semibold text-[#101112]">{formData.fullName}</span>
              </div>
              <div className="flex justify-between text-[#777]">
                <span>Shipping to:</span>
                <span className="font-semibold text-[#101112]">
                  {formData.address}, {formData.city}
                </span>
              </div>
              <div className="flex justify-between text-[#777]">
                <span>Est. Delivery:</span>
                <span className="font-semibold text-emerald-600">2-3 Business Days</span>
              </div>
              <div className="flex justify-between text-[#777] pt-1 border-t border-[#E5E5E5]">
                <span>Support Line:</span>
                <a
                  href="tel:+923244294513"
                  className="font-bold text-[#101112] hover:text-[#C7F000] underline"
                >
                  +923244294513
                </a>
              </div>
            </div>

            <p className="text-[11px] text-[#888] mb-6">
              Need changes or tracking support? Call Customer Care at{' '}
              <a
                href="tel:+923244294513"
                className="font-bold text-[#101112] underline hover:text-black"
              >
                +923244294513
              </a>
            </p>

            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#101112] text-white hover:bg-[#C7F000] hover:text-black text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
