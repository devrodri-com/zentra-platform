import Image from "next/image";

import isotipoBlack from "../../../public/brand/zentra-isotipo-black.png";
import isotipoGold from "../../../public/brand/zentra-isotipo-gold.png";
import logoGold from "../../../public/brand/zentra-logo-gold.png";
import logoWhite from "../../../public/brand/zentra-logo-white.png";

const marks = {
  "isotipo-black": isotipoBlack,
  "isotipo-gold": isotipoGold,
  "logo-gold": logoGold,
  "logo-white": logoWhite,
} as const;

type BrandMarkProps = (
  | {
      kind: "isotipo";
      variant: "black" | "gold";
    }
  | {
      kind: "logo";
      variant: "gold" | "white";
    }
) & {
  alt: string;
  className?: string;
  decorative?: boolean;
  priority?: boolean;
};

export function BrandMark({
  alt,
  className,
  decorative = false,
  kind,
  priority = false,
  variant,
}: BrandMarkProps) {
  const source = marks[`${kind}-${variant}` as keyof typeof marks];

  return (
    <Image
      alt={decorative ? "" : alt}
      aria-hidden={decorative || undefined}
      className={className}
      priority={priority}
      sizes={kind === "logo" ? "(max-width: 640px) 128px, 176px" : "(max-width: 768px) 50vw, 32vw"}
      src={source}
    />
  );
}
