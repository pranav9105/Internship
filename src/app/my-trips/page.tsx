
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';

export default function MyTripsPage() {
  return (
    <div className="flex min-h-screen bg-muted/40 w-full">
      <Sidebar />
      <div className="flex flex-col flex-grow md:pl-64">
        <Header />
        <main className="flex-grow pt-24 pb-8">
          <div className="container mx-auto px-4 md:px-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase />
                  My Trips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>This page will display your upcoming and past trips. Content coming soon!</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
