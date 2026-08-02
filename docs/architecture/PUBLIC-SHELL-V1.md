# Public shell v1

## Current state

```text
PHASE=ZP-02A
ZP_02A=IMPLEMENTATION_IN_PROGRESS
RELEASE_STATE=PREVIEW_PENDING
PUBLIC_COPY=PROVISIONAL_PUBLIC_COPY
VISUAL_APPROVAL=PENDING
SUPPORTED_LOCALES=en,es
DEFAULT_LOCALE=en
```

This document describes the implemented PRE-preview surface. It is a review
contract, not a launch declaration. The existing foundation baseline remains
valid, and the new ZP-02A protected manual Preview has not yet been created.

## Route contract

| Route or resource                               | Behavior                                  |
| ----------------------------------------------- | ----------------------------------------- |
| `/`                                             | Redirects to `/en` through `src/proxy.ts` |
| `/en`                                           | English shell; `<html lang="en">`         |
| `/es`                                           | Spanish shell; `<html lang="es">`         |
| Unsupported locale, for example `/fr`           | Returns not found                         |
| `/robots.txt`                                   | Disallows all crawlers                    |
| `/sitemap.xml`                                  | Not published                             |
| `/en/opengraph-image` and `/es/opengraph-image` | Localized generated social image          |

Only `en` and `es` are statically enumerated. English is the default; locale
segments are explicit, and locale switching navigates to the other localized
root.

## Localization contract

Localization is implemented with repository-owned TypeScript dictionaries,
not an external internationalization library. Both dictionaries satisfy the
same readonly `Dictionary` type, and the loader maps exactly one dictionary to
each supported locale. Tests cover supported locales, rejection of unsupported
locales, dictionary loading, and key-shape parity.

All newly authored shell wording is `PROVISIONAL_PUBLIC_COPY`. The Preview may
be used to review that wording, but no copy in this phase constitutes final
editorial approval or permission to invent products, prices, plans, outcomes,
guarantees, certifications, customer claims, or commercial policies.

## Page composition

The localized page uses this order:

1. `SiteHeader` with desktop navigation, native mobile disclosure, locale
   switcher, and consultation link;
2. `HeroSection` with the official tagline and primary value proposition;
3. `ExperienceSection` at `#experience`;
4. `SolutionsSection` at `#solutions`;
5. `IndustriesSection` at `#industries`;
6. `ConsultationSection` at `#contact`;
7. `SiteFooter` with language selection and back-to-top navigation.

`BrandMark` centralizes approved logo/isotipo rendering, `SectionHeading`
centralizes section heading structure, and `LocaleSwitcher` centralizes the
two-locale navigation. `#main-content` is the target for the localized skip
link and footer return link.

The consultation action is a direct email link. There is no form, submission
handler, API route, CRM connection, storage, or data capture.

All public content and navigation remain Server Components or native HTML.
`src/app/[locale]/error.tsx` is the sole Client Component: Next.js error
boundaries require client execution so their `reset` callback can retry the
failed render.

## Visual system

Typography is loaded through `next/font`:

| Role    | Family | Weights       |
| ------- | ------ | ------------- |
| Display | Cinzel | 400, 500, 600 |
| Body    | Lato   | 300, 400, 700 |

The official core tokens are:

| Token     | Value     |
| --------- | --------- |
| Black     | `#1d1d1b` |
| Gold      | `#b8a07a` |
| Ivory     | `#f6f2ea` |
| Champagne | `#e8dfcc` |
| Stone     | `#a89f92` |

The CSS layers separate tokens, shell primitives, editorial sections, and
responsive behavior. Motion remains CSS-only, restrained, and disabled or
reduced when `prefers-reduced-motion` requests it.

## Brand-asset boundary

The repository contains exactly six approved web-ready PNG derivatives for
the public shell: black, gold, and white isotipo treatments and black, gold,
and white logo treatments. Their provenance, dimensions, full checksums, use,
and accessibility rules are recorded in the brand asset registry.

The shell uses `next/image`, preserves source proportions, and does not crop,
recolor, stretch, filter, or recreate the marks. Canonical masters and external
source locations remain private and outside repository canon. Application
icons are deterministic derivatives of the approved gold isotipo.

## Metadata and indexing

Each locale has its own title, description, Open Graph locale, social-card
copy, and generated image. The document language matches the route.

The PRE-preview shell deliberately publishes:

- `noindex`, `nofollow`, `nocache`, and Googlebot `noimageindex` metadata;
- a `robots.txt` rule that disallows `/` for every user agent.

It deliberately publishes no canonical URL, sitemap, JSON-LD, or other schema
markup. These are launch decisions, not implementation defaults.

## Explicit exclusions

The shell has zero implemented commerce, catalog, prices, subscriptions,
checkout, accounts, authentication, portal, administration, persistence,
customer data, forms, provider integrations, analytics, custom domain, or
commercial-production behavior. It requires no project-configured environment
variables or runtime secrets; platform-supplied deployment metadata is used
only when available to resolve generated social-image URLs.

The live production landing, its domain, its deployment project, its data, and
its repository remain separate and unchanged.

## Preview and approval gate

The next external artifact is exactly one manual Preview for the ZP-02A commit,
created only after local validation and Pull Request CI pass. It must remain:

- a Preview target, never a new Production deployment;
- protected by inherited Vercel Authentication with Standard Protection;
- on a Vercel-generated domain, with no custom domain;
- free of environment variables and external providers;
- disconnected from Git, so pushes cannot deploy automatically.

Visual approval is pending. Review must cover the required mobile, tablet,
landscape, and desktop viewports, both locales, navigation, typography,
assets, copy, accessibility, reduced motion, and horizontal overflow.

Final copy, product and commercial rules, provider selection, indexing,
canonical URL, custom domain, merge, launch, and commercial production remain
separate pending decisions.
