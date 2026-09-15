import React, { useState, useEffect } from 'react';
import { X, User, Package, Heart, LogOut, Check, Phone } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWishlist: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  onOpenWishlist,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState('Alex Vance');
  const [email, setEmail] = useState('alex.vance@example.com');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification('Profile preferences updated.');
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-xs" />

      <div className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl z-10 border border-[#E5E5E5] animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 w-8 h-8 rounded-full bg-[#F1F1F1] hover:bg-[#E5E5E5] flex items-center justify-center text-[#777] hover:text-black"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#E5E5E5]">
          <div className="w-12 h-12 rounded-full bg-[#101112] text-[#C7F000] flex items-center justify-center font-black text-lg">
            {userName.charAt(0)}
          </div>
          <div>
            <h3 className="text-base font-bold text-[#101112] leading-tight">{userName}</h3>
            <p className="text-xs text-[#777]">{email}</p>
            <span className="inline-block mt-1 text-[10px] font-extrabold uppercase bg-[#C7F000] text-black px-1.5 py-0.5 rounded">
              SOLEX VIP Member
            </span>
          </div>
        </div>

        {/* Quick Menu */}
        <div className="space-y-2 mb-6">
          <button
            onClick={() => {
              onClose();
              onOpenWishlist();
            }}
            className="w-full p-3 bg-[#F7F7F7] hover:bg-[#F0F0F0] rounded-xl flex items-center justify-between text-xs font-bold text-[#101112] transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Heart className="w-4 h-4 text-[#101112]" />
              <span>My Saved Wishlist</span>
            </div>
            <span className="text-[#888]">View</span>
          </button>

          <div className="p-3 bg-[#F7F7F7] rounded-xl flex items-center justify-between text-xs font-bold text-[#101112]">
            <div className="flex items-center gap-2.5">
              <Package className="w-4 h-4 text-[#101112]" />
              <span>Recent Orders (1 active)</span>
            </div>
            <span className="text-emerald-600 font-semibold">In Transit</span>
          </div>

          <a
            href="tel:+923244294513"
            className="w-full p-3 bg-[#F7F7F7] hover:bg-[#F0F0F0] rounded-xl flex items-center justify-between text-xs font-bold text-[#101112] transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#101112]" />
              <span>Customer Care</span>
            </div>
            <span className="text-[#101112] font-extrabold">+923244294513</span>
          </a>
        </div>

        {/* Edit profile */}
        <form onSubmit={handleSave} className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#101112]">
            Account Details
          </h4>
          <div>
            <label className="text-[11px] text-[#777] font-semibold block mb-1">Full Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-3 py-2 bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg text-xs font-medium focus:bg-white focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="text-[11px] text-[#777] font-semibold block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg text-xs font-medium focus:bg-white focus:outline-none focus:border-black"
            />
          </div>

          {notification && (
            <div className="flex items-center gap-1 text-xs text-emerald-600 font-bold">
              <Check className="w-3.5 h-3.5" />
              <span>{notification}</span>
            </div>
          )}

          <div className="pt-2 flex gap-2">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-[#101112] text-white hover:bg-black rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              Update Profile
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-[#F1F1F1] text-[#666] hover:text-black rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
