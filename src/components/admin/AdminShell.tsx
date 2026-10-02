"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ExternalLink } from "lucide-react";
import { DhandaLogo } from "@/components/ui/DhandaLogo";
import { Sidebar } from "./Sidebar";
import { AdminNotificationBell } from "./AdminNotificationBell";

interface AdminShellProps {
  userEmail?: string | null;
  children: React.ReactNode;
}

export function AdminShell({ userEmail, children }: AdminShellProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();

  // Reset top navigation progress bar on route change
  useEffect(() => {
    setIsNavigating(false);
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  // Provide instant 0ms visual feedback on admin link clicks
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (
        href &&
        href.startsWith("/admin") &&
        href !== pathname &&
        !target.getAttribute("target") &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey
      ) {
        setIsNavigating(true);
      }
    };

    document.addEventListener("click", handleLinkClick);
    return () => document.removeEventListener("click", handleLinkClick);
  }, [pathname]);

  return (
    <div className="flex h-screen w-full bg-[#04040f] text-slate-100 overflow-hidden relative font-sans">
      {/* Top Navigation Progress Indicator (0ms tactile feedback) */}
      <div
        className={`fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none transition-all duration-300 ${
          isNavigating
            ? "opacity-100 bg-gradient-to-r from-purple-500 via-yellow-400 to-indigo-500 animate-pulse w-full"
            : "opacity-0 w-0"
        }`}
      />

      {/* Persistent Desktop Sidebar & Mobile Drawer */}
      <Sidebar
        userEmail={userEmail}
        isMobileOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Navigation Header (Mobile + Desktop) */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 lg:px-8 bg-[#07071a]/95 backdrop-blur-md border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Open sidebar menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Mobile Header Title */}
            <Link
              href="/admin"
              className="lg:hidden flex items-center gap-2 text-sm font-bold text-white tracking-wide"
            >
              <DhandaLogo size="sm" />
              <span>
                Dhanda <span className="text-yellow-400">Grow</span>
              </span>
            </Link>

            {/* Desktop Breadcrumb Status */}
            <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-semibold">Dhanda Grow</span>
              <span className="text-slate-600">/</span>
              <span className="text-purple-400 font-medium font-mono text-[11px] uppercase tracking-wider">
                Admin Workspace
              </span>
            </div>
          </div>

          {/* Right Header Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              target="_blank"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 border border-white/10 transition-colors"
              title="View Live Website"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>

            <AdminNotificationBell />
          </div>
        </header>

        {/* Page Content Body with smooth scroll */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto focus:outline-none [scrollbar-width:thin] [scrollbar-color:#374151_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
          {children}
        </main>
      </div>
    </div>
  );
}
