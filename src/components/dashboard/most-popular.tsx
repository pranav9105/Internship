
'use client';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { MapPin } from 'lucide-react';

const popularPlaces = [
    { name: 'Kerala', country: 'India', imageId: 'package-kerala-backwaters', price: '₹3,500' },
    { name: 'Jaipur', country: 'India', imageId: 'destination-jaipur', price: '₹2,800' },
    { name: 'Goa', country: 'India', imageId: 'package-goa-beach', price: '₹3,200' },
    { name: 'Kashmir', country: 'India', imageId: 'package-himalayan-escape', price: '₹4,100' },
];

export function MostPopular() {
  return (
    <div>
        <Tabs defaultValue="popular" className="w-full">
            <TabsList className="bg-transparent p-0 mb-4 h-auto">
                <TabsTrigger value="popular" className="text-3xl font-bold font-headline p-0 data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent mr-8">Most Popular</TabsTrigger>
                <TabsTrigger value="special" className="text-3xl font-bold font-headline p-0 data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent mr-8">Special Offers</TabsTrigger>
                <TabsTrigger value="near" className="text-3xl font-bold font-headline p-0 data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent">Near Me</TabsTrigger>
            </TabsList>
            <TabsContent value="popular">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {popularPlaces.map(place => {
                        const image = PlaceHolderImages.find(img => img.id === place.imageId);
                        return (
                             <Card key={place.name} className="bg-card border-0">
                                <CardContent className="p-4 flex items-center gap-4">
                                     {image && (
                                        <div className="relative h-20 w-20 rounded-lg overflow-hidden flex-shrink-0">
                                            <Image
                                                src={image.imageUrl}
                                                alt={place.name}
                                                fill
                                                className="object-cover"
                                                data-ai-hint={image.imageHint}
                                            />
                                        </div>
                                     )}
                                     <div className="flex-grow">
                                        <h3 className="font-bold text-white">{place.name}</h3>
                                        <p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3"/> {place.country}</p>
                                     </div>
                                     <div className="text-right">
                                        <p className="font-bold text-primary text-lg">{place.price}</p>
                                        <p className="text-sm text-muted-foreground">/day</p>
                                     </div>
                                </CardContent>
                             </Card>
                        )
                    })}
                </div>
            </TabsContent>
             <TabsContent value="special">
                <p className="text-muted-foreground">No special offers at this time.</p>
            </TabsContent>
             <TabsContent value="near">
                 <p className="text-muted-foreground">No places found near you.</p>
            </TabsContent>
        </Tabs>
    </div>
  );
}
