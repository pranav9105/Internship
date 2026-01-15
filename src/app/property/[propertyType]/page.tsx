'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimateOnScroll } from '@/components/animate-on-scroll';
import { PlaceHolderImages, ImagePlaceholder } from '@/lib/placeholder-images';
import { BedDouble, Bath, Users } from 'lucide-react';

type Stay = {
  title: string;
  price: number;
  image: ImagePlaceholder | undefined;
  beds: number;
  baths: number;
  guests: number;
};

const staysData: { [key: string]: Stay[] } = {
  'apart-hotel': [
    { title: 'Serviced Studio', price: 8000, image: PlaceHolderImages.find(img => img.id === 'property-type-apart-hotel'), beds: 1, baths: 1, guests: 2 },
    { title: 'One-Bedroom Apartment', price: 12000, image: PlaceHolderImages.find(img => img.id === 'property-type-apartment'), beds: 1, baths: 1, guests: 3 },
  ],
  'spa': [
    { title: 'Tranquility Suite', price: 15000, image: PlaceHolderImages.find(img => img.id === 'property-type-spa'), beds: 1, baths: 1, guests: 2 },
    { title: 'Wellness Room with Balcony', price: 18000, image: PlaceHolderImages.find(img => img.id === 'collection-bangalore'), beds: 1, baths: 1, guests: 2 },
  ],
  'resort': [
    { title: 'Deluxe Garden View', price: 11000, image: PlaceHolderImages.find(img => img.id === 'property-type-resort'), beds: 2, baths: 1, guests: 4 },
    { title: 'Oceanfront Suite', price: 25000, image: PlaceHolderImages.find(img => img.id === 'collection-beach'), beds: 1, baths: 2, guests: 3 },
    { title: 'Family Bungalow', price: 19000, image: PlaceHolderImages.find(img => img.id === 'collection-weekend'), beds: 3, baths: 2, guests: 6 },
  ],
  'villa': [
    { title: 'Private Pool Villa', price: 35000, image: PlaceHolderImages.find(img => img.id === 'property-type-villa'), beds: 3, baths: 3, guests: 6 },
    { title: 'Hillside Luxury Villa', price: 45000, image: PlaceHolderImages.find(img => img.id === 'collection-hill'), beds: 4, baths: 4, guests: 8 },
  ],
  'apartment': [
    { title: 'Modern City Apartment', price: 9000, image: PlaceHolderImages.find(img => img.id === 'property-type-apartment'), beds: 2, baths: 2, guests: 4 },
    { title: 'Penthouse with Terrace', price: 22000, image: PlaceHolderImages.find(img => img.id === 'collection-mumbai'), beds: 3, baths: 3, guests: 5 },
  ],
};


export default function PropertyTypePage() {
  const params = useParams();
  const propertyType = params.propertyType as string;

  const stays = staysData[propertyType] || [];
  const pageTitle = propertyType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12 md:px-6">
          <AnimateOnScroll>
            <header className="mb-8">
              <h1 className="font-headline text-4xl font-bold">Explore {pageTitle}s</h1>
              <p className="text-muted-foreground">Find the perfect stay that matches your style.</p>
            </header>
          </AnimateOnScroll>

          {stays.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stays.map((stay, index) => (
                    <AnimateOnScroll key={stay.title} delay={index * 100}>
                        <Card className="h-full flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
                             {stay.image && (
                                <div className="relative h-56 w-full">
                                    <Image
                                        src={stay.image.imageUrl}
                                        alt={stay.title}
                                        fill
                                        className="object-cover"
                                        data-ai-hint={stay.image.imageHint}
                                    />
                                </div>
                            )}
                            <CardHeader>
                                <h3 className="font-headline text-2xl font-bold">{stay.title}</h3>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="flex items-center gap-6 text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <BedDouble className="h-5 w-5" />
                                        <span>{stay.beds} bed(s)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Bath className="h-5 w-5" />
                                        <span>{stay.baths} bath(s)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="h-5 w-5" />
                                        <span>{stay.guests} guests</span>
                                    </div>
                                </div>
                                <div className="mt-4 text-2xl font-bold">
                                    ₹{stay.price.toLocaleString('en-IN')}
                                    <span className="text-sm font-normal text-muted-foreground"> / night</span>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">Book Now</Button>
                            </CardFooter>
                        </Card>
                    </AnimateOnScroll>
                ))}
             </div>
          ) : (
            <AnimateOnScroll>
                <div className="text-center py-16 border-2 border-dashed rounded-lg">
                    <h3 className="mt-4 text-lg font-medium">No Stays Found</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        We couldn't find any stays for this property type.
                    </p>
                </div>
            </AnimateOnScroll>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
