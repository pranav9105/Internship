'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { useAuth } from '@/firebase';
import { LayoutDashboard, Briefcase, Heart, MessageSquare, Repeat, Settings, LogOut, Ticket } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ExploreIcon } from '../icons/explore-icon';


const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/my-trips', label: 'My Trips', icon: Briefcase },
  { href: '/wishlist', label: 'Wishlist', icon: Heart },
  { href: '/bookings', label: 'Messages', icon: MessageSquare },
];

const mainLinks = [
  { href: '/transactions', label: 'Transaction', icon: Repeat },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname();
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/');
  };

  const isExploreActive = pathname.startsWith('/dashboard') || pathname.startsWith('/my-trips') || pathname.startsWith('/wishlist') || pathname.startsWith('/bookings');

  return (
    <aside className="w-64 flex-shrink-0 bg-gradient-to-b from-card to-background p-6 flex flex-col justify-between">
      <div>
        <div className="mb-10">
          <Logo />
        </div>
        <nav className="flex flex-col gap-2">
            <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
              <AccordionItem value="item-1" className="border-b-0">
                <AccordionTrigger
                  className={cn(
                    'w-full justify-start text-base h-12 px-4 py-2 rounded-md hover:no-underline',
                    isExploreActive 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <ExploreIcon className="mr-3 h-5 w-5" />
                  Explore
                </AccordionTrigger>
                <AccordionContent className="pt-2 flex flex-col gap-1 pl-4">
                  {navLinks.map((link) => (
                    <Button
                      key={link.href}
                      asChild
                      variant={pathname.startsWith(link.href) ? 'secondary' : 'ghost'}
                      className={cn(
                        'justify-start text-base h-12',
                        pathname.startsWith(link.href) ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      )}
                    >
                      <Link href={link.href}>
                        <link.icon className="mr-3 h-5 w-5" />
                        {link.label}
                      </Link>
                    </Button>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            {mainLinks.map((link) => (
                <Button
                key={link.href}
                asChild
                variant={pathname.startsWith(link.href) ? 'default' : 'ghost'}
                className={cn(
                    'justify-start text-base h-12',
                    pathname.startsWith(link.href) ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
                >
                <Link href={link.href}>
                    <link.icon className="mr-3 h-5 w-5" />
                    {link.label}
                </Link>
                </Button>
            ))}
        </nav>
      </div>

      <div className="flex flex-col gap-4">
         <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-4 text-center">
                <div className="mx-auto bg-primary/20 text-primary h-12 w-12 rounded-full flex items-center justify-center mb-2">
                    <Ticket className="h-6 w-6" />
                </div>
                <h4 className="font-bold">Get Discount!</h4>
                <p className="text-sm text-muted-foreground">on certain trips and don't miss it.</p>
            </CardContent>
         </Card>
        <Button variant="ghost" className="w-full justify-start text-base h-12 text-muted-foreground" onClick={handleLogout}>
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
