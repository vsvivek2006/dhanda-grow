import type { Metadata } from "next";
import { BRAND_NAME, SUPPORT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms and Conditions | GetGSTFast",
  description: "Terms and Conditions for GetGSTFast.",
};

export default function TermsPage() {
  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto max-w-3xl px-4 prose prose-slate">
        <h1 className="font-heading text-4xl font-bold text-navy mb-8">Terms and Conditions</h1>
        
        <p className="text-muted-foreground mb-8">Last Updated: {new Date().toLocaleDateString('en-IN')}</p>

        <h3>1. Acceptance of Terms</h3>
        <p>
          By accessing and using {BRAND_NAME} ("Website", "we", "us", or "our"), you accept and agree to be bound by the terms and provision of this agreement.
        </p>

        <h3>2. Description of Service</h3>
        <p>
          {BRAND_NAME} provides consultation and assistance services for obtaining Goods and Services Tax (GST) Registration in India. We act as a facilitator to help you prepare, submit, and track your application on the official GST portal.
        </p>

        <h3>3. Private Consultancy Disclaimer</h3>
        <p>
          <strong>WE ARE NOT A GOVERNMENT AGENCY.</strong> {BRAND_NAME} is a private professional consultancy firm. We are not affiliated with, endorsed by, or in any way officially connected with the Government of India, the GST Council, or the Goods and Services Tax Network (GSTN). The official government portal is gst.gov.in. Our fee is a service charge for our professional time and expertise.
        </p>

        <h3>4. Pricing and Fees</h3>
        <p>
          The government fee for new GST registration is ₹0. We charge a flat professional service fee (currently ₹499) for our assistance. This fee is strictly for our consulting and filing services.
        </p>

        <h3>5. User Responsibilities</h3>
        <p>
          You agree to provide true, accurate, current, and complete information about yourself and your business as prompted by our forms. You understand that providing false documents to the government is a punishable offense, and {BRAND_NAME} assumes no liability for the authenticity of the documents you provide.
        </p>

        <h3>6. Timelines and Guarantees</h3>
        <p>
          While we strive to file applications within 24-48 hours of receiving complete documents, the actual issuance of the GSTIN depends solely on the tax officers and the government portal. We do not guarantee a specific timeframe for approval.
        </p>

        <h3>7. Contact Information</h3>
        <p>
          For any questions regarding these terms, please contact us at {SUPPORT_EMAIL}.
        </p>
      </div>
    </div>
  );
}
