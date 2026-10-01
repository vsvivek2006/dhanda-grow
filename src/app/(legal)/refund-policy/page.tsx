import type { Metadata } from "next";
import { BRAND_NAME, SERVICE_PRICE, SUPPORT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Refund Policy | GetGSTFast",
  description: "Refund Policy for GetGSTFast.",
};

export default function RefundPolicyPage() {
  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto max-w-3xl px-4 prose prose-slate">
        <h1 className="font-heading text-4xl font-bold text-navy mb-8">Refund Policy</h1>
        
        <p className="text-muted-foreground mb-8">Last Updated: {new Date().toLocaleDateString('en-IN')}</p>

        <h3>1. 100% Refund Guarantee (Pre-Filing)</h3>
        <p>
          If you change your mind or decide not to proceed with the GST registration <strong>before</strong> we have submitted your application to the government portal, we will issue a full 100% refund of your {SERVICE_PRICE} service fee. No questions asked.
        </p>

        <h3>2. Post-Filing Refunds</h3>
        <p>
          Once your application has been successfully prepared, verified, and submitted to the GST portal (and an Application Reference Number / ARN has been generated), our service is considered rendered. <strong>No refunds will be issued after the ARN is generated.</strong>
        </p>

        <h3>3. Government Rejections</h3>
        <p>
          If the GST department rejects your application due to issues with the documents provided (e.g., mismatched name, invalid rent agreement, owner's refusal), the fee remains non-refundable as our professional time was fully utilised in the preparation, filing, and replying to queries. However, our team will assist you in re-applying once you provide the correct documents, at no extra professional fee.
        </p>

        <h3>4. Processing Time</h3>
        <p>
          Approved refunds will be processed back to your original method of payment within 5-7 business days.
        </p>

        <h3>5. How to Request a Refund</h3>
        <p>
          To request a refund before your application is filed, simply message us on WhatsApp or email us at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> with your payment reference number.
        </p>
      </div>
    </div>
  );
}
