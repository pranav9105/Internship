
'use client';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { AnimateOnScroll } from '../animate-on-scroll';
import { Button } from '../ui/button';
import { ArrowRight, Bookmark } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const heroSlides = [
    {
        title: 'KERALA',
        description: "Kerala, a state on India's tropical Malabar Coast, has nearly 600km of Arabian Sea shoreline. It's known for its palm-lined beaches and backwaters, a network of canals.",
        image: PlaceHolderImages.find((img) => img.id === 'package-kerala-backwaters'),
    },
    {
        title: 'INDONESIA',
        description: "A country in Southeast Asia and Oceania between the Indian and Pacific oceans. It consists of over 17,000 islands, including Sumatra, Java, Sulawesi, and parts of Borneo and New Guinea.",
        image: PlaceHolderImages.find((img) => img.id === 'collection-bangalore'),
    },
    {
        title: 'THAILAND',
        description: 'Thailand is a Southeast Asian country. It\'s known for tropical beaches, opulent royal palaces, ancient ruins and ornate temples displaying figures of Buddha.',
        image: PlaceHolderImages.find((img) => img.id === 'gallery-3'),
    },
    {
        title: 'BROKEN BEACH',
        description: 'A picturesque coastal formation on the southwestern edge of Nusa Penida island. The spot is marked by a hilly arch-like rock formation, which is the distinguishable landmark of the area.',
        image: PlaceHolderImages.find((img) => img.id === 'collection-beach'),
    },
    {
        title: 'HILL STATIONS',
        description: 'Escape to the cool and serene mountains. Discover breathtaking landscapes, lush greenery, and tranquil retreats away from the hustle and bustle of city life.',
        image: PlaceHolderImages.find((img) => img.id === 'collection-hill'),
    },
].filter(Boolean);


export function Hero() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  const activeSlide = heroSlides[current];

  return (
    <section id="hero" className="relative h-screen w-full">
        {heroSlides.map((slide, index) => (
            slide.image &&
            <Image
                key={slide.title}
                src={slide.image.imageUrl}
                alt={slide.image.description}
                fill
                className={cn(
                    "object-cover transition-opacity duration-1000",
                    index === current ? "opacity-100" : "opacity-0"
                )}
                data-ai-hint={slide.image.imageHint}
                priority={index === 0}
            />
        ))}

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 h-full flex flex-col justify-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="text-white">
                <AnimateOnScroll>
                    <h1 className="font-headline text-8xl md:text-9xl font-bold tracking-tighter">
                        {activeSlide?.title}
                    </h1>
                    <p className="mt-4 max-w-md text-lg text-white/90">
                        {activeSlide?.description}
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
                    setApi={setApi}
                    opts={{
                    align: 'start',
                    loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                    {heroSlides.map((slide) => slide.image && (
                        <CarouselItem key={slide.title} className="pl-6 md:basis-1/2">
                            <Card className="overflow-hidden relative group bg-transparent border-0">
                                <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                                    <Image
                                        src={slide.image.imageUrl}
                                        alt={slide.image.description || ''}
                                        fill
                                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                        data-ai-hint={slide.image.imageHint}
                                    />
                                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                </div>
                                <CardContent className="absolute bottom-0 left-0 p-4">
                                    <h3 className="font-headline text-xl text-white font-bold">{slide.title}</h3>
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
