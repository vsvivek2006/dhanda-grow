import type { Metadata } from "next";
import Link from "next/link";
import { DhandaLogo } from "@/components/ui/DhandaLogo";
import { Users, PenTool, Globe, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Admin Dashboard | Dhanda Grow",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#04040f] text-slate-100 font-sans flex flex-col">
      {/* Top Admin Bar */}
      <header className="border-b border-white/10 bg-[#07071a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin/leads" className="flex items-center gap-2">
              <DhandaLogo size="sm" />
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-mono font-semibold border border-purple-500/30">
                Admin
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-white/5">
                <Link href="/admin/leads" className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span>Customer Leads</span>
                </Link>
              </Button>
              <Button asChild variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-white/5">
                <Link href="/blog/new" className="flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-purple-400" />
                  <span>AI Blog Creator</span>
                </Link>
              </Button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Button asChild variant="outline" size="sm" className="border-white/10 text-slate-300 hover:text-white hover:bg-white/5 h-9">
              <Link href="/" target="_blank" className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs">Live Website</span>
              </Link>
            </Button>

            <form action="/api/auth/signout" method="POST">
              <Button type="submit" variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-9">
                <LogOut className="w-3.5 h-3.5 mr-1" />
                <span className="text-xs">Sign Out</span>
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        {children}
      </main>
    </div>
  );
}
