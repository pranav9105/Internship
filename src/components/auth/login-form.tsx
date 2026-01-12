"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const auth = useAuth();
  const { toast } = useToast();
  
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
      console.error("Sign-in error", error);
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found') {
        toast({
          title: "Account Not Found",
          description: "Please go to the Sign Up page to create the test account first.",
          variant: "destructive",
        });
        router.push('/signup');
      } else {
        toast({
          title: "Sign-in Failed",
          description: error.message || "Could not sign in. Please check your credentials or sign up.",
          variant: "destructive",
        });
      }
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
