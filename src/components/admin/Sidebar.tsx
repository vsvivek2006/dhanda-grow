"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  Users,
  ExternalLink,
  PlusCircle,
  X,
  LogOut,
  Loader2,
  TrendingUp,
  Compass,
} from "lucide-react";
import { DhandaLogo } from "@/components/ui/DhandaLogo";
import { createBrowserClient } from "@supabase/ssr";

interface SidebarProps {
  userEmail?: string | null;
  isMobileOpen?: boolean;
  onClose?: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: "Blog Studio",
    items: [
      {
        label: "Blog Hub",
        href: "/admin",
        icon: LayoutDashboard,
        exact: true,
      },
      {
        label: "AI Article Writer",
        href: "/admin/blog/new",
        icon: Sparkles,
      },
      {
        label: "All Blog Posts",
        href: "/admin/blog",
        icon: FileText,
      },
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
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
      );
      await supabase.auth.signOut();
      await fetch("/api/auth/signout", { method: "POST" });
      window.location.href = "/login";
    } catch {
      window.location.href = "/login";
    }
  };

  const navContent = (
    <div className="flex flex-col h-full bg-[#07071a] border-r border-white/10">
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-white/10 shrink-0">
        <Link
          href="/admin"
          className="flex items-center gap-2.5 group"
          onClick={onClose}
        >
          <DhandaLogo size="sm" />
          <div>
            <div className="text-sm font-bold tracking-tight text-white leading-none">
              Dhanda <span className="text-yellow-400">Grow</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium mt-1">
              Admin Portal
            </p>
          </div>
        </Link>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Primary Action Button */}
      <div className="px-3 pt-3 pb-1 shrink-0">
        <Link
          href="/admin/blog/new"
          onClick={onClose}
          className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white transition-all shadow-md shadow-purple-900/40 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 text-yellow-300" />
          <span>Create Post</span>
        </Link>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto min-h-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <nav className="p-3 space-y-3">
          {NAV_GROUPS.map((group) => (
            <div key={group.title} className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-300/60 font-mono">
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
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-purple-900/70 via-purple-800/50 to-purple-900/30 border border-purple-500/40 text-white font-semibold shadow-xs"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon
                      className={`w-3.5 h-3.5 transition-colors ${
                        isActive ? "text-yellow-400" : "text-slate-400"
                      }`}
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          ))}

          <div className="pt-2 border-t border-white/10 mt-2">
            <Link
              href="/blog"
              target="_blank"
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                <span>View Live Blog</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">↗</span>
            </Link>
          </div>
        </nav>
      </div>

      {/* User Profile & Sign Out Footer */}
      <div className="p-3 border-t border-white/10 space-y-2 bg-[#09091f] shrink-0">
        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-purple-950 border border-purple-800 flex items-center justify-center text-yellow-400 shrink-0 font-bold text-xs uppercase shadow-sm">
              {(userEmail || "A")[0]}
            </div>
            <div className="min-w-0">
              <p className="truncate font-semibold text-xs text-white" title={userEmail || "admin"}>
                {userEmail?.split("@")[0] || "admin"}
              </p>
              <span className="inline-block mt-0.5 text-[9px] font-semibold px-1.5 py-0.2 rounded-full border uppercase tracking-wider bg-emerald-950/80 text-emerald-400 border-emerald-800/60">
                SUPERADMIN
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 border border-transparent hover:border-rose-900/30 transition-all disabled:opacity-50 cursor-pointer"
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
      <aside className="hidden lg:flex w-64 h-screen sticky top-0 bg-[#07071a] border-r border-white/10 flex-col shrink-0 text-slate-200 select-none overflow-hidden print:!hidden">
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
          <div className="relative w-64 max-w-[80vw] bg-[#07071a] border-r border-white/10 shadow-2xl h-full z-10 flex flex-col">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
}
