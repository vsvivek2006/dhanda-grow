import { test, expect } from "@playwright/test";

test.describe("Complete Admin Auth Flow (End-to-End)", () => {
  test("Full lifecycle: Unauthenticated block -> Invalid credentials rejection -> Successful login -> Protected access -> Sign out -> Re-verification", async ({
    page,
  }) => {
    page.on("console", (msg) => console.log("PAGE CONSOLE:", msg.type(), msg.text()));
    page.on("pageerror", (err) => console.log("PAGE ERROR:", err.message));
    page.on("request", (req) => {
      if (req.url().includes("/auth/v1/token")) {
        console.log("TOKEN REQ POST DATA:", req.postData());
      }
    });
    page.on("response", async (res) => {
      if (res.url().includes("/auth/v1/token")) {
        console.log("TOKEN RES STATUS:", res.status(), "BODY:", await res.text());
      }
    });

    // 1. Unauthenticated user attempts to visit /admin/leads
    console.log("Step 1: Attempting unauthenticated access to /admin/leads...");
    await page.goto("/admin/leads");
    await expect(page).toHaveURL(/\/login\?redirect=%2Fadmin%2Fleads/);
    await expect(page.locator("h1")).toHaveText("Admin Sign In");

    // 2. Attempt login with wrong password
    console.log("Step 2: Testing invalid login rejection...");
    await page.fill('input[type="email"]', "admin@dhandhagrow.com");
    await page.fill('input[type="password"]', "WrongPassword999!");
    await page.click('button[type="submit"]');

    // Expect error message container to be visible
    const errorAlert = page.locator(".bg-red-500\\/10");
    await expect(errorAlert).toBeVisible({ timeout: 10000 });
    await expect(errorAlert).toContainText(/Invalid.*credentials|failed/i);

    // 3. Attempt login with valid credentials
    console.log("Step 3: Submitting valid admin credentials...");
    await expect(page.locator('button[type="submit"]')).toBeEnabled();
    await page.fill('input[type="password"]', "Dhanda#2026!Admin#Grow");
    
    // Listen for auth response from Supabase
    const authPromise = page.waitForResponse(
      (resp) => resp.url().includes("/auth/v1/token") && resp.status() === 200,
      { timeout: 10000 }
    );

    await page.click('button[type="submit"]');
    await authPromise;
    console.log("Step 3.1: Supabase auth token response received!");

    // Expect success message and redirect to /admin/leads
    await expect(page).toHaveURL(/\/admin\/leads/, { timeout: 15000 });
    console.log("Step 3.2: Successfully redirected to /admin/leads!");

    // 4. Verify Admin Dashboard rendered with authenticated layout and single header
    await expect(page.locator("h1")).toHaveText("Customer Leads Dashboard", { timeout: 10000 });
    await expect(page.locator("text=Total Captured Leads")).toBeVisible();
    await expect(page.getByRole("button", { name: /Sign Out/i })).toBeVisible();

    // Verify single admin header and no duplicate public navbar
    await expect(page.locator("header")).toHaveCount(1);
    await expect(page.locator('header a:has-text("Services")')).toHaveCount(0);

    // Take screenshot of authenticated admin dashboard as proof
    await page.screenshot({ path: "public/images/auth-flow-dashboard-proof.png" });
    console.log("Step 4: Admin dashboard verified and screenshot captured.");

    // 5. Navigate to /blog/new while authenticated (should NOT redirect to login)
    console.log("Step 5: Testing access to /blog/new while authenticated...");
    await page.goto("/blog/new");
    await expect(page).toHaveURL(/\/blog\/new/);
    await expect(page.locator("h1")).toContainText(/Create AI Blog Post/i);

    // 6. Perform Sign Out
    console.log("Step 6: Executing Sign Out...");
    await page.goto("/admin/leads");
    const signOutBtn = page.getByRole("button", { name: /Sign Out/i });
    await expect(signOutBtn).toBeVisible();
    await signOutBtn.click();

    // Expect redirection back to /login
    await expect(page).toHaveURL(/\/login/, { timeout: 10000 });
    await expect(page.locator("h1")).toHaveText("Admin Sign In");
    console.log("Step 6.1: Successfully signed out and returned to /login!");

    // 7. Verify session is destroyed by attempting to re-access /admin/leads
    console.log("Step 7: Verifying session invalidation by re-accessing /admin/leads...");
    await page.goto("/admin/leads");
    await expect(page).toHaveURL(/\/login\?redirect=%2Fadmin%2Fleads/);
    console.log("Step 7.1: Block confirmed! Complete auth cycle verified.");
  });
});
