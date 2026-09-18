import { NextRequest, NextResponse } from 'next/server';

function timingSafeEqual(left: string, right: string) {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  return difference === 0;
}

export function authorizeAdminRequest(request: NextRequest) {
  const expectedUsername = process.env.BOSSA_ADMIN_USERNAME;
  const expectedPassword = process.env.BOSSA_ADMIN_PASSWORD;
  if (!expectedUsername || !expectedPassword) return NextResponse.json({ ok: false, error: 'Admin authentication is not configured.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  const authorization = request.headers.get('authorization');
  if (!authorization?.startsWith('Basic ')) return new NextResponse('Authentication required.', { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="BOSSA Admin"', 'Cache-Control': 'no-store' } });
  let decoded = '';
  try { decoded = Buffer.from(authorization.slice(6), 'base64').toString('utf8'); } catch { /* fail closed */ }
  const separator = decoded.indexOf(':');
  const username = separator >= 0 ? decoded.slice(0, separator) : '';
  const password = separator >= 0 ? decoded.slice(separator + 1) : '';
  if (!timingSafeEqual(username, expectedUsername) || !timingSafeEqual(password, expectedPassword)) return new NextResponse('Invalid credentials.', { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="BOSSA Admin"', 'Cache-Control': 'no-store' } });
  return null;
}