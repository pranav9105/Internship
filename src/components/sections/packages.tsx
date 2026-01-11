import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimateOnScroll } from '../animate-on-scroll';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

const packages = [
  {
    title: 'Tropical Getaway',
    price: '₹1,25,000',
    duration: '7 Days / 6 Nights',
    features: ['5-star Beachfront Resort', 'Daily Breakfast', 'Snorkeling Tour'],
    image: PlaceHolderImages.find((img) => img.id === 'package-tropical'),
  },
  {
    title: 'Mountain Adventure',
    price: '₹1,50,000',
    duration: '8 Days / 7 Nights',
    features: ['Cozy Mountain Lodge', 'Guided Hiking Treks', 'All Meals Included'],
    image: PlaceHolderImages.find((img) => img.id === 'package-adventure'),
  },
  {
    title: 'City Explorer',
    price: '₹1,00,000',
    duration: '5 Days / 4 Nights',
    features: ['Downtown Luxury Hotel', 'City Tour Pass', 'Museum Tickets'],
    image: PlaceHolderImages.find((img) => img.id === 'package-city'),
  },
  {
    title: 'Heritage Rajasthan',
    price: '₹1,40,000',
    duration: '9 Days / 8 Nights',
    features: ['Stay in Heritage Hotels', 'Desert Safari', 'Fort & Palace Tours'],
    image: PlaceHolderImages.find((img) => img.id === 'package-heritage-rajasthan'),
  },
  {
    title: 'Kerala Backwaters',
    price: '₹1,30,000',
    duration: '6 Days / 5 Nights',
    features: ['Private Houseboat Stay', 'Ayurvedic Massage', 'Spice Plantation Visit'],
    image: PlaceHolderImages.find((img) => img.id === 'package-kerala-backwaters'),
  },
  {
    title: 'Himalayan Escape',
    price: '₹1,75,000',
    duration: '10 Days / 9 Nights',
    features: ['Monastery Visits', 'High-Altitude Trekking', 'River Rafting'],
    image: PlaceHolderImages.find((img) => img.id === 'package-himalayan-escape'),
  },
  {
    title: 'Goa Beach Bliss',
    price: '₹90,000',
    duration: '4 Days / 3 Nights',
    features: ['North & South Goa Tour', 'Water Sports', 'Beachside Parties'],
    image: PlaceHolderImages.find((img) => img.id === 'package-goa-beach'),
  },
  {
    title: 'Golden Triangle',
    price: '₹1,10,000',
    duration: '6 Days / 5 Nights',
    features: ['Delhi, Agra & Jaipur', 'Taj Mahal at Sunrise', 'Rickshaw Ride in Delhi'],
    image: PlaceHolderImages.find((img) => img.id === 'package-golden-triangle'),
  },
  {
    title: 'Andaman Islands',
    price: '₹1,60,000',
    duration: '7 Days / 6 Nights',
    features: ['Scuba Diving', 'Cellular Jail Visit', 'Radhanagar Beach'],
    image: PlaceHolderImages.find((img) => img.id === 'package-andaman-islands'),
  },
  {
    title: 'Wildlife Safari',
    price: '₹1,35,000',
    duration: '5 Days / 4 Nights',
    features: ['Jungle Jeep Safari', 'Stay in a Wildlife Resort', 'Bird Watching Tours'],
    image: PlaceHolderImages.find((img) => img.id === 'package-wildlife-safari'),
  },
];

export function Packages() {
  return (
    <section id="packages" className="py-20 md:py-32 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <AnimateOnScroll>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-4xl font-bold md:text-5xl">Our Packages</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Carefully crafted experiences for every type of traveler.
            </p>
          </div>
        </AnimateOnScroll>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {packages.map((pkg, index) => (
            <AnimateOnScroll key={pkg.title} delay={index * 100}>
              <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <CardHeader className="p-0">
                    <div className="relative h-60 w-full">
                        {pkg.image && (
                            <Image
                                src={pkg.image.imageUrl}
                                alt={pkg.title}
                                fill
                                className="object-cover"
                                data-ai-hint={pkg.image.imageHint}
                            />
                        )}
                    </div>
                </CardHeader>
                <CardContent className="p-6 flex-grow flex flex-col">
                  <CardTitle className="font-headline text-2xl">{pkg.title}</CardTitle>
                  <CardDescription className="mt-2">{pkg.duration}</CardDescription>
                  <ul className="mt-6 space-y-3 text-muted-foreground flex-grow">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-accent" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 text-4xl font-bold font-headline">{pkg.price}</div>
                  <p className="text-sm text-muted-foreground">per person</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button asChild size="lg" className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity">
                    <Link href="/signup">Book Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
