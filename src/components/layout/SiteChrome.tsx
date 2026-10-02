"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { FloatingWhatsApp } from "@/components/shared/FloatingWhatsApp";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminOrAuth = pathname.startsWith("/admin") || pathname === "/login";

  if (isAdminOrAuth) {
    return <main className="flex-1 flex flex-col">{children}</main>;
  }

  return (
    <>
      <ScrollProgressBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <MobileActionBar />
      <FloatingWhatsApp />
    </>
  );
}
