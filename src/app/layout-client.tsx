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
  const { setTheme, resolvedTheme } = useTheme();

  const isDashboard = pathname.startsWith('/dashboard') || 
                      pathname.startsWith('/my-trips') ||
                      pathname.startsWith('/wishlist') ||
                      pathname.startsWith('/bookings') ||
                      pathname.startsWith('/settings');

  useEffect(() => {
    const targetTheme = isDashboard ? 'dark' : 'light';
    if (resolvedTheme !== targetTheme) {
      setTheme(targetTheme);
    }
  }, [isDashboard, resolvedTheme, setTheme]);

  return (
    <div
      className={cn(
        'relative flex min-h-screen w-full',
        isDashboard ? 'dark bg-background text-foreground' : 'bg-background text-foreground'
      )}
    >
      {children}
    </div>
  );
}
