
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { Header } from '@/components/layout/header';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <div className="flex-grow flex flex-col w-full">
        <Header />
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-8 md:px-6">
            {/* All dashboard content has been removed as requested. */}
          </div>
        </main>
      </div>
    </div>
  );
}
