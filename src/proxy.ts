import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { DEFAULT_LOCALE } from "@/i18n/config";

export function proxy(request: NextRequest) {
  return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, request.url));
}

export const config = {
  matcher: ["/"],
};
