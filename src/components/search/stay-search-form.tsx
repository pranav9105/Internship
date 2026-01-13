
"use client";

import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { MapPin, CalendarDays, Users, Search } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { OccupancyPicker } from './occupancy-picker';
import { Input } from '../ui/input';
import { format } from 'date-fns';

export interface Occupancy {
    adults: number;
    children: number;
    rooms: number;
}

export function StaySearchForm() {
    const [destination, setDestination] = useState("Bangalore");
    const [dates, setDates] = useState<DateRange | undefined>({
        from: new Date(new Date().setDate(new Date().getDate() + 10)),
        to: new Date(new Date().setDate(new Date().getDate() + 14)),
    });
    const [occupancy, setOccupancy] = useState<Occupancy>({ adults: 2, children: 0, rooms: 1 });

    const fromDateFormatted = dates?.from ? format(dates.from, "d MMM, yyyy") : "";
    const toDateFormatted = dates?.to ? format(dates.to, "d MMM, yyyy") : "";

  return (
    <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0.5">
            {/* Location */}
            <div className="lg:col-span-4 p-4 bg-white/10 rounded-l-lg text-white">
                <Label htmlFor="location" className="text-xs font-light flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Where are you going?</Label>
                <Input 
                    id="location" 
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="text-lg font-bold bg-transparent border-0 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
                />
            </div>
            
            {/* Dates */}
            <Popover>
                <PopoverTrigger asChild>
                    <button className="lg:col-span-3 p-4 bg-white/10 text-white text-left">
                        <Label className="text-xs font-light flex items-center gap-1.5"><CalendarDays className="h-4 w-4" /> Check-in</Label>
                        <p className="text-lg font-bold">{fromDateFormatted}</p>
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="range" selected={dates} onSelect={setDates} numberOfMonths={2} />
                </PopoverContent>
            </Popover>

            <Popover>
                <PopoverTrigger asChild>
                    <button className="lg:col-span-2 p-4 bg-white/10 text-white text-left">
                        <Label className="text-xs font-light flex items-center gap-1.5"><CalendarDays className="h-4 w-4" /> Check-out</Label>
                        <p className="text-lg font-bold">{toDateFormatted}</p>
                    </button>
                </PopoverTrigger>
                 <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="range" selected={dates} onSelect={setDates} numberOfMonths={2} />
                </PopoverContent>
            </Popover>

            {/* Guests */}
             <Popover>
                <PopoverTrigger asChild>
                    <button className="lg:col-span-3 p-4 bg-white/10 text-white text-left rounded-r-lg">
                         <Label className="text-xs font-light flex items-center gap-1.5"><Users className="h-4 w-4" /> Guests</Label>
                        <p className="text-lg font-bold">{occupancy.adults} Adults, {occupancy.children} Children</p>
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4">
                    <OccupancyPicker value={occupancy} onChange={setOccupancy} />
                </PopoverContent>
             </Popover>
        </div>

       <div className="text-center pt-4">
            <Button size="lg" className="w-full md:w-auto px-16 h-14 text-xl font-bold rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <Search className="mr-3 h-5 w-5"/>
                SEARCH
            </Button>
        </div>
    </div>
  );
}
