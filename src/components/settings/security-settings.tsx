"use client";

import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '../ui/separator';

export function SecuritySettings() {
    return (
        <div>
            <CardHeader>
                <CardTitle>Privacy & Security</CardTitle>
                <CardDescription>Manage your account security and data privacy settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                {/* 2-Step Verification */}
                <div className="space-y-4">
                     <Label className="text-lg font-semibold">2-Step Verification</Label>
                     <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                     <Button variant="outline">Set Up 2-Step Verification</Button>
                </div>
                
                <Separator />

                {/* Data Download */}
                <div className="space-y-4">
                    <Label className="text-lg font-semibold">Download Your Data</Label>
                     <p className="text-sm text-muted-foreground">You can request a file containing your personal information.</p>
                     <Button variant="outline">Request Data</Button>
                </div>

                <Separator />
                
                {/* Data Sharing */}
                <div className="space-y-4">
                    <Label className="text-lg font-semibold">Data Sharing</Label>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                            <Label htmlFor="data-sharing">Share data with partners</Label>
                             <p className="text-sm text-muted-foreground">Allow us to share anonymized data to improve services.</p>
                        </div>
                        <Switch id="data-sharing" />
                    </div>
                </div>

            </CardContent>
            <CardFooter className="border-t py-4">
                <Button className="ml-auto">Save Security Settings</Button>
            </CardFooter>
        </div>
    );
}
