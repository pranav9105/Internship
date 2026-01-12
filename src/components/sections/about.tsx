import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AnimateOnScroll } from '../animate-on-scroll';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Heart, Globe, Users } from 'lucide-react';

export function About() {
  const aboutImage = PlaceHolderImages.find((img) => img.id === 'about-us-team');

  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <AnimateOnScroll>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
                {aboutImage && (
                    <Image
                    src={aboutImage.imageUrl}
                    alt={aboutImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={aboutImage.imageHint}
                    />
                )}
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={200}>
            <h2 className="font-headline text-4xl font-bold md:text-5xl">About RoamReady</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We believe travel is more than just visiting new places; it's about creating lasting memories and discovering yourself. Founded by a team of passionate explorers, RoamReady is dedicated to crafting unique and authentic travel experiences that go beyond the ordinary.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-full">
                  <Heart className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Passion for Travel</h3>
                  <p className="text-muted-foreground">Our team lives and breathes travel. We're constantly seeking out new adventures to share with you.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-full">
                  <Globe className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Global & Local Expertise</h3>
                  <p className="text-muted-foreground">From hidden gems to iconic landmarks, our expertise ensures you get an authentic experience.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-full">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Customer-Centric Service</h3>
                  <p className="text-muted-foreground">Your journey is our priority. We provide dedicated support every step of the way.</p>
                </div>
              </div>
            </div>
            <Button asChild size="lg" className="mt-8">
              <Link href="#contact">Contact Us</Link>
            </Button>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
