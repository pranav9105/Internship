'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isDashboard = pathname.startsWith('/dashboard') || 
                      pathname.startsWith('/my-trips') ||
                      pathname.startsWith('/wishlist') ||
                      pathname.startsWith('/bookings') ||
                      pathname.startsWith('/settings');

  return (
    <div
      className={cn(
        'relative flex min-h-screen w-full'
      )}
    >
      {children}
    </div>
  );
}
