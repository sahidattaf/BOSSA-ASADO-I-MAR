import { NextRequest, NextResponse } from 'next/server';
import { authorizeAdminRequest } from './app/lib/admin-auth';

export function proxy(request: NextRequest) {
  const response = authorizeAdminRequest(request);
  if (response) return response;
  const nextResponse = NextResponse.next();
  nextResponse.headers.set('Cache-Control', 'private, no-store');
  nextResponse.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return nextResponse;
}

export const config = { matcher: ['/admin/:path*', '/api/admin/:path*'] };