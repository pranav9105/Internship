
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimateOnScroll } from '../animate-on-scroll';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Calendar } from '../ui/calendar';
import { DateRange } from 'react-day-picker';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { OccupancyPicker } from '../search/occupancy-picker';
import type { Occupancy } from '../search/stay-search-form';

const packages = [
  {
    title: 'Heritage Rajasthan',
    price: '₹20,000',
    duration: '9 Days / 8 Nights',
    features: ['Stay in Heritage Hotels', 'Desert Safari', 'Fort & Palace Tours'],
    image: PlaceHolderImages.find((img) => img.id === 'package-heritage-rajasthan'),
  },
  {
    title: 'Kerala Backwaters',
    price: '₹16,000',
    duration: '6 Days / 5 Nights',
    features: ['Private Houseboat Stay', 'Ayurvedic Massage', 'Spice Plantation Visit'],
    image: PlaceHolderImages.find((img) => img.id === 'package-kerala-backwaters'),
  },
  {
    title: 'Himalayan Escape',
    price: '₹25,000',
    duration: '10 Days / 9 Nights',
    features: ['Monastery Visits', 'High-Altitude Trekking', 'River Rafting'],
    image: PlaceHolderImages.find((img) => img.id === 'package-himalayan-escape'),
  },
  {
    title: 'Grand India Tour',
    price: '₹1,20,000',
    duration: '30 Days / 29 Nights',
    features: ['Covers 10 major states', 'Delhi, Rajasthan, UP, Punjab', 'Goa, Kerala, Tamil Nadu', 'All-inclusive stays & transport'],
    image: PlaceHolderImages.find((img) => img.id === 'gallery-2'),
  },
  {
    title: 'Goa Beach Bliss',
    price: '₹35,000',
    duration: '4 Days / 3 Nights',
    features: ['North & South Goa Tour', 'Water Sports', 'Beachside Parties'],
    image: PlaceHolderImages.find((img) => img.id === 'package-goa-beach'),
  },
  {
    title: 'Golden Triangle',
    price: '₹42,000',
    duration: '6 Days / 5 Nights',
    features: ['Delhi, Agra & Jaipur', 'Taj Mahal at Sunrise', 'Rickshaw Ride in Delhi'],
    image: PlaceHolderImages.find((img) => img.id === 'package-golden-triangle'),
  },
  {
    title: 'Andaman Islands',
    price: '₹49,000',
    duration: '7 Days / 6 Nights',
    features: ['Scuba Diving', 'Cellular Jail Visit', 'Radhanagar Beach'],
    image: PlaceHolderImages.find((img) => img.id === 'package-andaman-islands'),
  },
  {
    title: 'Wildlife Safari',
    price: '₹46,000',
    duration: '5 Days / 4 Nights',
    features: ['Jungle Jeep Safari', 'Stay in a Wildlife Resort', 'Bird Watching Tours'],
    image: PlaceHolderImages.find((img) => img.id === 'package-wildlife-safari'),
  },
];

interface PackagesProps {
  isPage?: boolean;
}

function BookingDialog({ pkgTitle }: { pkgTitle: string }) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 7)),
  });
  const [occupancy, setOccupancy] = useState<Occupancy>({ adults: 2, children: 0, rooms: 1 });


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity">
          Book Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book Your Trip: {pkgTitle}</DialogTitle>
          <DialogDescription>
            Select your desired dates and provide your information for this adventure.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
            <div>
                <Label className="text-base font-semibold">Select Dates</Label>
                <div className="flex justify-center mt-2">
                    <Calendar
                        mode="range"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                    />
                </div>
            </div>
            <Separator />
            <div>
                <Label className="text-base font-semibold">Who is going?</Label>
                <OccupancyPicker value={occupancy} onChange={setOccupancy} />
            </div>
            <Separator />
             <div>
                <Label className="text-base font-semibold">Your Information</Label>
                 <div className="space-y-4 mt-2">
                     <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Enter your name" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Enter your email" />
                    </div>
                 </div>
            </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary">
            Cancel
          </Button>
          <Button asChild>
            <Link href="/signup">Confirm Booking</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function Packages({ isPage = false }: PackagesProps) {
  const displayedPackages = isPage ? packages : packages.slice(0, 3);

  return (
    <section id="packages" className="py-20 md:py-32 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <AnimateOnScroll>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-4xl font-bold md:text-5xl">Special Deals</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Carefully crafted experiences for every type of traveler.
            </p>
          </div>
        </AnimateOnScroll>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayedPackages.map((pkg, index) => (
            <AnimateOnScroll key={pkg.title} delay={index * 100}>
              <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <CardHeader className="p-0">
                    <div className="relative h-60 w-full">
                        {pkg.image && (
                            <Image
                                src={pkg.image.imageUrl}
                                alt={pkg.title}
                                fill
                                className="object-cover"
                                data-ai-hint={pkg.image.imageHint}
                            />
                        )}
                    </div>
                </CardHeader>
                <CardContent className="p-6 flex-grow flex flex-col">
                  <CardTitle className="font-headline text-2xl">{pkg.title}</CardTitle>
                  <CardDescription className="mt-2">{pkg.duration}</CardDescription>
                  <ul className="mt-6 space-y-3 text-muted-foreground flex-grow">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-accent" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 text-4xl font-bold font-headline">{pkg.price}</div>
                  <p className="text-sm text-muted-foreground">per person</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <BookingDialog pkgTitle={pkg.title} />
                </CardFooter>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
        {!isPage && (
          <AnimateOnScroll delay={300}>
            <div className="mt-16 text-center">
              <Button asChild size="lg">
                <Link href="/deals">
                  View All Deals
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </AnimateOnScroll>
        )}
      </div>
    </section>
  );
}
