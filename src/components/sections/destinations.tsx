import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { AnimateOnScroll } from '../animate-on-scroll';
import { MapPin } from 'lucide-react';

const destinations = [
  {
    name: 'Jaipur, Rajasthan',
    description: 'The Pink City, full of heritage forts.',
    image: PlaceHolderImages.find((img) => img.id === 'destination-jaipur'),
  },
  {
    name: 'Goa',
    description: 'Pristine beaches and vibrant nightlife.',
    image: PlaceHolderImages.find((img) => img.id === 'destination-goa'),
  },
  {
    name: 'Alleppey, Kerala',
    description: 'Serene backwaters and lush greenery.',
    image: PlaceHolderImages.find((img) => img.id === 'destination-kerala'),
  },
  {
    name: 'Ladakh',
    description: 'High-altitude desert and stunning vistas.',
    image: PlaceHolderImages.find((img) => img.id === 'destination-ladakh'),
  },
];

export function Destinations() {
  return (
    <section id="destinations" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <AnimateOnScroll>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-4xl font-bold md:text-5xl">Featured Destinations</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore our handpicked selection of India's most captivating places.
            </p>
          </div>
        </AnimateOnScroll>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((dest, index) => (
            <AnimateOnScroll key={dest.name} delay={index * 100}>
              <Card className="overflow-hidden group h-full flex flex-col">
                <div className="relative h-80 w-full">
                  {dest.image && (
                     <Image
                      src={dest.image.imageUrl}
                      alt={dest.description}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      data-ai-hint={dest.image.imageHint}
                    />
                  )}
                </div>
                <CardContent className="p-6 flex-grow flex flex-col">
                  <h3 className="font-headline text-2xl font-bold flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-primary flex-shrink-0" />
                    <span>{dest.name}</span>
                  </h3>
                  <p className="mt-2 text-muted-foreground flex-grow">{dest.description}</p>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
