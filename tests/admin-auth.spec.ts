import { test, expect } from "@playwright/test";

test.describe("Admin Authentication & Route Protection", () => {
  test("Unauthenticated user accessing /admin is redirected to /login?redirect=/admin/leads without 404", async ({
    page,
  }) => {
    const res = await page.goto("/admin");
    expect(res?.status()).toBe(200);
    await expect(page).toHaveURL(/\/login\?redirect=%2Fadmin%2Fleads/);
    await expect(page.locator("h1")).toHaveText("Admin Sign In");
  });

  test("Unauthenticated user accessing /admin/leads is redirected to /login with redirect query param", async ({
    page,
  }) => {
    await page.goto("/admin/leads");
    await expect(page).toHaveURL(/\/login\?redirect=%2Fadmin%2Fleads/);
    await expect(page.locator("h1")).toHaveText("Admin Sign In");
  });

  test("Unauthenticated user accessing /blog/new is redirected to /login with redirect query param", async ({
    page,
  }) => {
    await page.goto("/blog/new");
    await expect(page).toHaveURL(/\/login\?redirect=%2Fblog%2Fnew/);
  });

  test("Login page renders only Admin Sign In with no public signup and has noindex meta", async ({
    page,
  }) => {
    await page.goto("/login");
    await expect(page.locator("h1")).toHaveText("Admin Sign In");

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
    await expect(submitBtn).toHaveText("Sign In to Admin Portal");

    // Verify NO public signup / setup buttons exist
    const setupTab = page.getByRole("button", { name: /Setup Admin/i });
    await expect(setupTab).toHaveCount(0);
    const registerTab = page.getByRole("button", { name: /Register/i });
    await expect(registerTab).toHaveCount(0);
  });

  test("Protected API endpoints reject unauthenticated requests with 401 Unauthorized", async ({
    request,
  }) => {
    // 1. Leads API
    const leadsRes = await request.get("/api/admin/leads");
    expect(leadsRes.status()).toBe(401);
    const leadsJson = await leadsRes.json();
    expect(leadsJson.error).toContain("Unauthorized");

    // 2. Blog Publish API
    const publishRes = await request.post("/api/blog/publish", {
      data: { title: "Malicious Post", content: "Should be blocked" },
    });
    expect(publishRes.status()).toBe(401);

    // 3. Blog Generate API
    const generateRes = await request.post("/api/blog/generate", {
      data: { topic: "Should be blocked" },
    });
    expect(generateRes.status()).toBe(401);
  });

  test("HTTP responses include OWASP recommended security headers", async ({
    page,
  }) => {
    const response = await page.goto("/");
    expect(response).not.toBeNull();
    const headers = response!.headers();

    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  });
});
