type SectionHeadingProps = {
  align?: "left" | "center";
  eyebrow: string;
  id: string;
  title: string;
  tone?: "dark" | "light";
};

export function SectionHeading({
  align = "left",
  eyebrow,
  id,
  title,
  tone = "light",
}: SectionHeadingProps) {
  return (
    <header className={`section-heading section-heading--${align} section-heading--${tone}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
    </header>
  );
}
