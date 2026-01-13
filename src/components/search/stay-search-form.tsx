
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
import { cn } from '@/lib/utils';

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

    const dateDisplay = dates?.from ? (
        dates.to ? (
            `${format(dates.from, "d MMM")} - ${format(dates.to, "d MMM, yyyy")}`
        ) : (
            format(dates.from, "d MMM, yyyy")
        )
    ) : "Select your dates";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0.5 bg-white/10 rounded-lg p-2 text-white">
        {/* Location */}
        <div className="lg:col-span-4 p-3 flex items-center gap-3">
            <MapPin className="h-6 w-6 text-white/80" />
            <div className="flex-grow">
                <Label htmlFor="location" className="text-xs font-light">Where are you going?</Label>
                <Input 
                    id="location" 
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="text-lg font-bold bg-transparent border-0 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-white/50"
                    placeholder="Search destinations"
                />
            </div>
        </div>
        
        {/* Dates */}
        <Popover>
            <PopoverTrigger asChild>
                <button className="lg:col-span-3 p-3 flex items-center gap-3 text-left w-full">
                     <CalendarDays className="h-6 w-6 text-white/80" />
                     <div className="flex-grow">
                        <Label className="text-xs font-light">Dates</Label>
                        <p className="text-lg font-bold whitespace-nowrap">{dateDisplay}</p>
                     </div>
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="range" selected={dates} onSelect={setDates} numberOfMonths={2} />
            </PopoverContent>
        </Popover>

        {/* Guests */}
         <Popover>
            <PopoverTrigger asChild>
                <button className="lg:col-span-3 p-3 flex items-center gap-3 text-left w-full">
                    <Users className="h-6 w-6 text-white/80" />
                     <div className="flex-grow">
                        <Label className="text-xs font-light">Guests</Label>
                        <p className="text-lg font-bold">{occupancy.adults} Adults, {occupancy.children} Children</p>
                     </div>
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
                <OccupancyPicker value={occupancy} onChange={setOccupancy} />
            </PopoverContent>
         </Popover>

         {/* Search Button */}
         <div className="lg:col-span-2 p-2">
            <Button size="lg" className="w-full h-full text-lg font-bold rounded-md shadow-lg hover:shadow-xl transition-shadow">
                <Search className="mr-2 h-5 w-5"/>
                Search
            </Button>
         </div>
    </div>
  );
}
