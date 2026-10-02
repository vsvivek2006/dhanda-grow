"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime error caught by boundary:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center bg-[#04040f] text-slate-100 relative overflow-hidden">
      <div className="relative z-10 max-w-md space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto text-rose-400">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <h1 className="font-heading text-3xl font-bold text-white">Something Went Wrong</h1>

        <p className="text-slate-400 text-sm leading-relaxed">
          An unexpected glitch occurred while loading this page. Our engineers have been alerted. You can retry or head back home.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            onClick={() => reset()}
            className="w-full sm:w-auto bg-gradient-brand text-white font-bold rounded-full px-6 h-12"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto border-white/15 bg-white/5 hover:bg-white/10 text-white rounded-full px-6 h-12"
          >
            <Link href="/" className="inline-flex items-center gap-2">
              <Home className="w-4 h-4" />
              <span>Back Home</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
