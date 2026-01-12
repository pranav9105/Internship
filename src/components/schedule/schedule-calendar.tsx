
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';

interface ScheduleCalendarProps {
  selectedDate?: Date;
  onDateChange: (date?: Date) => void;
}

export function ScheduleCalendar({ selectedDate, onDateChange }: ScheduleCalendarProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Full Trip Schedule</CardTitle>
        <CardDescription>Select a date to see the schedule.</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onDateChange}
          className="p-0"
          classNames={{
            day_selected: "bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary/90",
            day_today: "bg-accent text-accent-foreground",
          }}
        />
      </CardContent>
    </Card>
  );
}
