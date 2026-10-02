"use client";

import Link from "next/link";
import { Sparkles, Menu, X, ArrowRight, Smartphone } from "lucide-react";
import { useState, useEffect } from "react";
import { SUPPORT_PHONE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { DhandaLogo } from "@/components/ui/DhandaLogo";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "FAQ", href: "/faq" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-brand text-white text-[11px] sm:text-xs md:text-sm py-1.5 sm:py-2 px-3 sm:px-4 text-center font-medium tracking-wide flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 leading-snug">
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 pulse-dot shrink-0" />
        <span>AI marketing for local businesses — Google Maps, Instagram & WhatsApp</span>
        <Link href="/contact" className="underline font-bold hover:text-cyan-200 transition-colors inline-flex items-center gap-1 ml-1 whitespace-nowrap">
          Get Started Free <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Main Sticky Navbar */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "glass-nav py-3 shadow-2xl" : "bg-[#04040f]/90 backdrop-blur-md py-4 border-b border-white/5"}`}>
        <div className="container mx-auto max-w-7xl px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="inline-block">
            <DhandaLogo size="md" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-slate-300 hover:text-white transition-colors py-1 relative group"
              >
                {link.name}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-brand scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${SUPPORT_PHONE.replace(/\D/g, "")}`}
              className="text-xs font-semibold text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-full border border-white/10 hover:border-white/20"
            >
              Support: {SUPPORT_PHONE}
            </a>
            <Button
              asChild
              className="bg-gradient-brand hover:opacity-90 text-white font-semibold rounded-full px-6 py-2 shadow-lg shadow-purple-600/30 transition-all hover:scale-105"
            >
              <Link href="/contact" className="inline-flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Get Started — Free</span>
              </Link>
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-4 top-24 z-50 glass-card rounded-3xl p-6 shadow-2xl border border-white/15 animate-fade-down bg-[#0a0a20]/95 backdrop-blur-xl">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-bold text-slate-200 hover:text-purple-400 transition-colors py-1"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <Button asChild className="w-full bg-gradient-brand text-white h-12 text-base font-bold rounded-2xl shadow-lg">
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  Get Started Free
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
