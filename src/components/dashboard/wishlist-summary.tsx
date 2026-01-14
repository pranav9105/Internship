'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useUser, useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, limit } from 'firebase/firestore';
import Link from 'next/link';

export function WishlistSummary() {
  const { user } = useUser();
  const firestore = useFirestore();

  const wishlistQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(collection(firestore, 'users', user.uid, 'wishlist'), limit(3));
  }, [user, firestore]);

  const { data: wishlistItems, isLoading } = useCollection(wishlistQuery);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Heart />
          Wishlist
        </CardTitle>
        <Button variant="link" asChild>
            <Link href="/wishlist">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading && <p>Loading wishlist...</p>}
        {!isLoading && wishlistItems?.length === 0 && (
            <div className="text-center text-muted-foreground p-4">
                <p>Your wishlist is empty.</p>
            </div>
        )}
        <ul className="space-y-2">
            {wishlistItems?.map((item) => (
                <li key={item.id} className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                    <span className="font-medium">{item.name}</span>
                    <Button variant="ghost" size="sm">View</Button>
                </li>
            ))}
        </ul>
      </CardContent>
    </Card>
  );
}
