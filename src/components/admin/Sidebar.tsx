"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  PlusCircle,
  ExternalLink,
  X,
  LogOut,
  Loader2,
  Sparkles,
} from "lucide-react";
import { DhandaLogo } from "@/components/ui/DhandaLogo";

interface SidebarProps {
  userEmail?: string | null;
  isMobileOpen?: boolean;
  onClose?: () => void;
}

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    title: "Content",
    items: [
      { label: "Blog Posts", href: "/admin/blog", icon: FileText, exact: true },
      { label: "Create Post", href: "/admin/blog/new", icon: PlusCircle },
    ],
  },
];

export function Sidebar({
  userEmail = "admin@dhandhagrow.com",
  isMobileOpen = false,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const { supabase } = await import("@/lib/supabase/client");
      await supabase.auth.signOut();
      await fetch("/api/auth/signout", { method: "POST" });
      window.location.href = "/login";
    } catch {
      window.location.href = "/login";
    }
  };

  const navContent = (
    <div className="flex flex-col h-full bg-gray-900 border-r border-gray-800">
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-gray-800 shrink-0">
        <Link
          href="/admin/blog"
          className="flex items-center gap-2.5 group"
          onClick={onClose}
        >
          <DhandaLogo size="sm" />
          <div>
            <div className="text-sm font-bold tracking-tight text-white leading-none">
              Dhanda <span className="text-yellow-400">Grow</span>
            </div>
            <p className="text-[10px] text-gray-400 font-medium mt-1">
              Admin Blog Studio
            </p>
          </div>
        </Link>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Primary Action Button: Create Post */}
      <div className="px-3 pt-3 pb-1 shrink-0">
        <Link
          href="/admin/blog/new"
          onClick={onClose}
          className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-all shadow-md shadow-purple-900/40 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 text-yellow-300" />
          <span>Create Post</span>
        </Link>
      </div>

      {/* Navigation Groups - ONLY BLOG */}
      <div className="flex-1 overflow-y-auto min-h-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <nav className="p-3 space-y-3">
          {navGroups.map((group) => (
            <div key={group.title} className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono">
                {group.title}
              </div>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = item.exact
                  ? pathname === item.href
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? "bg-purple-600/20 text-purple-300 border border-purple-500/30 font-semibold"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <Icon
                      className={`w-3.5 h-3.5 transition-colors ${
                        isActive ? "text-yellow-400" : "text-gray-400"
                      }`}
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          ))}

          {/* Public Website Blog Link */}
          <div className="pt-2 border-t border-gray-800 mt-2">
            <Link
              href="/blog"
              target="_blank"
              className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                <span>View Public Blog</span>
              </div>
              <span className="text-[10px] text-gray-500 font-mono">↗</span>
            </Link>
          </div>
        </nav>
      </div>

      {/* User Profile & Sign Out Footer */}
      <div className="p-3 border-t border-gray-800 space-y-2 bg-gray-900 shrink-0">
        <div className="p-2.5 rounded-lg bg-gray-800/60 border border-gray-800 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-purple-950 border border-purple-800 flex items-center justify-center text-yellow-400 shrink-0 font-bold text-xs uppercase shadow-sm">
              {(userEmail || "A")[0]}
            </div>
            <div className="min-w-0">
              <p className="truncate font-semibold text-xs text-white" title={userEmail || "admin"}>
                {userEmail?.split("@")[0] || "admin"}
              </p>
              <span className="inline-block mt-0.5 text-[9px] font-semibold px-1.5 py-0.2 rounded-full border uppercase tracking-wider bg-emerald-950/80 text-emerald-400 border-emerald-800/60">
                ADMIN
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-400 hover:text-rose-400 hover:bg-rose-950/20 border border-transparent hover:border-rose-900/30 transition-all disabled:opacity-50 cursor-pointer"
        >
          {isLoggingOut ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Signing out...</span>
            </>
          ) : (
            <>
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex w-64 h-screen sticky top-0 bg-gray-900 border-r border-gray-800 flex-col shrink-0 text-gray-200 select-none overflow-hidden print:!hidden">
        {navContent}
      </aside>

      {/* Mobile Slide-Over Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex print:!hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={onClose}
            aria-hidden="true"
          />
          <div className="relative w-64 max-w-[80vw] bg-gray-900 border-r border-gray-800 shadow-2xl h-full z-10 flex flex-col">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
}
