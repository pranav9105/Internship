
"use client";

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <Button asChild className="w-full">
            <Link href="#packages">
                <PlusCircle className="mr-2 h-5 w-5" />
                Book a New Trip
            </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
