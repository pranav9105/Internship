
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
        <CardDescription>Select a date to see your itinerary.</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onDateChange}
          className="p-0"
        />
      </CardContent>
    </Card>
  );
}
