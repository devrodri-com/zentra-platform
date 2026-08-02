import type { Metadata } from "next";

import type { Dictionary } from "@/i18n/types";

function getMetadataBase(): URL {
  const deploymentHost = process.env.VERCEL_URL;

  return new URL(deploymentHost ? `https://${deploymentHost}` : "http://localhost:3000");
}

export function createPublicMetadata(dictionary: Dictionary): Metadata {
  return {
    metadataBase: getMetadataBase(),
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    openGraph: {
      type: "website",
      siteName: "ZENTRA",
      locale: dictionary.metadata.ogLocale,
      title: dictionary.metadata.title,
      description: dictionary.metadata.ogDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.metadata.title,
      description: dictionary.metadata.ogDescription,
    },
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    },
  };
}

export function createNotFoundMetadata(): Metadata {
  return {
    title: "ZENTRA | Page not found",
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    },
  };
}
