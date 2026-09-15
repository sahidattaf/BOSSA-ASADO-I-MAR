import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { adminUnauthorizedResponse, authorizeAdminRequest } from './app/lib/admin-auth';

export function proxy(request: NextRequest) {
  const auth = authorizeAdminRequest(request);

  if (!auth.authorized) {
    return adminUnauthorizedResponse(auth.configured);
  }

  const response = NextResponse.next();
  response.headers.set('Cache-Control', 'private, no-store');
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
