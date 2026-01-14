
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { useAuth } from '@/firebase';
import { LayoutDashboard, Briefcase, Heart, Repeat, Settings, LogOut, Ticket, Award } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/my-trips', label: 'My Trips', icon: Briefcase },
  { href: '/wishlist', label: 'Wishlist', icon: Heart },
  { href: '/bookings', label: 'Bookings', icon: Ticket },
  { href: '/rewards', label: 'Rewards', icon: Award },
  { href: '/transactions', label: 'Transactions', icon: Repeat },
  { href: '/settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  onLinkClick?: () => void;
}

export function Sidebar({ onLinkClick }: SidebarProps) {
  const pathname = usePathname();
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/');
    onLinkClick?.();
  };
  
  const handleLinkClick = () => {
    onLinkClick?.();
  };

  return (
    <aside className="h-full bg-gradient-to-b from-card to-background p-6 flex flex-col justify-between">
      <div>
        <div className="mb-10">
          <Logo />
        </div>
        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              asChild
              variant={pathname.startsWith(link.href) ? 'secondary' : 'ghost'}
              className={cn(
                'justify-start text-base h-12',
                pathname.startsWith(link.href) ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
              onClick={handleLinkClick}
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
