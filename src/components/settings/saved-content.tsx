"use client";

import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Briefcase, History, Download } from 'lucide-react';
import Link from 'next/link';

const settingsItems = [
  {
    title: 'My Wishlist',
    description: 'Destinations you have saved for future trips.',
    icon: Heart,
    href: '/wishlist',
  },
  {
    title: 'My Trips',
    description: 'View your upcoming and past trip itineraries.',
    icon: Briefcase,
    href: '/my-trips',
  },
  {
    title: 'Viewed History',
    description: 'A log of packages and destinations you have recently viewed.',
    icon: History,
    href: '#',
  },
  {
    title: 'Downloaded Documents',
    description: 'Access your saved tickets, vouchers, and other documents.',
    icon: Download,
    href: '#',
  },
];

export function SavedContent() {
    return (
        <div>
            <CardHeader>
                <CardTitle>Saved Content</CardTitle>
                <CardDescription>Access your wishlists, saved trips, and booking history.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {settingsItems.map((item) => (
                     <Button asChild key={item.title} variant="outline" className="w-full h-auto justify-start p-4 text-left">
                        <Link href={item.href}>
                             <item.icon className="h-6 w-6 mr-4 text-primary" />
                            <div>
                                <p className="font-semibold">{item.title}</p>
                                <p className="text-sm text-muted-foreground font-normal">{item.description}</p>
                            </div>
                        </Link>
                     </Button>
                ))}
            </CardContent>
        </div>
    );
}
