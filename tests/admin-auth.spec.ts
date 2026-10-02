import { test, expect } from "@playwright/test";

test.describe("Admin Authentication & Route Protection", () => {
  test("Unauthenticated user accessing /admin/leads is redirected to /login with redirect query param", async ({
    page,
  }) => {
    await page.goto("/admin/leads");
    await expect(page).toHaveURL(/\/login\?redirect=%2Fadmin%2Fleads/);
    await expect(page.locator("h1")).toContainText(/Admin Sign In|Register Admin Account/);
  });

  test("Unauthenticated user accessing /blog/new is redirected to /login with redirect query param", async ({
    page,
  }) => {
    await page.goto("/blog/new");
    await expect(page).toHaveURL(/\/login\?redirect=%2Fblog%2Fnew/);
  });

  test("Login page renders sign in and setup tabs and has noindex meta", async ({
    page,
  }) => {
    await page.goto("/login");
    await expect(page.locator("h1")).toBeVisible();

    // Check noindex meta tag
    const robotsMeta = page.locator('meta[name="robots"]');
    await expect(robotsMeta).toHaveAttribute("content", /noindex/);

    // Verify form elements
    const emailInput = page.locator('input[type="email"]');
    const passwordInput = page.locator('input[type="password"]');
    const submitBtn = page.locator('button[type="submit"]');

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitBtn).toBeVisible();

    // Switch to Setup Admin tab
    const setupTab = page.getByRole("button", { name: /Setup Admin/i });
    await expect(setupTab).toBeVisible();
    await setupTab.click();
    await expect(page.locator("h1")).toContainText("Register Admin Account");
  });
});
