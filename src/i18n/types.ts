export type { Locale } from "./config";

export type SolutionItem = {
  readonly title: string;
  readonly description: string;
  readonly cta?: string;
};

export type Dictionary = {
  readonly metadata: {
    readonly title: string;
    readonly description: string;
    readonly ogLocale: string;
    readonly ogDescription: string;
  };
  readonly skipLink: string;
  readonly brandAlt: string;
  readonly menuLabel: string;
  readonly nav: {
    readonly ariaLabel: string;
    readonly mobileAriaLabel: string;
    readonly experience: string;
    readonly solutions: string;
    readonly industries: string;
    readonly contact: string;
    readonly consultation: string;
  };
  readonly hero: {
    readonly eyebrow: string;
    readonly tagline: string;
    readonly valueProposition: string;
    readonly primaryCta: string;
    readonly secondaryCta: string;
  };
  readonly experience: {
    readonly eyebrow: string;
    readonly title: string;
    readonly body: string;
  };
  readonly solutions: {
    readonly eyebrow: string;
    readonly title: string;
    readonly intro: string;
    readonly items: readonly [SolutionItem, SolutionItem, SolutionItem];
  };
  readonly industries: {
    readonly eyebrow: string;
    readonly title: string;
    readonly intro: string;
    readonly items: readonly [string, string, string, string, string, string];
  };
  readonly contact: {
    readonly eyebrow: string;
    readonly title: string;
    readonly body: string;
    readonly cta: string;
  };
  readonly footer: {
    readonly tagline: string;
    readonly contactLabel: string;
    readonly languageLabel: string;
    readonly backToTop: string;
  };
  readonly notFound: {
    readonly eyebrow: string;
    readonly title: string;
    readonly body: string;
    readonly cta: string;
  };
};
