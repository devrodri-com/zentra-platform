# ADR-006: Bilingual public shell

- Status: Accepted; validated and visually approved
- Date: 2026-08-01
- Scope: ZP-02A

```text
ZP_02A=PASS
VALIDATION_STATUS=PASS
VISUAL_ACCEPTANCE=PASS
HERO_REFINEMENT=PASS
SUPPORTED_LOCALES=en,es
DEFAULT_LOCALE=en
ROOT_REDIRECT=/ -> /en
LOCALIZATION=TYPED_REPOSITORY_DICTIONARIES
PUBLIC_COPY=PROVISIONAL_PUBLIC_COPY
INDEXING=false
CANONICAL_URL=false
SITEMAP=false
JSON_LD=false
COMMERCE=false
AUTHENTICATION=false
DATA_PERSISTENCE=false
FORMS=false
EXTERNAL_PROVIDERS=false
CUSTOM_DOMAIN=false
PROTECTED_MANUAL_PREVIEW=PASS
RUNTIME_DIFF_SINCE_PREVIEW=false
GIT_INTEGRATION=false
COMMERCIAL_PRODUCTION=false
```

## Context

The approved ZP-01 foundation proved repository, toolchain, security, and
isolated-Preview controls with neutral content. ZP-02A introduces the first
real public visual shell without claiming that catalog, pricing, plans,
commercial functionality, or operational integrations already exist.

The shell must support visual-direction, navigation, localization,
responsive, accessibility, and content-architecture review while preserving
the production-landing, provider, domain, data, and commercial-production
boundaries established by ADR-001, ADR-003, and ADR-005.

## Decision

### Localized routing and content

- Publish only `/en` and `/es` as localized public-shell routes.
- Use English as the default locale.
- Redirect `/` to `/en` through the root-only matcher in `src/proxy.ts`.
- Return a real not-found response for unsupported locale segments.
- Set the document `lang` attribute from the validated locale.
- Keep English and Spanish in typed, repository-owned dictionaries loaded by
  `src/i18n/get-dictionary.ts`; do not add an internationalization library.
- Require both dictionaries to satisfy the same `Dictionary` contract and
  preserve parity through deterministic tests.

All new public wording is classified as `PROVISIONAL_PUBLIC_COPY`. It is valid
for implementation and Preview review, but it is not final editorial approval
and must not be expanded with unconfirmed commercial claims.

### Public-shell composition

The localized page is composed from small presentation components in
`src/components/public`:

- `SiteHeader` and `LocaleSwitcher` provide desktop/mobile navigation and
  language selection;
- `HeroSection` establishes the primary statement and consultation path;
- `ExperienceSection` introduces the scent-experience narrative;
- `SolutionsSection` presents professional, residential, and custom-project
  directions without products or prices;
- `IndustriesSection` lists the confirmed B2B environments;
- `ConsultationSection` provides a direct email action without a form or data
  capture;
- `SiteFooter`, `BrandMark`, and `SectionHeading` provide shared structure,
  identity, and accessible headings.

The page anchors are `#experience`, `#solutions`, `#industries`, and
`#contact`. The hero is the unanchored entry section, and `#main-content`
supports the skip link and back-to-top behavior.

All public content and navigation remain Server Components or native HTML.
The localized `error.tsx` boundary is the only Client Component because the
Next.js `reset` callback requires client execution to retry a failed render.

### Visual system and approved derivatives

- Load Cinzel for display typography and Lato for body typography through
  `next/font`, with no runtime font-provider dependency.
- Encode the official visual tokens as CSS custom properties:
  `BLACK=#1d1d1b`, `GOLD=#b8a07a`, `IVORY=#f6f2ea`,
  `CHAMPAGNE=#e8dfcc`, and `STONE=#a89f92`.
- Use only the six approved web-ready PNG derivatives registered in the brand
  asset registry: three isotipo treatments and three logo treatments.
- Keep canonical masters, source documents, archives, font packages, and
  external source locations outside repository canon.
- Render brand imagery through `next/image`, preserve proportions, and keep
  decorative marks out of the accessibility tree.

The application icons derive from the approved gold isotipo and remain
covered by the deterministic provenance recorded in the brand asset registry.

### Search and structured-data boundary

ZP-02A remains intentionally non-indexable until a later release decision:

- localized metadata emits `noindex`, `nofollow`, and `nocache` controls;
- `robots.txt` disallows all crawling;
- no canonical URL is declared;
- no sitemap is published;
- no JSON-LD or other schema markup is published.

Open Graph and social-card metadata may describe the provisional shell, but
they do not change the indexing or commercial-production boundary.

### Functional and operational boundary

ZP-02A implements no product catalog, prices, plans, checkout, subscriptions,
accounts, authentication, customer portal, administration, persistence,
analytics, contact form, provider SDK, environment-variable dependency,
custom domain, or commercial-production cutover. Direct `mailto:` links do not
submit or retain data and do not create a provider integration.

After the exact implementation commit passed local and Pull Request checks,
one separately authorized manual Preview was created in the isolated Vercel
project. It remains required to:

- target Preview and never create a new Production deployment;
- remain protected by inherited Vercel Authentication with Standard
  Protection;
- use only a Vercel-generated domain;
- contain no environment variables or external providers;
- keep Vercel Git integration and automatic Git deployments disabled.

No Preview URL is part of this public decision record. The existing foundation
bootstrap and protected foundation Preview remain the prior baseline governed
by ADR-005.

## Validation and visual acceptance

Rodrigo approved the refined protected Preview. The accepted result covers the
bilingual shell, visual direction, responsive behavior, and the shared fluid
English/Spanish hero-title scale. No runtime file changed after the approved
Preview; subsequent changes only record its validation and approval.

Public copy remains provisional. Products, catalog, commerce, customer portal,
and administration are outside this decision. The inherited Node 24 patch
selection warning and the raw unsupported-locale error document's missing
localized `html[lang]` remain non-blocking because install, build, audit, and
the route's noindex 404 behavior pass.

## Pending decisions and approvals

- Final English and Spanish editorial approval remains pending; visual approval
  of the current provisional bilingual shell has passed.
- Product names, scent names, catalog structure, pricing, subscriptions,
  guarantees, geographic coverage, and commercial policies remain undefined.
- Authentication, data, payments, email delivery, analytics, storage,
  observability, and other provider selections require separate decisions and
  authorization.
- Canonical URL, sitemap, JSON-LD, custom domain, launch, and
  commercial-production readiness require a later release decision.

## Consequences

- Reviewers can evaluate one coherent bilingual visual shell without coupling
  localization to an external library or service.
- Typed dictionary parity and explicit locale routing keep the supported
  surface small and testable.
- The shell can look commercially credible while remaining honest about
  unimplemented commercial capabilities.
- Preview, merge, indexing, domain, provider, and production gates remain
  independently enforceable.
