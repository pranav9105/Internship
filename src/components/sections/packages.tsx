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
    title: 'Andhra Pradesh',
    price: '₹22,000',
    duration: '7 Days / 6 Nights',
    features: ['Temple Tours', 'Beach Visits', 'Local Cuisine'],
    image: PlaceHolderImages.find((img) => img.id === 'state-andhra-pradesh'),
  },
  {
    title: 'Arunachal Pradesh',
    price: '₹30,000',
    duration: '8 Days / 7 Nights',
    features: ['Monastery Visits', 'Trekking', 'Scenic Landscapes'],
    image: PlaceHolderImages.find((img) => img.id === 'state-arunachal-pradesh'),
  },
  {
    title: 'Assam',
    price: '₹25,000',
    duration: '6 Days / 5 Nights',
    features: ['Wildlife Safari', 'Tea Gardens', 'River Cruise'],
    image: PlaceHolderImages.find((img) => img.id === 'state-assam'),
  },
  {
    title: 'Bihar',
    price: '₹18,000',
    duration: '5 Days / 4 Nights',
    features: ['Historical Sites', 'Spiritual Tours', 'Local Culture'],
    image: PlaceHolderImages.find((img) => img.id === 'state-bihar'),
  },
  {
    title: 'Chhattisgarh',
    price: '₹20,000',
    duration: '6 Days / 5 Nights',
    features: ['Waterfalls', 'Tribal Villages', 'Cave Exploration'],
    image: PlaceHolderImages.find((img) => img.id === 'state-chhattisgarh'),
  },
  {
    title: 'Goa',
    price: '₹35,000',
    duration: '4 Days / 3 Nights',
    features: ['North & South Goa Tour', 'Water Sports', 'Beachside Parties'],
    image: PlaceHolderImages.find((img) => img.id === 'package-goa-beach'),
  },
  {
    title: 'Gujarat',
    price: '₹28,000',
    duration: '7 Days / 6 Nights',
    features: ['Rann of Kutch', 'Temples', 'Wildlife Sanctuaries'],
    image: PlaceHolderImages.find((img) => img.id === 'state-gujarat'),
  },
  {
    title: 'Haryana',
    price: '₹15,000',
    duration: '4 Days / 3 Nights',
    features: ['Historical Sites', 'Lakes', 'Cultural Events'],
    image: PlaceHolderImages.find((img) => img.id === 'state-haryana'),
  },
  {
    title: 'Himachal Pradesh',
    price: '₹25,000',
    duration: '10 Days / 9 Nights',
    features: ['Monastery Visits', 'High-Altitude Trekking', 'River Rafting'],
    image: PlaceHolderImages.find((img) => img.id === 'package-himalayan-escape'),
  },
  {
    title: 'Jharkhand',
    price: '₹19,000',
    duration: '5 Days / 4 Nights',
    features: ['Waterfalls', 'Hills', 'Temples'],
    image: PlaceHolderImages.find((img) => img.id === 'state-jharkhand'),
  },
  {
    title: 'Karnataka',
    price: '₹26,000',
    duration: '7 Days / 6 Nights',
    features: ['Historical Monuments', 'Hill Stations', 'Beaches'],
    image: PlaceHolderImages.find((img) => img.id === 'state-karnataka'),
  },
  {
    title: 'Kerala',
    price: '₹16,000',
    duration: '6 Days / 5 Nights',
    features: ['Private Houseboat Stay', 'Ayurvedic Massage', 'Spice Plantation Visit'],
    image: PlaceHolderImages.find((img) => img.id === 'package-kerala-backwaters'),
  },
  {
    title: 'Madhya Pradesh',
    price: '₹24,000',
    duration: '8 Days / 7 Nights',
    features: ['Wildlife Sanctuaries', 'Temples', 'Historical Forts'],
    image: PlaceHolderImages.find((img) => img.id === 'state-madhya-pradesh'),
  },
  {
    title: 'Maharashtra',
    price: '₹27,000',
    duration: '7 Days / 6 Nights',
    features: ['Cave Temples', 'Forts', 'Mumbai City Tour'],
    image: PlaceHolderImages.find((img) => img.id === 'state-maharashtra'),
  },
  {
    title: 'Manipur',
    price: '₹29,000',
    duration: '6 Days / 5 Nights',
    features: ['Loktak Lake', 'Cultural Tours', 'Trekking'],
    image: PlaceHolderImages.find((img) => img.id === 'state-manipur'),
  },
  {
    title: 'Meghalaya',
    price: '₹31,000',
    duration: '7 Days / 6 Nights',
    features: ['Living Root Bridges', 'Waterfalls', 'Caves'],
    image: PlaceHolderImages.find((img) => img.id === 'state-meghalaya'),
  },
  {
    title: 'Mizoram',
    price: '₹32,000',
    duration: '8 Days / 7 Nights',
    features: ['Hills', 'Lakes', 'Cultural Experiences'],
    image: PlaceHolderImages.find((img) => img.id === 'state-mizoram'),
  },
  {
    title: 'Nagaland',
    price: '₹33,000',
    duration: '9 Days / 8 Nights',
    features: ['Hornbill Festival', 'Tribal Villages', 'Trekking'],
    image: PlaceHolderImages.find((img) => img.id === 'state-nagaland'),
  },
  {
    title: 'Odisha',
    price: '₹21,000',
    duration: '6 Days / 5 Nights',
    features: ['Temples', 'Beaches', 'Chilika Lake'],
    image: PlaceHolderImages.find((img) => img.id === 'state-odisha'),
  },
  {
    title: 'Punjab',
    price: '₹17,000',
    duration: '5 Days / 4 Nights',
    features: ['Golden Temple', 'Wagah Border', 'Punjabi Cuisine'],
    image: PlaceHolderImages.find((img) => img.id === 'state-punjab'),
  },
  {
    title: 'Rajasthan',
    price: '₹20,000',
    duration: '9 Days / 8 Nights',
    features: ['Stay in Heritage Hotels', 'Desert Safari', 'Fort & Palace Tours'],
    image: PlaceHolderImages.find((img) => img.id === 'package-heritage-rajasthan'),
  },
  {
    title: 'Sikkim',
    price: '₹34,000',
    duration: '8 Days / 7 Nights',
    features: ['Monasteries', 'Lakes', 'Mountain Views'],
    image: PlaceHolderImages.find((img) => img.id === 'state-sikkim'),
  },
  {
    title: 'Tamil Nadu',
    price: '₹23,000',
    duration: '7 Days / 6 Nights',
    features: ['Temples', 'Hill Stations', 'Beaches'],
    image: PlaceHolderImages.find((img) => img.id === 'state-tamil-nadu'),
  },
  {
    title: 'Telangana',
    price: '₹20,000',
    duration: '5 Days / 4 Nights',
    features: ['Historical Sites', 'Charminar', 'Ramoji Film City'],
    image: PlaceHolderImages.find((img) => img.id === 'state-telangana'),
  },
  {
    title: 'Tripura',
    price: '₹28,000',
    duration: '6 Days / 5 Nights',
    features: ['Palaces', 'Lakes', 'Temples'],
    image: PlaceHolderImages.find((img) => img.id === 'state-tripura'),
  },
  {
    title: 'Uttar Pradesh',
    price: '₹19,000',
    duration: '6 Days / 5 Nights',
    features: ['Taj Mahal', 'Varanasi Ghats', 'Lucknow Cuisine'],
    image: PlaceHolderImages.find((img) => img.id === 'state-uttar-pradesh'),
  },
  {
    title: 'Uttarakhand',
    price: '₹26,000',
    duration: '7 Days / 6 Nights',
    features: ['Yoga & Meditation', 'Trekking', 'River Rafting'],
    image: PlaceHolderImages.find((img) => img.id === 'state-uttarakhand'),
  },
  {
    title: 'West Bengal',
    price: '₹22,000',
    duration: '6 Days / 5 Nights',
    features: ['Kolkata City Tour', 'Sundarbans', 'Darjeeling Tea Gardens'],
    image: PlaceHolderImages.find((img) => img.id === 'state-west-bengal'),
  },
  {
    title: 'Jammu and Kashmir',
    price: '₹35,000',
    duration: '8 Days / 7 Nights',
    features: ['Houseboat Stay', 'Gondola Ride', 'Mughal Gardens'],
    image: PlaceHolderImages.find((img) => img.id === 'state-jammu-kashmir'),
  }
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
