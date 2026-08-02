import type { Dictionary } from "@/i18n/types";

import { SectionHeading } from "./SectionHeading";

type IndustriesSectionProps = {
  dictionary: Dictionary;
};

export function IndustriesSection({ dictionary }: IndustriesSectionProps) {
  return (
    <section className="industries section-dark" id="industries" aria-labelledby="industries-title">
      <div className="industries__halo" aria-hidden="true" />
      <div className="shell-container industries__grid">
        <div className="industries__intro">
          <SectionHeading
            eyebrow={dictionary.industries.eyebrow}
            id="industries-title"
            title={dictionary.industries.title}
            tone="dark"
          />
          <p>{dictionary.industries.intro}</p>
        </div>
        <ol className="industries__list">
          {dictionary.industries.items.map((industry, index) => (
            <li key={industry}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{industry}</h3>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
