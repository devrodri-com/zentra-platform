import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";

import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export const alt = "ZENTRA — THE SCENT EXPERIENCE";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type OpenGraphImageProps = {
  params: Promise<{ locale: string }>;
};

export default async function OpenGraphImage({ params }: OpenGraphImageProps) {
  const { locale } = await params;

  if (!hasLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const logo = await readFile(join(process.cwd(), "public", "brand", "zentra-logo-gold.png"));
  const logoDataUrl = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#1d1d1b",
        color: "#f6f2ea",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        padding: "58px 72px",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          border: "1px solid rgba(184, 160, 122, 0.62)",
          display: "flex",
          height: "100%",
          position: "absolute",
          width: "100%",
        }}
      />
      {/* ImageResponse renders its own image tree; next/image is not available in this runtime. */}
      <img
        alt="ZENTRA"
        height={170}
        src={logoDataUrl}
        style={{ objectFit: "contain", position: "absolute", top: "74px", width: "260px" }}
        width={260}
      />
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          marginTop: "152px",
          maxWidth: "900px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: "#b8a07a",
            display: "flex",
            fontFamily: "serif",
            fontSize: "22px",
            letterSpacing: "0.34em",
          }}
        >
          {dictionary.hero.tagline}
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "serif",
            fontSize: "46px",
            fontWeight: 400,
            lineHeight: 1.2,
            marginTop: "28px",
          }}
        >
          {dictionary.metadata.ogDescription}
        </div>
      </div>
    </div>,
    size,
  );
}
