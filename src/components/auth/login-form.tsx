
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

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
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found') {
        // If user does not exist, create it and then sign in.
        try {
          await createUserWithEmailAndPassword(auth, testUser.email, testUser.password);
          // The onAuthStateChanged listener in the provider will handle the redirect.
          // For immediate feedback, we can push to welcome.
          router.push('/welcome');
        } catch (creationError: any) {
          toast({
            title: "Auto Sign-Up Failed",
            description: creationError.message || "Could not create the test account.",
            variant: "destructive",
          });
        }
      } else {
        console.error("Sign-in error", error);
        toast({
          title: "Sign-in Failed",
          description: error.message || "An unexpected error occurred.",
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
