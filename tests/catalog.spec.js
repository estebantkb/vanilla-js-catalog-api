const { test, expect } = require("@playwright/test");

test("shows the six catalog products", async ({ page }) => {
  await page.goto("/index.html");

  await expect(page.locator("#grid > div")).toHaveCount(6);
});

test("filters the catalog by product name", async ({ page }) => {
  await page.goto("/index.html");

  await page.locator("#searchInput").fill("Synthetic Oil");

  await expect(page.locator("#grid > div")).toHaveCount(1);
  await expect(page.locator("#grid")).toContainText("Synthetic Oil 15W-40");
});
