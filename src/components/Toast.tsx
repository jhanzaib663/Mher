import React from 'react';
import { Check, Heart, ShoppingBag } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'cart' | 'wishlist' | 'info';
  title: string;
  message?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          onClick={() => onDismiss(toast.id)}
          className="pointer-events-auto bg-[#101112] text-white border border-neutral-700 shadow-xl rounded-xl p-3.5 flex items-center gap-3 min-w-[280px] max-w-sm animate-in slide-in-from-bottom-3 duration-200 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-[#C7F000] text-black flex items-center justify-center flex-shrink-0">
            {toast.type === 'cart' ? (
              <ShoppingBag className="w-4 h-4" />
            ) : toast.type === 'wishlist' ? (
              <Heart className="w-4 h-4 fill-black" />
            ) : (
              <Check className="w-4 h-4 stroke-[3]" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h5 className="text-xs font-bold leading-tight truncate">{toast.title}</h5>
            {toast.message && (
              <p className="text-[11px] text-[#A0A0A0] mt-0.5 truncate">{toast.message}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
