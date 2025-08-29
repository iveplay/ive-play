import { NextRequest, NextResponse } from 'next/server';
import { isbot } from 'isbot';

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent');

  // Skip verification for assets and API routes
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/extension') ||
    request.nextUrl.pathname.startsWith('/fonts') ||
    request.nextUrl.pathname.includes('.') || // e.g., .static, .css, .png
    request.nextUrl.pathname === '/age-verify' ||
    isbot(userAgent)
  ) {
    return NextResponse.next();
  }

  // Check for age verification cookie
  const ageVerified = request.cookies.get('age_verified')?.value === 'true';

  if (!ageVerified) {
    // Preserve the original URL as a query parameter
    const callback = encodeURIComponent(request.nextUrl.pathname + request.nextUrl.search);
    return NextResponse.redirect(new URL(`/age-verify?callback=${callback}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
