"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Hotel, Home, Briefcase, Car, Sailboat, Anchor, Banknote, ShieldCheck } from 'lucide-react';
import { StaySearchForm } from './stay-search-form';
import { TrainIcon } from '../icons/train-icon';
import { BusIcon } from '../icons/bus-icon';
import { cn } from '@/lib/utils';

const searchTabs = [
  { value: 'hotels', label: 'Hotels', icon: Hotel },
  { value: 'villas', label: 'Villas & Homestays', icon: Home },
  { value: 'holiday', label: 'Holiday Packages', icon: Briefcase },
  { value: 'trains', label: 'Trains', icon: TrainIcon },
  { value: 'buses', label: 'Buses', icon: BusIcon },
  { value: 'cabs', label: 'Cabs', icon: Car },
  { value: 'tours', label: 'Tours & Attractions', icon: Sailboat, isNew: true },
  { value: 'visa', label: 'Visa', icon: Anchor },
  { value: 'cruise', label: 'Cruise', icon: Anchor, isNew: true },
  { value: 'forex', label: 'Forex Card & Currency', icon: Banknote },
  { value: 'insurance', label: 'Travel Insurance', icon: ShieldCheck },
];

export function SearchWidget() {
  const [activeTab, setActiveTab] = useState('hotels');
  return (
    <Card className="w-full max-w-6xl mx-auto shadow-2xl rounded-xl bg-background/80 backdrop-blur-sm">
      <CardContent className="p-2">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 md:grid-cols-11 h-auto bg-transparent p-0 gap-x-1">
            {searchTabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  "flex-col h-auto p-2 text-xs font-medium text-foreground/70 data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none",
                  activeTab === tab.value ? "text-primary" : ""
                )}
              >
                <div className="relative">
                  <tab.icon className={cn("h-6 w-6 mb-1 transition-colors", activeTab === tab.value ? 'text-primary' : 'text-foreground/60')} />
                  {tab.isNew && <span className="absolute top-0 right-0 -mt-1 -mr-2 bg-red-500 text-white text-[8px] px-1 rounded-full">NEW</span>}
                </div>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="hotels" className="mt-4">
            <StaySearchForm />
          </TabsContent>
          {searchTabs.filter(t => t.value !== 'hotels').map(tab => (
             <TabsContent key={tab.value} value={tab.value}>
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
