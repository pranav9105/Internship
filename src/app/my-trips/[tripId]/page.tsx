
'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUser, useFirestore, useDoc, useMemoFirebase, updateDocumentNonBlocking } from '@/firebase';
import { doc } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimateOnScroll } from '@/components/animate-on-scroll';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Calendar,
  ChevronLeft,
  Loader,
  Sparkles,
  MapPin,
  Sunrise,
  Sun,
  Sunset,
  Moon,
  Utensils,
  Ban,
} from 'lucide-react';
import { getItinerary } from '@/ai/flows/generate-itinerary';
import type { Itinerary } from '@/ai/flows/generate-itinerary';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { differenceInDays, parse } from 'date-fns';
import { Header } from '@/components/layout/header';
import { useToast } from '@/hooks/use-toast';

const dayIcons = {
  Morning: Sunrise,
  Afternoon: Sun,
  Evening: Sunset,
  Night: Moon,
};

export default function TripDetailsPage() {
  const { tripId } = useParams();
  const { user } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [isLoadingItinerary, setIsLoadingItinerary] = useState(false);

  const tripDocRef = useMemoFirebase(() => {
    if (!user || !firestore || !tripId) return null;
    return doc(firestore, 'users', user.uid, 'trips', tripId as string);
  }, [user, firestore, tripId]);

  const { data: trip, isLoading: isLoadingTrip } = useDoc(tripDocRef);

  const getImageForTrip = (destination: string) => {
    const imageId = `package-${destination.toLowerCase().replace(/ /g, '-')}`;
    return (
      PlaceHolderImages.find((img) => img.id === imageId) ||
      PlaceHolderImages.find((img) => img.id === 'gallery-1')
    );
  };

  const calculateDuration = (dates: string): string | undefined => {
    if (!dates) return undefined;
    const parts = dates.split(' - ');
    if (parts.length !== 2) return undefined;

    try {
      // Assuming format "LLL dd, y" -> "Jan 14, 2026"
      const fromDate = parse(parts[0], 'LLL dd, y', new Date());
      const toDate = parse(parts[1], 'LLL dd, y', new Date());
      const days = differenceInDays(toDate, fromDate) + 1; // Inclusive of start day
      const nights = days - 1;
      if (days > 0 && nights >= 0) {
        return `${days} Days / ${nights} Nights`;
      }
    } catch (e) {
        console.error("Error parsing date for duration", e);
    }
    return undefined;
  }

  const handleGenerateItinerary = async () => {
    if (!trip) return;
    setIsLoadingItinerary(true);
    const calculatedDuration = calculateDuration(trip.dates);
    try {
      const result = await getItinerary({
        destination: trip.destination,
        packageDuration: calculatedDuration || trip.packageDuration,
        packageFeatures: trip.packageFeatures,
      });
      setItinerary(result);
    } catch (error) {
      console.error('Failed to generate itinerary:', error);
      toast({
        title: "Error Generating Itinerary",
        description: "We couldn't generate a sample itinerary at this time.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingItinerary(false);
    }
  };

  const handleCancelTrip = () => {
    if (!tripDocRef) return;
    updateDocumentNonBlocking(tripDocRef, { status: 'Cancelled' });
    toast({
        title: "Trip Cancelled",
        description: `${trip?.destination} has been cancelled.`,
    });
  };

  if (isLoadingTrip) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card>
          <CardHeader>
            <CardTitle>Trip Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>The requested trip could not be found.</p>
            <Button asChild className="mt-4">
              <Link href="/my-trips">Go Back to My Trips</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const tripImage = getImageForTrip(trip.destination);
  const isCancellable = trip.status === 'Upcoming';

  return (
    <div className="flex flex-col w-full">
      <Header />
      <main className="flex-grow p-8 bg-muted/40">
        <AnimateOnScroll>
          <div className="container mx-auto px-4 md:px-6">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-6"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to My Trips
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="overflow-hidden">
                  {tripImage && (
                    <div className="relative h-64 w-full">
                      <Image
                        src={tripImage.imageUrl}
                        alt={trip.destination}
                        fill
                        className="object-cover"
                        data-ai-hint={tripImage.imageHint}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-6">
                        <h1 className="font-headline text-5xl font-bold text-white">
                          {trip.destination}
                        </h1>
                      </div>
                    </div>
                  )}
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        <span className="font-medium">{trip.dates}</span>
                      </div>
                      <Badge variant={trip.status === 'Upcoming' ? 'default' : 'secondary'}>{trip.status}</Badge>
                    </div>
                    <p className="text-lg">
                      Here is a detailed look at your trip. You can
                      generate a sample itinerary to get ideas for your
                      adventure.
                    </p>
                  </CardContent>
                  {isCancellable && (
                    <CardFooter className="bg-muted/50 p-4 flex justify-end">
                       <AlertDialog>
                        <AlertDialogTrigger asChild>
                           <Button variant="destructive">
                                <Ban className="mr-2 h-4 w-4" />
                                Cancel Trip
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure you want to cancel?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. Your trip to {trip.destination} will be cancelled.
                              Your refund will be processed to your original payment method within 14 business days.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Go Back</AlertDialogCancel>
                            <AlertDialogAction onClick={handleCancelTrip} className="bg-destructive hover:bg-destructive/90">
                              Yes, Cancel Trip
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </CardFooter>
                  )}
                </Card>
              </div>

              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-accent" />
                      AI-Powered Itinerary
                    </CardTitle>
                    <CardDescription>
                      Let our AI generate a sample plan for your trip based on your package.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={handleGenerateItinerary}
                      disabled={isLoadingItinerary}
                      className="w-full"
                    >
                      {isLoadingItinerary ? (
                        <>
                          <Loader className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        'Generate Itinerary'
                      )}
                    </Button>
                  </CardContent>
                </Card>
                {itinerary && (
                  <AnimateOnScroll>
                    <Card>
                      <CardHeader>
                        <CardTitle>Your Sample Itinerary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Accordion
                          type="single"
                          collapsible
                          className="w-full"
                          defaultValue="item-0"
                        >
                          {itinerary.days.map((day, index) => (
                            <AccordionItem
                              key={index}
                              value={`item-${index}`}
                            >
                              <AccordionTrigger className="text-lg font-bold">
                                Day {day.day}: {day.title}
                              </AccordionTrigger>
                              <AccordionContent className="space-y-4 pt-2">
                                {day.activities.map((activity, actIndex) => {
                                  const Icon =
                                    dayIcons[
                                      activity.time as keyof typeof dayIcons
                                    ] || MapPin;
                                  return (
                                    <div
                                      key={actIndex}
                                      className="flex items-start gap-4"
                                    >
                                      <Icon className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                                      <div>
                                        <p className="font-semibold">
                                          {activity.time}
                                        </p>
                                        <p className="text-muted-foreground">
                                          {activity.description}
                                        </p>
                                      </div>
                                    </div>
                                  );
                                })}
                                <div className="flex items-start gap-4 pt-2 border-t mt-4">
                                  <Utensils className="h-5 w-5 mt-1 text-accent flex-shrink-0" />
                                  <div>
                                    <p className="font-semibold">
                                      Food Suggestion
                                    </p>
                                    <p className="text-muted-foreground">
                                      {day.foodSuggestion}
                                    </p>
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                  </AnimateOnScroll>
                )}
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </main>
    </div>
  );
}
