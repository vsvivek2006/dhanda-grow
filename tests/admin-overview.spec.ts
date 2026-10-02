import { test, expect } from "@playwright/test";

test.describe("Growth-Service Admin UI Structure at /admin", () => {
  test("Loads Growth-Service UI structure, header buttons, and overview dashboard directly at /admin", async ({
    page,
    isMobile,
  }) => {
    // 1. Log in as admin (with redirect parameter to /admin)
    await page.goto("/login?redirect=/admin");
    await page.fill('input[type="email"]', "admin@dhandhagrow.com");
    await page.fill('input[type="password"]', "Dhanda#2026!Admin#Grow");

    const authPromise = page.waitForResponse(
      (resp) => resp.url().includes("/auth/v1/token") && resp.status() === 200,
      { timeout: 10000 }
    );
    await page.click('button[type="submit"]');
    await authPromise;

    // 2. Wait for automatic navigation to /admin
    await page.waitForURL(/\/admin$/, { timeout: 15000 });
    await expect(page).toHaveURL(/\/admin$/);

    // 3. Verify Admin Overview Dashboard Heading & Live Badge
    const heading = page.locator("h1");
    await expect(heading).toHaveText("Admin Overview");
    await expect(page.getByText("Live", { exact: true })).toBeVisible();
    await expect(page.locator("text=Dhanda Grow management console")).toBeVisible();

    // 4. Verify 4 Operational Metrics Cards
    await expect(page.getByText("Live Articles", { exact: true })).toBeVisible();
    await expect(page.getByText("Draft Articles", { exact: true })).toBeVisible();
    await expect(page.getByText("Captured Leads", { exact: true })).toBeVisible();
    await expect(page.getByText("Active Automations", { exact: true })).toBeVisible();

    // 5. Verify 5 Quick Action Launchers
    await expect(page.locator("h3:has-text('AI Article Writer')")).toBeVisible();
    await expect(page.locator("h3:has-text('Blog Directory')")).toBeVisible();
    await expect(page.locator("h3:has-text('Customer Leads')")).toBeVisible();
    await expect(page.locator("h3:has-text('Google Maps Tool')")).toBeVisible();
    await expect(page.locator("h3:has-text('ROI Calculator')")).toBeVisible();

    // 6. Verify Header Buttons & Controls
    // External link button (View Live Website)
    const liveSiteBtn = page.locator('header a[title="View Live Website"]');
    await expect(liveSiteBtn).toBeVisible();
    await expect(liveSiteBtn).toHaveAttribute("target", "_blank");

    // Notification Bell button
    const bellBtn = page.locator('header button[aria-label="Admin Notifications"]');
    await expect(bellBtn).toBeVisible();

    if (!isMobile) {
      // Desktop breadcrumb
      await expect(page.locator("header").getByText("Admin Workspace")).toBeVisible();

      // Persistent Desktop Sidebar Navigation
      const sidebar = page.locator("aside");
      await expect(sidebar.locator("text=Admin Portal")).toBeVisible();
      await expect(sidebar.locator("a:has-text('Create Post')")).toBeVisible();
      await expect(sidebar.locator("a:has-text('Dashboard')")).toBeVisible();
      await expect(sidebar.locator("a:has-text('Blog Posts')")).toBeVisible();
      await expect(sidebar.locator("a:has-text('Customer Leads')")).toBeVisible();
      await expect(sidebar.locator("button:has-text('Sign Out')")).toBeVisible();
    } else {
      // Mobile hamburger button
      const menuBtn = page.locator('header button[aria-label="Open sidebar menu"]');
      await expect(menuBtn).toBeVisible();
      await menuBtn.click();

      // Mobile drawer open
      const mobileDrawer = page.locator("div.fixed.inset-0.z-50");
      await expect(mobileDrawer.locator("text=Admin Portal")).toBeVisible();
      await expect(mobileDrawer.locator("a:has-text('Create Post')")).toBeVisible();
      await expect(mobileDrawer.locator("a:has-text('Dashboard')")).toBeVisible();
      await expect(mobileDrawer.locator("a:has-text('Blog Posts')")).toBeVisible();
      await expect(mobileDrawer.locator("button:has-text('Sign Out')")).toBeVisible();
    }

    // Capture visual proof of /admin UI structure
    await page.screenshot({
      path: `public/images/admin-growth-service-ui-${isMobile ? "mobile" : "desktop"}.png`,
    });
  });
});
