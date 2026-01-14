
'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Trash2 } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AnimateOnScroll } from '@/components/animate-on-scroll';
import { useUser, useCollection, useFirestore, useMemoFirebase, deleteDocumentNonBlocking } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { Header } from '@/components/layout/header';

export default function WishlistPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const wishlistQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return collection(firestore, 'users', user.uid, 'wishlist');
  }, [user, firestore]);

  const { data: wishlistItems, isLoading } = useCollection(wishlistQuery);

  const handleRemove = (id: string) => {
    if (!user || !firestore) return;
    const docRef = doc(firestore, 'users', user.uid, 'wishlist', id);
    deleteDocumentNonBlocking(docRef);
  };
  
  const getImageForItem = (name: string) => {
    const itemId = `destination-${name.toLowerCase().replace(/, /g, '-')}`;
    return PlaceHolderImages.find((img) => img.id === itemId) || PlaceHolderImages.find((img) => img.id === 'gallery-1');
  }

  return (
    <div className="flex flex-col w-full">
      <Header />
      <main className="flex-grow p-8">
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
            
            {isLoading && (
                 <div className="text-center py-16">
                    <p>Loading your wishlist...</p>
                 </div>
            )}

            {!isLoading && wishlistItems && wishlistItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {wishlistItems.map((item, index) => (
                  <AnimateOnScroll key={item.id} delay={index * 100}>
                    <Card className="overflow-hidden h-full flex flex-col">
                      <div className="relative h-60 w-full">
                          <Image
                            src={getImageForItem(item.name)?.imageUrl || ''}
                            alt={item.name}
                            fill
                            className="object-cover"
                            data-ai-hint={getImageForItem(item.name)?.imageHint}
                          />
                        </div>
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
              !isLoading && (
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
              )
            )}
          </div>
      </main>
    </div>
  );
}
