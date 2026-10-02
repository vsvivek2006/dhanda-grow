import Link from "next/link";
import { Sparkles, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 text-center bg-[#04040f] text-slate-100 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-md space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Page Not Found • 404</span>
        </div>

        <h1 className="font-heading text-6xl md:text-7xl font-black text-gradient-brand">
          404
        </h1>

        <h2 className="text-2xl font-bold text-white">Lost in Local Cyberspace?</h2>

        <p className="text-slate-400 text-sm leading-relaxed">
          The page you are looking for doesn't exist or has been moved. Let's get you back to growing your local business.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button asChild className="w-full sm:w-auto bg-gradient-brand text-white font-bold rounded-full px-6 h-12">
            <Link href="/" className="inline-flex items-center gap-2">
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </Button>

          <Button asChild variant="outline" className="w-full sm:w-auto border-white/15 bg-white/5 hover:bg-white/10 text-white rounded-full px-6 h-12">
            <Link href="/services" className="inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Explore Services</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
