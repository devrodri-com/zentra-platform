import { join } from "node:path";

import { expect, test } from "@playwright/test";

const screenshotDirectory = process.env.ZENTRA_SCREENSHOT_DIR;
const captureScreenshots = process.env.ZENTRA_CAPTURE_SCREENSHOTS === "true";

const routes = [
  {
    path: "login",
    en: { title: "ZENTRA | Access preview", h1: "Account access" },
    es: { title: "ZENTRA | Vista previa de acceso", h1: "Acceso a la cuenta" },
  },
  {
    path: "activate",
    en: { title: "ZENTRA | Activation preview", h1: "Secure account activation" },
    es: { title: "ZENTRA | Vista previa de activación", h1: "Activación segura de cuenta" },
  },
  {
    path: "portal",
    en: { title: "ZENTRA | Portal preview", h1: "Customer portal foundation" },
    es: { title: "ZENTRA | Vista previa del portal", h1: "Fundación del portal de clientes" },
  },
  {
    path: "admin",
    en: { title: "ZENTRA | Administration preview", h1: "Administration foundation" },
    es: { title: "ZENTRA | Vista previa de administración", h1: "Fundación de administración" },
  },
  {
    path: "access-denied",
    en: { title: "ZENTRA | Access unavailable", h1: "Access is not available" },
    es: { title: "ZENTRA | Acceso no disponible", h1: "El acceso no está disponible" },
  },
] as const;

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 900 },
] as const;

const screenshotRoutes = new Set(["login", "portal", "admin"]);

for (const locale of ["en", "es"] as const) {
  for (const route of routes) {
    for (const viewport of viewports) {
      test(`${locale}/${route.path} at ${viewport.name}`, async ({ context, page }) => {
        const externalHosts = new Set<string>();

        page.on("request", (request) => {
          const host = new URL(request.url()).hostname;
          if (host !== "127.0.0.1" && host !== "localhost") {
            externalHosts.add(host);
          }
        });

        await page.setViewportSize(viewport);
        const response = await page.goto(`/${locale}/${route.path}`);
        await page.waitForLoadState("networkidle");

        expect(response?.status()).toBe(200);
        await expect(page.locator("html")).toHaveAttribute("lang", locale);
        await expect(page).toHaveTitle(route[locale].title);
        await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
        await expect(page.getByRole("heading", { level: 1 })).toHaveText(route[locale].h1);
        if (viewport.name === "desktop") {
          const columnsDoNotOverlap = await page.evaluate(() => {
            const heading = document.querySelector<HTMLHeadingElement>(".access-shell__intro h1");
            const body = document.querySelector<HTMLElement>(".access-shell__body");
            if (!heading || !body) return false;

            const titleRange = document.createRange();
            titleRange.selectNodeContents(heading);
            return titleRange.getBoundingClientRect().right < body.getBoundingClientRect().left;
          });
          expect(columnsDoNotOverlap).toBe(true);
        }
        await expect(
          page.getByText("Architecture preview — no live authentication or customer data"),
        ).toBeVisible();

        await expect(page.locator("form")).toHaveCount(0);
        const buttons = page.locator("button");
        for (let index = 0; index < (await buttons.count()); index += 1) {
          await expect(buttons.nth(index)).toHaveAttribute("type", "button");
          await expect(buttons.nth(index)).toHaveAttribute("aria-disabled", "true");
        }

        expect(await context.cookies()).toEqual([]);
        expect(
          await page.evaluate(() => ({
            local: localStorage.length,
            session: sessionStorage.length,
          })),
        ).toEqual({ local: 0, session: 0 });
        expect([...externalHosts]).toEqual([]);

        const bodyText = await page.locator("body").innerText();
        expect(bodyText).not.toMatch(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i);
        expect(bodyText).not.toMatch(/[$€£]\s?\d|\b\d{4}[-/]\d{1,2}[-/]\d{1,2}\b|\b\d{8,}\b/);
        expect(await page.locator('input[type="email"][value]').count()).toBe(0);
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
        ).toBe(true);

        const robots = await page.locator('meta[name="robots"]').getAttribute("content");
        expect(robots).toContain("noindex");
        expect(robots).toContain("nofollow");
        expect(robots).toContain("nocache");
        expect(response?.headers()["cache-control"]).toMatch(/no-cache|no-store|private/);

        await page.keyboard.press("Tab");
        await expect(
          page.getByRole("link", {
            name: locale === "en" ? "Skip to main content" : "Saltar al contenido principal",
          }),
        ).toBeFocused();
        const currentLocale = page.locator(`a[lang="${locale}"][aria-current="page"]`);
        await currentLocale.focus();
        await expect(currentLocale).toBeFocused();

        if (
          captureScreenshots &&
          screenshotDirectory &&
          locale === "en" &&
          screenshotRoutes.has(route.path)
        ) {
          await page.screenshot({
            animations: "disabled",
            fullPage: true,
            path: join(screenshotDirectory, `${route.path}-en-${viewport.name}.png`),
          });
        }
      });
    }
  }
}
