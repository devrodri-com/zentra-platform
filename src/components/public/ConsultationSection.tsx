import type { Dictionary } from "@/i18n/types";

import { SectionHeading } from "./SectionHeading";

type ConsultationSectionProps = {
  dictionary: Dictionary;
};

export function ConsultationSection({ dictionary }: ConsultationSectionProps) {
  return (
    <section className="consultation section-light" id="contact" aria-labelledby="contact-title">
      <div className="shell-container consultation__frame">
        <span className="consultation__index" aria-hidden="true">
          04
        </span>
        <SectionHeading
          align="center"
          eyebrow={dictionary.contact.eyebrow}
          id="contact-title"
          title={dictionary.contact.title}
        />
        <p>{dictionary.contact.body}</p>
        <a className="button button--dark" href="mailto:info@zentrascent.com">
          {dictionary.contact.cta}
        </a>
      </div>
    </section>
  );
}
