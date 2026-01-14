"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Award, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '../ui/progress';

const tiers = [
  {
    name: 'Silver',
    points: '0 - 2,499 Points',
    gradient: 'from-gray-400 to-gray-500',
    benefits: [
        'Basic customer support',
        'Early access to select deals',
    ],
    isCurrent: false,
  },
  {
    name: 'Gold',
    points: '2,500 - 7,499 Points',
    gradient: 'from-amber-400 to-yellow-500',
    benefits: [
        'All Silver benefits',
        'Priority customer support',
        'Complimentary breakfast at partner hotels',
        '5% off on all packages',
    ],
    isCurrent: true, // Example: User is currently Gold
  },
  {
    name: 'Platinum',
    points: '7,500+ Points',
    gradient: 'from-blue-400 to-indigo-500',
    benefits: [
        'All Gold benefits',
        '24/7 dedicated support agent',
        'Free room upgrades (subject to availability)',
        '10% off on all packages',
        'Exclusive access to premium lounges',
    ],
isCurrent: false,
  },
];


export function RewardsSettings() {
    const travelPoints = 2850;
    const progressToNextLevel = (travelPoints / 7500) * 100;

    return (
        <div>
            <CardHeader>
                <CardTitle>Rewards & Membership</CardTitle>
                <CardDescription>View your loyalty status and unlock exclusive benefits.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                {/* User's current status */}
                <div className="p-6 rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold">Your Status: Gold Member</h3>
                        <Award className="h-8 w-8" />
                    </div>
                     <p className="mt-2 text-4xl font-headline">{travelPoints.toLocaleString()} Points</p>
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-1 text-sm">
                            <span>Progress to Platinum</span>
                            <span>{progressToNextLevel.toFixed(0)}%</span>
                        </div>
                        <Progress value={progressToNextLevel} className="h-2 bg-white/20" />
                        <p className="text-xs mt-1">You need {(7500 - travelPoints).toLocaleString()} more points to reach Platinum.</p>
                      </div>
                </div>

                {/* Tier Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {tiers.map((tier) => (
                        <Card key={tier.name} className={cn("flex flex-col", tier.isCurrent && "ring-2 ring-primary")}>
                            <CardHeader className={cn("p-6 rounded-t-lg text-white", tier.gradient)}>
                                <div className="flex items-center gap-3">
                                    <Star className="h-8 w-8" />
                                    <CardTitle className="text-3xl font-bold">{tier.name}</CardTitle>
                                </div>
                                <CardDescription className="text-white/80">{tier.points}</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 flex-grow">
                                <h4 className="font-semibold mb-4">Benefits:</h4>
                                <ul className="space-y-3 text-muted-foreground">
                                    {tier.benefits.map((benefit, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            {tier.isCurrent && (
                                <CardFooter>
                                    <Button className="w-full" disabled>Your Current Tier</Button>
                                </CardFooter>
                            )}
                        </Card>
                    ))}
                </div>
            </CardContent>
             <CardFooter className="border-t py-4">
                <p className="text-sm text-muted-foreground">Points are earned from completed trips and bookings.</p>
            </CardFooter>
        </div>
    );
}
