
"use client";

import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarOff } from 'lucide-react';

interface ScheduleDetailsProps {
  selectedDate?: Date;
}

export function ScheduleDetails({ selectedDate }: ScheduleDetailsProps) {
  const formattedDate = selectedDate ? format(selectedDate, "MMMM do, yyyy") : 'a date';

  const hasEvents = false; // Placeholder

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule for {formattedDate}</CardTitle>
      </CardHeader>
      <CardContent>
        {hasEvents ? (
          <div>
            {/* List of events will go here */}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
            <CalendarOff className="h-12 w-12 mb-4" />
            <p className="font-semibold">No trips scheduled</p>
            <p className="text-sm">There are no trips or bookings on this day.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
