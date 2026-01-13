"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Hotel, Plane, Car, Sailboat } from 'lucide-react';
import { StaySearchForm } from './stay-search-form';
import { cn } from '@/lib/utils';

const searchTabs = [
  { value: 'stays', label: 'Stays', icon: Hotel },
  { value: 'flights', label: 'Flights', icon: Plane },
  { value: 'cars', label: 'Cars', icon: Car },
  { value: 'tours', label: 'Tours', icon: Sailboat },
];

export function SearchWidget() {
  const [activeTab, setActiveTab] = useState('stays');
  return (
    <Card className="w-full max-w-5xl mx-auto shadow-2xl rounded-xl bg-white/20 backdrop-blur-lg border-white/30">
      <CardContent className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-transparent p-0 h-auto mb-4">
            {searchTabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  "flex-row items-center gap-2 h-auto p-3 text-sm font-semibold text-white/80 data-[state=active]:text-white data-[state=active]:bg-white/20 data-[state=active]:shadow-none rounded-lg",
                  activeTab === tab.value ? "bg-white/20 text-white" : ""
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
                <div className="text-center p-16 text-white/80">
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
