import { join } from "node:path";

import { expect, test } from "@playwright/test";

const screenshotDirectory = process.env.ZENTRA_SCREENSHOT_DIR;

const localizedExpectations = {
  en: {
    title: "ZENTRA | Premium scent design",
    h1: "Premium scent design for commercial and residential spaces.",
    navLabel: "Primary navigation",
    experience: "Experience",
    consultation: "Request a consultation",
  },
  es: {
    title: "ZENTRA | Diseño olfativo premium",
    h1: "Diseño olfativo premium para espacios comerciales y residenciales.",
    navLabel: "Navegación principal",
    experience: "Experiencia",
    consultation: "Solicitar asesoramiento",
  },
} as const;

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 900 },
] as const;

const responsiveViewports = [
  { name: "small-mobile", width: 320, height: 720 },
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet-portrait", width: 768, height: 1024 },
  { name: "tablet-landscape", width: 1024, height: 768 },
  { name: "desktop", width: 1440, height: 900 },
  { name: "wide-desktop", width: 1728, height: 1117 },
] as const;

test("redirects the root route to the default English locale", async ({ page }) => {
  const response = await page.goto("/");

  expect(response?.ok()).toBe(true);
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("returns a real 404 for an unsupported locale", async ({ page }) => {
  const response = await page.goto("/fr");

  expect(response?.status()).toBe(404);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1, name: "Page not found" })).toBeVisible();
  await expect(page.getByText("La página solicitada no existe.", { exact: false })).toBeVisible();
});

test("blocks every crawler without publishing a sitemap", async ({ request }) => {
  const response = await request.get("/robots.txt");

  expect(response.status()).toBe(200);
  expect((await response.text()).trim()).toBe("User-Agent: *\nDisallow: /");
  expect(await request.get("/sitemap.xml")).not.toBeOK();
});

test("exposes the skip link to keyboard users", async ({ page }) => {
  await page.goto("/en");
  await page.keyboard.press("Tab");

  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main-content$/);
});

for (const [locale, expected] of Object.entries(localizedExpectations)) {
  for (const viewport of viewports) {
    test(`${locale} public shell at ${viewport.name} viewport`, async ({ page }) => {
      const consoleErrors: string[] = [];
      const externalHosts = new Set<string>();

      page.on("console", (message) => {
        if (message.type() === "error") {
          consoleErrors.push(message.text());
        }
      });
      page.on("request", (request) => {
        const host = new URL(request.url()).hostname;
        if (host !== "127.0.0.1" && host !== "localhost") {
          externalHosts.add(host);
        }
      });

      await page.setViewportSize(viewport);
      const response = await page.goto(`/${locale}`);

      expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page).toHaveTitle(expected.title);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(expected.h1);
      const headingLevels = await page
        .locator("h1, h2, h3, h4, h5, h6")
        .evaluateAll((headings) => headings.map((heading) => Number(heading.tagName.slice(1))));
      expect(headingLevels[0]).toBe(1);
      expect(
        headingLevels.every(
          (level, index) => index === 0 || level - headingLevels[index - 1]! <= 1,
        ),
      ).toBe(true);
      await expect(page.getByRole("banner")).toBeVisible();
      await expect(page.getByRole("contentinfo")).toBeVisible();

      if (viewport.name === "desktop") {
        await expect(page.getByRole("navigation", { name: expected.navLabel })).toBeVisible();
      } else {
        const menu = page.locator("details.mobile-menu");
        await menu.locator("summary").focus();
        await page.keyboard.press("Enter");
        await expect(menu).toHaveAttribute("open", "");
        await expect(menu.getByRole("link", { name: expected.experience })).toBeVisible();
        await page.keyboard.press("Enter");
        await expect(menu).not.toHaveAttribute("open", "");
      }

      for (const target of ["experience", "solutions", "industries", "contact"]) {
        expect(await page.locator(`a[href="#${target}"]`).count()).toBeGreaterThan(0);
        await expect(page.locator(`#${target}`)).toHaveCount(1);
      }

      await expect(page.locator(`a[lang="${locale}"][aria-current="page"]`).first()).toBeAttached();
      await expect(page.locator('a[href="mailto:info@zentrascent.com"]')).toHaveCount(2);
      await expect(page.locator("form")).toHaveCount(0);
      await expect(page.getByText(expected.consultation, { exact: true }).first()).toBeAttached();

      const bodyText = await page.locator("body").innerText();
      expect(bodyText).not.toMatch(
        /\$\s?\d|€\s?\d|pricing|prices|precios|login|log in|iniciar sesi[oó]n/i,
      );
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      ).toBe(true);

      const robots = await page.locator('meta[name="robots"]').getAttribute("content");
      expect(robots).toContain("noindex");
      expect(robots).toContain("nofollow");

      const ogImageUrl = await page.locator('meta[property="og:image"]').getAttribute("content");
      expect(ogImageUrl).toBeTruthy();
      const ogResponse = await page.request.get(ogImageUrl!);
      expect(ogResponse.status()).toBe(200);
      expect(ogResponse.headers()["content-type"]).toContain("image/png");
      const imageBytes = await ogResponse.body();
      expect(imageBytes.readUInt32BE(16)).toBe(1200);
      expect(imageBytes.readUInt32BE(20)).toBe(630);
      await expect(page.locator("[data-nextjs-dialog]")).toHaveCount(0);
      expect(consoleErrors).toEqual([]);
      expect([...externalHosts]).toEqual([]);

      if (process.env.ZENTRA_CAPTURE_SCREENSHOTS === "true" && screenshotDirectory) {
        for (const target of ["experience", "solutions", "industries", "contact"]) {
          await page.locator(`#${target}`).scrollIntoViewIfNeeded();
        }
        await page.getByRole("contentinfo").scrollIntoViewIfNeeded();
        await expect(page.locator("footer img")).toHaveJSProperty("complete", true);
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.screenshot({
          animations: "disabled",
          fullPage: true,
          path: join(screenshotDirectory, `${locale}-${viewport.name}.png`),
        });
      }
    });
  }
}

test("stays usable across the complete responsive matrix", async ({ page }) => {
  for (const viewport of responsiveViewports) {
    await page.setViewportSize(viewport);
    const response = await page.goto("/en");

    expect(response?.status(), viewport.name).toBe(200);
    await expect(page.getByRole("heading", { level: 1 }), viewport.name).toBeVisible();
    await expect(page.getByRole("banner"), viewport.name).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      `${viewport.name} has no horizontal overflow`,
    ).toBe(true);

    if (process.env.ZENTRA_CAPTURE_SCREENSHOTS === "true" && screenshotDirectory) {
      await page.screenshot({
        animations: "disabled",
        fullPage: true,
        path: join(screenshotDirectory, `matrix-${viewport.name}.png`),
      });
    }
  }
});

test("honors reduced-motion preferences", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");

  const animationDuration = await page
    .locator(".hero__content")
    .evaluate((element) => Number.parseFloat(getComputedStyle(element).animationDuration));
  expect(animationDuration).toBeLessThanOrEqual(0.00001);
  expect(
    await page.locator("html").evaluate((element) => getComputedStyle(element).scrollBehavior),
  ).toBe("auto");
});
