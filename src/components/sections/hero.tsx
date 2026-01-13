
'use client';
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
import { Button } from '../ui/button';
import { ArrowRight, Bookmark } from 'lucide-react';

const collections = [
  {
    title: 'Indonesia',
    image: PlaceHolderImages.find((img) => img.id === 'collection-bangalore'),
  },
  {
    title: 'Buddha temple, Thailand',
    image: PlaceHolderImages.find((img) => img.id === 'gallery-3'),
  },
  {
    title: 'Broken Beach',
    image: PlaceHolderImages.find((img) => img.id === 'collection-beach'),
  },
   {
    title: 'Hill Stations',
    image: PlaceHolderImages.find((img) => img.id === 'collection-hill'),
  },
].filter(Boolean);

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'package-kerala-backwaters');

  return (
    <section id="hero" className="relative h-screen w-full">
        {heroImage && (
            <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
                priority
            />
        )}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 h-full flex flex-col justify-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="text-white">
                <AnimateOnScroll>
                    <h1 className="font-headline text-8xl md:text-9xl font-bold tracking-tighter">
                        KERALA
                    </h1>
                    <p className="mt-4 max-w-md text-lg text-white/90">
                        Kerala, a state on India's tropical Malabar Coast, has nearly 600km of Arabian Sea shoreline. It's known for its palm-lined beaches and backwaters, a network of canals.
                    </p>
                    <Button size="lg" className="mt-8 rounded-full h-12 px-8">
                        Explore
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </AnimateOnScroll>
            </div>
            {/* Right Content - Carousel */}
            <div>
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
                        <CarouselItem key={index} className="pl-6 md:basis-1/2">
                            <Card className="overflow-hidden relative group bg-transparent border-0">
                                <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                                    <Image
                                        src={collection.image.imageUrl}
                                        alt={collection.image.description || ''}
                                        fill
                                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                        data-ai-hint={collection.image.imageHint}
                                    />
                                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                </div>
                                <CardContent className="absolute bottom-0 left-0 p-4">
                                    <h3 className="font-headline text-xl text-white font-bold">{collection.title}</h3>
                                </CardContent>
                                <Button size="icon" variant="secondary" className="absolute top-4 right-4 rounded-full h-10 w-10">
                                    <Bookmark />
                                </Button>
                            </Card>
                        </CarouselItem>
                    ))}
                    </CarouselContent>
                    <div className="hidden md:flex justify-start gap-2 mt-4 pl-6">
                        <CarouselPrevious className="relative -left-0 -top-0 -translate-y-0" />
                        <CarouselNext className="relative -right-0 -top-0 -translate-y-0" />
                    </div>
                </Carousel>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
