import { test, expect } from "@playwright/test";

test.describe("Mobile Visual & Layout Audit", () => {
  test.use({ viewport: { width: 375, height: 667 } }); // Standard iPhone SE / 8 width

  test("Check entire page layout for overflow and take screenshots", async ({ page }) => {
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

    // 1. Check for any elements extending past viewport width
    const overflowingElements = await page.evaluate(() => {
      const docWidth = window.innerWidth;
      const elements = Array.from(document.querySelectorAll("*"));
      const badElements: Array<{ tag: string; id: string; className: string; right: number; scrollWidth: number }> = [];

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Allow elements with overflow-hidden parents or fixed position full-width overlays
        if (rect.right > docWidth + 2 && !el.classList.contains("overflow-hidden") && rect.width < 2000) {
          // Check if parent clips it
          let parent = el.parentElement;
          let isClipped = false;
          while (parent) {
            const pStyle = window.getComputedStyle(parent);
            if (pStyle.overflowX === "hidden" || pStyle.overflow === "hidden") {
              isClipped = true;
              break;
            }
            parent = parent.parentElement;
          }
          if (!isClipped) {
            badElements.push({
              tag: el.tagName,
              id: el.id,
              className: (el.className && typeof el.className === "string") ? el.className.slice(0, 80) : "",
              right: Math.round(rect.right),
              scrollWidth: el.scrollWidth,
            });
          }
        }
      });
      return badElements;
    });

    console.log("OVERFLOWING ELEMENTS:", JSON.stringify(overflowingElements, null, 2));

    // Capture screenshots of each section
    await page.screenshot({ path: "test-results/mobile-fullpage.png", fullPage: true });
    
    // Check specific critical sections
    const hero = page.locator("section").first();
    try {
      await hero.screenshot({ path: "test-results/mobile-hero.png", timeout: 3000 });
    } catch {
      // Non-blocking for hero animation
    }

    const problems = page.locator('section:has-text("Why Local Businesses Lose Customers")');
    if (await problems.isVisible()) {
      await problems.screenshot({ path: "test-results/mobile-problems.png" });
    }

    const engines = page.locator('section:has-text("Google Maps Dominance")');
    if (await engines.isVisible()) {
      await engines.screenshot({ path: "test-results/mobile-engines.png" });
    }

    const features = page.locator('section:has-text("Local SEO Radar")');
    if (await features.isVisible()) {
      await features.screenshot({ path: "test-results/mobile-feature1.png" });
    }

    const appShowcase = page.locator('section:has-text("Built for Busy Business Owners")');
    if (await appShowcase.isVisible()) {
      await appShowcase.screenshot({ path: "test-results/mobile-appshowcase.png" });
    }
  });
});
