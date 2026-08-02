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
  access: {
    banner: "Architecture preview — no live authentication or customer data",
    common: {
      eyebrow: "Identity foundation",
      home: "ZENTRA home",
      languageLabel: "Access preview language",
      roleVocabulary: "Role vocabulary",
    },
    roles: {
      customer: {
        owner: "Owner",
        admin: "Administrator",
        member: "Member",
        viewer: "Viewer",
      },
      staff: {
        businessOwner: "Business owner",
        operationsAdmin: "Operations administrator",
        technicalAdmin: "Technical administrator",
      },
    },
    login: {
      metadataTitle: "ZENTRA | Access preview",
      title: "Account access",
      body: "This static shell defines a future sign-in entry point. It does not accept credentials or start a session.",
      emailLabel: "Email address",
      emailHint: "Read-only architecture field. Nothing entered here is processed or transmitted.",
      action: "Sign in unavailable",
      activationLink: "View activation foundation",
      homeLink: "Return home",
    },
    activation: {
      metadataTitle: "ZENTRA | Activation preview",
      title: "Secure account activation",
      body: "A future secure link will be required to activate account access. This shell does not inspect links, queries or tokens.",
      state: "ACTIVATION_LINK_REQUIRED",
      stateDetail:
        "No activation email is sent and no activation request is processed in this architecture preview.",
      loginLink: "View access foundation",
      homeLink: "Return home",
    },
    portal: {
      metadataTitle: "ZENTRA | Portal preview",
      title: "Customer portal foundation",
      body: "This structure describes future account areas without loading account, order or subscription information.",
      emptyState: "No live account is connected in this architecture preview.",
      sections: [
        "Orders",
        "Active subscription",
        "Active scent",
        "Next charge",
        "Next shipment",
        "Tracking",
        "Addresses",
        "Support",
      ],
    },
    admin: {
      metadataTitle: "ZENTRA | Administration preview",
      title: "Administration foundation",
      body: "This static structure names future operational areas. It provides no dashboard, metrics or administrative controls.",
      emptyState: "No data source is connected in this architecture preview.",
      sections: [
        "Orders",
        "Customers",
        "Subscriptions",
        "Inventory",
        "Tracking",
        "Approval requests",
        "Products",
        "Promotions",
      ],
    },
    accessDenied: {
      metadataTitle: "ZENTRA | Access unavailable",
      title: "Access is not available",
      body: "No real identity provider is connected, so this architecture preview cannot grant or evaluate live access.",
      state: "ACCESS_NOT_AVAILABLE",
      homeLink: "Return home",
      loginLink: "View access foundation",
    },
  },
} as const satisfies Dictionary;

export default en;
