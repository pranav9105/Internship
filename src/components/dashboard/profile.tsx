
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { useAuth, useFirestore, setDocumentNonBlocking } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User as UserIcon } from 'lucide-react';
import { updateProfile } from 'firebase/auth';

const profileSchema = z.object({
  displayName: z.string().min(2, { message: 'Name must be at least 2 characters' }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;


export function Profile({ user: initialUser }: { user: User }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const auth = useAuth();
  const firestore = useFirestore();

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: initialUser.displayName || '',
    },
  });

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const onSubmit = async (data: ProfileFormValues) => {
    if (auth.currentUser) {
      setLoading(true);
      try {
        await updateProfile(auth.currentUser, {
          displayName: data.displayName
        });

        const userDocRef = doc(firestore, 'users', auth.currentUser.uid);
        setDocumentNonBlocking(userDocRef, { 
            id: auth.currentUser.uid,
            displayName: data.displayName,
            email: auth.currentUser.email
        }, { merge: true });
        
        toast({
          title: 'Profile Updated',
          description: 'Your name has been successfully updated.',
        });

      } catch (error: any) {
        toast({
          title: 'Update Failed',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
      <Card>
        <CardHeader>
            <div className="flex items-center gap-2">
                <UserIcon className="h-6 w-6" />
                <CardTitle className="text-2xl font-headline">Profile & Account Settings</CardTitle>
            </div>
          <CardDescription>Update your personal details and preferences.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                    {initialUser.photoURL && <AvatarImage src={initialUser.photoURL} alt={initialUser.displayName || ''} />}
                    <AvatarFallback className="text-3xl">{getInitials(initialUser.displayName)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="displayName">Display Name</Label>
                        <Input id="displayName" {...register('displayName')} />
                        {errors.displayName && <p className="text-sm text-destructive">{errors.displayName.message}</p>}
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" value={initialUser.email || ''} disabled />
                    </div>
                </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
            <Button onClick={handleSubmit(onSubmit)} className="ml-auto" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
        </CardFooter>
      </Card>
  );
}
