'use client';

import { usePathname } from 'next/navigation';

export default function AdminChromeGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/ai-manager')) {
    return null;
  }

  return <>{children}</>;
}
