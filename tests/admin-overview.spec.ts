import { test, expect } from "@playwright/test";

test.describe("Growth-Service Admin Blog Studio at /admin", () => {
  test("Loads dedicated Blog Studio UI structure, header buttons, and article management directly at /admin", async ({
    page,
    isMobile,
  }) => {
    // 1. Log in as admin
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

    // 3. Verify Blog Studio Dashboard Heading & Live Badge
    const heading = page.locator("h1");
    await expect(heading).toHaveText("Blog Studio & Content Hub");
    await expect(page.locator("h1 ~ span")).toContainText("Live");
    await expect(page.locator("text=AI Blog Management")).toBeVisible();

    // 4. Verify 4 Blog Metrics Cards
    await expect(page.getByText("Live Articles", { exact: true })).toBeVisible();
    await expect(page.getByText("Draft Articles", { exact: true })).toBeVisible();
    await expect(page.getByText("AI Writer Model", { exact: true })).toBeVisible();
    await expect(page.getByText("Total Articles", { exact: true })).toBeVisible();

    // 5. Verify 3 Quick Action Launchers
    await expect(page.locator("h3:has-text('AI Article Writer')")).toBeVisible();
    await expect(page.locator("h3:has-text('All Blog Posts')")).toBeVisible();
    await expect(page.locator("h3:has-text('View Public Blog')")).toBeVisible();

    // 6. Verify Article Management Table is embedded right on /admin
    await expect(page.locator("h2:has-text('Article Management')")).toBeVisible();
    await expect(page.locator('input[placeholder*="Search articles"]')).toBeVisible();
    await expect(page.getByRole("button", { name: /All Posts/i })).toBeVisible();

    // 7. Verify Header Buttons & Controls
    // External link button (View Live Blog)
    const liveSiteBtn = page.locator('header a[title="View Live Blog"]');
    await expect(liveSiteBtn).toBeVisible();
    await expect(liveSiteBtn).toHaveAttribute("target", "_blank");

    // Notification Bell button
    const bellBtn = page.locator('header button[aria-label="Admin Notifications"]');
    await expect(bellBtn).toBeVisible();

    if (!isMobile) {
      // Desktop breadcrumb
      await expect(page.locator("header").getByText("Blog Studio")).toBeVisible();

      // Persistent Desktop Sidebar Navigation (Exclusively Blog Focused)
      const sidebar = page.locator("aside");
      await expect(sidebar.locator("text=Admin Portal")).toBeVisible();
      await expect(sidebar.locator("a:has-text('Create Post')")).toBeVisible();
      await expect(sidebar.locator("a:has-text('Blog Hub')")).toBeVisible();
      await expect(sidebar.locator("a:has-text('AI Article Writer')")).toBeVisible();
      await expect(sidebar.locator("a:has-text('All Blog Posts')")).toBeVisible();
      await expect(sidebar.locator("button:has-text('Sign Out')")).toBeVisible();

      // Ensure NO leads / CRM in sidebar
      await expect(sidebar.locator("text=Customer Leads")).toHaveCount(0);
      await expect(sidebar.locator("text=CRM & Inquiries")).toHaveCount(0);
    } else {
      // Mobile hamburger button
      const menuBtn = page.locator('header button[aria-label="Open sidebar menu"]');
      await expect(menuBtn).toBeVisible();
      await menuBtn.click();

      // Mobile drawer open
      const mobileDrawer = page.locator("div.fixed.inset-0.z-50");
      await expect(mobileDrawer.locator("text=Admin Portal")).toBeVisible();
      await expect(mobileDrawer.locator("a:has-text('Create Post')")).toBeVisible();
      await expect(mobileDrawer.locator("a:has-text('Blog Hub')")).toBeVisible();
      await expect(mobileDrawer.locator("a:has-text('All Blog Posts')")).toBeVisible();
      await expect(mobileDrawer.locator("button:has-text('Sign Out')")).toBeVisible();

      // Ensure NO leads / CRM in mobile drawer
      await expect(mobileDrawer.locator("text=Customer Leads")).toHaveCount(0);
    }

    // Capture visual proof of /admin Blog Studio UI structure
    await page.screenshot({
      path: `public/images/admin-growth-service-ui-${isMobile ? "mobile" : "desktop"}.png`,
    });
  });
});
