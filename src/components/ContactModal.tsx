import React, { useState, useEffect } from 'react';
import { X, Phone, Mail, Clock, MapPin, Send, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsSubmitted(false);
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
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl z-10 border border-[#E5E5E5] animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 w-8 h-8 rounded-full bg-[#F1F1F1] hover:bg-[#E5E5E5] flex items-center justify-center text-[#777] hover:text-[#101112] transition-colors cursor-pointer"
          aria-label="Close contact modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-6">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#777]">
            SOLEX Customer Care
          </span>
          <h2 className="text-xl font-black text-[#101112] mt-0.5">Contact Us</h2>
          <p className="text-xs text-[#666] mt-1">
            Have a question about orders, sizing, or authentication? Our dedicated team is here to help.
          </p>
        </div>

        {/* Highlighted Phone Contact Card */}
        <div className="mb-6 p-4 rounded-xl bg-[#101112] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C7F000] text-black flex items-center justify-center flex-shrink-0 font-bold">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-[#A0A0A0] font-semibold uppercase tracking-wider">
                Direct Phone Support
              </p>
              <a
                href="tel:+923244294513"
                className="text-base sm:text-lg font-black text-white hover:text-[#C7F000] transition-colors tracking-wide"
              >
                +923244294513
              </a>
            </div>
          </div>
          <a
            href="tel:+923244294513"
            className="px-4 py-2 bg-[#C7F000] hover:bg-[#b5db00] text-[#101112] text-xs font-black rounded-lg text-center transition-colors shadow-xs"
          >
            Call Now
          </a>
        </div>

        {/* Contact Info List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-xs text-[#666]">
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#F7F7F7] border border-[#EBEBEB]">
            <Clock className="w-4 h-4 text-[#101112] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#101112]">Support Hours</p>
              <p className="text-[11px] text-[#777]">Monday – Sunday • 24/7</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#F7F7F7] border border-[#EBEBEB]">
            <Mail className="w-4 h-4 text-[#101112] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#101112]">Email Inquiries</p>
              <a
                href="mailto:support@solexsneakers.com"
                className="text-[11px] text-[#777] hover:text-[#101112] underline"
              >
                support@solexsneakers.com
              </a>
            </div>
          </div>
        </div>

        {/* Quick Message Form */}
        {isSubmitted ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-emerald-900">Message Received</h4>
            <p className="text-xs text-emerald-700 mt-1">
              Thank you! Our support team will reach back via email or call you at the earliest.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#101112]">
              Send a Quick Message
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                required
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="p-2.5 bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg text-xs focus:bg-white focus:outline-none focus:border-[#101112]"
              />
              <input
                type="email"
                required
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="p-2.5 bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg text-xs focus:bg-white focus:outline-none focus:border-[#101112]"
              />
            </div>
            <textarea
              required
              rows={3}
              placeholder="How can we help with your order or sneaker inquiry?"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full p-2.5 bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg text-xs focus:bg-white focus:outline-none focus:border-[#101112]"
            />
            <button
              type="submit"
              className="w-full py-2.5 bg-[#101112] hover:bg-black text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
