import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/shared/Analytics";
import { SiteChrome } from "@/components/layout/SiteChrome";

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
  metadataBase: new URL("https://dhandhagrow.com"),
  alternates: {
    canonical: "https://dhandhagrow.com",
  },
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
  authors: [{ name: "Ezo Technologies Pvt Ltd", url: "https://dhandhagrow.com" }],
  creator: "Ezo Technologies Pvt Ltd",
  publisher: "Ezo Technologies Pvt Ltd",
  formatDetection: {
    telephone: true,
    email: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://dhandhagrow.com",
    siteName: "Dhanda Grow",
    title: "Dhanda Grow | AI Marketing for Local Businesses",
    description:
      "Automate Google Maps ranking, daily social media creatives, and 5-star reviews on complete autopilot for local Indian businesses.",
    images: [
      {
        url: "/images/dhanda-3d-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Dhanda Grow AI Marketing Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhanda Grow | AI Marketing for Local Businesses",
    description:
      "Automate Google Maps ranking, daily social media creatives, and 5-star reviews on complete autopilot for local Indian businesses.",
    images: ["/images/dhanda-3d-hero.jpg"],
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
        "@type": "WebSite",
        "@id": "https://dhandhagrow.com/#website",
        "name": "Dhanda Grow",
        "url": "https://dhandhagrow.com",
        "inLanguage": "en-IN",
        "publisher": {
          "@id": "https://dhandhagrow.com/#organization"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://dhandhagrow.com/#organization",
        "name": "Ezo Technologies Pvt Ltd",
        "url": "https://dhandhagrow.com",
        "logo": "https://dhandhagrow.com/logo.svg",
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
        "@id": "https://dhandhagrow.com/#software",
        "name": "Dhanda Grow",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web, iOS, Android",
        "url": "https://dhandhagrow.com",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "1250",
          "bestRating": "5",
          "worstRating": "1"
        },
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
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
