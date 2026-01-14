import { Twitter, Instagram, Facebook, Linkedin, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '../logo';

export function Footer() {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start md:col-span-2">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Crafting unforgettable journeys and authentic travel experiences worldwide.
            </p>
             <div className="flex items-center gap-4 mt-6">
              <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
           <div className="flex flex-col items-center md:items-start">
            <h3 className="font-headline text-lg font-semibold">Quick Links</h3>
            <div className="mt-4 space-y-2">
               <Link href="/#about" className="text-muted-foreground hover:text-primary">
                About Us
              </Link>
              <br />
               <Link href="/#contact" className="text-muted-foreground hover:text-primary">
                Contact
              </Link>
              <br />
               <Link href="/deals" className="text-muted-foreground hover:text-primary">
                Deals
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-headline text-lg font-semibold">Contact Us</h3>
            <div className="mt-4 space-y-2">
              <a href="mailto:support@roamready.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                <Mail className="h-4 w-4" />
                <span>support@roamready.com</span>
              </a>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+91-800-555-ROAM</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} RoamReady. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
