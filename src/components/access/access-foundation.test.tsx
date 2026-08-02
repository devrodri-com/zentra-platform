import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import en from "@/i18n/dictionaries/en";
import es from "@/i18n/dictionaries/es";
import type { Locale } from "@/i18n/config";
import type { AccessDictionary } from "@/i18n/types";

import { AccessDeniedFoundation } from "./AccessDeniedFoundation";
import { ActivationFoundation } from "./ActivationFoundation";
import { AdminFoundation } from "./AdminFoundation";
import { LoginFoundation } from "./LoginFoundation";
import { PortalFoundation } from "./PortalFoundation";
import { createAccessMetadata, createLocalizedAccessMetadata } from "./access-metadata";

const localizedCopies = [
  { copy: en.access, locale: "en" },
  { copy: es.access, locale: "es" },
] as const;

const foundations = [
  {
    name: "login",
    render: (copy: AccessDictionary, locale: Locale) => (
      <LoginFoundation copy={copy} locale={locale} />
    ),
    title: (copy: AccessDictionary) => copy.login.title,
  },
  {
    name: "activation",
    render: (copy: AccessDictionary, locale: Locale) => (
      <ActivationFoundation copy={copy} locale={locale} />
    ),
    title: (copy: AccessDictionary) => copy.activation.title,
  },
  {
    name: "portal",
    render: (copy: AccessDictionary, locale: Locale) => (
      <PortalFoundation copy={copy} locale={locale} />
    ),
    title: (copy: AccessDictionary) => copy.portal.title,
  },
  {
    name: "admin",
    render: (copy: AccessDictionary, locale: Locale) => (
      <AdminFoundation copy={copy} locale={locale} />
    ),
    title: (copy: AccessDictionary) => copy.admin.title,
  },
  {
    name: "access denied",
    render: (copy: AccessDictionary, locale: Locale) => (
      <AccessDeniedFoundation copy={copy} locale={locale} />
    ),
    title: (copy: AccessDictionary) => copy.accessDenied.title,
  },
] as const;

describe.each(localizedCopies)("$locale access foundations", ({ copy, locale }) => {
  it.each(foundations)("renders the $name shell with one H1 and localized links", (foundation) => {
    render(foundation.render(copy, locale));

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(foundation.title(copy));
    expect(
      screen.getByText("Architecture preview — no live authentication or customer data"),
    ).toBeVisible();

    const localeNavigation = screen.getByRole("navigation", {
      name: copy.common.languageLabel,
    });

    for (const link of screen.getAllByRole("link")) {
      expect(link.getAttribute("href")).toMatch(/^\/(?:en|es)(?:$|\/)/);
      if (!localeNavigation.contains(link)) {
        expect(link.getAttribute("href")).toMatch(new RegExp(`^/${locale}(?:$|/)`));
      }
    }

    expect(within(localeNavigation).getAllByRole("link")).toHaveLength(2);

    expect(document.querySelector("form")).not.toBeInTheDocument();
  });

  it("keeps login controls inert and credential-free", () => {
    render(<LoginFoundation copy={copy} locale={locale} />);

    const emailField = screen.getByRole("textbox", { name: copy.login.emailLabel });
    const button = screen.getByRole("button", { name: copy.login.action });

    expect(emailField).toHaveAttribute("readonly");
    expect(emailField).toHaveValue("");
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button).not.toHaveAttribute("formaction");
  });

  it("renders localized role terminology without account data", () => {
    const { rerender } = render(<PortalFoundation copy={copy} locale={locale} />);

    for (const role of Object.values(copy.roles.customer)) {
      expect(screen.getByText(role)).toBeVisible();
    }
    expect(screen.getAllByText(copy.portal.emptyState)).toHaveLength(copy.portal.sections.length);

    rerender(<AdminFoundation copy={copy} locale={locale} />);
    for (const role of Object.values(copy.roles.staff)) {
      expect(screen.getByText(role)).toBeVisible();
    }
    expect(screen.getAllByText(copy.admin.emptyState)).toHaveLength(copy.admin.sections.length);
  });

  it("contains no provider brand, fake amount, date or identifying value", () => {
    render(<PortalFoundation copy={copy} locale={locale} />);
    const text = document.body.textContent ?? "";

    expect(text).not.toMatch(/firebase|clerk|workos|auth0|neon|stripe|resend/i);
    expect(text).not.toMatch(/[$€£]\s?\d|\b\d{4}[-/]\d{1,2}[-/]\d{1,2}\b|\b\d{8,}\b/);
    expect(text).not.toMatch(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i);
  });
});

describe("access metadata", () => {
  it("keeps every shell non-indexable, non-followable and non-cacheable", () => {
    const metadata = createAccessMetadata(en.access.login.metadataTitle);

    expect(metadata.robots).toMatchObject({ index: false, follow: false, nocache: true });
    expect(metadata).not.toHaveProperty("alternates.canonical");
  });

  it("localizes access metadata from async route params", async () => {
    await expect(
      createLocalizedAccessMetadata(Promise.resolve({ locale: "es" }), "portal"),
    ).resolves.toMatchObject({ title: es.access.portal.metadataTitle });
  });
});
