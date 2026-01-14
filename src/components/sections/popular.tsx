
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AnimateOnScroll } from '../animate-on-scroll';

const domesticCities = [
  'Ooty hotels', 'Hyderabad hotels', 'Jaipur hotels', 'Puri hotels', 'Cochin hotels',
  'Munnar hotels', 'Mumbai hotels', 'Bangalore hotels', 'Udaipur hotels', 'Varanasi hotels',
  'Srinagar hotels', 'Rishikesh hotels', 'Hampi hotels', 'Pondicherry hotels', 'Varkala hotels',
  'Alleppey hotels', 'Shimla hotels', 'Nainital hotels', 'Mangalore hotels', 'Lonavala hotels',
  'Ahmedabad hotels', 'Ayodhya hotels', 'Kolkata hotels', 'Alibaug hotels', 'Tiruvannamalai hotels',
  'The Taj Mahal Palace, Mumbai', 'The Oberoi, Gurgaon', 'ITC Maurya, New Delhi',
];

const regions = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const countries = [
    'India',
];

const placesToStay = [
    'Hotels', 'Apartments', 'Resorts', 'Villas', 'Guest houses',
];

export function Popular() {
  const [showAll, setShowAll] = useState(false);
  const displayedCities = showAll ? domesticCities : domesticCities.slice(0, 15);

  return (
    <section id="popular" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <AnimateOnScroll>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-3xl">Popular with travelers in India</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="domestic" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                  <TabsTrigger value="domestic">Domestic cities</TabsTrigger>
                  <TabsTrigger value="regions">Regions</TabsTrigger>
                  <TabsTrigger value="countries">Countries</TabsTrigger>
                  <TabsTrigger value="places">Places to stay</TabsTrigger>
                </TabsList>
                <TabsContent value="domestic" className="mt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-2">
                    {displayedCities.map((city, index) => (
                      <Link key={index} href="#" className="text-sm text-muted-foreground hover:text-primary hover:underline" prefetch={false}>
                        {city}
                      </Link>
                    ))}
                  </div>
                   {!showAll && (
                    <Button variant="link" className="px-0 mt-4" onClick={() => setShowAll(true)}>
                      + Show more
                    </Button>
                  )}
                </TabsContent>
                <TabsContent value="regions" className="mt-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-2">
                        {regions.map((region, index) => (
                            <Link key={index} href="#" className="text-sm text-muted-foreground hover:text-primary hover:underline" prefetch={false}>
                                {region}
                            </Link>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="countries" className="mt-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-2">
                        {countries.map((country, index) => (
                            <Link key={index} href="#" className="text-sm text-muted-foreground hover:text-primary hover:underline" prefetch={false}>
                                {country}
                            </Link>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="places" className="mt-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-2">
                        {placesToStay.map((place, index) => (
                            <Link key={index} href="#" className="text-sm text-muted-foreground hover:text-primary hover:underline" prefetch={false}>
                                {place}
                            </Link>
                        ))}
                    </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
