import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User, Menu, X, Phone } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAccount: () => void;
  onOpenContact?: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectNav: (item: string) => void;
  activeNav: string;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAccount,
  onOpenContact,
  searchQuery,
  onSearchChange,
  onSelectNav,
  activeNav,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const navLinks = [
    { label: 'Men', value: 'Men' },
    { label: 'Women', value: 'Women' },
    { label: 'Kids', value: 'Kids' },
    { label: 'Brands', value: 'Brands' },
    { label: 'New Arrivals', value: 'New Arrivals' },
    { label: 'Sale', value: 'Sale', isSale: true },
  ];

  const handleNavClick = (value: string) => {
    onSelectNav(value);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E5E5E5] transition-all">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4">
        {/* Left: SOLEX Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('All')}
            className="flex items-center text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C7F000]"
            aria-label="SOLEX Home"
          >
            <span className="font-extrabold text-2xl sm:text-3xl tracking-tight text-[#101112]">
              SOL<span className="text-[#C7F000] inline-block font-black">EX</span>
            </span>
          </button>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-[13px] lg:text-[14px] font-semibold">
          {navLinks.map((link) => {
            const isActive = activeNav === link.value;
            return (
              <button
                key={link.value}
                onClick={() => handleNavClick(link.value)}
                className={`relative py-1 transition-colors hover:text-[#101112] ${
                  link.isSale
                    ? 'text-[#C74747] hover:text-[#A83232]'
                    : isActive
                    ? 'text-[#101112]'
                    : 'text-[#555555]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-[#101112]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Search, Wishlist, Cart, Account */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Bar - Desktop */}
          <div className="relative hidden sm:block w-44 lg:w-56">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search sneakers..."
              className="w-full pl-9 pr-3 py-1.5 bg-[#F1F1F1] hover:bg-[#ECECEC] focus:bg-white text-[13px] rounded-md border border-transparent focus:border-[#E5E5E5] focus:outline-none transition-all placeholder:text-[#888888]"
            />
            <Search className="w-4 h-4 text-[#777777] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#888] hover:text-black"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Toggle - Mobile */}
          <button
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            className="sm:hidden w-10 h-10 flex items-center justify-center rounded-md hover:bg-[#F1F1F1] text-[#101112] transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative w-10 h-10 flex items-center justify-center rounded-md hover:bg-[#F1F1F1] text-[#101112] transition-colors"
            aria-label={`Wishlist, ${wishlistCount} items`}
          >
            <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-[#101112] text-[#101112]' : ''}`} />
            {wishlistCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[17px] h-[17px] px-1 bg-[#101112] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart / Shopping Bag Button */}
          <button
            onClick={onOpenCart}
            className="relative w-10 h-10 flex items-center justify-center rounded-md hover:bg-[#F1F1F1] text-[#101112] transition-colors"
            aria-label={`Shopping Bag, ${cartCount} items`}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[17px] h-[17px] px-1 bg-[#C7F000] text-black text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* Account Button */}
          <button
            onClick={onOpenAccount}
            className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-[#F1F1F1] text-[#101112] transition-colors"
            aria-label="Account profile"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-md hover:bg-[#F1F1F1] text-[#101112] transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Dropdown */}
      {isSearchExpanded && (
        <div className="sm:hidden px-4 pb-3 pt-1 border-t border-[#E5E5E5] bg-white">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search sneakers by name, brand, category..."
              autoFocus
              className="w-full pl-9 pr-8 py-2 bg-[#F1F1F1] text-[14px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#101112]"
            />
            <Search className="w-4 h-4 text-[#777777] absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                aria-label="Clear input"
              >
                <X className="w-4 h-4 text-[#777]" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E5E5E5] bg-white px-4 py-4 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => handleNavClick(link.value)}
                className={`flex items-center justify-between p-3 rounded-lg text-left text-sm font-semibold transition-colors ${
                  activeNav === link.value
                    ? 'bg-[#101112] text-white'
                    : link.isSale
                    ? 'bg-red-50 text-[#C74747]'
                    : 'bg-[#F1F1F1] text-[#101112]'
                }`}
              >
                <span>{link.label}</span>
                {link.isSale && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-[#C74747] text-white rounded">
                    Sale
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-[#E5E5E5] flex items-center justify-between text-xs text-[#777]">
            <a
              href="tel:+923244294513"
              className="flex items-center gap-1.5 text-[#101112] font-semibold hover:text-[#C7F000] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#101112]" />
              <span>+923244294513</span>
            </a>
            <div className="flex items-center gap-3">
              {onOpenContact && (
                <button
                  onClick={() => {
                    onOpenContact();
                    setMobileMenuOpen(false);
                  }}
                  className="text-[#666] hover:text-[#101112] transition-colors"
                >
                  Contact Us
                </button>
              )}
              <button
                onClick={() => {
                  onOpenAccount();
                  setMobileMenuOpen(false);
                }}
                className="text-[#101112] font-semibold underline"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
