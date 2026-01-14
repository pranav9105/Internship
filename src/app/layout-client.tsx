'use client';

import { Sidebar } from '@/components/layout/sidebar';

export default function RootLayoutClient({
  children,
  isDashboard,
}: {
  children: React.ReactNode;
  isDashboard: boolean;
}) {
  return (
    <div className="relative flex min-h-screen w-full">
      {isDashboard && (
        <div className="hidden md:block w-72">
          <Sidebar />
        </div>
      )}
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}
