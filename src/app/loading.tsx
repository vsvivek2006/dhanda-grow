import { DhandaLogoIcon } from "@/components/ui/DhandaLogo";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-[#04040f] text-slate-100">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing pulsing orb */}
        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-purple-600/30 via-pink-600/20 to-cyan-500/30 blur-xl animate-pulse" />

        {/* Orbiting border beam effect */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 via-cyan-400 to-indigo-500 opacity-60 blur-sm animate-spin [animation-duration:4s]" />

        {/* Brand Emblem */}
        <div className="relative w-16 h-16 rounded-2xl bg-[#09091b] border border-white/20 flex items-center justify-center shadow-2xl z-10">
          <DhandaLogoIcon size={44} className="animate-pulse" />
        </div>
      </div>

      {/* Brand title & loading status */}
      <div className="mt-7 flex flex-col items-center gap-1.5 z-10">
        <div className="flex items-center gap-1 text-base font-bold tracking-tight">
          <span className="text-white">Dhanda</span>
          <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Grow
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>Starting AI Engine...</span>
        </div>
      </div>
    </div>
  );
}
