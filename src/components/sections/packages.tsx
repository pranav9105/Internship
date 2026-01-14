

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimateOnScroll } from '../animate-on-scroll';
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Calendar } from '../ui/calendar';
import { DateRange } from 'react-day-picker';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { OccupancyPicker } from '../search/occupancy-picker';
import type { Occupancy } from '../search/stay-search-form';
import { useUser, useFirestore, addDocumentNonBlocking } from '@/firebase';
import { collection, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { format, differenceInDays } from 'date-fns';
import { Textarea } from '../ui/textarea';

const packages = [
  {
    title: 'Andhra Pradesh',
    price: '22000',
    duration: '7 Days / 6 Nights',
    features: ['Temple Tours', 'Beach Visits', 'Local Cuisine'],
    image: PlaceHolderImages.find((img) => img.id === 'state-andhra-pradesh'),
  },
  {
    title: 'Arunachal Pradesh',
    price: '30000',
    duration: '8 Days / 7 Nights',
    features: ['Monastery Visits', 'Trekking', 'Scenic Landscapes'],
    image: PlaceHolderImages.find((img) => img.id === 'state-arunachal-pradesh'),
  },
  {
    title: 'Assam',
    price: '25000',
    duration: '6 Days / 5 Nights',
    features: ['Wildlife Safari', 'Tea Gardens', 'River Cruise'],
    image: PlaceHolderImages.find((img) => img.id === 'state-assam'),
  },
  {
    title: 'Bihar',
    price: '18000',
    duration: '5 Days / 4 Nights',
    features: ['Historical Sites', 'Spiritual Tours', 'Local Culture'],
    image: PlaceHolderImages.find((img) => img.id === 'state-bihar'),
  },
  {
    title: 'Chhattisgarh',
    price: '20000',
    duration: '6 Days / 5 Nights',
    features: ['Waterfalls', 'Tribal Villages', 'Cave Exploration'],
    image: PlaceHolderImages.find((img) => img.id === 'state-chhattisgarh'),
  },
  {
    title: 'Goa',
    price: '35000',
    duration: '4 Days / 3 Nights',
    features: ['North & South Goa Tour', 'Water Sports', 'Beachside Parties'],
    image: PlaceHolderImages.find((img) => img.id === 'package-goa-beach'),
  },
  {
    title: 'Gujarat',
    price: '28000',
    duration: '7 Days / 6 Nights',
    features: ['Rann of Kutch', 'Temples', 'Wildlife Sanctuaries'],
    image: PlaceHolderImages.find((img) => img.id === 'state-gujarat'),
  },
  {
    title: 'Haryana',
    price: '15000',
    duration: '4 Days / 3 Nights',
    features: ['Historical Sites', 'Lakes', 'Cultural Events'],
    image: PlaceHolderImages.find((img) => img.id === 'state-haryana'),
  },
  {
    title: 'Himachal Pradesh',
    price: '25000',
    duration: '10 Days / 9 Nights',
    features: ['Monastery Visits', 'High-Altitude Trekking', 'River Rafting'],
    image: PlaceHolderImages.find((img) => img.id === 'package-himalayan-escape'),
  },
  {
    title: 'Jharkhand',
    price: '19000',
    duration: '5 Days / 4 Nights',
    features: ['Waterfalls', 'Hills', 'Temples'],
    image: PlaceHolderImages.find((img) => img.id === 'state-jharkhand'),
  },
  {
    title: 'Karnataka',
    price: '26000',
    duration: '7 Days / 6 Nights',
    features: ['Historical Monuments', 'Hill Stations', 'Beaches'],
    image: PlaceHolderImages.find((img) => img.id === 'state-karnataka'),
  },
  {
    title: 'Kerala',
    price: '16000',
    duration: '6 Days / 5 Nights',
    features: ['Private Houseboat Stay', 'Ayurvedic Massage', 'Spice Plantation Visit'],
    image: PlaceHolderImages.find((img) => img.id === 'package-kerala-backwaters'),
  },
  {
    title: 'Madhya Pradesh',
    price: '24000',
    duration: '8 Days / 7 Nights',
    features: ['Wildlife Sanctuaries', 'Temples', 'Historical Forts'],
    image: PlaceHolderImages.find((img) => img.id === 'state-madhya-pradesh'),
  },
  {
    title: 'Maharashtra',
    price: '27000',
    duration: '7 Days / 6 Nights',
    features: ['Cave Temples', 'Forts', 'Mumbai City Tour'],
    image: PlaceHolderImages.find((img) => img.id === 'state-maharashtra'),
  },
  {
    title: 'Manipur',
    price: '29000',
    duration: '6 Days / 5 Nights',
    features: ['Loktak Lake', 'Cultural Tours', 'Trekking'],
    image: PlaceHolderImages.find((img) => img.id === 'state-manipur'),
  },
  {
    title: 'Meghalaya',
    price: '31000',
    duration: '7 Days / 6 Nights',
    features: ['Living Root Bridges', 'Waterfalls', 'Caves'],
    image: PlaceHolderImages.find((img) => img.id === 'state-meghalaya'),
  },
  {
    title: 'Mizoram',
    price: '32000',
    duration: '8 Days / 7 Nights',
    features: ['Hills', 'Lakes', 'Cultural Experiences'],
    image: PlaceHolderImages.find((img) => img.id === 'state-mizoram'),
  },
  {
    title: 'Nagaland',
    price: '33000',
    duration: '9 Days / 8 Nights',
    features: ['Hornbill Festival', 'Tribal Villages', 'Trekking'],
    image: PlaceHolderImages.find((img) => img.id === 'state-nagaland'),
  },
  {
    title: 'Odisha',
    price: '21000',
    duration: '6 Days / 5 Nights',
    features: ['Temples', 'Beaches', 'Chilika Lake'],
    image: PlaceHolderImages.find((img) => img.id === 'state-odisha'),
  },
  {
    title: 'Punjab',
    price: '17000',
    duration: '5 Days / 4 Nights',
    features: ['Golden Temple', 'Wagah Border', 'Punjabi Cuisine'],
    image: PlaceHolderImages.find((img) => img.id === 'state-punjab'),
  },
  {
    title: 'Rajasthan',
    price: '20000',
    duration: '9 Days / 8 Nights',
    features: ['Stay in Heritage Hotels', 'Desert Safari', 'Fort & Palace Tours'],
    image: PlaceHolderImages.find((img) => img.id === 'package-heritage-rajasthan'),
  },
  {
    title: 'Sikkim',
    price: '34000',
    duration: '8 Days / 7 Nights',
    features: ['Monasteries', 'Lakes', 'Mountain Views'],
    image: PlaceHolderImages.find((img) => img.id === 'state-sikkim'),
  },
  {
    title: 'Tamil Nadu',
    price: '23000',
    duration: '7 Days / 6 Nights',
    features: ['Temples', 'Hill Stations', 'Beaches'],
    image: PlaceHolderImages.find((img) => img.id === 'state-tamil-nadu'),
  },
  {
    title: 'Telangana',
    price: '20000',
    duration: '5 Days / 4 Nights',
    features: ['Historical Sites', 'Charminar', 'Ramoji Film City'],
    image: PlaceHolderImages.find((img) => img.id === 'state-telangana'),
  },
  {
    title: 'Tripura',
    price: '28000',
    duration: '6 Days / 5 Nights',
    features: ['Palaces', 'Lakes', 'Temples'],
    image: PlaceHolderImages.find((img) => img.id === 'state-tripura'),
  },
  {
    title: 'Uttar Pradesh',
    price: '19000',
    duration: '6 Days / 5 Nights',
    features: ['Taj Mahal', 'Varanasi Ghats', 'Lucknow Cuisine'],
    image: PlaceHolderImages.find((img) => img.id === 'state-uttar-pradesh'),
  },
  {
    title: 'Uttarakhand',
    price: '26000',
    duration: '7 Days / 6 Nights',
    features: ['Yoga & Meditation', 'Trekking', 'River Rafting'],
    image: PlaceHolderImages.find((img) => img.id === 'state-uttarakhand'),
  },
  {
    title: 'West Bengal',
    price: '22000',
    duration: '6 Days / 5 Nights',
    features: ['Kolkata City Tour', 'Sundarbans', 'Darjeeling Tea Gardens'],
    image: PlaceHolderImages.find((img) => img.id === 'state-west-bengal'),
  },
  {
    title: 'Jammu and Kashmir',
    price: '35000',
    duration: '8 Days / 7 Nights',
    features: ['Houseboat Stay', 'Gondola Ride', 'Mughal Gardens'],
    image: PlaceHolderImages.find((img) => img.id === 'state-jammu-kashmir'),
  }
].filter(pkg => pkg.image);

interface PackagesProps {
  isPage?: boolean;
}

type BookingData = {
    date: DateRange | undefined;
    occupancy: Occupancy;
    name: string;
    email: string;
    phone: string;
    specialRequests: string;
}

type PackageDetails = {
    title: string;
    price: string;
    duration: string;
    features: string[];
}

function BookingDialog({ pkg }: { pkg: PackageDetails }) {
  const [step, setStep] = useState(1);
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const [bookingData, setBookingData] = useState<BookingData>({
    date: {
        from: new Date(),
        to: new Date(new Date().setDate(new Date().getDate() + 7)),
    },
    occupancy: { adults: 2, children: 0, rooms: 1 },
    name: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    specialRequests: ''
  });
  
  const [isBooking, setIsBooking] = useState(false);

  const handleDataChange = (data: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...data }));
  };
  
  const handleBooking = async () => {
    if (!user || !firestore) {
      toast({
        title: "Please Sign In",
        description: "You need to be signed in to book a trip.",
        variant: "destructive",
      });
      return;
    }
    
    if (!bookingData.date?.from || !bookingData.date?.to) {
        toast({ title: "Error", description: "Please select a valid date range.", variant: "destructive" });
        return;
    }

    if (!bookingData.name || !bookingData.email) {
        toast({ title: "Error", description: "Please provide your name and email.", variant: "destructive" });
        return;
    }

    setIsBooking(true);
    const tripsCollection = collection(firestore, 'users', user.uid, 'trips');
    const bookingsCollection = collection(firestore, 'users', user.uid, 'bookings');
    const transactionsCollection = collection(firestore, 'users', user.uid, 'transactions');
    
    const formattedDates = `${format(bookingData.date.from, 'LLL dd, y')} - ${format(bookingData.date.to, 'LLL dd, y')}`;
    const mockDetails = `Flight: 6E-245, Hotel: Ocean View Resort`;

    try {
        const tripDoc = await addDocumentNonBlocking(tripsCollection, {
            destination: pkg.title,
            dates: formattedDates,
            status: 'Upcoming',
            occupancy: bookingData.occupancy,
            packageDuration: pkg.duration,
            packageFeatures: pkg.features,
        });
        
        const bookingDoc = await addDocumentNonBlocking(bookingsCollection, {
            type: 'Package',
            details: mockDetails,
            date: format(bookingData.date.from, 'yyyy-MM-dd'),
            status: 'Confirmed',
        });

        if (bookingDoc) {
            await addDocumentNonBlocking(transactionsCollection, {
                bookingId: bookingDoc.id,
                createdAt: serverTimestamp(),
                paymentMethod: "Card",
                paymentMethodDetails: "Visa **** 1234",
                amount: parseFloat(pkg.price) * bookingData.occupancy.adults,
                purpose: "Package",
                status: "Paid",
                travelerName: bookingData.name || user.displayName,
                destinationName: pkg.title,
            });
        }
        
        setStep(4); // Move to confirmation step

    } catch (error) {
        console.error("Booking failed:", error);
        toast({
            title: 'Booking Failed',
            description: 'An error occurred while confirming your booking. Please try again.',
            variant: 'destructive',
        });
    } finally {
        setIsBooking(false);
    }
  };

  const resetFlow = () => {
    setStep(1);
    setBookingData({
        date: { from: new Date(), to: new Date(new Date().setDate(new Date().getDate() + 7)) },
        occupancy: { adults: 2, children: 0, rooms: 1 },
        name: user?.displayName || '',
        email: user?.email || '',
        phone: '',
        specialRequests: ''
    });
  }
  
  const totalPrice = parseFloat(pkg.price) * bookingData.occupancy.adults;
  const numNights = bookingData.date?.from && bookingData.date?.to ? differenceInDays(bookingData.date.to, bookingData.date.from) : 0;


  return (
    <Dialog onOpenChange={(open) => !open && resetFlow()}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity">
          Book Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        {step === 1 && (
            <>
                <DialogHeader>
                    <DialogTitle>Step 1: Review Your Trip</DialogTitle>
                    <DialogDescription>Confirm dates and details for your trip to {pkg.title}.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label className="text-base font-semibold">Select Dates</Label>
                         <div className="flex justify-center mt-2">
                            <Calendar
                                mode="range"
                                selected={bookingData.date}
                                onSelect={(date) => handleDataChange({ date })}
                                className="rounded-md border"
                            />
                        </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                        <h3 className="text-base font-semibold">Price Breakup</h3>
                        <div className="flex justify-between"><span>Base Price:</span><span>₹{parseFloat(pkg.price).toLocaleString('en-IN')} x {bookingData.occupancy.adults} Adults</span></div>
                        <div className="flex justify-between"><span>Taxes & Fees (18%):</span><span>₹{(totalPrice * 0.18).toLocaleString('en-IN')}</span></div>
                        <Separator />
                        <div className="flex justify-between font-bold text-lg"><span>Total Price:</span><span>₹{(totalPrice * 1.18).toLocaleString('en-IN')}</span></div>
                    </div>
                    <p className="text-xs text-muted-foreground">Cancellation policy: Full refund if cancelled 14 days prior to check-in.</p>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
                    <Button onClick={() => setStep(2)}>Continue</Button>
                </DialogFooter>
            </>
        )}
        {step === 2 && (
             <>
                <DialogHeader>
                    <DialogTitle>Step 2: Add Traveller Details</DialogTitle>
                    <DialogDescription>Please provide information for the primary traveler.</DialogDescription>
                </DialogHeader>
                 <div className="space-y-4">
                    <div>
                        <Label className="text-base font-semibold">Who is going?</Label>
                        <OccupancyPicker value={bookingData.occupancy} onChange={(occupancy) => handleDataChange({ occupancy })} />
                    </div>
                    <Separator />
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" value={bookingData.name} onChange={(e) => handleDataChange({ name: e.target.value })} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" value={bookingData.email} onChange={(e) => handleDataChange({ email: e.target.value })} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" type="tel" value={bookingData.phone} onChange={(e) => handleDataChange({ phone: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="special-requests">Special Requests</Label>
                            <Textarea id="special-requests" value={bookingData.specialRequests} onChange={(e) => handleDataChange({ specialRequests: e.target.value })} />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="secondary" onClick={() => setStep(1)}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                    <Button onClick={() => setStep(3)}>Proceed to Payment</Button>
                </DialogFooter>
            </>
        )}
        {step === 3 && (
            <>
                <DialogHeader>
                    <DialogTitle>Step 3: Confirm and Pay</DialogTitle>
                    <DialogDescription>Please review your booking details before confirming.</DialogDescription>
                </DialogHeader>
                 <div className="space-y-4">
                     <Card>
                        <CardHeader>
                            <CardTitle>{pkg.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p><strong>Dates:</strong> {bookingData.date?.from && format(bookingData.date.from, 'LLL dd, y')} - {bookingData.date?.to && format(bookingData.date.to, 'LLL dd, y')} ({numNights} nights)</p>
                            <p><strong>Guests:</strong> {bookingData.occupancy.adults} Adults, {bookingData.occupancy.children} Children, {bookingData.occupancy.rooms} Rooms</p>
                            <p><strong>Traveller:</strong> {bookingData.name} ({bookingData.email})</p>
                            <Separator className="my-4" />
                            <div className="flex justify-between font-bold text-xl">
                                <span>Total Amount:</span>
                                <span>₹{(totalPrice * 1.18).toLocaleString('en-IN')}</span>
                            </div>
                             <p className="text-sm text-muted-foreground">You will be charged using your default payment method (Visa **** 1234).</p>
                        </CardContent>
                     </Card>
                </div>
                <DialogFooter>
                    <Button variant="secondary" onClick={() => setStep(2)}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                    <Button onClick={handleBooking} disabled={isBooking}>{isBooking ? 'Confirming...' : 'Confirm Booking'}</Button>
                </DialogFooter>
            </>
        )}
        {step === 4 && (
             <>
                <DialogHeader>
                    <DialogTitle>Booking Confirmed!</DialogTitle>
                    <DialogDescription>Your trip to {pkg.title} is booked. An email confirmation has been sent.</DialogDescription>
                </DialogHeader>
                <div className="text-center py-8">
                     <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                     <p>Your booking ID is: <strong>#{(Math.random()*100000).toFixed(0)}</strong></p>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button variant="secondary">Close</Button></DialogClose>
                    <Button asChild><Link href="/my-trips">View Trip</Link></Button>
                </DialogFooter>
            </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function Packages({ isPage = false }: PackagesProps) {
  const originalPackages = [
    packages.find(p => p.title === 'Rajasthan'),
    packages.find(p => p.title === 'Kerala'),
    packages.find(p => p.title === 'Himachal Pradesh'),
  ].filter(Boolean) as typeof packages;
  
  const displayedPackages = isPage ? packages : originalPackages;

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
                  <div className="mt-6 text-4xl font-bold font-headline">₹{parseInt(pkg.price).toLocaleString('en-IN')}</div>
                  <p className="text-sm text-muted-foreground">per person</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <BookingDialog pkg={pkg} />
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
