import type { Metadata } from "next";

export const foundationMetadata = {
  title: "ZENTRA Platform Foundation",
  description: "Development foundation for the future ZENTRA platform.",
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
} satisfies Metadata;
