
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useAuth } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Search, Bell, LogOut, Briefcase, Heart, Settings, Building, Star, MapPin } from 'lucide-react';
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

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Jammu and Kashmir"
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
        <div className="relative">
            <Bell className="h-6 w-6 text-muted-foreground" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
        </div>

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
