
"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Hotel, Plane, Sailboat } from 'lucide-react';
import { StaySearchForm } from './stay-search-form';
import { cn } from '@/lib/utils';
import { TrainIcon } from '../icons/train-icon';
import { BusIcon } from '../icons/bus-icon';

const searchTabs = [
  { value: 'stays', label: 'Stays', icon: Hotel },
  { value: 'flights', label: 'Flights', icon: Plane },
  { value: 'trains', label: 'Trains', icon: TrainIcon },
  { value: 'bus', label: 'Bus', icon: BusIcon },
  { value: 'tours', label: 'Tours', icon: Sailboat },
];

export function SearchWidget() {
  const [activeTab, setActiveTab] = useState('stays');
  return (
    <Card className="w-full max-w-5xl mx-auto shadow-2xl rounded-2xl bg-card/80 backdrop-blur-lg border-white/20">
      <CardContent className="p-4 sm:p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-muted/50 p-1 h-auto mb-6 rounded-lg">
            {searchTabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  "flex-1 flex-row items-center gap-2 h-auto p-2 text-sm font-semibold text-muted-foreground data-[state=active]:text-foreground data-[state=active]:bg-card data-[state=active]:shadow-md rounded-md"
                )}
              >
                <tab.icon className="h-5 w-5" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="stays" className="mt-0">
            <StaySearchForm />
          </TabsContent>
          {searchTabs.filter(t => t.value !== 'stays').map(tab => (
             <TabsContent key={tab.value} value={tab.value} className="mt-0">
                <div className="text-center p-16 text-muted-foreground">
                    <tab.icon className="mx-auto h-12 w-12 mb-4" />
                    <h2 className="text-xl font-bold">Search for {tab.label}</h2>
                    <p>This feature is not yet available.</p>
                </div>
             </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
