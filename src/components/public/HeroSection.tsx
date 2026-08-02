import Link from "next/link";

import type { Dictionary } from "@/i18n/types";

import { BrandMark } from "./BrandMark";

type HeroSectionProps = {
  dictionary: Dictionary;
};

export function HeroSection({ dictionary }: HeroSectionProps) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__halo" aria-hidden="true" />
      <BrandMark alt="" className="hero__isotipo" decorative kind="isotipo" variant="gold" />
      <div className="shell-container hero__inner">
        <div className="hero__content">
          <p className="eyebrow hero__eyebrow">{dictionary.hero.eyebrow}</p>
          <p className="hero__tagline">{dictionary.hero.tagline}</p>
          <h1 id="hero-title">{dictionary.hero.valueProposition}</h1>
          <div className="hero__actions">
            <Link className="button button--primary" href="#contact">
              {dictionary.hero.primaryCta}
            </Link>
            <Link className="text-link text-link--light" href="#experience">
              {dictionary.hero.secondaryCta}
              <span aria-hidden="true">↓</span>
            </Link>
          </div>
        </div>
        <p className="hero__edition" aria-hidden="true">
          01 / ZENTRA
        </p>
      </div>
    </section>
  );
}
