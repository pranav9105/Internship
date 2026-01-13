"use client";

import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '../ui/separator';

export function NotificationSettings() {
    return (
        <div>
            <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Choose how you want to be notified about your trips and promotions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                {/* General Notifications */}
                <div className="space-y-4">
                     <Label className="text-lg font-semibold">Communication Channels</Label>
                     <div className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                            <Label htmlFor="email-notifications">Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive updates via email.</p>
                        </div>
                        <Switch id="email-notifications" defaultChecked />
                    </div>
                     <div className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                            <Label htmlFor="push-notifications">Push Notifications</Label>
                             <p className="text-sm text-muted-foreground">Get alerts directly on your device.</p>
                        </div>
                        <Switch id="push-notifications" />
                    </div>
                     <div className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                            <Label htmlFor="sms-alerts">SMS Alerts</Label>
                             <p className="text-sm text-muted-foreground">For critical updates only.</p>
                        </div>
                        <Switch id="sms-alerts" defaultChecked />
                    </div>
                </div>

                 <Separator />

                {/* Specific Alerts */}
                 <div className="space-y-4">
                     <Label className="text-lg font-semibold">Alert Types</Label>
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                            <Label htmlFor="price-drop">Price-Drop Alerts</Label>
                             <p className="text-sm text-muted-foreground">Notify me when prices for my wishlist items change.</p>
                        </div>
                        <Switch id="price-drop" defaultChecked />
                    </div>
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                            <Label htmlFor="trip-reminders">Trip Reminders</Label>
                             <p className="text-sm text-muted-foreground">Reminders for upcoming flights, hotel check-ins etc.</p>
                        </div>
                        <Switch id="trip-reminders" defaultChecked />
                    </div>
                 </div>

                 <Separator />
                
                 {/* Marketing */}
                 <div className="space-y-4">
                     <Label className="text-lg font-semibold">Promotions</Label>
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                            <Label htmlFor="marketing-promo">Marketing & Promotions</Label>
                             <p className="text-sm text-muted-foreground">Receive exclusive deals and newsletters.</p>
                        </div>
                        <Switch id="marketing-promo" />
                    </div>
                 </div>

            </CardContent>
            <CardFooter className="border-t py-4">
                <Button className="ml-auto">Save Notification Settings</Button>
            </CardFooter>
        </div>
    );
}
