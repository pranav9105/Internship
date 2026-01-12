"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  
  const testUser = {
      email: 'admin1@gmail.com',
      password: '1234567890',
  }

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, testUser.email, testUser.password);
      router.push('/welcome');
    } catch (error: any) {
      let description = "An unexpected error occurred. Please try again.";
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
        description = "Invalid credentials. Please check your email and password. You may need to sign up first.";
      } else {
        description = error.message;
      }
      toast({
        title: 'Login Failed',
        description: description,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
       <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" readOnly value={testUser.email} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" readOnly value={testUser.password} />
        </div>
      <Button onClick={handleSignIn} className="w-full" disabled={loading}>
        {loading ? 'Signing In...' : 'Sign In'}
      </Button>
    </div>
  );
}
