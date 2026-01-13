"use client";

import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { BedDouble, Calendar as CalendarIcon, Search, User2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { OccupancyPicker } from './occupancy-picker';

export interface Occupancy {
    adults: number;
    children: number;
    rooms: number;
}

export function StaySearchForm() {
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState<DateRange | undefined>();
  const [occupancy, setOccupancy] = useState<Occupancy>({ adults: 2, children: 0, rooms: 1 });

  return (
    <div className="bg-amber-400 p-2 rounded-lg grid grid-cols-10 gap-px">
      <div className="bg-background rounded-l-md col-span-10 md:col-span-3 flex items-center p-2">
        <BedDouble className="h-6 w-6 text-muted-foreground mr-2 flex-shrink-0" />
        <Input
          type="text"
          placeholder="Where are you going?"
          className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <button className={cn(
            "bg-background col-span-10 md:col-span-3 flex items-center text-left p-2 text-base",
            !date && "text-muted-foreground"
          )}>
            <CalendarIcon className="h-6 w-6 text-muted-foreground mr-2 flex-shrink-0" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} – {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Check-in date – Check-out date</span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      <Popover>
          <PopoverTrigger asChild>
              <button className="bg-background col-span-10 md:col-span-3 flex items-center text-left p-2 text-base text-muted-foreground">
                  <User2 className="h-6 w-6 text-muted-foreground mr-2 flex-shrink-0" />
                  <span className="text-foreground">{occupancy.adults} adults</span> · {occupancy.children} children · {occupancy.rooms} room
              </button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
              <OccupancyPicker value={occupancy} onChange={setOccupancy} />
          </PopoverContent>
      </Popover>

      <Button className="col-span-10 md:col-span-1 rounded-r-md text-lg h-auto">
        <Search className="h-6 w-6" />
        <span className="hidden md:inline ml-2">Search</span>
      </Button>
    </div>
  );
}
