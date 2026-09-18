import React from 'react';

export const HeroIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`hero-illustration-wrapper ${className}`}>
      <svg
        width="260"
        height="140"
        viewBox="0 0 260 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hero-svg"
      >
        <defs>
          <linearGradient id="hero-grad-primary" x1="0" y1="0" x2="260" y2="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#635BFF" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id="card-grad-1" x1="20" y1="20" x2="140" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F9FAFB" />
          </linearGradient>
          <linearGradient id="accent-pill" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#635BFF" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>
          <filter id="soft-shadow" x="0" y="0" width="280" height="160" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#111827" floodOpacity="0.06" />
          </filter>
        </defs>

        {/* Ambient background blob */}
        <path
          d="M20 50C20 25 40 10 90 10C160 10 240 20 240 70C240 120 180 135 110 135C40 135 20 100 20 50Z"
          fill="url(#hero-grad-primary)"
        />

        {/* Floating document card background */}
        <g filter="url(#soft-shadow)">
          <rect x="55" y="22" width="150" height="96" rx="14" fill="url(#card-grad-1)" stroke="#E5E7EB" strokeWidth="1.5" />
          
          {/* Card header elements */}
          <rect x="75" y="40" width="36" height="6" rx="3" fill="#635BFF" />
          <rect x="75" y="52" width="70" height="4" rx="2" fill="#9CA3AF" />
          <rect x="75" y="62" width="50" height="4" rx="2" fill="#E5E7EB" />
          
          {/* Checkmark circle */}
          <circle cx="172" cy="46" r="12" fill="#EEEDFF" />
          <path d="M167 46L170.5 49.5L177 43" stroke="#635BFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

          {/* Progress bar line */}
          <rect x="75" y="82" width="110" height="6" rx="3" fill="#F3F4F6" />
          <rect x="75" y="82" width="72" height="6" rx="3" fill="url(#accent-pill)" />

          {/* Status pill mock */}
          <rect x="75" y="96" width="48" height="12" rx="6" fill="#ECFDF5" />
          <circle cx="83" cy="102" r="2.5" fill="#10B981" />
          <rect x="89" y="100" width="26" height="4" rx="2" fill="#059669" />
        </g>

        {/* Floating mini status badge top right */}
        <g filter="url(#soft-shadow)">
          <rect x="185" y="14" width="62" height="28" rx="8" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1" />
          <circle cx="199" cy="28" r="4" fill="#3B82F6" />
          <rect x="207" y="26" width="30" height="4" rx="2" fill="#4B5563" />
        </g>

        {/* Decorative sparkles/dots */}
        <circle cx="45" cy="35" r="3" fill="#635BFF" opacity="0.6" />
        <circle cx="35" cy="85" r="4" fill="#8B5CF6" opacity="0.4" />
        <circle cx="225" cy="95" r="3" fill="#10B981" opacity="0.6" />
      </svg>
    </div>
  );
};
