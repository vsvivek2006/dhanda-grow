import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SUPPORT_EMAIL, SUPPORT_PHONE, WHATSAPP_LINK, BRAND_NAME } from "@/lib/constants";
import { LeadForm } from "@/components/shared/LeadForm";

export const metadata: Metadata = {
  title: "Contact Us | GetGSTFast",
  description: "Need help with GST registration? Contact our support team via phone, email, or WhatsApp. We are here to help your business grow.",
};

export default function ContactPage() {
  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-navy mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about GST registration? Our experts are ready to help you out.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Details */}
          <div className="space-y-8">
            <h2 className="text-2xl font-heading font-bold text-navy">Get in Touch</h2>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-success-green">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-navy">WhatsApp</h3>
                  <p className="text-sm text-muted-foreground mb-2">Fastest response time.</p>
                  <a href={WHATSAPP_LINK} className="text-brand-blue font-medium hover:underline text-sm">
                    Chat with us
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-brand-blue">
                    <Phone className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-navy">Phone</h3>
                  <p className="text-sm text-muted-foreground mb-2">Mon-Sat, 9AM to 7PM</p>
                  <a href={`tel:${SUPPORT_PHONE.replace(/\D/g, '')}`} className="text-brand-blue font-medium hover:underline text-sm">
                    {SUPPORT_PHONE}
                  </a>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-brand-blue shrink-0" />
                <div>
                  <h4 className="font-semibold text-navy">Email Support</h4>
                  <a href={`mailto:${SUPPORT_EMAIL}`} className="text-muted-foreground hover:text-brand-blue">
                    {SUPPORT_EMAIL}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-brand-blue shrink-0" />
                <div>
                  <h4 className="font-semibold text-navy">Office Address</h4>
                  <p className="text-muted-foreground">
                    [TODO: Insert Physical Office Address here]<br/>
                    India
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-slate-50 border border-border rounded-lg text-sm text-muted-foreground">
              <strong>Disclaimer:</strong> {BRAND_NAME} is a private consultancy. We are NOT a government entity.
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
            <div className="p-1 border-b border-border bg-slate-50">
              <h3 className="text-center font-semibold text-sm py-2 text-muted-foreground">Or send us a quick application</h3>
            </div>
            <LeadForm />
          </div>
        </div>
      </div>
    </div>
  );
}
