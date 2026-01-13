
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Trash2 } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AnimateOnScroll } from '@/components/animate-on-scroll';

const initialWishlistItems = [
  {
    id: 1,
    name: 'Jaipur, Rajasthan',
    description: 'The Pink City, full of heritage forts.',
    image: PlaceHolderImages.find((img) => img.id === 'destination-jaipur'),
  },
  {
    id: 2,
    name: 'Goa',
    description: 'Pristine beaches and vibrant nightlife.',
    image: PlaceHolderImages.find((img) => img.id === 'destination-goa'),
  },
  {
    id: 3,
    name: 'Alleppey, Kerala',
    description: 'Serene backwaters and lush greenery.',
    image: PlaceHolderImages.find((img) => img.id === 'destination-kerala'),
  },
  {
    id: 4,
    name: 'Ladakh',
    description: 'High-altitude desert and stunning vistas.',
    image: PlaceHolderImages.find((img) => img.id === 'destination-ladakh'),
  },
];

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);

  const handleRemove = (id: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-muted/40 w-full">
      <Sidebar />
      <div className="flex flex-col flex-grow md:pl-64">
        <Header />
        <main className="flex-grow pt-24 pb-8">
          <div className="container mx-auto px-4 md:px-6">
            <AnimateOnScroll>
              <header className="mb-8">
                <h1 className="font-headline text-4xl font-bold flex items-center gap-3">
                  <Heart className="h-8 w-8 text-primary" />
                  My Wishlist
                </h1>
                <p className="text-muted-foreground">Your saved destinations for future adventures.</p>
              </header>
            </AnimateOnScroll>

            {wishlistItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {wishlistItems.map((item, index) => (
                  <AnimateOnScroll key={item.id} delay={index * 100}>
                    <Card className="overflow-hidden h-full flex flex-col">
                      {item.image && (
                        <div className="relative h-60 w-full">
                          <Image
                            src={item.image.imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover"
                            data-ai-hint={item.image.imageHint}
                          />
                        </div>
                      )}
                      <CardContent className="p-4 flex-grow">
                        <h3 className="font-headline text-xl font-bold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button
                          variant="destructive"
                          size="sm"
                          className="w-full"
                          onClick={() => handleRemove(item.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove
                        </Button>
                      </CardFooter>
                    </Card>
                  </AnimateOnScroll>
                ))}
              </div>
            ) : (
              <AnimateOnScroll>
                <div className="text-center py-16 border-2 border-dashed rounded-lg">
                  <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Your wishlist is empty</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Start exploring and add destinations you'd like to visit.
                  </p>
                  <Button asChild className="mt-6">
                    <a href="/deals">Explore Deals</a>
                  </Button>
                </div>
              </AnimateOnScroll>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
