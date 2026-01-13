import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AnimateOnScroll } from '../animate-on-scroll';
import { SearchWidget } from '../search/search-widget';

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background-2');

  return (
    <section id="hero" className="relative h-[70vh] w-full flex items-center justify-center">
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
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 container mx-auto px-4 md:px-6 -mt-24">
        <AnimateOnScroll delay={400}>
          <SearchWidget />
        </AnimateOnScroll>
      </div>
    </section>
  );
}
