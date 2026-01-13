
'use client';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '../ui/button';
import { Calendar } from 'lucide-react';

const bookingData = [
    { year: '2022', items: [
        { name: 'Goa', dates: '16 Apr - 20 Apr', imageId: 'package-goa-beach' },
        { name: 'Shimla', dates: '16 Jan - 25 Jan', imageId: 'package-himalayan-escape' },
    ]},
    { year: '2021', items: [
        { name: 'Andaman', dates: '07 Nov - 20 Nov', imageId: 'package-andaman-islands' },
    ]}
];

export function Bookings() {
  return (
    <Card className="bg-card">
        <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="font-headline text-3xl font-bold">Bookings</CardTitle>
            <Button variant="link" className="text-primary">View All</Button>
        </CardHeader>
        <CardContent className="space-y-6">
            {bookingData.map(group => (
                <div key={group.year}>
                    <h3 className="font-bold text-muted-foreground mb-4">{group.year}</h3>
                    <div className="space-y-4">
                        {group.items.map(item => {
                             const image = PlaceHolderImages.find(img => img.id === item.imageId);
                             return (
                                <div key={item.name} className="flex items-center gap-4">
                                     {image && (
                                        <div className="relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                                            <Image
                                                src={image.imageUrl}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                                data-ai-hint={image.imageHint}
                                            />
                                        </div>
                                     )}
                                     <div>
                                         <p className="font-bold text-white">{item.name}</p>
                                         <p className="text-sm text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" /> {item.dates}</p>
                                     </div>
                                </div>
                             )
                        })}
                    </div>
                </div>
            ))}
        </CardContent>
    </Card>
  );
}
