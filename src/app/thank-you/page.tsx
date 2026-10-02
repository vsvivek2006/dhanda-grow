import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_LINK, BRAND_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Thank You | ${BRAND_NAME}`,
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
        <CheckCircle className="w-10 h-10 text-emerald-500" />
      </div>
      
      <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
        Request Received!
      </h1>
      
      <p className="text-lg text-muted-foreground max-w-lg mb-8">
        Thank you for reaching out. Our growth specialist will contact you shortly to set up your free demo and walkthrough.
      </p>

      <div className="glass-card border border-border p-6 rounded-2xl max-w-md w-full mb-8">
        <h3 className="font-semibold text-foreground mb-2">Want instant access?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Connect directly with our onboarding team on WhatsApp right now.
        </p>
        <Button className="w-full bg-[#25D366] hover:bg-[#20b958] text-white" asChild>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-5 h-5 mr-2" />
            Chat with us on WhatsApp
          </a>
        </Button>
      </div>

      <Link href="/" className="text-primary font-semibold hover:underline">
        ← Back to Home
      </Link>
    </div>
  );
}
