import { test, expect } from '@playwright/test';

test.describe('Senior SEO Audit Suite', () => {
  const pagesToTest = [
    { path: '/', expectedTitlePart: 'Dhanda Grow' },
    { path: '/services', expectedTitlePart: 'AI Marketing Services' },
    { path: '/about', expectedTitlePart: 'About Dhanda Grow' },
    { path: '/faq', expectedTitlePart: 'AI Marketing for Local Business FAQs' },
    { path: '/contact', expectedTitlePart: 'Contact Dhanda Grow' },
    { path: '/blog', expectedTitlePart: 'AI Marketing for Local Business' },
    { path: '/blog/how-to-rank-higher-on-google-maps', expectedTitlePart: 'How to Rank Higher on Google Maps' },
    { path: '/privacy-policy', expectedTitlePart: 'Privacy Policy' },
    { path: '/terms-and-conditions', expectedTitlePart: 'Terms and Conditions' },
    { path: '/refund-policy', expectedTitlePart: 'Refund Policy' },
  ];

  for (const pageInfo of pagesToTest) {
    test(`SEO Validation for ${pageInfo.path}`, async ({ page }) => {
      const response = await page.goto(pageInfo.path, { waitUntil: 'domcontentloaded' });
      expect(response?.status()).toBe(200);

      // 1. Title verification
      const title = await page.title();
      expect(title).toContain(pageInfo.expectedTitlePart);

      // 2. Meta description verification
      const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
      expect(metaDescription).toBeTruthy();
      expect(metaDescription?.length).toBeGreaterThan(20);

      // 3. Canonical tag verification
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toBeTruthy();
      expect(canonical).toContain('https://dhandhagrow.com');

      // 4. Single <h1> element verification
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);

      // 5. OpenGraph tags
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
      expect(ogTitle).toBeTruthy();

      const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
      expect(ogImage).toBeTruthy();

      // 6. Viewport tag
      const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
      expect(viewport).toContain('width=device-width');

      // 7. JSON-LD Structured Data
      const jsonLdElements = await page.locator('script[type="application/ld+json"]').all();
      expect(jsonLdElements.length).toBeGreaterThan(0);
      for (const el of jsonLdElements) {
        const text = await el.textContent();
        expect(text).toBeTruthy();
        expect(() => JSON.parse(text!)).not.toThrow();
      }
    });
  }

  test('Robots.txt contains correct sitemap and disallow rules', async ({ request }) => {
    const res = await request.get('/robots.txt');
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain('Sitemap: https://dhandhagrow.com/sitemap.xml');
    expect(body).toContain('Disallow: /thank-you');
    expect(body).toContain('Disallow: /blog/new');
  });

  test('Sitemap.xml contains public URLs and correct schema', async ({ request }) => {
    const res = await request.get('/sitemap.xml');
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain('<loc>https://dhandhagrow.com/</loc>');
    expect(body).toContain('<loc>https://dhandhagrow.com/services</loc>');
    expect(body).toContain('<loc>https://dhandhagrow.com/about</loc>');
    expect(body).toContain('<loc>https://dhandhagrow.com/faq</loc>');
    expect(body).toContain('<loc>https://dhandhagrow.com/contact</loc>');
    expect(body).toContain('<loc>https://dhandhagrow.com/blog</loc>');
    expect(body).toContain('https://dhandhagrow.com/blog/how-to-rank-higher-on-google-maps');
    // Ensure no disallowed routes in sitemap
    expect(body).not.toContain('https://dhandhagrow.com/blog/new');
    expect(body).not.toContain('https://dhandhagrow.com/thank-you');
  });

  test('Web App Manifest is accessible and valid JSON', async ({ request }) => {
    const res = await request.get('/manifest.webmanifest');
    expect(res.status()).toBe(200);
    const json = await res.json();
    expect(json.name).toBe('Dhanda Grow — AI Marketing for Local Businesses');
    expect(json.short_name).toBe('Dhanda Grow');
    expect(json.icons.length).toBeGreaterThan(0);
  });
});
