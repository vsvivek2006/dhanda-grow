import { test, expect } from "@playwright/test";

test.describe("AI Blog Editor & Management Suite", () => {
  test.beforeEach(async ({ page }) => {
    // Sign in as admin
    await page.goto("/login");
    await page.fill('input[type="email"]', "admin@dhandhagrow.com");
    await page.fill('input[type="password"]', "Dhanda#2026!Admin#Grow");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/admin\/leads/, { timeout: 15000 });
  });

  test("Admin Blog Hub renders PostTable with search and status filters", async ({ page }) => {
    await page.goto("/admin/blog");
    await expect(page).toHaveURL(/\/admin\/blog/);

    // Verify header and create button
    await expect(page.locator("h1")).toContainText(/Blog Posts/i);
    await expect(page.getByRole("link", { name: /Create New Post/i })).toBeVisible();

    // Verify search input
    const searchInput = page.locator('input[placeholder*="Search articles"]');
    await expect(searchInput).toBeVisible();

    // Verify status filter pills
    await expect(page.getByRole("button", { name: /All Posts/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /published/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /draft/i })).toBeVisible();
  });

  test("New Post Editor has slugify, AI generator panel, and Tiptap toolbar", async ({ page }) => {
    await page.goto("/admin/blog/new");
    await expect(page).toHaveURL(/\/admin\/blog\/new/);

    // 1. Verify Mode Toggle
    const manualBtn = page.getByRole("button", { name: /Write Manually/i });
    const aiBtn = page.getByRole("button", { name: /Generate with AI/i });
    await expect(manualBtn).toBeVisible();
    await expect(aiBtn).toBeVisible();

    // 2. Expand AI Generator Panel
    await aiBtn.click();
    await expect(page.locator("text=AI Blog Writer & Strategist")).toBeVisible();
    const topicInput = page.locator('input[placeholder*="7 Local SEO Strategies"]');
    await expect(topicInput).toBeVisible();

    // Click inspiration prompt
    const inspirationBtn = page.locator('button:has-text("How to Rank #1 on Google Maps")');
    if (await inspirationBtn.isVisible()) {
      await inspirationBtn.click();
      await expect(topicInput).toHaveValue(/Google Maps/i);
    }

    // 3. Test Slugify auto-generation
    const titleInput = page.locator('input[placeholder*="7 Proven Local SEO Strategies"]');
    await titleInput.fill("Automated WhatsApp Review Funnel for Indian Clinics");

    const slugInput = page.locator('input[placeholder="7-proven-local-seo-strategies"]');
    await expect(slugInput).toHaveValue("automated-whatsapp-review-funnel-for-indian-clinics");

    // 4. Test Tiptap Editor & Toolbar
    const boldBtn = page.locator('button[title="Bold"]');
    const h2Btn = page.locator('button[title="Heading 2"]');
    const listBtn = page.locator('button[title="Bullet List"]');
    const quoteBtn = page.locator('button[title="Blockquote"]');
    const linkBtn = page.locator('button[title="Add Link"]');

    await expect(boldBtn).toBeVisible();
    await expect(h2Btn).toBeVisible();
    await expect(listBtn).toBeVisible();
    await expect(quoteBtn).toBeVisible();
    await expect(linkBtn).toBeVisible();

    // 5. Test Tag Input
    const tagInput = page.locator('input[placeholder*="Add tags"]');
    await tagInput.fill("LocalSEO");
    await tagInput.press("Enter");
    await expect(page.locator("text=#LocalSEO")).toBeVisible();

    // 6. Verify Meta Description counter
    const metaDesc = page.locator('textarea[placeholder*="Brief summary"]');
    await metaDesc.fill("Short meta description test for SEO counter validation.");
    await expect(page.locator("text=/160")).toBeVisible();

    // 7. Verify Sonner Toast appears on validation
    await topicInput.fill("");
    const generateBtn = page.getByRole("button", { name: /Generate Draft with AI/i });
    await generateBtn.click();
    await expect(page.locator("text=Topic is required")).toBeVisible({ timeout: 5000 });
  });
});
