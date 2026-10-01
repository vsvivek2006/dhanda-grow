import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_LINK } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Thank You | GetGSTFast",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="w-20 h-20 bg-success-green/10 rounded-full flex items-center justify-center mb-6">
        <CheckCircle className="w-10 h-10 text-success-green" />
      </div>
      
      <h1 className="font-heading text-3xl md:text-5xl font-bold text-navy mb-4">
        Application Received!
      </h1>
      
      <p className="text-lg text-muted-foreground max-w-lg mb-8">
        Thank you for choosing us. Our team will review your details and call you within [TODO: 15] minutes to proceed.
      </p>

      <div className="bg-slate-50 border border-border p-6 rounded-2xl max-w-md w-full mb-8">
        <h3 className="font-semibold text-navy mb-2">Want to speed things up?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Send your documents directly to us on WhatsApp right now to fast-track your registration.
        </p>
        <Button className="w-full bg-[#25D366] hover:bg-[#20b958] text-white" asChild>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-5 h-5 mr-2" />
            Send Documents on WhatsApp
          </a>
        </Button>
      </div>

      <Link href="/" className="text-brand-blue font-semibold hover:underline">
        ← Back to Home
      </Link>
    </div>
  );
}
