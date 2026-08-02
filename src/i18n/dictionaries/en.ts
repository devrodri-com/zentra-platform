import type { Dictionary } from "../types";

export const en = {
  metadata: {
    title: "ZENTRA | Premium scent design",
    description: "Premium scent design for commercial and residential spaces.",
    ogLocale: "en_US",
    ogDescription: "Premium scent design for commercial and residential spaces.",
  },
  skipLink: "Skip to main content",
  brandAlt: "ZENTRA",
  menuLabel: "Menu",
  nav: {
    ariaLabel: "Primary navigation",
    mobileAriaLabel: "Mobile navigation",
    experience: "Experience",
    solutions: "Solutions",
    industries: "Industries",
    contact: "Contact",
    consultation: "Request a consultation",
  },
  hero: {
    eyebrow: "Scent design",
    tagline: "THE SCENT EXPERIENCE",
    valueProposition: "Premium scent design for commercial and residential spaces.",
    primaryCta: "Request a consultation",
    secondaryCta: "Explore the experience",
  },
  experience: {
    eyebrow: "Experience",
    title: "A considered scent experience",
    body: "Scent is part of how a space is remembered. ZENTRA brings together professional scenting, thoughtful selection and a premium brand experience.",
  },
  solutions: {
    eyebrow: "Solutions",
    title: "Scent direction for different spaces",
    intro: "Professional, residential and custom approaches to scent.",
    items: [
      {
        title: "Professional environments",
        description:
          "A considered scent direction for the character and everyday use of professional spaces.",
      },
      {
        title: "Residential spaces",
        description: "A thoughtful approach to scent for homes and shared residential settings.",
      },
      {
        title: "Custom scent projects",
        description: "A tailored starting point for scent projects developed through consultation.",
        cta: "Request a consultation",
      },
    ],
  },
  industries: {
    eyebrow: "Industries",
    title: "Commercial spaces in focus",
    intro: "ZENTRA’s primary focus is B2B scent experience across these environments.",
    items: ["Hotels", "Offices", "Fitness & wellness", "Clinics", "Restaurants", "Retail"],
  },
  contact: {
    eyebrow: "Contact",
    title: "Let’s shape the scent experience for your space.",
    body: "Tell us about your project.",
    cta: "Contact ZENTRA",
  },
  footer: {
    tagline: "THE SCENT EXPERIENCE",
    contactLabel: "Contact ZENTRA",
    languageLabel: "Language",
    backToTop: "Back to top",
  },
  notFound: {
    eyebrow: "404",
    title: "Page not found",
    body: "The page you’re looking for is not available.",
    cta: "Return home",
  },
} as const satisfies Dictionary;

export default en;
