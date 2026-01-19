

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimateOnScroll } from '../animate-on-scroll';
import { CheckCircle, ArrowRight, ArrowLeft, Heart, CreditCard, ScanLine, Star } from 'lucide-react';
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
import { DateRange } from 'react-day-picker';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { OccupancyPicker } from '../search/occupancy-picker';
import type { Occupancy } from '../search/stay-search-form';
import { useUser, useFirestore, addDocumentNonBlocking } from '@/firebase';
import { collection, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { format, differenceInDays, parse, addDays } from 'date-fns';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const packages = [
  {
    title: 'Andhra Pradesh (Vishakhapatnam – Araku – Lambasingi)',
    price: '14999 – 16999',
    duration: '7 Days / 6 Nights',
    features: ['Temple Tours', 'Beach Visits', 'Local Cuisine'],
    image: PlaceHolderImages.find((img) => img.id === 'state-andhra-pradesh'),
    rating: 4.7,
    reviews: 132,
  },
  {
    title: 'Arunachal Pradesh (Tawang – Dirang – Bomdila)',
    price: '26999 – 29999',
    duration: '8 Days / 7 Nights',
    features: ['Monastery Visits', 'Trekking', 'Scenic Landscapes'],
    image: PlaceHolderImages.find((img) => img.id === 'state-arunachal-pradesh'),
    rating: 4.9,
    reviews: 98,
  },
  {
    title: 'Assam–Meghalaya',
    price: '17499',
    duration: '6 Days / 5 Nights',
    features: ['Wildlife Safari', 'Tea Gardens', 'River Cruise'],
    image: PlaceHolderImages.find((img) => img.id === 'state-assam'),
    rating: 4.8,
    reviews: 215,
  },
  {
    title: 'Bihar',
    price: '18000',
    duration: '5 Days / 4 Nights',
    features: ['Historical Sites', 'Spiritual Tours', 'Local Culture'],
    image: PlaceHolderImages.find((img) => img.id === 'state-bihar'),
    rating: 4.5,
    reviews: 88,
  },
  {
    title: 'Chhattisgarh',
    price: '20000',
    duration: '6 Days / 5 Nights',
    features: ['Waterfalls', 'Tribal Villages', 'Cave Exploration'],
    image: PlaceHolderImages.find((img) => img.id === 'state-chhattisgarh'),
    rating: 4.6,
    reviews: 75,
  },
  {
    title: 'Goa',
    price: '12499',
    duration: '4 Days / 3 Nights',
    features: ['North & South Goa Tour', 'Water Sports', 'Beachside Parties'],
    image: PlaceHolderImages.find((img) => img.id === 'package-goa-beach'),
    rating: 4.8,
    reviews: 540,
  },
  {
    title: 'Gujarat (Kutch–Somnath–Dwarka)',
    price: '16999',
    duration: '7 Days / 6 Nights',
    features: ['Rann of Kutch', 'Temples', 'Wildlife Sanctuaries'],
    image: PlaceHolderImages.find((img) => img.id === 'state-gujarat'),
    rating: 4.7,
    reviews: 320,
  },
  {
    title: 'Haryana',
    price: '15000',
    duration: '4 Days / 3 Nights',
    features: ['Historical Sites', 'Lakes', 'Cultural Events'],
    image: PlaceHolderImages.find((img) => img.id === 'state-haryana'),
    rating: 4.4,
    reviews: 65,
  },
  {
    title: 'Himachal Pradesh (Manali–Shimla)',
    price: '16499',
    duration: '10 Days / 9 Nights',
    features: ['Monastery Visits', 'High-Altitude Trekking', 'River Rafting'],
    image: PlaceHolderImages.find((img) => img.id === 'package-himalayan-escape'),
    rating: 4.9,
    reviews: 890,
  },
  {
    title: 'Jharkhand',
    price: '19000',
    duration: '5 Days / 4 Nights',
    features: ['Waterfalls', 'Hills', 'Temples'],
    image: PlaceHolderImages.find((img) => img.id === 'state-jharkhand'),
    rating: 4.5,
    reviews: 55,
  },
  {
    title: 'Karnataka (Coorg–Chikmagalur)',
    price: '12499',
    duration: '7 Days / 6 Nights',
    features: ['Historical Monuments', 'Hill Stations', 'Beaches'],
    image: PlaceHolderImages.find((img) => img.id === 'state-karnataka'),
    rating: 4.7,
    reviews: 250,
  },
  {
    title: 'Kerala (Munnar–Alleppey Houseboat)',
    price: '16499',
    duration: '6 Days / 5 Nights',
    features: ['Private Houseboat Stay', 'Ayurvedic Massage', 'Spice Plantation Visit'],
    image: PlaceHolderImages.find((img) => img.id === 'package-kerala-backwaters'),
    rating: 4.9,
    reviews: 1102,
  },
  {
    title: 'Madhya Pradesh (Khajuraho–Bandhavgarh)',
    price: '15499',
    duration: '8 Days / 7 Nights',
    features: ['Wildlife Sanctuaries', 'Temples', 'Historical Forts'],
    image: PlaceHolderImages.find((img) => img.id === 'state-madhya-pradesh'),
    rating: 4.6,
    reviews: 180,
  },
  {
    title: 'Maharashtra',
    price: '13999 – 17999',
    duration: '7 Days / 6 Nights',
    features: ['Cave Temples', 'Forts', 'Mumbai City Tour'],
    image: PlaceHolderImages.find((img) => img.id === 'state-maharashtra'),
    rating: 4.7,
    reviews: 450,
  },
  {
    title: 'Manipur',
    price: '29000',
    duration: '6 Days / 5 Nights',
    features: ['Loktak Lake', 'Cultural Tours', 'Trekking'],
    image: PlaceHolderImages.find((img) => img.id === 'state-manipur'),
    rating: 4.8,
    reviews: 45,
  },
  {
    title: 'Mizoram (Aizawl – Reiek – Hmuifang)',
    price: '22999 – 24999',
    duration: '8 Days / 7 Nights',
    features: ['Hills', 'Lakes', 'Cultural Experiences'],
    image: PlaceHolderImages.find((img) => img.id === 'state-mizoram'),
    rating: 4.7,
    reviews: 30,
  },
  {
    title: 'Nagaland (Kohima – Dzükou Valley – Khonoma)',
    price: '23999 – 26499',
    duration: '9 Days / 8 Nights',
    features: ['Hornbill Festival', 'Tribal Villages', 'Trekking'],
    image: PlaceHolderImages.find((img) => img.id === 'state-nagaland'),
    rating: 4.9,
    reviews: 60,
  },
  {
    title: 'Odisha (Puri–Konark)',
    price: '11999',
    duration: '6 Days / 5 Nights',
    features: ['Temples', 'Beaches', 'Chilika Lake'],
    image: PlaceHolderImages.find((img) => img.id === 'state-odisha'),
    rating: 4.6,
    reviews: 150,
  },
  {
    title: 'Punjab (Amritsar – Wagah – Jalandhar)',
    price: '11999 – 13999',
    duration: '5 Days / 4 Nights',
    features: ['Golden Temple', 'Wagah Border', 'Punjabi Cuisine'],
    image: PlaceHolderImages.find((img) => img.id === 'state-punjab'),
    rating: 4.8,
    reviews: 300,
  },
  {
    title: 'Rajasthan (Jaipur–Udaipur–Jaisalmer)',
    price: '17999',
    duration: '9 Days / 8 Nights',
    features: ['Stay in Heritage Hotels', 'Desert Safari', 'Fort & Palace Tours'],
    image: PlaceHolderImages.find((img) => img.id === 'package-heritage-rajasthan'),
    rating: 4.8,
    reviews: 950,
  },
  {
    title: 'Sikkim–Darjeeling',
    price: '18499',
    duration: '8 Days / 7 Nights',
    features: ['Monasteries', 'Lakes', 'Mountain Views'],
    image: PlaceHolderImages.find((img) => img.id === 'state-sikkim'),
    rating: 4.8,
    reviews: 480,
  },
  {
    title: 'Tamil Nadu (Ooty–Kodaikanal)',
    price: '15999',
    duration: '7 Days / 6 Nights',
    features: ['Temples', 'Hill Stations', 'Beaches'],
    image: PlaceHolderImages.find((img) => img.id === 'state-tamil-nadu'),
    rating: 4.7,
    reviews: 350,
  },
  {
    title: 'Telangana (Hyderabad – Ramoji – Warangal)',
    price: '12999 – 15499',
    duration: '5 Days / 4 Nights',
    features: ['Historical Sites', 'Charminar', 'Ramoji Film City'],
    image: PlaceHolderImages.find((img) => img.id === 'state-telangana'),
    rating: 4.6,
    reviews: 200,
  },
  {
    title: 'Tripura',
    price: '28000',
    duration: '6 Days / 5 Nights',
    features: ['Palaces', 'Lakes', 'Temples'],
    image: PlaceHolderImages.find((img) => img.id === 'state-tripura'),
    rating: 4.5,
    reviews: 40,
  },
  {
    title: 'Delhi–Agra–Mathura–Vrindavan',
    price: '10999',
    duration: '6 Days / 5 Nights',
    features: ['Taj Mahal', 'Varanasi Ghats', 'Lucknow Cuisine'],
    image: PlaceHolderImages.find((img) => img.id === 'state-uttar-pradesh'),
    rating: 4.7,
    reviews: 600,
  },
  {
    title: 'Uttarakhand (Nainital–Mussoorie)',
    price: '14999',
    duration: '7 Days / 6 Nights',
    features: ['Yoga & Meditation', 'Trekking', 'River Rafting'],
    image: PlaceHolderImages.find((img) => img.id === 'state-uttarakhand'),
    rating: 4.8,
    reviews: 420,
  },
  {
    title: 'West Bengal',
    price: '22000',
    duration: '6 Days / 5 Nights',
    features: ['Kolkata City Tour', 'Sundarbans', 'Darjeeling Tea Gardens'],
    image: PlaceHolderImages.find((img) => img.id === 'state-west-bengal'),
    rating: 4.6,
    reviews: 280,
  },
  {
    title: 'Jammu & Kashmir (Srinagar – Gulmarg – Pahalgam – Sonmarg)',
    price: '24999 – 32999',
    duration: '8 Days / 7 Nights',
    features: ['Houseboat Stay', 'Gondola Ride', 'Mughal Gardens'],
    image: PlaceHolderImages.find((img) => img.id === 'state-jammu-kashmir'),
    rating: 4.9,
    reviews: 1200,
  },
  {
    title: 'Andaman & Nicobar',
    price: '28999',
    duration: '7 Days / 6 Nights',
    features: ['Scuba Diving', 'Cellular Jail', 'Radhanagar Beach'],
    image: PlaceHolderImages.find((img) => img.id === 'package-andaman-islands'),
    rating: 4.9,
    reviews: 750,
  },
  {
    title: 'Leh–Ladakh',
    price: '32999',
    duration: '8 Days / 7 Nights',
    features: ['Pangong Lake', 'Nubra Valley', 'Monastery Tour'],
    image: PlaceHolderImages.find((img) => img.id === 'destination-ladakh'),
    rating: 4.9,
    reviews: 1500,
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
  const qrImage = PlaceHolderImages.find(img => img.id === 'payment-qr');
  
  const [bookingData, setBookingData] = useState<BookingData>({
    date: {
        from: undefined,
        to: undefined,
    },
    occupancy: { adults: 2, children: 0, rooms: 1 },
    name: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    specialRequests: ''
  });
  
  const [isBooking, setIsBooking] = useState(false);

  const getDurationInDays = (duration: string): number => {
    const daysMatch = duration.match(/(\d+)\s*Days/);
    return daysMatch ? parseInt(daysMatch[1], 10) : 0;
  };

  const handleDateChange = (value: string) => {
    try {
      const fromDate = value ? parse(value, 'yyyy-MM-dd', new Date()) : undefined;
      let toDate: Date | undefined = undefined;
      if (fromDate) {
        const durationDays = getDurationInDays(pkg.duration);
        if (durationDays > 0) {
            // Subtract 1 because e.g. a 4 day trip from the 1st ends on the 4th, which is 3 days after.
            toDate = addDays(fromDate, durationDays - 1);
        }
      }

      setBookingData(prev => ({
        ...prev,
        date: {
          from: fromDate,
          to: toDate,
        }
      }));
    } catch (error) {
      // Handle invalid date format if needed
      console.error("Invalid date format:", value);
    }
  };

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
        toast({ title: "Error", description: "Please select a valid check-in date.", variant: "destructive" });
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
    const basePrice = parseFloat(pkg.price.split('–')[0].trim().replace(/,/g, ''));

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
                amount: basePrice * bookingData.occupancy.adults * 1.12,
                purpose: "Package",
                status: "Paid",
                travelerName: bookingData.name || user.displayName,
                destinationName: pkg.title,
            });
        }
        
        setStep(3); // Move to confirmation step

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
        date: { from: undefined, to: undefined },
        occupancy: { adults: 2, children: 0, rooms: 1 },
        name: user?.displayName || '',
        email: user?.email || '',
        phone: '',
        specialRequests: ''
    });
  }
  
  const basePrice = parseFloat(pkg.price.split('–')[0].trim().replace(/,/g, ''));
  const totalPrice = basePrice * bookingData.occupancy.adults;
  const numNights = bookingData.date?.from && bookingData.date?.to ? differenceInDays(bookingData.date.to, bookingData.date.from) : (getDurationInDays(pkg.duration) - 1);


  return (
    <Dialog onOpenChange={(open) => !open && resetFlow()}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity">
          Book Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        {step === 1 && (
            <>
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle>Step 1: Your Details</DialogTitle>
                    <DialogDescription>Enter your travel dates and personal information.</DialogDescription>
                </DialogHeader>
                 <div className="p-6 grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                        <Label>Check-in Date</Label>
                        <Input 
                            type="date" 
                            onChange={(e) => handleDateChange(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label className="text-base font-semibold">Who is going?</Label>
                        <OccupancyPicker value={bookingData.occupancy} onChange={(occupancy) => handleDataChange({ occupancy })} />
                    </div>
                    <Separator />
                    <div className="space-y-4">
                         <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" value={bookingData.name} onChange={(e) => handleDataChange({ name: e.target.value })} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" value={bookingData.email} onChange={(e) => handleDataChange({ email: e.target.value })} />
                        </div>
                    </div>
                </div>
                <DialogFooter className="p-6 pt-0 bg-background sticky bottom-0">
                    <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
                    <Button onClick={() => setStep(2)}>Proceed to Payment</Button>
                </DialogFooter>
            </>
        )}
        {step === 2 && (
            <>
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle>Step 2: Complete Your Payment</DialogTitle>
                    <DialogDescription>Choose your payment method and confirm your booking.</DialogDescription>
                </DialogHeader>
                 <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left side - Summary */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg">Booking Summary</h3>
                        <Card>
                            <CardContent className="p-4 space-y-2">
                                <p className="font-bold">{pkg.title}</p>
                                <p className="text-sm"><strong>Dates:</strong> {bookingData.date?.from && format(bookingData.date.from, 'dd MMM')} - {bookingData.date?.to && format(bookingData.date.to, 'dd MMM yyyy')}</p>
                                <p className="text-sm"><strong>Guests:</strong> {bookingData.occupancy.adults} Adults, {bookingData.occupancy.children} Children</p>
                                <Separator className="my-2"/>
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total:</span>
                                    <span>₹{(totalPrice * 1.12).toLocaleString('en-IN')}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right side - Payment Options */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg">Payment Method</h3>
                        <Tabs defaultValue="card" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="card"><CreditCard className="mr-2 h-4 w-4"/>Card</TabsTrigger>
                                <TabsTrigger value="upi"><ScanLine className="mr-2 h-4 w-4"/>UPI / QR</TabsTrigger>
                            </TabsList>
                            <TabsContent value="card" className="mt-4 space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="card-no">Card Number</Label>
                                    <Input id="card-no" placeholder="xxxx xxxx xxxx xxxx" defaultValue="4242 4242 4242 4242"/>
                                </div>
                                 <div className="grid grid-cols-2 gap-4">
                                     <div className="space-y-2">
                                        <Label htmlFor="expiry">Expiry</Label>
                                        <Input id="expiry" placeholder="MM/YY" defaultValue="12/28"/>
                                    </div>
                                     <div className="space-y-2">
                                        <Label htmlFor="cvc">CVC</Label>
                                        <Input id="cvc" placeholder="123" defaultValue="123"/>
                                    </div>
                                 </div>
                            </TabsContent>
                            <TabsContent value="upi" className="mt-4">
                                <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-lg">
                                    {qrImage && (
                                         <Image
                                            src={qrImage.imageUrl}
                                            alt={qrImage.description}
                                            width={150}
                                            height={150}
                                            data-ai-hint={qrImage.imageHint}
                                        />
                                    )}
                                    <p className="mt-2 font-bold">Scan to Pay</p>
                                    <p className="text-sm text-muted-foreground">or use UPI ID</p>
                                     <Input className="mt-4" placeholder="your-upi-id@okhdfc" />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                 </div>
                <DialogFooter className="p-6 pt-0 bg-background sticky bottom-0">
                    <Button variant="secondary" onClick={() => setStep(1)}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                    <Button onClick={handleBooking} disabled={isBooking}>{isBooking ? 'Processing...' : `Pay ₹${(totalPrice * 1.12).toLocaleString('en-IN')}`}</Button>
                </DialogFooter>
            </>
        )}
        {step === 3 && (
             <>
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle>Booking Confirmed!</DialogTitle>
                    <DialogDescription>Your trip to {pkg.title} is booked. An email confirmation has been sent.</DialogDescription>
                </DialogHeader>
                <div className="p-6 text-center py-8">
                     <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                     <p>Your booking ID is: <strong>#{(Math.random()*100000).toFixed(0)}</strong></p>
                </div>
                <DialogFooter className="p-6 pt-0 bg-background sticky bottom-0">
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
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const originalPackages = [
    packages.find(p => p.title.includes('Rajasthan')),
    packages.find(p => p.title.includes('Kerala')),
    packages.find(p => p.title.includes('Himachal')),
  ].filter(Boolean) as typeof packages;
  
  const displayedPackages = isPage ? packages : originalPackages;

  const handleAddToWishlist = (pkg: (typeof packages)[0]) => {
    if (!user || !firestore) {
      toast({
        title: "Please sign in",
        description: "You need to be logged in to add items to your wishlist.",
        variant: "destructive",
      });
      return;
    }
    const wishlistCollection = collection(firestore, 'users', user.uid, 'wishlist');
    addDocumentNonBlocking(wishlistCollection, {
      name: pkg.title,
      description: pkg.duration,
    });
    toast({
      title: "Added to Wishlist!",
      description: `${pkg.title} has been added to your wishlist.`,
    });
  };

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
              <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group">
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
                        <Button 
                          size="icon" 
                          variant="secondary" 
                          className="absolute top-4 right-4 rounded-full h-10 w-10 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleAddToWishlist(pkg)}
                          disabled={isUserLoading}
                        >
                            <Heart className="text-destructive fill-current" />
                            <span className="sr-only">Add to wishlist</span>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-6 flex-grow flex flex-col">
                  <CardTitle className="font-headline text-2xl">{pkg.title}</CardTitle>
                  <CardDescription className="mt-2">{pkg.duration}</CardDescription>
                  <div className="flex items-center gap-2 mt-4 text-sm">
                    <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    </div>
                    <span className="font-bold">{pkg.rating}</span>
                    <span className="text-muted-foreground">({pkg.reviews} reviews)</span>
                  </div>
                  <ul className="mt-4 space-y-3 text-muted-foreground flex-grow">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-accent" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 text-4xl font-bold font-headline">
                    {pkg.price.includes('–') ? `From ₹${parseInt(pkg.price.split('–')[0].trim().replace(/,/g, '')).toLocaleString('en-IN')}` : `₹${parseInt(pkg.price).toLocaleString('en-IN')}`}
                    </div>
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
