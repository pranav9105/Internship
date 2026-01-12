
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Calendar, Hotel, Briefcase, Heart } from 'lucide-react';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/schedule', label: 'Schedule', icon: Calendar },
  { href: '/my-trips', label: 'My Trips', icon: Briefcase },
  { href: '/wishlist', label: 'Wishlist', icon: Heart },
  { href: '/bookings', label: 'Bookings', icon: Hotel },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r bg-background md:flex">
      <div className="flex h-20 items-center justify-center border-b px-6">
        <Logo />
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {navLinks.map((link) => (
          <Button
            key={link.href}
            asChild
            variant={pathname.startsWith(link.href) ? 'secondary' : 'ghost'}
            className="w-full justify-start"
          >
            <Link href={link.href}>
              <link.icon className="mr-3 h-5 w-5" />
              {link.label}
            </Link>
          </Button>
        ))}
      </nav>
    </aside>
  );
}
