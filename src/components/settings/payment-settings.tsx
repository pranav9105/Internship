"use client";

import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '../ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export function PaymentSettings() {
    return (
        <div>
            <CardHeader>
                <CardTitle>Payments & Bookings</CardTitle>
                <CardDescription>Manage your payment methods and view booking history.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                {/* Saved Cards */}
                <div className="space-y-4">
                    <Label className="text-lg font-semibold">Saved Cards</Label>
                    <div className="p-4 border rounded-lg text-center text-muted-foreground">
                        <p>No saved cards yet.</p>
                    </div>
                    <Button variant="outline">Add New Card</Button>
                </div>
                
                <Separator />

                {/* Billing Address */}
                <div className="space-y-4">
                     <Label className="text-lg font-semibold">Billing Address</Label>
                    <div className="grid grid-cols-1 gap-4">
                         <div className="space-y-2">
                            <Label htmlFor="address-line1">Address Line 1</Label>
                            <Input id="address-line1" placeholder="123, Main Street" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input id="city" placeholder="Mumbai" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="state">State</Label>
                                <Input id="state" placeholder="Maharashtra" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="pincode">Pincode</Label>
                                <Input id="pincode" placeholder="400001" />
                            </div>
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Invoices */}
                <div className="space-y-2">
                    <Label className="text-lg font-semibold">Download Invoices</Label>
                     <p className="text-sm text-muted-foreground">View and download your past booking invoices.</p>
                     <Button variant="outline">View Invoices</Button>
                </div>

                 <Separator />

                {/* Currency */}
                <div className="space-y-2 max-w-sm">
                    <Label htmlFor="currency" className="text-lg font-semibold">Currency Preference</Label>
                    <Select name="currency" defaultValue="inr">
                        <SelectTrigger>
                            <SelectValue placeholder="Select currency..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="inr">INR (Indian Rupee)</SelectItem>
                            <SelectItem value="usd">USD (United States Dollar)</SelectItem>
                            <SelectItem value="eur">EUR (Euro)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

            </CardContent>
            <CardFooter className="border-t py-4">
                <Button className="ml-auto">Save Payment Info</Button>
            </CardFooter>
        </div>
    );
}
