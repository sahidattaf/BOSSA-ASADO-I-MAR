import { timingSafeEqual } from 'node:crypto';
import type { NextRequest } from 'next/server';

const ADMIN_REALM = 'BOSSA Admin';

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) return false;

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function readBasicCredentials(request: NextRequest) {
  const authorization = request.headers.get('authorization');
  if (!authorization?.startsWith('Basic ')) return null;

  try {
    const decoded = Buffer.from(authorization.slice(6), 'base64').toString('utf8');
    const separator = decoded.indexOf(':');
    if (separator < 1) return null;

    return {
      username: decoded.slice(0, separator),
      password: decoded.slice(separator + 1),
    };
  } catch {
    return null;
  }
}

export function authorizeAdminRequest(request: NextRequest) {
  const expectedUsername = process.env.BOSSA_ADMIN_USERNAME;
  const expectedPassword = process.env.BOSSA_ADMIN_PASSWORD;

  if (!expectedUsername || !expectedPassword) {
    return {
      authorized: false,
      configured: false,
    } as const;
  }

  const credentials = readBasicCredentials(request);
  const authorized = Boolean(
    credentials &&
      safeEqual(credentials.username, expectedUsername) &&
      safeEqual(credentials.password, expectedPassword),
  );

  return {
    authorized,
    configured: true,
  } as const;
}

export function adminUnauthorizedResponse(configured: boolean) {
  return new Response(configured ? 'Authentication required.' : 'Admin access is not configured.', {
    status: configured ? 401 : 503,
    headers: {
      'Cache-Control': 'no-store',
      ...(configured ? { 'WWW-Authenticate': `Basic realm="${ADMIN_REALM}", charset="UTF-8"` } : {}),
    },
  });
}
