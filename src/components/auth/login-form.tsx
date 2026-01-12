"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const testUser = {
      email: 'admin1@gmail.com',
      password: '1234567890',
  }

  // Simulate a successful login for development purposes
  const handleSignIn = async () => {
    setLoading(true);
    // Instead of calling Firebase, we'll just redirect to the welcome/dashboard page
    // as if the login was successful. The Firebase provider is mocked to handle the user state.
    setTimeout(() => {
      router.push('/welcome');
    }, 500); // A small delay to simulate a network request
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
