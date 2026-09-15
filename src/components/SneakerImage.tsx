import React, { useState } from 'react';

interface SneakerImageProps {
  src: string;
  alt: string;
  className?: string;
  category?: string;
}

export const SneakerImage: React.FC<SneakerImageProps> = ({
  src,
  alt,
  className = '',
  category = 'Sneakers',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError) {
    // Elegant fallback SVG sneaker silhouette matching the exact aesthetic
    return (
      <div className={`flex items-center justify-center bg-[#EFEFEF] text-[#888] relative overflow-hidden ${className}`}>
        <svg
          viewBox="0 0 200 120"
          className="w-4/5 h-4/5 opacity-70 transform -rotate-12 transition-transform duration-300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 95C25 95 35 96 50 96C80 96 110 94 140 94C165 94 185 88 190 70C192 63 186 52 175 48C162 43 148 40 135 40C125 40 115 32 105 25C95 18 82 15 70 20C65 22 55 30 50 42C46 52 38 65 30 75C24 82 18 90 20 95Z"
            fill="#D4D4D4"
          />
          <path
            d="M30 75C45 75 75 72 100 68C125 64 155 58 175 48"
            stroke="#101112"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="160" cy="80" r="6" fill="#C7F000" />
          <path
            d="M60 40L75 52M75 35L90 47M90 30L105 42"
            stroke="#101112"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M15 95H195"
            stroke="#101112"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute bottom-2 text-[10px] font-semibold tracking-wider uppercase text-neutral-500">
          {category}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden flex items-center justify-center ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#EFEFEF] animate-pulse rounded-md" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-contain transition-all duration-300 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      />
    </div>
  );
};
