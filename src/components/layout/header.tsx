
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X, LogOut, LayoutDashboard, Settings, User as UserIcon, LifeBuoy, MessageSquareQuote, Palette, Calendar, Landmark, Package, Briefcase, Heart, Hotel } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/logo';
import { useAuth, useUser } from '@/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { ThemeToggle, ThemeSubMenu } from '../theme-toggle';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '../ui/separator';

const homeNavLinks = [
  { href: '/#destinations', label: 'Destinations', icon: Landmark },
  { href: '/deals', label: 'Deals', icon: Package },
  { href: '/#gallery', label: 'Inspiration', icon: Palette },
  { href: '/#contact', label: 'Contact', icon: MessageSquareQuote },
];

const appNavLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/schedule', label: 'Schedule', icon: Calendar },
  { href: '/my-trips', label: 'My Trips', icon: Briefcase },
  { href: '/wishlist', label: 'Wishlist', icon: Heart },
  { href: '/bookings', label: 'Bookings', icon: Hotel },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isAppPage = appNavLinks.some(link => pathname.startsWith(link.href));
  const isHomePage = pathname === '/';

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

  const NavLinks = isAppPage ? appNavLinks : homeNavLinks;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        scrolled || !isHomePage ? 'bg-background/80 shadow-md backdrop-blur-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
            {isAppPage && (
                 <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full max-w-xs p-0 flex flex-col">
                         <div className="flex h-20 items-center justify-between border-b px-6">
                            <Logo />
                         </div>
                         <nav className="flex-1 space-y-2 p-4">
                            {NavLinks.map((link) => (
                                <Button
                                key={link.href}
                                asChild
                                variant={pathname.startsWith(link.href) ? 'secondary' : 'ghost'}
                                className="w-full justify-start text-base"
                                onClick={() => setIsMobileMenuOpen(false)}
                                >
                                <Link href={link.href}>
                                    <link.icon className="mr-3 h-5 w-5" />
                                    {link.label}
                                </Link>
                                </Button>
                            ))}
                         </nav>
                         <div className="mt-auto border-t p-4 space-y-2">
                             <Button variant="ghost" className="w-full justify-start text-base" onClick={() => { router.push('/dashboard'); setIsMobileMenuOpen(false); }}>
                                 <Settings className="mr-3 h-5 w-5" />
                                 Settings
                             </Button>
                             <Button variant="ghost" className="w-full justify-start text-base" onClick={handleLogout}>
                                 <LogOut className="mr-3 h-5 w-5" />
                                 Logout
                             </Button>
                         </div>
                    </SheetContent>
                </Sheet>
            )}
            <Logo />
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {!isAppPage && homeNavLinks.map((link) => (
            <Button key={link.href} asChild variant="link" className={cn("text-lg", isHomePage && !scrolled ? "text-white" : "text-foreground/80")}>
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
        <div className="flex items-center gap-2">
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

                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
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
                          <DropdownMenuItem onClick={() => router.push('/help')}>
                            <LifeBuoy className="mr-2 h-4 w-4" />
                            <span>Help & Support</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => router.push('/feedback')}>
                            <MessageSquareQuote className="mr-2 h-4 w-4" />
                            <span>Feedback</span>
                          </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>

                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant={isHomePage && !scrolled ? "secondary" : "ghost"}>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )
          )}
        </div>
      </div>
    </header>
  );
}
