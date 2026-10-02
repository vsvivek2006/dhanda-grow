import React from "react";

interface DhandaLogoIconProps {
  className?: string;
  size?: number;
}

export function DhandaLogoIcon({ className = "w-9 h-9", size = 36 }: DhandaLogoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Background rounded squircle gradient */}
        <linearGradient id="dhanda_bg_grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e1035" />
          <stop offset="50%" stopColor="#0d1127" />
          <stop offset="100%" stopColor="#080816" />
        </linearGradient>

        {/* Outer border glow gradient */}
        <linearGradient id="dhanda_border_grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
        </linearGradient>

        {/* Main "D" & Growth Arrow ribbon gradient */}
        <linearGradient id="dhanda_ribbon_grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="35%" stopColor="#9333ea" />
          <stop offset="70%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>

        {/* Dynamic Growth Surge arrow gradient */}
        <linearGradient id="dhanda_arrow_grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>

        {/* Subtle drop shadow filter for emblem depth */}
        <filter id="dhanda_glow" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Rounded Squircle Container */}
      <rect
        x="1.5"
        y="1.5"
        width="45"
        height="45"
        rx="13"
        fill="url(#dhanda_bg_grad)"
        stroke="url(#dhanda_border_grad)"
        strokeWidth="1.5"
      />

      {/* Background Tech Mesh Grid Accent */}
      <circle cx="24" cy="24" r="16" stroke="rgba(168, 85, 247, 0.12)" strokeWidth="1" strokeDasharray="2 3" />

      {/* Main Modern Stylized Geometric 'D' + Ascension Symbol */}
      <g filter="url(#dhanda_glow)">
        {/* Left vertical anchor stem with rounded caps */}
        <rect
          x="12"
          y="12"
          width="5.5"
          height="24"
          rx="2.75"
          fill="url(#dhanda_ribbon_grad)"
        />

        {/* Flowing 'D' curved loop transitioning into an ascending growth dynamic */}
        <path
          d="M17.5 14.5C25.5 14.5 32 18.5 32 24C32 29.5 25.5 33.5 17.5 33.5"
          stroke="url(#dhanda_ribbon_grad)"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Dynamic Growth Vector Arrow inside the 'D' core (Local Business Skyrocket) */}
        <path
          d="M20 28L28 20M28 20H22M28 20V26"
          stroke="url(#dhanda_arrow_grad)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* AI Radiance Spark at top-right vertex */}
        <circle cx="36" cy="12" r="2.2" fill="#38bdf8" />
        <circle cx="36" cy="12" r="4" fill="#38bdf8" opacity="0.3" />
      </g>
    </svg>
  );
}

interface DhandaLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showBadge?: boolean;
}

export function DhandaLogo({ className = "", size = "md", showBadge = true }: DhandaLogoProps) {
  const iconDimensions = {
    sm: { size: 30, text: "text-lg", badge: "text-[9px] px-1.5 py-0.5" },
    md: { size: 38, text: "text-2xl", badge: "text-[10px] px-2 py-0.5" },
    lg: { size: 48, text: "text-3xl", badge: "text-xs px-2.5 py-1" },
    xl: { size: 64, text: "text-4xl", badge: "text-sm px-3 py-1" },
  }[size];

  return (
    <div className={`flex items-center gap-2.5 group cursor-pointer ${className}`}>
      {/* Icon emblem */}
      <div className="shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1">
        <DhandaLogoIcon size={iconDimensions.size} />
      </div>

      {/* Typography Lockup */}
      <div className="flex items-center gap-1.5 leading-none select-none">
        <span className={`font-heading font-black tracking-tight text-white ${iconDimensions.text}`}>
          Dhanda
        </span>
        <span
          className={`font-heading font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent ${iconDimensions.text}`}
        >
          Grow
        </span>

        {showBadge && (
          <span
            className={`ml-1 font-mono font-bold uppercase tracking-wider text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 rounded-md ${iconDimensions.badge}`}
          >
            AI
          </span>
        )}
      </div>
    </div>
  );
}
