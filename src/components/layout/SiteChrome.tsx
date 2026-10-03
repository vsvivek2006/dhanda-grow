"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";

const ScrollProgressBar = dynamic(
  () => import("@/components/ui/ScrollProgressBar").then((mod) => mod.ScrollProgressBar),
  { ssr: false }
);

const FloatingWhatsApp = dynamic(
  () => import("@/components/shared/FloatingWhatsApp").then((mod) => mod.FloatingWhatsApp),
  { ssr: false }
);

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
