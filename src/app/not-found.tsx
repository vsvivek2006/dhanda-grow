import Link from "next/link";
import { Sparkles, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-220px)] px-4 py-16 text-center bg-[#04040f] text-slate-100 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center text-center space-y-6">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-semibold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Error 404 • Page Not Found</span>
        </div>

        {/* 404 Large Display - explicitly wrapped in block to prevent inline bleeding */}
        <div className="block w-full text-center">
          <h1 className="block font-heading text-7xl sm:text-8xl md:text-9xl font-black bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent leading-none tracking-tight select-none">
            404
          </h1>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Lost in Local Cyberspace?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
            The page you are looking for doesn't exist, has been moved, or requires admin authentication. Let's get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 w-full sm:w-auto">
          <Button
            asChild
            className="w-full sm:w-auto bg-gradient-brand text-white font-bold rounded-xl px-6 h-12 shadow-lg shadow-purple-900/30 hover:opacity-90 transition-all cursor-pointer"
          >
            <Link href="/" className="inline-flex items-center justify-center gap-2">
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto border-white/15 bg-white/5 hover:bg-white/10 text-white rounded-xl px-6 h-12 transition-colors cursor-pointer"
          >
            <Link href="/services" className="inline-flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Explore Services</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
