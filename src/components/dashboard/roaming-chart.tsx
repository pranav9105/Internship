"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Map } from "lucide-react"

const chartData = [
  { continent: "Asia", trips: 5, fill: "var(--color-asia)" },
  { continent: "Europe", trips: 8, fill: "var(--color-europe)" },
  { continent: "N. America", trips: 3, fill: "var(--color-namerica)" },
  { continent: "S. America", trips: 2, fill: "var(--color-samerica)" },
  { continent: "Africa", trips: 1, fill: "var(--color-africa)" },
  { continent: "Oceania", trips: 4, fill: "var(--color-oceania)" },
]

const chartConfig = {
  trips: {
    label: "Trips",
  },
  asia: {
    label: "Asia",
    color: "hsl(var(--chart-1))",
  },
  europe: {
    label: "Europe",
    color: "hsl(var(--chart-2))",
  },
  namerica: {
    label: "N. America",
    color: "hsl(var(--chart-3))",
  },
  samerica: {
    label: "S. America",
    color: "hsl(var(--chart-4))",
  },
  africa: {
    label: "Africa",
    color: "hsl(var(--chart-5))",
  },
  oceania: {
    label: "Oceania",
    color: "hsl(var(--primary))",
  },
}

export function RoamingChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
            <Map className="h-6 w-6 text-accent" />
            Where You've Roamed
        </CardTitle>
        <CardDescription>A summary of your adventures across the globe.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData} margin={{ top: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="continent"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="trips" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
