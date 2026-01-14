'use client';

import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Calendar } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { useUser, useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, limit } from 'firebase/firestore';
import Link from 'next/link';

export function MyTripsSummary() {
  const { user } = useUser();
  const firestore = useFirestore();

  const upcomingTripsQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, 'users', user.uid, 'trips'),
      where('status', '==', 'Upcoming'),
      limit(2)
    );
  }, [user, firestore]);

  const { data: upcomingTrips, isLoading } = useCollection(upcomingTripsQuery);

  const getImageForTrip = (destination: string) => {
    const tripId = `package-${destination.toLowerCase().replace(/ /g, '-')}`;
    return PlaceHolderImages.find((img) => img.id === tripId) || PlaceHolderImages.find((img) => img.id === 'gallery-1');
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
            <Briefcase />
            Upcoming Trips
        </CardTitle>
        <Button variant="link" asChild>
            <Link href="/my-trips">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading && <p>Loading trips...</p>}
        {!isLoading && upcomingTrips?.length === 0 && (
          <div className="text-center text-muted-foreground p-4">
            <p>No upcoming trips planned.</p>
          </div>
        )}
        <div className="space-y-4">
            {upcomingTrips?.map((trip) => (
            <Card key={trip.id} className="overflow-hidden flex items-center p-2">
                <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                <Image
                    src={getImageForTrip(trip.destination)?.imageUrl || ''}
                    alt={trip.destination}
                    fill
                    className="object-cover"
                    data-ai-hint={getImageForTrip(trip.destination)?.imageHint}
                />
                </div>
                <div className="ml-4 flex-grow">
                    <h4 className="font-bold">{trip.destination}</h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" /> {trip.dates}</p>
                </div>
                <Button variant="secondary" size="sm" asChild>
                    <Link href={`/my-trips/${trip.id}`}>Details</Link>
                </Button>
            </Card>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
