import { test, expect } from "@playwright/test";

test.describe("UI & UX Visual Audit", () => {
  test("Homepage renders properly with zero console errors, valid 3D imagery and working tabs", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("load");

    // Check title
    await expect(page).toHaveTitle(/Dhanda Grow/i);

    // Verify main headline is visible
    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();

    // Verify 3D Hero image is loaded and has positive natural dimensions
    const heroImg = page.locator('img[alt*="Dhanda Grow 3D AI Marketing Engine Dashboard"]');
    await expect(heroImg).toBeVisible();
    const naturalWidth = await heroImg.evaluate((img: HTMLImageElement) => img.naturalWidth);
    expect(naturalWidth).toBeGreaterThan(0);

    // Verify stats numbers are rendered as visible text
    await expect(page.getByText("10,000+", { exact: true })).toBeVisible();
    await expect(page.getByText("50,000+", { exact: true })).toBeVisible();
    await expect(page.getByText("2,000,000+", { exact: true })).toBeVisible();
    await expect(page.getByText("4.8 / 5.0", { exact: true })).toBeVisible();
    const statsSection = page.locator('section:has-text("Local Businesses Active")');
    await statsSection.screenshot({ path: "public/images/stats-bar-proof.png" });

    // Verify no horizontal overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalOverflow).toBeFalsy();

    // Test interactive industry tabs (Click Retail & Stores)
    const retailTab = page.getByRole("button", { name: /Retail & Stores/i });
    await expect(retailTab).toBeVisible();
    await retailTab.click();
    await expect(page.getByText(/Royal Fashion/i)).toBeVisible();

    // Test mobile screenshot carousel next button
    const nextBtn = page.getByRole("button", { name: "Next screenshot" });
    if (await nextBtn.isVisible()) {
      await nextBtn.click();
      await page.waitForTimeout(300);
      await expect(page.getByText(/Screen 2 of 5/i)).toBeVisible();
    }

    // Ensure zero runtime error crashes
    expect(
      consoleErrors.filter(
        (e) => !e.includes("favicon") && !e.includes("third-party") && !e.includes("hydrated")
      )
    ).toHaveLength(0);
  });

  test("Services page renders smoothly with capability cards", async ({ page }) => {
    await page.goto("/services", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("load");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByText(/Google Maps Optimization/i).first()).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalOverflow).toBeFalsy();
  });

  test("FAQ page renders and accordion expands/collapses properly", async ({ page }) => {
    await page.goto("/faq", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("load");
    await expect(page.locator("h1")).toBeVisible();

    // Find first accordion trigger
    const firstAccordionTrigger = page.locator("button[data-slot='accordion-trigger']").first();
    await expect(firstAccordionTrigger).toBeVisible();
    await firstAccordionTrigger.click();

    // Verify expanded content is visible
    await page.waitForTimeout(400);
    const firstAccordionContent = page.locator("[data-slot='accordion-content']").first();
    await expect(firstAccordionContent).toBeVisible();
  });

  test("Contact page renders with LeadForm inputs", async ({ page }) => {
    await page.goto("/contact", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("load");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("input[placeholder='John Doe']")).toBeVisible();
    await expect(page.locator("input[placeholder='9876543210']")).toBeVisible();
  });

  test("Blog page renders and blog slug loads markdown content", async ({ page }) => {
    await page.goto("/blog", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("load");
    await expect(page.locator("h1")).toBeVisible();

    // Click on the first blog post
    const firstArticleLink = page.locator("a[href^='/blog/']").first();
    await expect(firstArticleLink).toBeVisible();
    await firstArticleLink.click();

    await page.waitForURL(/\/blog\/.+/);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("article")).toBeVisible();
  });
});
