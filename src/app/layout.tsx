import type { Metadata } from "next";
import "./globals.css";
import { foundationMetadata } from "./metadata";

export const metadata: Metadata = foundationMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
