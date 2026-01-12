
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { UserSummaryPanel } from '@/components/dashboard/user-summary-panel';
import { WelcomeCard } from '@/components/dashboard/welcome-card';
import { Profile } from '@/components/dashboard/profile';
import { AnimateOnScroll } from '@/components/animate-on-scroll';
import { Recommendations } from '@/components/dashboard/recommendations';
import { RoamingChart } from '@/components/dashboard/roaming-chart';
import { Sidebar } from '@/components/layout/sidebar';
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
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <Header />
        <main className="flex-grow pt-20 md:pl-64">
          <div className="container mx-auto px-4 py-8 md:px-6">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              
              <AnimateOnScroll className="lg:col-span-4 xl:col-span-3">
                <UserSummaryPanel user={user} />
              </AnimateOnScroll>
              
              <div className="lg:col-span-8 xl:col-span-9 space-y-8">
                <AnimateOnScroll delay={100}>
                  <WelcomeCard userName={user.displayName || 'Traveler'} />
                </AnimateOnScroll>
                
                <AnimateOnScroll delay={200}>
                  <RoamingChart />
                </AnimateOnScroll>
                
                <AnimateOnScroll delay={300}>
                  <Profile user={user} />
                </AnimateOnScroll>
                
                <AnimateOnScroll delay={400}>
                  <Recommendations user={user} />
                </AnimateOnScroll>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
