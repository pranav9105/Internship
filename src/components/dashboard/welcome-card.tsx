
"use client";

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Plane } from 'lucide-react';

interface WelcomeCardProps {
  userName: string;
}

const quotes = [
  "The world is a book and those who do not travel read only one page.",
  "Not all those who wander are lost.",
  "Life is either a daring adventure or nothing at all.",
  "Travel is the only thing you buy that makes you richer.",
];

export function WelcomeCard({ userName }: WelcomeCardProps) {
  // For now, we'll just pick a static quote. This could be randomized.
  const quote = quotes[0]; 

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-primary/80 to-accent/80 text-primary-foreground shadow-lg">
        <div className="absolute -right-10 -bottom-12 opacity-10">
            <Plane size={200} strokeWidth={0.5} />
        </div>
      <CardHeader>
        <h1 className="font-headline text-4xl font-bold">
          Welcome back, {userName}!
        </h1>
      </CardHeader>
      <CardContent>
        <p className="text-lg italic text-primary-foreground/80">
          &quot;{quote}&quot;
        </p>
      </CardContent>
    </Card>
  );
}
