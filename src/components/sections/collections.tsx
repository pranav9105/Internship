
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { AnimateOnScroll } from '../animate-on-scroll';
import { Badge } from '../ui/badge';

const collections = [
  {
    title: 'Stays in & Around Delhi for a Weekend Getaway',
    top: 8,
    image: PlaceHolderImages.find((img) => img.id === 'collection-delhi'),
  },
  {
    title: 'Stays in & Around Mumbai for a Weekend Getaway',
    top: 8,
    image: PlaceHolderImages.find((img) => img.id === 'collection-mumbai'),
  },
  {
    title: 'Stays in & Around Bangalore for a Weekend Getaway',
    top: 9,
    image: PlaceHolderImages.find((img) => img.id === 'collection-bangalore'),
  },
  {
    title: 'Beach Destinations',
    top: 11,
    image: PlaceHolderImages.find((img) => img.id === 'collection-beach'),
  },
  {
    title: 'Weekend Getaways',
    top: 11,
    image: PlaceHolderImages.find((img) => img.id === 'collection-weekend'),
  },
  {
    title: 'Hill Stations',
    top: 11,
    image: PlaceHolderImages.find((img) => img.id === 'collection-hill'),
  },
].filter(Boolean);

export function Collections() {
  return (
    <section id="collections" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <AnimateOnScroll>
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">Handpicked Collections for You</h2>
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll delay={200}>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {collections.map((collection, index) => collection.image && (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/4">
                    <Card className="overflow-hidden relative group">
                        <div className="aspect-[3/4]">
                            <Image
                                src={collection.image.imageUrl}
                                alt={collection.image.description}
                                fill
                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                data-ai-hint={collection.image.imageHint}
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <CardContent className="absolute bottom-0 left-0 p-4">
                            <Badge className="mb-2">TOP {collection.top}</Badge>
                            <h3 className="font-headline text-xl text-white font-bold">{collection.title}</h3>
                        </CardContent>
                    </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:flex justify-end gap-2 mt-4">
                <CarouselPrevious className="relative -left-0 -top-0 -translate-y-0" />
                <CarouselNext className="relative -right-0 -top-0 -translate-y-0" />
            </div>
          </Carousel>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
