import React from "react";

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith("http") ? item.url : `https://dhandhagrow.com${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSchema({ faqs }: { faqs: FAQItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleSchemaProps {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  image?: string;
  authorName?: string;
  authorType?: "Person" | "Organization";
}

export function ArticleSchema({
  title,
  description,
  datePublished,
  dateModified,
  url,
  image = "https://dhandhagrow.com/images/dhanda-3d-hero.jpg",
  authorName = "Ezo Technologies Editorial Team",
  authorType,
}: ArticleSchemaProps) {
  const isOrg =
    authorType === "Organization" ||
    (!authorType &&
      (authorName.toLowerCase().includes("team") ||
        authorName.toLowerCase().includes("ezo") ||
        authorName.toLowerCase().includes("grow")));

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": image.startsWith("http") ? image : `https://dhandhagrow.com${image}`,
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "inLanguage": "en-IN",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url.startsWith("http") ? url : `https://dhandhagrow.com${url}`,
    },
    "author": {
      "@type": isOrg ? "Organization" : "Person",
      "name": authorName,
      "url": "https://dhandhagrow.com",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Ezo Technologies Pvt Ltd",
      "url": "https://dhandhagrow.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dhandhagrow.com/logo.svg",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ServiceItem {
  name: string;
  description: string;
}

export function ServiceSchema({ services }: { services: ServiceItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": services.map((s, idx) => ({
      "@type": "Service",
      "position": idx + 1,
      "name": s.name,
      "description": s.description,
      "provider": {
        "@type": "Organization",
        "name": "Ezo Technologies Pvt Ltd",
        "url": "https://dhandhagrow.com",
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
