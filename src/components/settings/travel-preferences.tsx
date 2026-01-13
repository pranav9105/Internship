"use client";

import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '../ui/textarea';
import { Separator } from '../ui/separator';

export function TravelPreferences() {
    return (
        <div>
            <CardHeader>
                <CardTitle>Travel Preferences</CardTitle>
                <CardDescription>Help us customize your travel experience by sharing your preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                {/* Preferred Airports */}
                <div className="space-y-4">
                    <Label className="text-lg font-semibold">Preferred Airports/Cities</Label>
                    <Input placeholder="e.g., Delhi, Mumbai, Bangalore" />
                </div>
                
                <Separator />

                {/* Travel Interests */}
                <div className="space-y-4">
                    <Label className="text-lg font-semibold">Travel Interests</Label>
                     <Textarea placeholder="Describe your ideal trip... e.g., beach relaxation, mountain trekking, historical sites, luxury stays, budget backpacking." />
                </div>

                <Separator />
                
                {/* Flight & Meal Preferences */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="cabin">Cabin Preference</Label>
                        <Select name="cabin">
                            <SelectTrigger>
                                <SelectValue placeholder="Select cabin..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="economy">Economy</SelectItem>
                                <SelectItem value="premium">Premium Economy</SelectItem>
                                <SelectItem value="business">Business</SelectItem>
                                <SelectItem value="first">First Class</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="seat">Seat Preference</Label>
                        <Select name="seat">
                            <SelectTrigger>
                                <SelectValue placeholder="Select seat..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="window">Window</SelectItem>
                                <SelectItem value="aisle">Aisle</SelectItem>
                                <SelectItem value="no-preference">No Preference</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="meal">Meal Preference</Label>
                        <Select name="meal">
                            <SelectTrigger>
                                <SelectValue placeholder="Select meal..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="veg">Vegetarian</SelectItem>
                                <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
                                <SelectItem value="vegan">Vegan</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                 <Separator />

                {/* Travel Companions */}
                 <div className="space-y-2">
                    <Label htmlFor="companions">Typical Travel Companions</Label>
                    <Select name="companions">
                        <SelectTrigger>
                            <SelectValue placeholder="Who do you usually travel with?" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="solo">Solo</SelectItem>
                            <SelectItem value="partner">Partner/Spouse</SelectItem>
                            <SelectItem value="family">Family with kids</SelectItem>
                            <SelectItem value="friends">Friends</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

            </CardContent>
            <CardFooter className="border-t py-4">
                <Button className="ml-auto">Save Preferences</Button>
            </CardFooter>
        </div>
    );
}
