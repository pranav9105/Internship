"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Profile } from '@/components/dashboard/profile';
import { Recommendations } from '@/components/dashboard/recommendations';

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
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20 bg-muted/30">
        <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">
            Welcome, {user.displayName || 'Traveler'}!
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">Manage your profile and discover new adventures.</p>
          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <Profile user={user} />
            </div>
            <div className="lg:col-span-2">
              <Recommendations user={user} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
