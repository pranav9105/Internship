'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { theme } = useTheme();

  const isDashboard = pathname.startsWith('/dashboard') || 
                      pathname.startsWith('/my-trips') ||
                      pathname.startsWith('/wishlist') ||
                      pathname.startsWith('/bookings') ||
                      pathname.startsWith('/settings');

  return (
    <div
      className={cn(
        'relative flex min-h-screen w-full',
        theme === 'dark' ? 'dark bg-background text-foreground' : 'bg-background text-foreground'
      )}
    >
      {children}
    </div>
  );
}
