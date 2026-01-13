"use client";

import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, MessageSquareWarning, Phone } from 'lucide-react';
import Link from 'next/link';

const supportItems = [
  {
    title: 'Help Center & FAQs',
    description: 'Find answers to common questions and learn how to use our platform.',
    icon: HelpCircle,
    href: '/help',
  },
  {
    title: 'Report an Issue',
    description: 'Encountered a bug or a problem with a booking? Let us know.',
    icon: MessageSquareWarning,
    href: '/feedback',
  },
  {
    title: 'Contact Support',
    description: 'Speak with a customer support agent for immediate assistance.',
    icon: Phone,
    href: '/help',
  },
];

export function SupportSettings() {
    return (
        <div>
            <CardHeader>
                <CardTitle>Support</CardTitle>
                <CardDescription>Get help and find answers to your questions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {supportItems.map((item) => (
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
