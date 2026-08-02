import type { Dictionary } from "@/i18n/types";

import { BrandMark } from "./BrandMark";
import { SectionHeading } from "./SectionHeading";

type ExperienceSectionProps = {
  dictionary: Dictionary;
};

export function ExperienceSection({ dictionary }: ExperienceSectionProps) {
  return (
    <section
      className="experience section-light"
      id="experience"
      aria-labelledby="experience-title"
    >
      <BrandMark alt="" className="experience__isotipo" decorative kind="isotipo" variant="black" />
      <div className="shell-container experience__grid">
        <SectionHeading
          eyebrow={dictionary.experience.eyebrow}
          id="experience-title"
          title={dictionary.experience.title}
        />
        <div className="experience__copy">
          <span className="editorial-rule" aria-hidden="true" />
          <p>{dictionary.experience.body}</p>
        </div>
      </div>
    </section>
  );
}
