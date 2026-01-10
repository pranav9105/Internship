"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/logo';
import { useAuth } from '@/context/auth-context';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '../theme-toggle';

const navLinks = [
  { href: '#destinations', label: 'Destinations' },
  { href: '#packages', label: 'Packages' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/');
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        scrolled ? 'bg-background/80 shadow-md backdrop-blur-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Logo />
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          {user ? (
            <>
              <Button onClick={() => router.push('/dashboard')} variant="ghost">Dashboard</Button>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs bg-background">
            <div className="flex h-full flex-col p-6">
              <div className="mb-8 flex items-center justify-between">
                <Logo />
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </SheetTrigger>
              </div>
              <nav className="flex flex-col gap-6 text-lg">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-medium text-foreground/80 transition-colors hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-4">
                 <ThemeToggle />
                {user ? (
                  <>
                    <Button onClick={() => { router.push('/dashboard'); setIsMobileMenuOpen(false); }} variant="outline">Dashboard</Button>
                    <Button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}>Logout</Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="outline">
                      <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
