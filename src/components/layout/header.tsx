
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, Search, Globe, ChevronDown, LogOut, Briefcase, Heart, Settings, Building, Star, MapPin, CheckCircle, Plane, CreditCard, Gift, MessageSquare, Ticket, Award, User as UserIcon, Bell, Repeat, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUser, useAuth } from '@/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ThemeToggle } from '../theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { DialogTitle } from '../ui/dialog';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/card';
import { Sidebar } from './sidebar';


const navLinks = [
  { href: '/deals', label: 'Destinations' },
  { href: '/help', label: 'Blog' },
  { href: '/feedback', label: 'Contact' },
];

const dashboardLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/my-trips', label: 'My Trips', icon: Briefcase },
    { href: '/bookings', label: 'Bookings', icon: Ticket },
    { href: '/transactions', label: 'Transactions', icon: Repeat },
    { href: '/rewards', label: 'Rewards', icon: Award },
    { href: '/settings', label: 'Settings', icon: Settings },
];

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Jammu and Kashmir"
];

const notifications = [
    {
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      title: 'Booking Confirmed: Goa',
      description: 'Your beach getaway is set! Pack your bags.',
      time: '2 hours ago',
    },
    {
      icon: <Plane className="h-6 w-6 text-blue-500" />,
      title: 'Flight Reminder',
      description: 'Flight 6E 245 to Delhi departs in 3 hours.',
      time: '3 hours ago',
    },
     {
      icon: <Gift className="h-6 w-6 text-accent" />,
      title: 'Special Offer Unlocked!',
      description: 'Get 20% off on your next trip to Kerala.',
      time: '1 day ago',
    },
];


export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const auth = useAuth();


  const isHomePage = pathname === '/';
  const isDashboardPage = [
    '/dashboard',
    '/my-trips',
    '/wishlist',
    '/bookings',
    '/transactions',
    '/settings',
    '/schedule',
    '/rewards',
  ].some((path) => pathname.startsWith(path));


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    if (isHomePage && !isDashboardPage) {
      handleScroll(); // Check on mount
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setIsScrolled(true);
    }
  }, [isHomePage, isDashboardPage]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);
  
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsSearchOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/');
  };

  const navigateTo = (path: string) => {
    router.push(path);
    setIsSearchOpen(false);
  }

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const headerTextColor = (isHomePage && !isScrolled && !isDashboardPage) ? 'text-white' : 'text-foreground';

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-sm shadow-sm'
          : (isHomePage && !isDashboardPage) ? 'bg-black/20' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            {isDashboardPage && (
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className={cn("md:hidden", headerTextColor)}>
                    <Menu />
                    <span className="sr-only">Open Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-72">
                  <Sidebar onLinkClick={() => setIsMenuOpen(false)} />
                </SheetContent>
              </Sheet>
            )}
            <Logo />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                    "font-medium  transition-colors hover:text-primary",
                    headerTextColor
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
             <Button variant="ghost" size="icon" className={headerTextColor} onClick={() => setIsSearchOpen(true)}>
                <Search />
            </Button>
             <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                <DialogTitle className="sr-only">Search Destinations</DialogTitle>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                    <CommandItem onSelect={() => navigateTo('/my-trips')}>
                    <Briefcase className="mr-2 h-4 w-4" />
                    <span>My Trips</span>
                    </CommandItem>
                    <CommandItem onSelect={() => navigateTo('/wishlist')}>
                    <Heart className="mr-2 h-4 w-4" />
                    <span>Wishlist</span>
                    </CommandItem>
                    <CommandItem onSelect={() => navigateTo('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                    </CommandItem>
                </CommandGroup>
                <CommandGroup heading="Popular Destinations">
                    <CommandItem onSelect={() => navigateTo('/deals')}>
                    <Building className="mr-2 h-4 w-4" />
                    <span>Goa</span>
                    </CommandItem>
                    <CommandItem onSelect={() => navigateTo('/deals')}>
                    <Building className="mr-2 h-4 w-4" />
                    <span>Jaipur</span>
                    </CommandItem>
                    <CommandItem onSelect={() => navigateTo('/deals')}>
                        <Star className="mr-2 h-4 w-4" />
                        <span>Special Offers</span>
                    </CommandItem>
                </CommandGroup>
                <CommandGroup heading="States">
                    {indianStates.map(state => (
                    <CommandItem key={state} onSelect={() => navigateTo('/deals')}>
                        <MapPin className="mr-2 h-4 w-4" />
                        <span>{state}</span>
                    </CommandItem>
                    ))}
                </CommandGroup>
                </CommandList>
            </CommandDialog>

            <ThemeToggle />
            
            {user && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-6 w-6" />
                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-96 p-0">
                        <Card className="border-0">
                            <CardHeader className="p-4">
                                <h3 className="font-bold text-lg">Notifications</h3>
                            </CardHeader>
                            <CardContent className="p-0 max-h-96 overflow-y-auto">
                            <div className="flex flex-col">
                                    {notifications.map((notification, index) => (
                                        <Link href="#" key={index} className="flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors border-t">
                                            <div className="flex-shrink-0 mt-1">{notification.icon}</div>
                                            <div className="flex-grow">
                                                <p className="font-semibold">{notification.title}</p>
                                                <p className="text-sm text-muted-foreground">{notification.description}</p>
                                                <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                            </CardContent>
                            <CardFooter className="p-2 border-t">
                                <Button variant="link" className="w-full">
                                    View All Notifications
                                </Button>
                            </CardFooter>
                        </Card>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}


            {user ? (
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-2">
                            <Avatar className="h-9 w-9">
                                {user.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || ''} />}
                                <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                            </Avatar>
                            <span className={cn("hidden lg:inline font-semibold", headerTextColor)}>
                                Hello, {user.displayName?.split(' ')[0]}
                            </span>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {dashboardLinks.map((link) => (
                          <DropdownMenuItem key={link.href} asChild>
                            <Link href={link.href}>
                              <link.icon className="mr-2 h-4 w-4" />
                              {link.label}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <div className="hidden md:flex items-center gap-4">
                    <Button asChild variant="ghost" className={headerTextColor}>
                        <Link href="/login">Sign In</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/signup">Sign Up</Link>
                    </Button>
                </div>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            {!isDashboardPage && (
                 <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className={cn(headerTextColor, isDashboardPage && "hidden")}>
                        {isMenuOpen ? <X /> : <Menu />}
                        <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <div className="p-6 pt-12">
                             <Logo />
                        </div>
                        <div className="mt-8 flex flex-col gap-4 px-6">
                        {navLinks.map((link) => (
                            <Link
                            key={link.href}
                            href={link.href}
                            className="font-medium text-lg text-foreground hover:text-primary transition-colors"
                            >
                            {link.label}
                            </Link>
                        ))}
                        <div className="border-t pt-4 flex flex-col gap-4 mt-4">
                                {user ? (
                                    <Button asChild className="w-full">
                                        <Link href="/dashboard">Dashboard</Link>
                                    </Button>
                                ) : (
                                    <>
                                        <Button asChild variant="outline" className="w-full">
                                            <Link href="/login">Sign In</Link>
                                        </Button>
                                        <Button asChild className="w-full">
                                            <Link href="/signup">Sign Up</Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
