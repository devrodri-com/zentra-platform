import { expect, test } from "@playwright/test";

test("renders the isolated ZENTRA platform foundation", async ({ page }) => {
  const response = await page.goto("/");

  expect(response?.ok()).toBe(true);
  await expect(page).toHaveTitle(/ZENTRA Platform Foundation/);

  const primaryHeadings = page.getByRole("heading", { level: 1 });
  await expect(primaryHeadings).toHaveCount(1);
  await expect(primaryHeadings).toHaveText("ZENTRA Platform Foundation");
});
