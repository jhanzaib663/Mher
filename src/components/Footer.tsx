import React, { useState } from 'react';
import { ArrowRight, Check, Instagram, Facebook, Twitter, Disc as TikTokIcon, Phone } from 'lucide-react';

interface FooterProps {
  onNavClick: (item: string) => void;
  onOpenContact?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onOpenContact }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setIsSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-[#101112] text-white pt-12 sm:pt-16 pb-8 border-t border-neutral-800">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8 pb-12 border-b border-neutral-800 text-sm">
          {/* Col 1: Brand & Bio & Socials */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <span className="font-extrabold text-2xl tracking-tight text-white">
                SOL<span className="text-[#C7F000] inline-block font-black">EX</span>
              </span>
            </div>
            <p className="text-xs text-[#888888] leading-relaxed mb-3 max-w-xs">
              Your destination for authentic branded shoes. Quality, style, and comfort — all in one place.
            </p>

            <div className="mb-5 flex items-center gap-2 text-xs text-[#888888]">
              <Phone className="w-3.5 h-3.5 text-[#C7F000]" />
              <span>Helpline:</span>
              <a
                href="tel:+923244294513"
                className="text-white hover:text-[#C7F000] font-semibold transition-colors"
              >
                +923244294513
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 text-neutral-400">
              <a
                href="#instagram"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#C7F000] hover:text-black flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#C7F000] hover:text-black flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#C7F000] hover:text-black flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#tiktok"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#C7F000] hover:text-black flex items-center justify-center transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: SHOP */}
          <div>
            <h5 className="text-[12px] font-bold uppercase tracking-wider text-white mb-4">
              SHOP
            </h5>
            <ul className="space-y-2.5 text-xs text-[#888888]">
              {['Men', 'Women', 'Kids', 'New Arrivals', 'Sale'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onNavClick(item)}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: CUSTOMER CARE */}
          <div>
            <h5 className="text-[12px] font-bold uppercase tracking-wider text-white mb-4">
              CUSTOMER CARE
            </h5>
            <ul className="space-y-2.5 text-xs text-[#888888]">
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-white text-neutral-300 font-medium transition-colors cursor-pointer text-left"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <a
                  href="tel:+923244294513"
                  className="text-white hover:text-[#C7F000] transition-colors inline-flex items-center gap-1.5 font-semibold"
                >
                  <Phone className="w-3 h-3 text-[#C7F000]" />
                  <span>+923244294513</span>
                </a>
              </li>
              {['Shipping Info', 'Returns & Exchanges', 'FAQ', 'Size Guide'].map(
                (item) => (
                  <li key={item}>
                    <button
                      onClick={() => alert(`SOLEX Support: ${item} is available 24/7. Call +923244294513 for instant help.`)}
                      className="hover:text-white transition-colors cursor-pointer text-left"
                    >
                      {item}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Col 4: COMPANY */}
          <div>
            <h5 className="text-[12px] font-bold uppercase tracking-wider text-white mb-4">
              COMPANY
            </h5>
            <ul className="space-y-2.5 text-xs text-[#888888]">
              {['About Us', 'Careers', 'Sustainability', 'Blog', 'Store Locator'].map(
                (item) => (
                  <li key={item}>
                    <button
                      onClick={() => alert(`SOLEX: ${item}`)}
                      className="hover:text-white transition-colors cursor-pointer text-left"
                    >
                      {item}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Col 5: NEWSLETTER */}
          <div className="lg:col-span-1">
            <h5 className="text-[12px] font-bold uppercase tracking-wider text-white mb-2">
              NEWSLETTER
            </h5>
            <p className="text-xs text-[#888888] leading-relaxed mb-4">
              Subscribe for exclusive offers and new arrivals.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex items-center bg-[#1A1C1E] border border-neutral-700 rounded-lg overflow-hidden p-1 focus-within:border-[#C7F000] transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter your email"
                  className="w-full bg-transparent px-3 py-1.5 text-xs text-white placeholder:text-[#666666] focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-8 h-8 rounded bg-[#C7F000] hover:bg-[#b5db00] text-black flex items-center justify-center flex-shrink-0 transition-transform active:scale-95 cursor-pointer"
                  aria-label="Subscribe to newsletter"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {error && <p className="text-[11px] text-[#C74747]">{error}</p>}

              {isSubscribed && (
                <div className="flex items-center gap-1.5 text-[11px] text-[#C7F000] font-semibold">
                  <Check className="w-3.5 h-3.5" />
                  <span>Thank you for subscribing to SOLEX!</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#666666]">
          <p>© {new Date().getFullYear()} SOLEX Inc. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <button className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <button className="hover:text-white transition-colors cursor-pointer">
              Terms of Service
            </button>
            <button className="hover:text-white transition-colors cursor-pointer">
              Cookie Preferences
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
