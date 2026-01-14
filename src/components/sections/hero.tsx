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
        title: 'RAJASTHAN',
        description: "India's largest state by area, is in the northwest of the country. It is home to forts, palaces, and the vast Thar Desert.",
        image: PlaceHolderImages.find((img) => img.id === 'package-heritage-rajasthan'),
    },
    {
        title: 'HIMALAYAS',
        description: 'The Himalayas, or Himalaya, are a mountain range in Asia separating the plains of the Indian subcontinent from the Tibetan Plateau.',
        image: PlaceHolderImages.find((img) => img.id === 'package-himalayan-escape'),
    },
    {
        title: 'GOA',
        description: 'Goa is a state in western India with coastlines stretching along the Arabian Sea. Its long history as a Portuguese colony prior to 1961 is evident in its preserved 17th-century churches.',
        image: {
            id: 'package-goa-beach-2',
            imageUrl: 'https://images.travelandleisureasia.com/wp-content/uploads/sites/3/2024/04/15151106/palm-beach-1.jpeg?tr=w-1200,q-60',
            description: 'Goa beach',
            imageHint: 'Goa beach'
        },
    },
    {
        title: 'ANDAMAN',
        description: 'The Andaman Islands are an Indian archipelago in the Bay of Bengal. These roughly 300 islands are known for their palm-lined, white-sand beaches, mangroves and tropical rainforests.',
        image: {
            id: 'package-andaman-islands-3',
            imageUrl: 'https://mauzeeholiday.com/wp-content/uploads/2024/11/New-Project-2024-11-14T112001.161-1.webp',
            description: 'Andaman Islands',
            imageHint: 'Andaman Islands'
        },
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

      <div className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-0 md:justify-center">
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
                    <div className="hidden md:flex justify-end gap-2 mt-4">
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
