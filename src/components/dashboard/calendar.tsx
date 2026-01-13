
"use client";

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';

export function DashboardCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Card className="bg-card">
      <CardContent className="p-2">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="p-0"
        />
      </CardContent>
    </Card>
  );
}
