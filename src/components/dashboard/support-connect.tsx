
'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Mail, Twitter, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

export function SupportConnect() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Support &amp; Connect</CardTitle>
        <CardDescription>
          Get help and stay in touch with us.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button asChild variant="outline" className="w-full justify-start gap-3">
          <a href="tel:+918005557626">
            <Phone />
            <div className="text-left">
              <p className="font-semibold">24/7 Helpline</p>
              <p className="text-sm text-muted-foreground">+91-800-555-ROAM</p>
            </div>
          </a>
        </Button>
        <Button asChild variant="outline" className="w-full justify-start gap-3">
            <a href="mailto:support@roamready.com">
                <Mail />
                 <div className="text-left">
                    <p className="font-semibold">Email Support</p>
                    <p className="text-sm text-muted-foreground">support@roamready.com</p>
                </div>
            </a>
        </Button>
        
        <div className="pt-2">
            <p className="text-sm font-semibold mb-2 text-center text-muted-foreground">Follow Us</p>
            <div className="flex justify-center gap-4">
              <Button asChild variant="ghost" size="icon">
                <Link href="#" prefetch={false}>
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon">
                <Link href="#" prefetch={false}>
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon">
                <Link href="#" prefetch={false}>
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
