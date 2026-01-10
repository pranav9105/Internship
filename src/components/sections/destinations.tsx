import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { AnimateOnScroll } from '../animate-on-scroll';
import { MapPin } from 'lucide-react';

const destinations = [
  {
    name: 'Paris, France',
    description: 'The city of love, lights, and art.',
    image: PlaceHolderImages.find((img) => img.id === 'destination-paris'),
  },
  {
    name: 'Kyoto, Japan',
    description: 'Ancient temples and serene gardens.',
    image: PlaceHolderImages.find((img) => img.id === 'destination-kyoto'),
  },
  {
    name: 'Santorini, Greece',
    description: 'Iconic sunsets and whitewashed villages.',
    image: PlaceHolderImages.find((img) => img.id === 'destination-santorini'),
  },
  {
    name: 'Bora Bora',
    description: 'Ultimate tropical paradise with overwater bungalows.',
    image: PlaceHolderImages.find((img) => img.id === 'destination-bora-bora'),
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
              Explore our handpicked selection of the world's most captivating places.
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
