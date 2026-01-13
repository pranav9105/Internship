import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AnimateOnScroll } from '../animate-on-scroll';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');

  return (
    <section id="hero" className="relative h-screen w-full">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
        <AnimateOnScroll>
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight">
            Your Next Adventure Awaits
          </h1>
        </AnimateOnScroll>
        <AnimateOnScroll delay={200}>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-white/90">
            Discover breathtaking destinations and create unforgettable memories with our curated travel packages.
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll delay={300}>
          <div className="mt-8 flex w-full max-w-lg items-center space-x-2 rounded-full bg-white/20 backdrop-blur-sm p-2">
            <Input
                type="text"
                placeholder="Search for a country, state, or area..."
                className="bg-transparent border-none text-white placeholder:text-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg"
            />
            <Button type="submit" size="icon" className="rounded-full flex-shrink-0 h-12 w-12 bg-primary hover:bg-primary/90">
              <Search className="h-6 w-6" />
            </Button>
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll delay={400}>
          <Button asChild size="lg" variant="link" className="mt-6 text-lg text-white">
            <Link href="#packages">Or Explore Packages</Link>
          </Button>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
