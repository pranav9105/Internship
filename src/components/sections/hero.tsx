
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AnimateOnScroll } from '../animate-on-scroll';
import { SearchWidget } from '../search/search-widget';
import { Header } from '../layout/header';

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');

  return (
    <section id="hero" className="relative h-screen w-full flex flex-col items-center justify-center text-white">
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
      <div className="absolute inset-0 bg-black/60" />
      
      <Header />

      <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-center justify-center text-center flex-grow">
        <div className="flex flex-col items-center gap-8 w-full">
            <AnimateOnScroll className="flex flex-col items-center">
                <h1 className="font-headline text-5xl md:text-7xl font-bold">
                    Let's Make Your Best Trip Ever
                </h1>
                <p className="mt-4 max-w-2xl text-lg md:text-xl text-white/90">
                    Plan and book your perfect trip with expert advice, travel tips, destination information and inspiration from us.
                </p>
            </AnimateOnScroll>
            <AnimateOnScroll delay={200} className="w-full">
            <SearchWidget />
            </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
