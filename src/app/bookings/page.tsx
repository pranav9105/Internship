'use client';

import { Header } from '@/components/layout/header';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Hotel } from 'lucide-react';
import { AnimateOnScroll } from '@/components/animate-on-scroll';
import { useUser, useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';

export default function BookingsPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const bookingsQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(collection(firestore, 'users', user.uid, 'bookings'));
  }, [user, firestore]);

  const { data: bookings, isLoading } = useCollection(bookingsQuery);

  return (
    <div className="flex min-h-screen bg-muted/40 w-full">
      <div className="flex flex-col flex-grow w-full">
        <Header />
        <main className="flex-grow pt-24 pb-8">
          <div className="container mx-auto px-4 md:px-6">
            <AnimateOnScroll>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Hotel />
                    Bookings History
                  </CardTitle>
                  <CardDescription>
                    A record of all your flight and hotel bookings.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Booking ID</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center">
                            Loading your bookings...
                          </TableCell>
                        </TableRow>
                      )}
                      {!isLoading && bookings?.length === 0 && (
                         <TableRow>
                          <TableCell colSpan={5} className="text-center">
                            You have no bookings yet.
                          </TableCell>
                        </TableRow>
                      )}
                      {bookings?.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium">{booking.id}</TableCell>
                          <TableCell>{booking.type}</TableCell>
                          <TableCell>{booking.details}</TableCell>
                          <TableCell>{booking.date}</TableCell>
                          <TableCell className="text-right">
                            <Badge
                              variant={
                                booking.status === 'Confirmed' ? 'default' : 'secondary'
                              }
                              className={booking.status === 'Confirmed' ? 'bg-green-600/80' : ''}
                            >
                              {booking.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          </div>
        </main>
      </div>
    </div>
  );
}
