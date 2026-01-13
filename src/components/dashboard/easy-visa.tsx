
'use client';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '../ui/button';

const destinations = [
    { name: 'Bali', imageId: 'package-heritage-rajasthan', price: '₹19,600' },
    { name: 'Dubai', imageId: 'gallery-5', price: '₹21,700' },
    { name: 'Maldives', imageId: 'package-andaman-islands', price: '₹11,300' },
];

export function EasyVisa() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-headline text-3xl font-bold">Easy Visa Destinations</h2>
        <Button variant="link" className="text-primary">View All</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {destinations.map(dest => {
            const image = PlaceHolderImages.find(img => img.id === dest.imageId);
            return (
                <Card key={dest.name} className="bg-card border-0 overflow-hidden">
                    <CardContent className="p-0">
                         {image && (
                            <div className="relative h-48 w-full">
                                <Image
                                    src={image.imageUrl}
                                    alt={dest.name}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={image.imageHint}
                                />
                            </div>
                         )}
                        <div className="p-4">
                            <h3 className="font-bold text-lg text-white">{dest.name}</h3>
                            <div className="flex justify-between items-center mt-2">
                                <p className="text-sm text-muted-foreground">Starting at</p>
                                <p className="font-bold text-white">{dest.price}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )
        })}
      </div>
    </div>
  );
}
