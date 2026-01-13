import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AnimateOnScroll } from '../animate-on-scroll';
import { StaySearchForm } from '../search/stay-search-form';

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');

  return (
    <section id="hero" className="relative h-[80vh] w-full flex flex-col justify-center">
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
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4">
        <AnimateOnScroll>
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight">
            Find your next stay
          </h1>
        </AnimateOnScroll>
        <AnimateOnScroll delay={200}>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-white/90">
            Search deals on hotels, homes, and much more...
          </p>
        </AnimateOnScroll>
      </div>
      <div className="relative z-10 container mx-auto px-4 md:px-6 mt-12">
        <AnimateOnScroll delay={400}>
          <StaySearchForm />
        </AnimateOnScroll>
      </div>
    </section>
  );
}
