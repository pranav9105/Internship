'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Sidebar } from '@/components/layout/sidebar';

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isDashboardLayout = [
    '/dashboard',
    '/my-trips',
    '/wishlist',
    '/bookings',
    '/transactions',
    '/settings',
  ].some((path) => pathname.startsWith(path));


  return (
    <div className={cn('relative flex min-h-screen w-full')}>
      {isDashboardLayout && (
        <div className="hidden md:block h-screen w-72">
            <Sidebar />
        </div>
      )}
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}
