"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/logo';
import { AnimateOnScroll } from '@/components/animate-on-scroll';

export default function WelcomePage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background">
      <AnimateOnScroll className="animate-pulse">
        <Logo />
      </AnimateOnScroll>
    </div>
  );
}
