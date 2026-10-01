import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { FloatingWhatsApp } from "@/components/shared/FloatingWhatsApp";
import { Analytics } from "@/components/shared/Analytics";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GetGSTFast | Online GST Registration in India at just ₹499",
  description: "Get your GST registration online in India fast and hassle-free. Expert handling, zero government fees, just our ₹499 service fee. No hidden charges.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "GetGSTFast",
    "image": "https://getgstfast.com/logo.png",
    "url": "https://getgstfast.com",
    "telephone": "+919876543210", // TODO: Update with real phone
    "priceRange": "₹499",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "description": "Fast and transparent online GST registration service in India for a flat ₹499 fee.",
  };

  return (
    <html lang="en-IN" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground antialiased selection:bg-brand-blue selection:text-white pb-16 md:pb-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileActionBar />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
