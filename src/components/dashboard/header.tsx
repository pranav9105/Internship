
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useAuth } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Search, Bell, LogOut, Briefcase, Heart, Settings, Building, Star, MapPin, CheckCircle, Plane, CreditCard, Gift, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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
import Link from 'next/link';

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
      description: 'Get 20% off your next trip to Kerala.',
      time: '1 day ago',
    },
    {
      icon: <CreditCard className="h-6 w-6 text-red-500" />,
      title: 'Payment Failed',
      description: 'Your payment for the Manali package failed.',
      time: '2 days ago',
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-purple-500" />,
      title: 'New Message',
      description: 'You have a new message from support.',
      time: '4 days ago',
    },
];

export function DashboardHeader() {
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/');
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const navigateTo = (path: string) => {
    router.push(path);
    setOpen(false);
  }

  return (
    <header className="flex justify-between items-center">
      <div className="flex-grow max-w-xl">
        <Button
            variant="outline"
            className="relative w-full h-12 justify-start pl-10 pr-4 text-muted-foreground bg-card border-0"
            onClick={() => setOpen(true)}
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" />
            <span className="flex-grow text-left">Search for your favourite destination</span>
            <kbd className="hidden lg:inline-flex pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
        </Button>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
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


      <div className="flex items-center gap-6 ml-6">
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
                    <CardContent className="p-0">
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

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer">
                    <Avatar className="h-12 w-12">
                        {user?.photoURL ? (
                            <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} />
                        ) : (
                            <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
                        )}
                    </Avatar>
                    <div>
                        <p className="font-bold text-white">{user?.displayName}</p>
                        <p className="text-sm text-muted-foreground">Traveler Pro</p>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </header>
  );
}
