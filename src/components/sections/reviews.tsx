
'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { AnimateOnScroll } from '../animate-on-scroll';
import { Star, Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const reviews = [
  {
    name: 'Ananya Sharma',
    location: 'Mumbai',
    avatarId: 'avatar-1',
    rating: 5,
    review:
      "Our family trip to Kerala was magical, all thanks to RoamReady. The houseboat experience was a highlight, and everything was so well-organized. We didn't have to worry about a thing!",
  },
  {
    name: 'Vikram Singh',
    location: 'Delhi',
    avatarId: 'avatar-2',
    rating: 5,
    review:
      'The Rajasthan tour was like stepping back in time. The heritage hotels were incredible. RoamReady curated a perfect blend of history, culture, and comfort. Highly recommended!',
  },
  {
    name: 'Priya Mehta',
    location: 'Bangalore',
    avatarId: 'avatar-3',
    rating: 4,
    review:
      'I booked a solo trip to the Himalayas, and it was an adventure of a lifetime. The guides were knowledgeable and the views were breathtaking. A few minor hiccups with accommodation, but overall a fantastic experience.',
  },
    {
    name: 'Rohan Joshi',
    location: 'Pune',
    avatarId: 'avatar-4',
    rating: 5,
    review:
      "Goa was an absolute blast! RoamReady found us the perfect beachside resort, away from the crowds. The water sports they arranged were so much fun. Can't wait for our next trip with them.",
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <AnimateOnScroll>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-4xl font-bold md:text-5xl">What Our Travelers Say</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Real stories from wanderers who trusted us with their adventures.
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
              {reviews.map((review, index) => {
                const avatarImage = PlaceHolderImages.find((img) => img.id === review.avatarId);
                return (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-4">
                      <Card className="h-full flex flex-col justify-between">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center gap-0.5">
                                {Array(review.rating).fill(0).map((_, i) => (
                                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                ))}
                                {Array(5 - review.rating).fill(0).map((_, i) => (
                                    <Star key={i} className="h-5 w-5 text-muted-foreground/30 fill-muted-foreground/30" />
                                ))}
                            </div>
                           <blockquote className="text-muted-foreground italic border-l-4 pl-4">
                            "{review.review}"
                           </blockquote>
                        </CardContent>
                        <div className="flex items-center gap-4 p-6 pt-0">
                          {avatarImage && (
                            <Avatar>
                                <AvatarImage src={avatarImage.imageUrl} alt={review.name} />
                                <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )}
                          <div>
                            <p className="font-bold">{review.name}</p>
                            <p className="text-sm text-muted-foreground">{review.location}</p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <CarouselPrevious className="ml-14" />
            <CarouselNext className="mr-14" />
          </Carousel>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
