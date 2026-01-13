
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

const galleryImages = [
  PlaceHolderImages.find((img) => img.id === 'gallery-1'),
  PlaceHolderImages.find((img) => img.id === 'gallery-2'),
  PlaceHolderImages.find((img) => img.id === 'gallery-3'),
  PlaceHolderImages.find((img) => img.id === 'gallery-4'),
  PlaceHolderImages.find((img) => img.id === 'gallery-5'),
].filter(Boolean);

export function Gallery() {
  return (
    <section id="gallery" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <AnimateOnScroll>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-4xl font-bold md:text-5xl">Travel Inspiration</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A glimpse into the beautiful experiences waiting for you.
            </p>
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll delay={200}>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full mt-12"
          >
            <CarouselContent>
              {galleryImages.map((image, index) => image && (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="overflow-hidden">
                      <CardContent className="flex aspect-video items-center justify-center p-0">
                        <Image
                          src={image.imageUrl}
                          alt={image.description}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover"
                          data-ai-hint={image.imageHint}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-14" />
            <CarouselNext className="mr-14"/>
          </Carousel>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
