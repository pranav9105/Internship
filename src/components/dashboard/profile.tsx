
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User, updateProfile } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { useAuth, useFirestore, updateDocumentNonBlocking } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AnimateOnScroll } from '../animate-on-scroll';

const profileSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileProps {
  user: User;
}

export function Profile({ user }: ProfileProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const auth = useAuth();
  const firestore = useFirestore();
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.displayName || '',
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
        await updateProfile(auth.currentUser, { displayName: data.name });
        const userDocRef = doc(firestore, 'users', auth.currentUser.uid);
        updateDocumentNonBlocking(userDocRef, { name: data.name });
        
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
    <AnimateOnScroll>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-2xl">{getInitials(user.displayName)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-headline">{user.displayName}</CardTitle>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Display Name</Label>
              <Input id="name" {...register('name')} />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </AnimateOnScroll>
  );
}
