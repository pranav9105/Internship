"use client";

import { useUser } from '@/firebase';
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '../ui/separator';
import { UploadCloud } from 'lucide-react';

export function ProfileSettings() {
    const { user } = useUser();
    
    const getInitials = (name: string | null) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    return (
        <div>
            <CardHeader>
                <CardTitle>Core Account Settings</CardTitle>
                <CardDescription>Manage your personal information and account settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                {/* Profile Info */}
                <div className="space-y-4">
                    <Label className="text-lg font-semibold">Profile Info</Label>
                    <div className="flex items-center gap-6">
                        <Avatar className="h-20 w-20">
                            {user?.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || ''} />}
                            <AvatarFallback className="text-3xl">{getInitials(user?.displayName || null)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow space-y-2">
                             <Label htmlFor="displayName">Name</Label>
                             <Input id="displayName" defaultValue={user?.displayName || ''} />
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" type="tel" placeholder="+91 123-456-7890" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dob">Date of Birth</Label>
                            <Input id="dob" type="date" />
                        </div>
                    </div>
                </div>

                <Separator />

                {/* ID Verification */}
                <div className="space-y-4">
                    <Label className="text-lg font-semibold">ID Verification</Label>
                    <p className="text-sm text-muted-foreground">For a faster booking process, please verify your identity by uploading your Aadhar card.</p>
                    <div className="p-4 border-2 border-dashed rounded-lg space-y-4">
                        <div className="space-y-2">
                             <Label htmlFor="aadhar-number">Aadhar Card Number</Label>
                             <Input id="aadhar-number" placeholder="xxxx-xxxx-xxxx" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="aadhar-upload">Upload Document</Label>
                            <div className="flex items-center justify-center w-full">
                                <label
                                    htmlFor="aadhar-upload"
                                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground" />
                                        <p className="mb-2 text-sm text-muted-foreground">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-muted-foreground">PDF, PNG, JPG (MAX. 5MB)</p>
                                    </div>
                                    <Input id="aadhar-upload" type="file" className="hidden" />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                
                <Separator />

                {/* Email Address */}
                <div className="space-y-2">
                     <Label htmlFor="email" className="text-lg font-semibold">Email Address</Label>
                     <Input id="email" type="email" defaultValue={user?.email || ''} disabled />
                </div>
                
                <Separator />
                
                {/* Password */}
                <div className="space-y-4">
                     <Label className="text-lg font-semibold">Password</Label>
                     <p className="text-sm text-muted-foreground">For security, we will send a password reset link to your email.</p>
                     <Button variant="outline">Change Password</Button>
                </div>

                <Separator />

                {/* Connected Accounts */}
                <div className="space-y-4">
                     <Label className="text-lg font-semibold">Connected Accounts</Label>
                     <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center gap-3">
                            <span className="font-bold text-lg">G</span>
                            <span>Google</span>
                        </div>
                        <Button variant="secondary" size="sm">Connected</Button>
                     </div>
                </div>
                
                <Separator />
                
                {/* Delete Account */}
                <div className="space-y-4 p-4 border border-destructive rounded-lg">
                    <Label className="text-lg font-semibold text-destructive">Danger Zone</Label>
                    <p className="text-sm text-muted-foreground">Deactivating or deleting your account is a permanent action and cannot be undone.</p>
                    <div className="flex gap-4">
                        <Button variant="outline">Deactivate Account</Button>
                        <Button variant="destructive">Delete Account</Button>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="border-t py-4">
                <Button className="ml-auto">Save Changes</Button>
            </CardFooter>
        </div>
    );
}
