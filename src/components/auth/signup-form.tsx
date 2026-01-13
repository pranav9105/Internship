
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';


const signupSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export function SignupForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const auth = useAuth();
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: 'Admin',
      email: 'admin1@gmail.com',
      password: '1234567890',
    }
  });

  const onSubmit = async (data: SignupFormValues) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(userCredential.user, {
        displayName: data.name
      });
      
      toast({
          title: 'Account Created!',
          description: "Redirecting you to the dashboard.",
      });
      router.push('/welcome');

    } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
            toast({
                title: 'Account Exists',
                description: 'This account already exists. Redirecting to login.',
            });
            router.push('/login');
        } else {
            toast({
                title: 'Signup Failed',
                description: error.message || 'An error occurred during signup.',
                variant: 'destructive',
            });
        }
    } finally {
        setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-gray-300">Name</Label>
        <Input id="name" type="text" placeholder="Enter your name" {...register('name')} className="bg-gray-800/50 border-gray-700 text-white" />
        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-300">Email</Label>
        <Input id="email" type="email" placeholder="Enter your email" {...register('email')} className="bg-gray-800/50 border-gray-700 text-white" />
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-gray-300">Password</Label>
        <Input id="password" type="password" placeholder="Enter your password" {...register('password')} className="bg-gray-800/50 border-gray-700 text-white" />
        {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
      </div>
      <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
        {loading ? 'Creating Account...' : 'SIGN UP'}
      </Button>
    </form>
  );
}
