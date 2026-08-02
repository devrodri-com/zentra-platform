import Link from "next/link";

import { BrandMark } from "@/components/public/BrandMark";

export default function NotFound() {
  return (
    <main className="status-page" id="main-content">
      <BrandMark className="status-page__mark" kind="isotipo" variant="gold" alt="" decorative />
      <p className="eyebrow">ZENTRA</p>
      <h1>Page not found</h1>
      <p>The requested page does not exist. / La página solicitada no existe.</p>
      <Link className="text-link" href="/en">
        Return to ZENTRA
      </Link>
    </main>
  );
}
