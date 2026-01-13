"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { Sidebar } from '@/components/layout/sidebar';
import { SettingsLayout } from '@/components/settings/settings-layout';
import { AnimateOnScroll } from '@/components/animate-on-scroll';

export default function SettingsPage() {
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
    <div className="flex w-full">
      <Sidebar />
      <main className="flex-grow p-8">
          <div className="container mx-auto px-4 md:px-6">
             <header className="mb-8">
                <AnimateOnScroll>
                    <h1 className="font-headline text-4xl font-bold">Settings</h1>
                    <p className="text-muted-foreground">Manage your account and preferences.</p>
                </AnimateOnScroll>
             </header>
             <AnimateOnScroll delay={100}>
                <SettingsLayout />
             </AnimateOnScroll>
          </div>
      </main>
    </div>
  );
}
