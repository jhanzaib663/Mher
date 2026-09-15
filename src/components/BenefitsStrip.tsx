import React from 'react';
import { Truck, RotateCcw, ShieldCheck, CreditCard } from 'lucide-react';

export const BenefitsStrip: React.FC = () => {
  const benefits = [
    {
      icon: <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-[#101112]" />,
      title: 'Free Shipping',
      description: 'On orders over $100',
    },
    {
      icon: <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 text-[#101112]" />,
      title: '30-Day Returns',
      description: 'Easy returns & exchanges',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#101112]" />,
      title: '100% Authentic',
      description: 'Genuine branded products',
    },
    {
      icon: <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-[#101112]" />,
      title: 'Secure Payments',
      description: 'Safe & encrypted checkout',
    },
  ];

  return (
    <section className="mb-12 sm:mb-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-[#F1F1F1] rounded-[12px] p-4 sm:p-5 flex items-center gap-3.5 sm:gap-4 transition-transform hover:-translate-y-0.5"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-white flex items-center justify-center flex-shrink-0 shadow-2xs">
              {benefit.icon}
            </div>
            <div>
              <h4 className="text-[13px] sm:text-[14px] font-bold text-[#101112] leading-tight">
                {benefit.title}
              </h4>
              <p className="text-[11px] sm:text-[12px] text-[#777777] mt-0.5 leading-snug">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
