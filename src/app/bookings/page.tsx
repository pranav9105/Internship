
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

const bookings = [
  {
    id: 'BK-84726',
    type: 'Hotel',
    details: 'The Grand Parisian, Paris',
    date: '2024-11-15',
    status: 'Confirmed',
  },
  {
    id: 'BK-72945',
    type: 'Flight',
    details: 'DEL → CDG, Air India AI143',
    date: '2024-11-14',
    status: 'Confirmed',
  },
  {
    id: 'BK-61029',
    type: 'Hotel',
    details: 'Beachfront Resort, Goa',
    date: '2024-03-10',
    status: 'Completed',
  },
  {
    id: 'BK-58319',
    type: 'Flight',
    details: 'BOM → GOI, IndiGo 6E249',
    date: '2024-03-10',
    status: 'Completed',
  },
];

export default function BookingsPage() {
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
                      {bookings.map((booking) => (
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
