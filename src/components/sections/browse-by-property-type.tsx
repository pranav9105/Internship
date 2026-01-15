"use client";

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { AnimateOnScroll } from '../animate-on-scroll';
import Link from 'next/link';

const propertyTypes = [
  {
    name: 'Apart hotel',
    slug: 'apart-hotel',
    image: PlaceHolderImages.find((img) => img.id === 'property-type-apart-hotel'),
  },
  {
    name: 'Spa',
    slug: 'spa',
    image: PlaceHolderImages.find((img) => img.id === 'property-type-spa'),
  },
  {
    name: 'Resort',
    slug: 'resort',
    image: PlaceHolderImages.find((img) => img.id === 'property-type-resort'),
  },
  {
    name: 'Villa',
    slug: 'villa',
    image: PlaceHolderImages.find((img) => img.id === 'property-type-villa'),
  },
  {
    name: 'Apartment',
    slug: 'apartment',
    image: PlaceHolderImages.find((img) => img.id === 'property-type-apartment'),
  },
].filter(Boolean);

export function BrowseByPropertyType() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <AnimateOnScroll>
          <h2 className="font-headline text-4xl font-bold md:text-5xl mb-8">Discover your new favourite stay</h2>
        </AnimateOnScroll>
        <AnimateOnScroll delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                {propertyTypes.map((type, index) => type.image && (
                    <Link href={`/property/${type.slug}`} key={type.name} className="group">
                        <Card className="overflow-hidden relative border-0 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                             <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                                <Image
                                    src={type.image.imageUrl}
                                    alt={type.name}
                                    fill
                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                    data-ai-hint={type.image.imageHint}
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <CardContent className="absolute bottom-0 left-0 p-4">
                                <h3 className="font-headline text-xl text-white font-bold">{type.name}</h3>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
