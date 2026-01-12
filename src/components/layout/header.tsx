
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X, LogOut, LayoutDashboard, Settings, User as UserIcon, LifeBuoy, MessageSquareQuote, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/logo';
import { useAuth, useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { ThemeToggle, ThemeSubMenu } from '../theme-toggle';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const navLinks = [
  { href: '#destinations', label: 'Destinations' },
  { href: '#packages', label: 'Deals' },
  { href: '#gallery', label: 'Inspiration' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
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

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
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
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Button key={link.href} asChild variant="link" className="text-foreground/80">
               <Link
                href={link.href}
                className="group font-medium transition-colors hover:text-primary"
              >
                {link.label}
                 <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-primary"></span>
              </Link>
            </Button>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          {!isUserLoading && (
            user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border-2 border-primary/50">
                      {user.photoURL ? (
                        <AvatarImage src={user.photoURL} alt={user.displayName || 'User'}/>
                      ) : (
                        <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                      )}
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex items-center gap-3">
                       <Avatar className="h-10 w-10">
                         {user.photoURL ? (
                            <AvatarImage src={user.photoURL} alt={user.displayName || 'User'}/>
                          ) : (
                            <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                          )}
                      </Avatar>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.displayName || 'Traveler'}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Palette className="mr-2 h-4 w-4" />
                      <span>Theme</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <ThemeSubMenu />
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  
                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={() => router.push('/help')}>
                    <LifeBuoy className="mr-2 h-4 w-4" />
                    <span>Help & Support</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/feedback')}>
                    <MessageSquareQuote className="mr-2 h-4 w-4" />
                    <span>Feedback</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )
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
                 {!isUserLoading && (
                    user ? (
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
                    )
                 )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
