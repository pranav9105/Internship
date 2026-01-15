
'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimateOnScroll } from '@/components/animate-on-scroll';
import { PlaceHolderImages, ImagePlaceholder } from '@/lib/placeholder-images';
import { BedDouble, Bath, Users, Heart, Camera } from 'lucide-react';

type Stay = {
  title: string;
  price: number;
  images: (ImagePlaceholder | undefined)[];
  beds: number;
  baths: number;
  guests: number;
};

const staysData: { [key: string]: Stay[] } = {
  'apart-hotel': [
    { title: 'Serviced Studio', price: 8000, images: [PlaceHolderImages.find(img => img.id === 'property-type-apart-hotel'), PlaceHolderImages.find(img => img.id === 'apartment-bedroom-1'), PlaceHolderImages.find(img => img.id === 'apartment-bathroom-1'), PlaceHolderImages.find(img => img.id === 'apartment-living-room-1'), PlaceHolderImages.find(img => img.id === 'apartment-kitchen-1')], beds: 1, baths: 1, guests: 2 },
    { title: 'One-Bedroom Apartment', price: 12000, images: [PlaceHolderImages.find(img => img.id === 'property-type-apartment'), PlaceHolderImages.find(img => img.id === 'apartment-living-room-1'), PlaceHolderImages.find(img => img.id === 'apartment-kitchen-1'), PlaceHolderImages.find(img => img.id === 'apartment-bedroom-1'), PlaceHolderImages.find(img => img.id === 'apartment-bathroom-1')], beds: 1, baths: 1, guests: 3 },
  ],
  'spa': [
    { title: 'Tranquility Suite', price: 15000, images: [PlaceHolderImages.find(img => img.id === 'property-type-spa'), PlaceHolderImages.find(img => img.id === 'apartment-bedroom-1'), PlaceHolderImages.find(img => img.id === 'apartment-bathroom-1'), PlaceHolderImages.find(img => img.id === 'apartment-living-room-1'), PlaceHolderImages.find(img => img.id === 'apartment-kitchen-1')], beds: 1, baths: 1, guests: 2 },
    { title: 'Wellness Room with Balcony', price: 18000, images: [PlaceHolderImages.find(img => img.id === 'collection-bangalore'), PlaceHolderImages.find(img => img.id === 'apartment-living-room-1'), PlaceHolderImages.find(img => img.id === 'apartment-bedroom-1'), PlaceHolderImages.find(img => img.id === 'apartment-bathroom-1'), PlaceHolderImages.find(img => img.id === 'apartment-kitchen-1')], beds: 1, baths: 1, guests: 2 },
  ],
  'resort': [
    { title: 'Deluxe Garden View', price: 11000, images: [PlaceHolderImages.find(img => img.id === 'property-type-resort'), PlaceHolderImages.find(img => img.id === 'apartment-bedroom-1'), PlaceHolderImages.find(img => img.id === 'apartment-bathroom-1'), PlaceHolderImages.find(img => img.id === 'apartment-living-room-1'), PlaceHolderImages.find(img => img.id === 'apartment-kitchen-1')], beds: 2, baths: 1, guests: 4 },
    { title: 'Oceanfront Suite', price: 25000, images: [PlaceHolderImages.find(img => img.id === 'collection-beach'), PlaceHolderImages.find(img => img.id === 'apartment-living-room-1'), PlaceHolderImages.find(img => img.id === 'apartment-bedroom-1'), PlaceHolderImages.find(img => img.id === 'apartment-bathroom-1'), PlaceHolderImages.find(img => img.id === 'apartment-kitchen-1')], beds: 1, baths: 2, guests: 3 },
    { title: 'Family Bungalow', price: 19000, images: [PlaceHolderImages.find(img => img.id === 'collection-weekend'), PlaceHolderImages.find(img => img.id === 'apartment-bedroom-1'), PlaceHolderImages.find(img => img.id === 'apartment-kitchen-1'), PlaceHolderImages.find(img => img.id === 'apartment-living-room-1'), PlaceHolderImages.find(img => img.id === 'apartment-bathroom-1')], beds: 3, baths: 2, guests: 6 },
  ],
  'villa': [
    { title: 'Private Pool Villa', price: 35000, images: [PlaceHolderImages.find(img => img.id === 'property-type-villa'), PlaceHolderImages.find(img => img.id === 'apartment-living-room-1'), PlaceHolderImages.find(img => img.id === 'apartment-bedroom-1'), PlaceHolderImages.find(img => img.id === 'apartment-bathroom-1'), PlaceHolderImages.find(img => img.id === 'apartment-kitchen-1')], beds: 3, baths: 3, guests: 6 },
    { title: 'Hillside Luxury Villa', price: 45000, images: [PlaceHolderImages.find(img => img.id === 'collection-hill'), PlaceHolderImages.find(img => img.id === 'apartment-bathroom-1'), PlaceHolderImages.find(img => img.id === 'apartment-kitchen-1'), PlaceHolderImages.find(img => img.id === 'apartment-living-room-1'), PlaceHolderImages.find(img => img.id === 'apartment-bedroom-1')], beds: 4, baths: 4, guests: 8 },
  ],
  'apartment': [
    { title: 'Modern City Apartment', price: 9000, images: [PlaceHolderImages.find(img => img.id === 'property-type-apartment'), PlaceHolderImages.find(img => img.id === 'apartment-living-room-1'), PlaceHolderImages.find(img => img.id === 'apartment-bedroom-1'), PlaceHolderImages.find(img => img.id === 'apartment-bathroom-1'), PlaceHolderImages.find(img => img.id === 'apartment-kitchen-1')], beds: 2, baths: 2, guests: 4 },
    { title: 'Penthouse with Terrace', price: 22000, images: [PlaceHolderImages.find(img => img.id === 'collection-mumbai'), PlaceHolderImages.find(img => img.id === 'apartment-kitchen-1'), PlaceHolderImages.find(img => img.id === 'apartment-living-room-1'), PlaceHolderImages.find(img => img.id === 'apartment-bedroom-1'), PlaceHolderImages.find(img => img.id === 'apartment-bathroom-1')], beds: 3, baths: 3, guests: 5 },
  ],
};

