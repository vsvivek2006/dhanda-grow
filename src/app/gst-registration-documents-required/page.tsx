import type { Metadata } from "next";
import { CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SERVICE_PRICE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Documents Required for GST Registration | GetGSTFast",
  description: "Complete checklist of documents required for GST registration in India. See exactly what you need for Proprietorship, Partnership, LLP, and Companies.",
};

export default function DocumentsRequiredPage() {
  const documentLists = [
    {
      type: "Proprietorship (Individuals / Freelancers)",
      items: [
        "PAN Card of the proprietor",
        "Aadhaar Card of the proprietor",
        "Passport-size photograph",
        "Business Address Proof (Electricity bill / Property tax receipt)",
        "NOC from owner (if address is rented or in a relative's name) OR Rent Agreement",
        "Bank Account Proof (Cancelled cheque or passbook first page)",
      ]
    },
    {
      type: "Partnership Firm",
      items: [
        "PAN Card of the Partnership Firm",
        "Partnership Deed",
        "PAN, Aadhaar, and Photographs of all partners",
        "Letter of Authorization for the primary authorized signatory",
        "Business Address Proof (Electricity bill / Property tax receipt)",
        "NOC or Rent Agreement for business premises",
        "Bank Account Proof in the name of the firm",
      ]
    },
    {
      type: "Private Limited Company / LLP",
      items: [
        "PAN Card of the Company / LLP",
        "Certificate of Incorporation",
        "MOA and AOA (for Company) / LLP Agreement (for LLP)",
        "PAN, Aadhaar, and Photographs of all Directors / Designated Partners",
        "Board Resolution appointing the authorized signatory",
        "Digital Signature Certificate (DSC) of the authorized signatory",
        "Business Address Proof (Electricity bill / Property tax receipt)",
        "NOC or Rent Agreement for business premises",
        "Bank Account Proof in the name of the company / LLP",
      ]
    }
  ];

  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-navy mb-4">
            Documents Required for GST Registration
          </h1>
          <p className="text-xl text-muted-foreground">
            Having the right documents ready is the most important step for a smooth, rejection-free GST registration. Find your business type below for the exact checklist.
          </p>
        </div>

        <div className="space-y-12">
          {documentLists.map((list, idx) => (
            <div key={idx} className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-sm">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-6 pb-4 border-b border-border">
                {list.type}
              </h2>
              <ul className="grid sm:grid-cols-2 gap-4">
                {list.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-brand-blue shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-navy text-white rounded-3xl p-10 text-center">
           <h2 className="text-3xl font-heading font-bold mb-4">Have your documents ready?</h2>
           <p className="text-blue-100 mb-8 max-w-xl mx-auto">
             Upload them securely and we'll verify them for free before filing your application. Get your GSTIN for just {SERVICE_PRICE}.
           </p>
           <Button size="lg" className="bg-primary hover:bg-cta-hover h-14 px-8 text-lg" asChild>
             <Link href="/gst-registration">Start Application</Link>
           </Button>
        </div>
      </div>
    </div>
  );
}
