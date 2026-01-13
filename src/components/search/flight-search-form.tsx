"use client";

import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowRightLeft } from 'lucide-react';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';

export function FlightSearchForm() {
    const [tripType, setTripType] = useState("oneWay");
    const [from, setFrom] = useState({ city: "Delhi", airport: "DEL, Delhi Airport India" });
    const [to, setTo] = useState({ city: "Bengaluru", airport: "BLR, Bengaluru International Airport" });
    const [departureDate, setDepartureDate] = useState<Date | undefined>(new Date('2026-01-14'));
    const [returnDate, setReturnDate] = useState<Date | undefined>();

    const handleSwap = () => {
        const temp = from;
        setFrom(to);
        setTo(temp);
    };

  return (
    <div className="space-y-6 px-4 pb-4">
      <RadioGroup value={tripType} onValueChange={setTripType} className="flex space-x-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="oneWay" id="oneWay" />
          <Label htmlFor="oneWay">One Way</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="roundTrip" id="roundTrip" />
          <Label htmlFor="roundTrip">Round Trip</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="multiCity" id="multiCity" />
          <Label htmlFor="multiCity">Multi City</Label>
        </div>
      </RadioGroup>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            {/* From/To */}
            <div className="md:col-span-5 relative grid grid-cols-2 rounded-lg border">
                {/* From */}
                <div className="p-4">
                    <Label htmlFor="from" className="text-xs text-muted-foreground">From</Label>
                    <p className="text-3xl font-bold">{from.city}</p>
                    <p className="text-xs text-muted-foreground">{from.airport}</p>
                </div>
                {/* Swap */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <Button variant="outline" size="icon" className="rounded-full bg-background z-10" onClick={handleSwap}>
                        <ArrowRightLeft className="h-4 w-4" />
                    </Button>
                </div>
                {/* To */}
                <div className="p-4 border-l">
                    <Label htmlFor="to" className="text-xs text-muted-foreground">To</Label>
                    <p className="text-3xl font-bold">{to.city}</p>
                    <p className="text-xs text-muted-foreground">{to.airport}</p>
                </div>
            </div>

            {/* Dates */}
             <div className="md:col-span-4 relative grid grid-cols-2 rounded-lg border">
                <Popover>
                    <PopoverTrigger asChild>
                        <button className="p-4 text-left">
                            <Label className="text-xs text-muted-foreground flex items-center">Departure</Label>
                            <p className="text-3xl font-bold">{departureDate ? format(departureDate, "dd") : ""}<span className="text-xl font-normal ml-1">{departureDate ? format(departureDate, "MMM'yy") : ""}</span></p>
                            <p className="text-xs text-muted-foreground">{departureDate ? format(departureDate, "EEEE") : ""}</p>
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={departureDate} onSelect={setDepartureDate} initialFocus />
                    </PopoverContent>
                </Popover>

                 <Popover>
                    <PopoverTrigger asChild disabled={tripType === 'oneWay'}>
                        <button className="p-4 text-left border-l" disabled={tripType === 'oneWay'}>
                           <Label className="text-xs text-muted-foreground flex items-center">Return</Label>
                           {tripType !== 'oneWay' && returnDate ? (
                                <>
                                    <p className="text-3xl font-bold">{format(returnDate, "dd")}<span className="text-xl font-normal ml-1">{format(returnDate, "MMM'yy")}</span></p>
                                    <p className="text-xs text-muted-foreground">{format(returnDate, "EEEE")}</p>
                                </>
                           ) : (
                               <p className="text-sm text-muted-foreground">Tap to add a return date</p>
                           )}
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={returnDate} onSelect={setReturnDate} initialFocus disabled={{ before: departureDate }} />
                    </PopoverContent>
                </Popover>
            </div>

            {/* Travellers */}
             <div className="md:col-span-3 relative rounded-lg border">
                 <Popover>
                    <PopoverTrigger asChild>
                        <button className="p-4 text-left w-full">
                             <Label className="text-xs text-muted-foreground">Travellers & Class</Label>
                            <p className="text-3xl font-bold">1<span className="text-xl font-normal ml-1">Traveller</span></p>
                            <p className="text-xs text-muted-foreground">Economy/Premium Economy</p>
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-4">
                        <p>Traveller selection UI goes here.</p>
                    </PopoverContent>
                 </Popover>
            </div>
        </div>

      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium text-muted-foreground">Special Fares:</p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="bg-blue-100/50 border-blue-300 text-primary">Regular</Button>
            <Button variant="outline" size="sm">Student</Button>
            <Button variant="outline" size="sm">Armed Forces</Button>
            <Button variant="outline" size="sm">Senior Citizen</Button>
          </div>
        </div>
      </div>
       <div className="text-center">
            <Button size="lg" className="w-full md:w-64 h-14 text-2xl font-bold rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-shadow">
                SEARCH
            </Button>
        </div>
    </div>
  );
}
