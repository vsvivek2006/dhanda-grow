import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { FloatingWhatsApp } from "@/components/shared/FloatingWhatsApp";
import { Analytics } from "@/components/shared/Analytics";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#04040f",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://dhanda.app"),
  title: {
    default: "Dhanda Grow | AI Marketing for Local Businesses",
    template: "%s | Dhanda Grow",
  },
  description:
    "AI-powered digital marketing platform for local businesses. Skyrocket your Google Maps ranking, automate daily social media posts, and collect 5-star Google reviews automatically.",
  keywords: [
    "AI marketing for local business",
    "Google Maps ranking optimization",
    "local SEO India",
    "automated social media posting",
    "WhatsApp review management tool",
    "festival banners for shops",
    "Dhanda Grow",
    "Ezo Technologies",
  ],
  authors: [{ name: "Ezo Technologies Pvt Ltd", url: "https://dhanda.app" }],
  creator: "Ezo Technologies Pvt Ltd",
  publisher: "Ezo Technologies Pvt Ltd",
  formatDetection: {
    telephone: true,
    email: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://dhanda.app",
    siteName: "Dhanda Grow",
    title: "Dhanda Grow | AI Marketing for Local Businesses",
    description:
      "Automate Google Maps ranking, daily social media creatives, and 5-star reviews on complete autopilot for local Indian businesses.",
    images: [
      {
        url: "https://ezobooks.in/kfi/file/399732/GDijO6m",
        width: 1200,
        height: 630,
        alt: "Dhanda Grow AI Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhanda Grow | AI Marketing for Local Businesses",
    description:
      "Automate Google Maps ranking, daily social media creatives, and 5-star reviews on complete autopilot for local Indian businesses.",
    images: ["https://ezobooks.in/kfi/file/399732/GDijO6m"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://dhanda.app/#organization",
        "name": "Ezo Technologies Pvt Ltd",
        "url": "https://dhanda.app",
        "logo": "https://ezobooks.in/kfi/file/399732/GDijO6m",
        "sameAs": [
          "https://www.instagram.com/dhanda.ai.marketing/",
          "https://in.linkedin.com/company/ezobooks",
          "https://www.youtube.com/@EZOBillingMachine"
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Floor 1, Building 2, Sector 2, Millennium Business Park, Mahape",
          "addressLocality": "Navi Mumbai",
          "addressRegion": "Maharashtra",
          "postalCode": "400710",
          "addressCountry": "IN"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91 9619887428",
          "contactType": "customer service",
          "areaServed": "IN",
          "availableLanguage": ["English", "Hindi"]
        }
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://dhanda.app/#software",
        "name": "Dhanda Grow",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web, iOS, Android",
        "url": "https://dhanda.app",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        },
        "description": "AI-powered digital marketing platform for local businesses to optimize Google Maps, manage reviews, and automate social media posting."
      }
    ]
  };

  return (
    <html lang="en-IN" className={`dark ${inter.variable}`}>
      <body className="min-h-full flex flex-col font-sans bg-[#050508] text-zinc-100 antialiased selection:bg-purple-600 selection:text-white pb-16 md:pb-0">
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
