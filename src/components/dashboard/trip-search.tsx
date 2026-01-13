
"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Search } from "lucide-react"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function TripSearch() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 7)),
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Plan Your Next Trip</CardTitle>
        <CardDescription>Find the perfect destination and dates for your adventure.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div className="space-y-2 md:col-span-1">
                <Label htmlFor="location">Where to?</Label>
                <Input id="location" placeholder="e.g. Paris, France" />
            </div>
            <div className="space-y-2 md:col-span-1">
                 <Label htmlFor="dates">When?</Label>
                <Popover>
                    <PopoverTrigger asChild>
                    <Button
                        id="dates"
                        variant={"outline"}
                        className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                        date.to ? (
                            <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                            </>
                        ) : (
                            format(date.from, "LLL dd, y")
                        )
                        ) : (
                        <span>Pick a date</span>
                        )}
                    </Button>
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
            </div>
            <div className="md:col-span-1">
                <Button className="w-full">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                </Button>
            </div>
        </div>
      </CardContent>
    </Card>
  )
}
