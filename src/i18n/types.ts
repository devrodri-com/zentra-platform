export type { Locale } from "./config";

export type SolutionItem = {
  readonly title: string;
  readonly description: string;
  readonly cta?: string;
};

export type AccessDictionary = {
  readonly banner: string;
  readonly common: {
    readonly eyebrow: string;
    readonly home: string;
    readonly languageLabel: string;
    readonly roleVocabulary: string;
  };
  readonly roles: {
    readonly customer: {
      readonly owner: string;
      readonly admin: string;
      readonly member: string;
      readonly viewer: string;
    };
    readonly staff: {
      readonly businessOwner: string;
      readonly operationsAdmin: string;
      readonly technicalAdmin: string;
    };
  };
  readonly login: {
    readonly metadataTitle: string;
    readonly title: string;
    readonly body: string;
    readonly emailLabel: string;
    readonly emailHint: string;
    readonly action: string;
    readonly activationLink: string;
    readonly homeLink: string;
  };
  readonly activation: {
    readonly metadataTitle: string;
    readonly title: string;
    readonly body: string;
    readonly state: string;
    readonly stateDetail: string;
    readonly loginLink: string;
    readonly homeLink: string;
  };
  readonly portal: {
    readonly metadataTitle: string;
    readonly title: string;
    readonly body: string;
    readonly emptyState: string;
    readonly sections: readonly [string, string, string, string, string, string, string, string];
  };
  readonly admin: {
    readonly metadataTitle: string;
    readonly title: string;
    readonly body: string;
    readonly emptyState: string;
    readonly sections: readonly [string, string, string, string, string, string, string, string];
  };
  readonly accessDenied: {
    readonly metadataTitle: string;
    readonly title: string;
    readonly body: string;
    readonly state: string;
    readonly homeLink: string;
    readonly loginLink: string;
  };
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
  readonly access: AccessDictionary;
};
