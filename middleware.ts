import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Skip verification for assets and API routes
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/extension') ||
    request.nextUrl.pathname.startsWith('/fonts') ||
    request.nextUrl.pathname.includes('.') || // e.g., .static, .css, .png
    request.nextUrl.pathname === '/age-verify'
  ) {
    return NextResponse.next();
  }

  // Check for age verification cookie
  const ageVerified = request.cookies.get('age_verified')?.value === 'true';

  if (!ageVerified) {
    return NextResponse.redirect(new URL('/age-verify', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
