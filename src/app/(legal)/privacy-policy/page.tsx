import type { Metadata } from "next";
import { BRAND_NAME, SUPPORT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | GetGSTFast",
  description: "Privacy Policy for GetGSTFast. Learn how we handle and protect your personal and business data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto max-w-3xl px-4 prose prose-slate">
        <h1 className="font-heading text-4xl font-bold text-navy mb-8">Privacy Policy</h1>
        
        <p className="text-muted-foreground mb-8">Last Updated: {new Date().toLocaleDateString('en-IN')}</p>

        <h3>1. Introduction</h3>
        <p>
          Welcome to {BRAND_NAME}. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.
        </p>

        <h3>2. The Data We Collect About You</h3>
        <p>
          When you use our services to register for GST, we may collect, use, store and transfer different kinds of personal data about you, including:
        </p>
        <ul>
          <li><strong>Identity Data:</strong> First name, last name, username or similar identifier, marital status, title, date of birth, PAN, and Aadhaar number.</li>
          <li><strong>Contact Data:</strong> Billing address, business address, email address, and telephone numbers.</li>
          <li><strong>Financial Data:</strong> Bank account details (such as cancelled cheques) necessary for GST registration.</li>
          <li><strong>Technical Data:</strong> IP address, browser type and version, time zone setting and location.</li>
        </ul>

        <h3>3. How We Use Your Data</h3>
        <p>
          We will only use your personal data for the purpose of fulfilling the service you requested: applying for GST registration on your behalf on the official government portal (gst.gov.in). We do NOT sell, rent, or trade your personal data to third parties.
        </p>

        <h3>4. Data Security</h3>
        <p>
          We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. We limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
        </p>

        <h3>5. Non-Government Entity Disclaimer</h3>
        <p>
          {BRAND_NAME} is a private consultancy service and is not affiliated with the Government of India or the GST Network. We act as your authorized representative to file your application.
        </p>

        <h3>6. Contact Us</h3>
        <p>
          If you have any questions about this privacy policy, including any requests to exercise your legal rights, please contact us at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        </p>
      </div>
    </div>
  );
}
