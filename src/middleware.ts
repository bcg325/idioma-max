import createIntlMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

const intlMiddleware = createIntlMiddleware({
  // A list of all locales that are supported
  locales: ["en", "es"],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: "en",
  localeDetection: false,
});

export default function middleware(req: NextRequest) {
  console.log(req);
  const response = intlMiddleware(req);
  return response;
}

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
