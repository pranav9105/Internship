"use client";

import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Award } from 'lucide-react';
import { Progress } from '../ui/progress';

export function RewardsSettings() {
    const travelPoints = 1250;
    const progressToNextLevel = 75;

    return (
        <div>
            <CardHeader>
                <CardTitle>Rewards & Membership</CardTitle>
                <CardDescription>View your loyalty status and redeem points.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                {/* Membership Tier */}
                <div className="p-6 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-500 text-white shadow-lg">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold">Gold Member</h3>
                        <Star className="h-8 w-8" />
                    </div>
                     <p className="mt-2 text-4xl font-headline">{travelPoints.toLocaleString()} Points</p>
                </div>
                
                {/* Progress to next level */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-semibold flex items-center">
                            <Award className="w-4 h-4 mr-1.5 text-primary" />
                            Next Level: Platinum
                        </p>
                        <p className="text-xs text-muted-foreground">{progressToNextLevel}% to go</p>
                    </div>
                    <Progress value={progressToNextLevel} className="h-2" />
                    <p className="text-xs text-muted-foreground">You need 250 more points to reach Platinum.</p>
                </div>
                
                {/* Benefits */}
                <div className="space-y-4">
                     <h4 className="text-lg font-semibold">Your Benefits</h4>
                     <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>Free seat selection on partner airlines</li>
                        <li>Complimentary breakfast at partner hotels</li>
                        <li>10% off on all holiday packages</li>
                        <li>Priority customer support</li>
                     </ul>
                </div>
            </CardContent>
            <CardFooter className="border-t py-4">
                <Button className="ml-auto" variant="secondary">Redeem Points</Button>
            </CardFooter>
        </div>
    );
}
