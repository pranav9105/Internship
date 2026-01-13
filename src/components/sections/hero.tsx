import Image from 'next/image';
import { AnimateOnScroll } from '../animate-on-scroll';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';

export function Hero() {
  const heroImage = {
    imageUrl: 'https://picsum.photos/seed/travel-illustration/1000/1000',
    description: 'A flat illustration of a person with a backpack looking at a map.',
    imageHint: 'travel illustration'
  };

  return (
    <section id="hero" className="pt-24 md:pt-32 pb-16 md:pb-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <AnimateOnScroll className="text-center md:text-left">
            <h1 className="font-headline text-5xl md:text-7xl font-bold text-primary">
              Let's Make Your Best Trip Ever
            </h1>
            <p className="mt-6 max-w-xl mx-auto md:mx-0 text-lg text-muted-foreground">
              Plan and book your perfect trip with expert advice, travel tips, destination information and inspiration from us.
            </p>
            <div className="mt-8 flex w-full max-w-md mx-auto md:mx-0">
              <div className="relative flex-grow">
                <Input
                  type="search"
                  placeholder="Search your destination..."
                  className="h-14 pl-5 pr-28 rounded-full shadow-md"
                />
                <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 h-11 rounded-full px-6">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>
            <div className="mt-8 flex items-center justify-center md:justify-start gap-4">
                <div className="flex -space-x-2">
                    <Image src="https://picsum.photos/seed/person1/40/40" alt="user" width={40} height={40} className="rounded-full border-2 border-background" />
                    <Image src="https://picsum.photos/seed/person2/40/40" alt="user" width={40} height={40} className="rounded-full border-2 border-background" />
                    <Image src="https://picsum.photos/seed/person3/40/40" alt="user" width={40} height={40} className="rounded-full border-2 border-background" />
                </div>
                <p className="text-muted-foreground font-medium"><strong>2k+</strong> People going on trips</p>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={200} className="hidden md:block">
            <div className="relative h-[500px] w-full">
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-contain"
                priority
                data-ai-hint={heroImage.imageHint}
              />
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
