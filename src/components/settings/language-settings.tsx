"use client";

import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';

export function LanguageSettings() {
    return (
        <div>
            <CardHeader>
                <CardTitle>Language & Region</CardTitle>
                <CardDescription>Set your preferred language, country, and time zone.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                {/* Language */}
                <div className="space-y-2 max-w-sm">
                    <Label htmlFor="language" className="text-lg font-semibold">Language</Label>
                     <p className="text-sm text-muted-foreground">Choose the language you want to use on RoamReady.</p>
                    <Select name="language" defaultValue="en">
                        <SelectTrigger>
                            <SelectValue placeholder="Select language..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="en">English (UK)</SelectItem>
                            <SelectItem value="en-us">English (US)</SelectItem>
                            <SelectItem value="hi">Hindi</SelectItem>
                            <SelectItem value="bn">Bengali</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                
                <Separator />

                {/* Country/Region */}
                <div className="space-y-2 max-w-sm">
                     <Label htmlFor="country" className="text-lg font-semibold">Country/Region</Label>
                      <p className="text-sm text-muted-foreground">This helps us personalize content for your location.</p>
                    <Select name="country" defaultValue="in">
                        <SelectTrigger>
                            <SelectValue placeholder="Select country..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="in">India</SelectItem>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="gb">United Kingdom</SelectItem>
                            <SelectItem value="ae">United Arab Emirates</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Separator />
                
                {/* Time Zone */}
                <div className="space-y-2 max-w-sm">
                     <Label htmlFor="timezone" className="text-lg font-semibold">Time Zone</Label>
                      <p className="text-sm text-muted-foreground">Your bookings and reminders will use this time zone.</p>
                    <Select name="timezone" defaultValue="ist">
                        <SelectTrigger>
                            <SelectValue placeholder="Select time zone..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ist">Indian Standard Time (IST)</SelectItem>
                            <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                            <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
            <CardFooter className="border-t py-4">
                <Button className="ml-auto">Save Changes</Button>
            </CardFooter>
        </div>
    );
}
