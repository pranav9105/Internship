
"use client";

import { useState, useEffect } from 'react';
import { AnimateOnScroll } from '@/components/animate-on-scroll';
import { ScheduleCalendar } from '@/components/schedule/schedule-calendar';
import { ScheduleDetails } from '@/components/schedule/schedule-details';
import { QuickActions } from '@/components/schedule/quick-actions';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after the component has mounted.
    setIsClient(true);
    setSelectedDate(new Date());
  }, []);

  return (
    <div className="flex min-h-screen bg-muted/40 w-full">
      <Sidebar />
      <div className="flex flex-col flex-grow md:pl-64">
        <Header />
        <main className="flex-grow pt-24 pb-8">
          <div className="container mx-auto px-4 md:px-6">
            <header className="mb-8">
              <h1 className="font-headline text-4xl font-bold">Trip Schedule</h1>
              <p className="text-muted-foreground">
                View and manage your upcoming travel plans.
              </p>
            </header>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {isClient ? (
                <>
                  <AnimateOnScroll className="lg:col-span-2">
                    <ScheduleCalendar
                      selectedDate={selectedDate}
                      onDateChange={setSelectedDate}
                    />
                  </AnimateOnScroll>
                  <div className="space-y-8">
                    <AnimateOnScroll delay={100}>
                      <ScheduleDetails selectedDate={selectedDate} />
                    </AnimateOnScroll>
                    <AnimateOnScroll delay={200}>
                      <QuickActions />
                    </AnimateOnScroll>
                  </div>
                </>
              ) : (
                // Render a placeholder or skeleton loader on the server
                // to prevent hydration mismatch.
                <div className="lg:col-span-3 text-center p-8 text-muted-foreground">
                  Loading schedule...
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
