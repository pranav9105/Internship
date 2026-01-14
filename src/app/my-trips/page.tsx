'use client';

import Image from 'next/image';
import { Sidebar } from '@/components/layout/sidebar';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, Calendar } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AnimateOnScroll } from '@/components/animate-on-scroll';
import { Badge } from '@/components/ui/badge';
import { useUser, useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import Link from 'next/link';

export default function MyTripsPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const upcomingTripsQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, 'users', user.uid, 'trips'),
      where('status', '==', 'Upcoming')
    );
  }, [user, firestore]);

  const pastTripsQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, 'users', user.uid, 'trips'),
      where('status', '==', 'Completed')
    );
  }, [user, firestore]);

  const { data: upcomingTrips, isLoading: upcomingLoading } = useCollection(upcomingTripsQuery);
  const { data: pastTrips, isLoading: pastLoading } = useCollection(pastTripsQuery);

  const getImageForTrip = (destination: string) => {
    const tripId = `package-${destination.toLowerCase().replace(/ /g, '-')}`;
    return PlaceHolderImages.find((img) => img.id === tripId) || PlaceHolderImages.find((img) => img.id === 'gallery-1');
  };

  return (
    <div className="flex w-full">
      <Sidebar />
      <main className="flex-grow p-8">
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
                    {upcomingLoading && <p>Loading upcoming trips...</p>}
                    {!upcomingLoading && upcomingTrips?.length === 0 && <p>No upcoming trips found.</p>}
                    {upcomingTrips?.map((trip) => (
                      <Card key={trip.id} className="overflow-hidden">
                        <div className="relative h-48 w-full">
                          <Image
                            src={getImageForTrip(trip.destination)?.imageUrl || ''}
                            alt={trip.destination}
                            fill
                            className="object-cover"
                            data-ai-hint={getImageForTrip(trip.destination)?.imageHint}
                          />
                        </div>
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
                          <Button variant="outline" className="w-full" asChild>
                            <Link href={`/my-trips/${trip.id}`}>View Details</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="past" className="mt-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {pastLoading && <p>Loading past trips...</p>}
                     {!pastLoading && pastTrips?.length === 0 && <p>No past trips found.</p>}
                    {pastTrips?.map((trip) => (
                      <Card key={trip.id} className="overflow-hidden opacity-80">
                         <div className="relative h-48 w-full">
                          <Image
                            src={getImageForTrip(trip.destination)?.imageUrl || ''}
                            alt={trip.destination}
                            fill
                            className="object-cover"
                            data-ai-hint={getImageForTrip(trip.destination)?.imageHint}
                          />
                           <div className="absolute inset-0 bg-black/20"></div>
                          </div>
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
  );
}
