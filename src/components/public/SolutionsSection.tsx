import Link from "next/link";

import type { Dictionary } from "@/i18n/types";

import { SectionHeading } from "./SectionHeading";

type SolutionsSectionProps = {
  dictionary: Dictionary;
};

export function SolutionsSection({ dictionary }: SolutionsSectionProps) {
  return (
    <section className="solutions section-light" id="solutions" aria-labelledby="solutions-title">
      <div className="shell-container">
        <div className="solutions__intro">
          <SectionHeading
            eyebrow={dictionary.solutions.eyebrow}
            id="solutions-title"
            title={dictionary.solutions.title}
          />
          <p>{dictionary.solutions.intro}</p>
        </div>
        <ol className="solutions__list">
          {dictionary.solutions.items.map((solution, index) => (
            <li key={solution.title}>
              <span className="solutions__number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{solution.title}</h3>
              <p>{solution.description}</p>
              {"cta" in solution && solution.cta ? (
                <Link className="text-link" href="#contact">
                  {solution.cta}
                  <span aria-hidden="true">→</span>
                </Link>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
