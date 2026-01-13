
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { AnimateOnScroll } from '@/components/animate-on-scroll';
import { Sidebar } from '@/components/layout/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardCalendar } from '@/components/dashboard/calendar';
import { EasyVisa } from '@/components/dashboard/easy-visa';
import { MostPopular } from '@/components/dashboard/most-popular';
import { Bookings } from '@/components/dashboard/bookings';

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
    <div className="flex w-full">
        <Sidebar />
        <main className="flex-grow p-8 bg-background overflow-y-auto">
            <div className="grid grid-cols-12 gap-8">
                {/* Main content */}
                <div className="col-span-12 lg:col-span-8">
                    <DashboardHeader />
                    <div className="mt-8">
                        <AnimateOnScroll>
                          <EasyVisa />
                        </AnimateOnScroll>
                    </div>
                     <div className="mt-8">
                        <AnimateOnScroll>
                          <MostPopular />
                        </AnimateOnScroll>
                    </div>
                </div>

                {/* Right sidebar */}
                <div className="col-span-12 lg:col-span-4">
                    <AnimateOnScroll>
                        <DashboardCalendar />
                    </AnimateOnScroll>
                     <div className="mt-8">
                         <AnimateOnScroll>
                            <Bookings />
                         </AnimateOnScroll>
                    </div>
                </div>
            </div>
        </main>
    </div>
  );
}
