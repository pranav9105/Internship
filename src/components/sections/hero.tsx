import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AnimateOnScroll } from '../animate-on-scroll';

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
        <AnimateOnScroll delay={400}>
          <Button asChild size="lg" className="mt-8 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity">
            <Link href="#packages">Explore Packages</Link>
          </Button>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