function ImageGrid({ images }: { images: (ImagePlaceholder | undefined)[] }) {
    const mainImage = images[0];
    const gridImages = images.slice(1, 5);

    if (!mainImage) return null;

    return (
        <div className="relative w-full h-[500px] overflow-hidden rounded-2xl group">
            <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
                {/* Main Image */}
                <div className="col-span-1 row-span-2 relative">
                    <Image
                        src={mainImage.imageUrl}
                        alt={mainImage.description}
                        fill
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={mainImage.imageHint}
                    />
                </div>
                {/* Grid Images */}
                {gridImages.map((image, index) => (
                    image && (
                         <div key={image.id} className="relative">
                            <Image
                                src={image.imageUrl}
                                alt={image.description}
                                fill
                                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                data-ai-hint={image.imageHint}
                            />
                        </div>
                    )
                ))}
            </div>
            {/* Overlays and Buttons */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
            <Button variant="secondary" className="absolute bottom-4 left-4">
                <Camera className="mr-2 h-4 w-4" />
                See all photos
            </Button>
             <Button variant="secondary" size="icon" className="absolute top-4 right-4 rounded-full">
                <Heart className="h-5 w-5" />
            </Button>
        </div>
    );
}

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
             <div className="space-y-12">
                {stays.map((stay, index) => (
                    <AnimateOnScroll key={stay.title} delay={index * 100}>
                        <Card className="h-full flex flex-col overflow-hidden transition-shadow hover:shadow-lg p-6">
                           <ImageGrid images={stay.images} />
                            <CardHeader>
                                <h3 className="font-headline text-3xl font-bold">{stay.title}</h3>
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
                                <div className="mt-4 text-3xl font-bold">
                                    ₹{stay.price.toLocaleString('en-IN')}
                                    <span className="text-sm font-normal text-muted-foreground"> / night</span>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" size="lg">Book Now</Button>
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
