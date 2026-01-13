"use client";

import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { MapPin, CalendarDays, Users, Search } from 'lucide-react';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { OccupancyPicker } from './occupancy-picker';

export interface Occupancy {
    adults: number;
    children: number;
    rooms: number;
}

export function StaySearchForm() {
    const [city, setCity] = useState("India");
    const [dates, setDates] = useState<DateRange | undefined>({
        from: new Date(new Date().setDate(new Date().getDate() + 10)),
        to: new Date(new Date().setDate(new Date().getDate() + 14)),
    });
    const [occupancy, setOccupancy] = useState<Occupancy>({ adults: 2, children: 0, rooms: 1 });

    const fromDateFormatted = dates?.from ? format(dates.from, "eee, d MMM") : "";
    const toDateFormatted = dates?.to ? format(dates.to, "eee, d MMM") : "";

  return (
    <div className="space-y-6 px-4 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 rounded-lg border">
            {/* Location */}
            <div className="lg:col-span-4 p-4">
                <Label htmlFor="location" className="text-xs text-muted-foreground flex items-center gap-2"><MapPin className="h-4 w-4" /> Where</Label>
                <p className="text-xl font-bold">{city}</p>
                <p className="text-xs text-muted-foreground">Search for hotels in India</p>
            </div>

            {/* Dates */}
             <div className="lg:col-span-4 relative grid grid-cols-2 border-y lg:border-y-0 lg:border-x">
                <Popover>
                    <PopoverTrigger asChild>
                        <button className="p-4 text-left">
                            <Label className="text-xs text-muted-foreground flex items-center gap-2"><CalendarDays className="h-4 w-4" /> Check-in</Label>
                            <p className="text-lg font-bold">{fromDateFormatted}</p>
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar mode="range" selected={dates} onSelect={setDates} numberOfMonths={2} />
                    </PopoverContent>
                </Popover>

                <div className="p-4 text-left border-l">
                    <Label className="text-xs text-muted-foreground flex items-center gap-2"><CalendarDays className="h-4 w-4" /> Check-out</Label>
                    <p className="text-lg font-bold">{toDateFormatted}</p>
                </div>
            </div>

            {/* Travellers */}
             <div className="lg:col-span-4 relative">
                 <Popover>
                    <PopoverTrigger asChild>
                        <button className="p-4 text-left w-full">
                             <Label className="text-xs text-muted-foreground flex items-center gap-2"><Users className="h-4 w-4" /> Rooms & Guests</Label>
                            <p className="text-lg font-bold">{occupancy.rooms} Room, {occupancy.adults} Adults</p>
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-4">
                        <OccupancyPicker value={occupancy} onChange={setOccupancy} />
                    </PopoverContent>
                 </Popover>
            </div>
        </div>

       <div className="text-center">
            <Button size="lg" className="w-full md:w-64 h-14 text-2xl font-bold rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-shadow">
                <Search className="mr-3 h-6 w-6"/>
                SEARCH
            </Button>
        </div>
    </div>
  );
}
