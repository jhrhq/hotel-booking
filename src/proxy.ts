import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";
import { AUTH_CONFIG } from "./constants/auth.constants";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === AUTH_CONFIG.ROUTES.SIGN_IN) {
    return NextResponse.next();
  }

  const sessionCookie = getSessionCookie(request, {
    cookiePrefix: AUTH_CONFIG.SESSION.COOKIE_NAME,
  });

  if (!sessionCookie) {
    const loginUrl = new URL(AUTH_CONFIG.ROUTES.SIGN_IN);

    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/book/:path*", "/hosting/:path*", "/bookings", "/manage-hotels"],
};
