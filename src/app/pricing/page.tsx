import type { Metadata } from "next";
import { CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SERVICE_PRICE, WHATSAPP_LINK } from "@/lib/constants";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GST Registration Fees | Transparent Pricing by GetGSTFast",
  description: "Get your GST number for a flat fee of ₹499. Zero government fees. No hidden charges. Compare our transparent pricing today.",
};

export default function PricingPage() {
  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-navy mb-4">
            Honest, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground">
            No hidden fees. No "starting at" tricks. You pay exactly what you see.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Main Plan */}
          <Card className="border-2 border-primary shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-primary"></div>
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-heading text-navy">GST Registration</CardTitle>
            </CardHeader>
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <span className="text-5xl font-heading font-extrabold text-navy">{SERVICE_PRICE}</span>
                <span className="text-muted-foreground">/ one time</span>
              </div>
              <div className="bg-success-green/10 text-success-green font-semibold py-1.5 px-4 rounded-full inline-block mb-8 text-sm">
                Government Fee: ₹0
              </div>
              
              <ul className="space-y-4 text-left mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success-green shrink-0" />
                  <span>Expert Document Verification</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success-green shrink-0" />
                  <span>Application Preparation & Filing</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success-green shrink-0" />
                  <span>ARN Generation & Tracking</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success-green shrink-0" />
                  <span>Reply to basic SCN queries</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success-green shrink-0" />
                  <span>Dedicated WhatsApp Support</span>
                </li>
              </ul>

              <Button size="lg" className="w-full bg-primary hover:bg-cta-hover h-14 text-lg" asChild>
                <Link href="/gst-registration">Get Started Now</Link>
              </Button>
            </CardContent>
          </Card>

          {/* What's Not Included */}
          <Card className="border border-border bg-slate-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-heading text-navy">What's Not Included</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-6">
                We believe in 100% transparency. Here is what this flat fee does <strong>not</strong> cover.
              </p>
              <ul className="space-y-4 text-left">
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-destructive shrink-0" />
                  <span className="text-sm">Monthly GST Return Filing (available separately)</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-destructive shrink-0" />
                  <span className="text-sm">Handling physical department visits if summoned by the officer</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-destructive shrink-0" />
                  <span className="text-sm">Arranging rent agreements or NOCs on your behalf</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-destructive shrink-0" />
                  <span className="text-sm">Complex legal notices unrelated to basic registration</span>
                </li>
              </ul>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-navy text-sm mb-2">Need Return Filing too?</h4>
                <p className="text-xs text-muted-foreground mb-3">Ask us about our combined registration + 6 months filing package on WhatsApp.</p>
                <Button variant="outline" size="sm" className="w-full text-brand-blue border-brand-blue" asChild>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
