"use client";

import Link from "next/link";
import { PhoneCall, Menu, X } from "lucide-react";
import { useState } from "react";
import { BRAND_NAME, SUPPORT_PHONE, SERVICE_PRICE } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "GST Registration", href: "/gst-registration" },
    { name: "Documents", href: "/gst-registration-documents-required" },
    { name: "Pricing", href: "/pricing" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-heading text-xl font-bold text-navy">
            {BRAND_NAME}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="transition-colors hover:text-brand-blue text-foreground/80"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-medium text-navy">
            <PhoneCall className="h-4 w-4 text-brand-blue" />
            <a href={`tel:${SUPPORT_PHONE.replace(/\D/g, "")}`} className="hover:underline">
              {SUPPORT_PHONE}
            </a>
          </div>
          <Button asChild className="bg-primary hover:bg-cta-hover text-primary-foreground font-semibold">
            <Link href="/gst-registration">Get Started – {SERVICE_PRICE}</Link>
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background p-4 absolute top-16 left-0 w-full shadow-lg">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-medium text-foreground hover:text-brand-blue transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-border flex flex-col gap-4">
              <a href={`tel:${SUPPORT_PHONE.replace(/\D/g, "")}`} className="flex items-center gap-2 font-medium text-navy">
                <PhoneCall className="h-5 w-5 text-brand-blue" />
                {SUPPORT_PHONE}
              </a>
              <Button asChild className="w-full bg-primary hover:bg-cta-hover">
                <Link href="/gst-registration" onClick={() => setIsOpen(false)}>
                  Get Started – {SERVICE_PRICE}
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
