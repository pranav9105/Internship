'use client';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { MapPin } from 'lucide-react';

const popularPlaces = [
  { name: 'Andhra Pradesh', country: 'India', imageId: 'state-andhra-pradesh', price: '₹22,000' },
  { name: 'Arunachal Pradesh', country: 'India', imageId: 'state-arunachal-pradesh', price: '₹30,000' },
  { name: 'Assam', country: 'India', imageId: 'state-assam', price: '₹25,000' },
  { name: 'Bihar', country: 'India', imageId: 'state-bihar', price: '₹18,000' },
  { name: 'Chhattisgarh', country: 'India', imageId: 'state-chhattisgarh', price: '₹20,000' },
  { name: 'Goa', country: 'India', imageId: 'package-goa-beach', price: '₹35,000' },
  { name: 'Gujarat', country: 'India', imageId: 'state-gujarat', price: '₹28,000' },
  { name: 'Haryana', country: 'India', imageId: 'state-haryana', price: '₹15,000' },
  { name: 'Himachal Pradesh', country: 'India', imageId: 'package-himalayan-escape', price: '₹25,000' },
  { name: 'Jharkhand', country: 'India', imageId: 'state-jharkhand', price: '₹19,000' },
  { name: 'Karnataka', country: 'India', imageId: 'state-karnataka', price: '₹26,000' },
  { name: 'Kerala', country: 'India', imageId: 'package-kerala-backwaters', price: '₹16,000' },
  { name: 'Madhya Pradesh', country: 'India', imageId: 'state-madhya-pradesh', price: '₹24,000' },
  { name: 'Maharashtra', country: 'India', imageId: 'state-maharashtra', price: '₹27,000' },
  { name: 'Manipur', country: 'India', imageId: 'state-manipur', price: '₹29,000' },
  { name: 'Meghalaya', country: 'India', imageId: 'state-meghalaya', price: '₹31,000' },
  { name: 'Mizoram', country: 'India', imageId: 'state-mizoram', price: '₹32,000' },
  { name: 'Nagaland', country: 'India', imageId: 'state-nagaland', price: '₹33,000' },
  { name: 'Odisha', country: 'India', imageId: 'state-odisha', price: '₹21,000' },
  { name: 'Punjab', country: 'India', imageId: 'state-punjab', price: '₹17,000' },
  { name: 'Rajasthan', country: 'India', imageId: 'package-heritage-rajasthan', price: '₹20,000' },
  { name: 'Sikkim', country: 'India', imageId: 'state-sikkim', price: '₹34,000' },
  { name: 'Tamil Nadu', country: 'India', imageId: 'state-tamil-nadu', price: '₹23,000' },
  { name: 'Telangana', country: 'India', imageId: 'state-telangana', price: '₹20,000' },
  { name: 'Tripura', country: 'India', imageId: 'state-tripura', price: '₹28,000' },
  { name: 'Uttar Pradesh', country: 'India', imageId: 'state-uttar-pradesh', price: '₹19,000' },
  { name: 'Uttarakhand', country: 'India', imageId: 'state-uttarakhand', price: '₹26,000' },
  { name: 'West Bengal', country: 'India', imageId: 'state-west-bengal', price: '₹22,000' },
  { name: 'Jammu and Kashmir', country: 'India', imageId: 'state-jammu-kashmir', price: '₹35,000' }
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
                                        <p className="text-sm text-muted-foreground">/person</p>
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
