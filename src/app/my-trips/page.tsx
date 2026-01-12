
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, Plane, Calendar, Tag } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AnimateOnScroll } from '@/components/animate-on-scroll';
import { Badge } from '@/components/ui/badge';

const upcomingTrips = [
  {
    id: 1,
    destination: 'Himalayan Escape',
    dates: 'Oct 15, 2024 - Oct 25, 2024',
    status: 'Upcoming',
    image: PlaceHolderImages.find((img) => img.id === 'package-himalayan-escape'),
  },
  {
    id: 2,
    destination: 'Andaman Islands',
    dates: 'Dec 20, 2024 - Dec 27, 2024',
    status: 'Upcoming',
    image: PlaceHolderImages.find((img) => img.id === 'package-andaman-islands'),
  },
];

const pastTrips = [
  {
    id: 3,
    destination: 'Goa Beach Bliss',
    dates: 'Mar 10, 2024 - Mar 14, 2024',
    status: 'Completed',
    image: PlaceHolderImages.find((img) => img.id === 'package-goa-beach'),
  },
  {
    id: 4,
    destination: 'Golden Triangle',
    dates: 'Jan 05, 2024 - Jan 11, 2024',
    status: 'Completed',
    image: PlaceHolderImages.find((img) => img.id === 'package-golden-triangle'),
  },
];

export default function MyTripsPage() {
  return (
    <div className="flex min-h-screen bg-muted/40 w-full">
      <Sidebar />
      <div className="flex flex-col flex-grow md:pl-64">
        <Header />
        <main className="flex-grow pt-24 pb-8">
          <div className="container mx-auto px-4 md:px-6">
            <AnimateOnScroll>
              <header className="mb-8">
                <h1 className="font-headline text-4xl font-bold flex items-center gap-3">
                  <Briefcase className="h-8 w-8 text-primary" />
                  My Trips
                </h1>
                <p className="text-muted-foreground">Review your upcoming adventures and reminisce about past journeys.</p>
              </header>
            </AnimateOnScroll>

            <AnimateOnScroll delay={100}>
              <Tabs defaultValue="upcoming" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upcoming">Upcoming Trips</TabsTrigger>
                  <TabsTrigger value="past">Past Trips</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingTrips.map((trip) => (
                      <Card key={trip.id} className="overflow-hidden">
                        {trip.image && (
                          <div className="relative h-48 w-full">
                            <Image
                              src={trip.image.imageUrl}
                              alt={trip.destination}
                              fill
                              className="object-cover"
                              data-ai-hint={trip.image.imageHint}
                            />
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle>{trip.destination}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{trip.dates}</span>
                          </div>
                          <Badge variant="outline">{trip.status}</Badge>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">
                            View Details
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="past" className="mt-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pastTrips.map((trip) => (
                      <Card key={trip.id} className="overflow-hidden opacity-80">
                        {trip.image && (
                          <div className="relative h-48 w-full">
                            <Image
                              src={trip.image.imageUrl}
                              alt={trip.destination}
                              fill
                              className="object-cover"
                              data-ai-hint={trip.image.imageHint}
                            />
                           <div className="absolute inset-0 bg-black/20"></div>
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle>{trip.destination}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{trip.dates}</span>
                          </div>
                          <Badge variant="secondary">{trip.status}</Badge>
                        </CardContent>
                        <CardFooter>
                          <Button variant="ghost" className="w-full">
                            Leave a Review
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </AnimateOnScroll>
          </div>
        </main>
      </div>
    </div>
  );
}
